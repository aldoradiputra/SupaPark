-- =====================================================================
-- SupaPark — Smart Parking System for Indonesia
-- Migration 001: Core schema (extensions, types, tables, indexes, triggers)
-- =====================================================================
-- Architecture
--   * One Next.js app (landing + onboarding + dashboard) on Vercel
--   * Supabase (Postgres + Auth + Realtime + Edge Functions) as backend
--   * One lean Go binary per Raspberry Pi lane (ALPR + gate relay + offline queue)
--
-- Conventions
--   * Money is stored as whole Indonesian Rupiah (IDR) in integer columns.
--   * `plate_normalized` is a generated column: upper-cased, alphanumerics
--     only (e.g. "B 1234 ABC" -> "B1234ABC"). It is the join/identity key.
--   * Row Level Security policies live in migration 002.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;  -- gen_random_bytes / crypt

-- ---------------------------------------------------------------------
-- Enumerated types
-- ---------------------------------------------------------------------
create type public.lane_type           as enum ('entry', 'exit');
create type public.lane_status         as enum ('online', 'offline', 'maintenance', 'disabled');
create type public.vehicle_type        as enum ('car', 'motorcycle');
create type public.payment_method      as enum ('cash', 'qris', 'ewallet', 'card', 'member', 'free');
create type public.payment_status      as enum ('pending', 'paid', 'failed', 'expired', 'refunded', 'cancelled');
create type public.session_status      as enum ('active', 'completed', 'cancelled', 'abandoned');
create type public.plate_rule_type     as enum ('whitelist', 'blacklist', 'vip');
create type public.user_role           as enum ('admin', 'operator', 'viewer');
create type public.lead_source         as enum ('website', 'referral', 'cold_call', 'event', 'partner', 'social_media', 'other');
create type public.lead_status         as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
create type public.current_system_type as enum ('manual', 'barrier_gate', 'ticket_dispenser', 'rfid', 'competitor', 'none', 'other');
create type public.project_status      as enum ('planning', 'procurement', 'installation', 'testing', 'live', 'maintenance', 'cancelled');

-- ---------------------------------------------------------------------
-- Utility: keep updated_at fresh on every row update
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- =====================================================================
-- CORE PARKING
-- =====================================================================

-- 1. organizations — multi-tenant root. One tenant (parking operator) = one org.
create table public.organizations (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger trg_organizations_updated before update on public.organizations
  for each row execute function public.set_updated_at();

-- 2. locations — parking facilities
create table public.locations (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references public.organizations(id) on delete cascade,
  name          text not null,
  address       text,
  city          text,
  timezone      text not null default 'Asia/Jakarta',
  latitude      numeric(10,7),
  longitude     numeric(10,7),
  capacity_car  integer not null default 0 check (capacity_car  >= 0),
  capacity_moto integer not null default 0 check (capacity_moto >= 0),
  tariff_config jsonb   not null default '{
    "car":        {"first_hour": 5000, "next_hour": 3000, "max_daily": 50000, "grace_min": 15},
    "motorcycle": {"first_hour": 2000, "next_hour": 1000, "max_daily": 20000, "grace_min": 15}
  }'::jsonb check (jsonb_typeof(tariff_config) = 'object'),
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_locations_updated before update on public.locations
  for each row execute function public.set_updated_at();

-- 3. lanes — entry/exit hardware (one Raspberry Pi per lane)
create table public.lanes (
  id             uuid primary key default gen_random_uuid(),
  location_id    uuid not null references public.locations(id) on delete cascade,
  name           text not null,
  lane_type      public.lane_type not null,
  api_key        text not null unique default ('lane_' || encode(extensions.gen_random_bytes(24), 'hex')),
  status         public.lane_status not null default 'offline',
  camera_url     text,
  last_heartbeat timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger trg_lanes_updated before update on public.lanes
  for each row execute function public.set_updated_at();

-- 4. vehicles — the plate is the universal identity (GLOBAL, not org-scoped)
create table public.vehicles (
  id                uuid primary key default gen_random_uuid(),
  plate             text not null,
  plate_normalized  text generated always as (upper(regexp_replace(plate, '[^A-Za-z0-9]+', '', 'g'))) stored,
  vehicle_type      public.vehicle_type,
  phone             text,                 -- global plate->phone link (no verification, see RLS notes)
  push_subscription jsonb,                -- Web Push subscription for parking notifications
  first_seen        timestamptz not null default now(),
  last_seen         timestamptz not null default now(),
  visit_count       integer not null default 0 check (visit_count >= 0),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create trigger trg_vehicles_updated before update on public.vehicles
  for each row execute function public.set_updated_at();

-- 5. members — location-scoped membership (member at A != member at B)
create table public.members (
  id               uuid primary key default gen_random_uuid(),
  location_id      uuid not null references public.locations(id) on delete cascade,
  plate            text not null,
  plate_normalized text generated always as (upper(regexp_replace(plate, '[^A-Za-z0-9]+', '', 'g'))) stored,
  vehicle_type     public.vehicle_type,
  name             text,
  phone            text,
  valid_from       date,
  valid_until      date,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (location_id, plate_normalized)
);
create trigger trg_members_updated before update on public.members
  for each row execute function public.set_updated_at();

-- 6. parking_sessions — the core transaction (synced from edge lanes)
create table public.parking_sessions (
  id               uuid primary key default gen_random_uuid(),
  location_id      uuid not null references public.locations(id) on delete cascade,
  entry_lane_id    uuid references public.lanes(id) on delete set null,
  exit_lane_id     uuid references public.lanes(id) on delete set null,
  vehicle_id       uuid references public.vehicles(id) on delete set null,
  plate            text not null,
  plate_normalized text generated always as (upper(regexp_replace(plate, '[^A-Za-z0-9]+', '', 'g'))) stored,
  plate_confidence numeric(5,2) check (plate_confidence is null or plate_confidence between 0 and 100),
  vehicle_type     public.vehicle_type,
  entry_time       timestamptz not null default now(),
  exit_time        timestamptz,
  duration_min     integer check (duration_min is null or duration_min >= 0),
  fee_calculated   integer not null default 0 check (fee_calculated >= 0),
  fee_paid         integer not null default 0 check (fee_paid >= 0),
  payment_method   public.payment_method,
  payment_status   public.payment_status not null default 'pending',
  session_status   public.session_status not null default 'active',
  is_member        boolean not null default false,
  edge_session_id  text,            -- id from the lane's offline queue (idempotent sync key)
  synced_at        timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger trg_parking_sessions_updated before update on public.parking_sessions
  for each row execute function public.set_updated_at();

-- 7. payments — payment records (QRIS / e-wallet / card / cash)
create table public.payments (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid references public.parking_sessions(id) on delete set null,
  method          public.payment_method not null,
  amount          integer not null check (amount >= 0),
  order_id        text not null unique,                 -- merchant order id sent to the PSP
  provider_txn_id text,
  qr_string       text,                                 -- raw QRIS payload
  qr_url          text,
  status          public.payment_status not null default 'pending',
  webhook_payload jsonb,                                -- raw provider webhook for audit
  paid_at         timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger trg_payments_updated before update on public.payments
  for each row execute function public.set_updated_at();

-- 8. plate_rules — whitelist / blacklist / vip per location
create table public.plate_rules (
  id               uuid primary key default gen_random_uuid(),
  location_id      uuid not null references public.locations(id) on delete cascade,
  plate            text not null,
  plate_normalized text generated always as (upper(regexp_replace(plate, '[^A-Za-z0-9]+', '', 'g'))) stored,
  rule_type        public.plate_rule_type not null,
  reason           text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (location_id, plate_normalized, rule_type)
);
create trigger trg_plate_rules_updated before update on public.plate_rules
  for each row execute function public.set_updated_at();

-- 9. users — dashboard users, 1:1 with Supabase Auth (auth.users)
create table public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  org_id      uuid references public.organizations(id) on delete cascade,  -- null until provisioned
  email       text,
  name        text,
  role        public.user_role not null default 'viewer',
  location_id uuid references public.locations(id) on delete set null,     -- optional: scope to one location
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_users_updated before update on public.users
  for each row execute function public.set_updated_at();

-- =====================================================================
-- CRM / ERP  (platform-level — SupaPark's own sales & deployment pipeline)
-- =====================================================================

-- 10. leads — inbound onboarding funnel (two-step form)
create table public.leads (
  id             uuid primary key default gen_random_uuid(),
  name           text,
  email          text,
  phone          text,
  facility_name  text,
  source         public.lead_source not null default 'website',
  status         public.lead_status not null default 'new',
  city           text,
  address        text,
  latitude       numeric(10,7),
  longitude      numeric(10,7),
  entry_lanes    integer check (entry_lanes  is null or entry_lanes  >= 0),
  exit_lanes     integer check (exit_lanes   is null or exit_lanes   >= 0),
  current_system public.current_system_type,
  daily_volume   integer check (daily_volume is null or daily_volume >= 0),
  preferred_date date,
  notes          text,
  onboarded_at   timestamptz,
  converted_at   timestamptz,
  project_id     uuid,   -- FK added after `projects` exists (circular reference)
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger trg_leads_updated before update on public.leads
  for each row execute function public.set_updated_at();

-- 11. projects — deployment pipeline
create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references public.leads(id) on delete set null,
  location_id   uuid references public.locations(id) on delete set null,   -- set once live
  facility_name text,
  contact_name  text,
  contact_email text,
  contact_phone text,
  city          text,
  address       text,
  latitude      numeric(10,7),
  longitude     numeric(10,7),
  entry_lanes   integer check (entry_lanes is null or entry_lanes >= 0),
  exit_lanes    integer check (exit_lanes  is null or exit_lanes  >= 0),
  status        public.project_status not null default 'planning',
  start_date    date,
  target_live   date,
  actual_live   date,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- Close the circular leads <-> projects reference.
alter table public.leads
  add constraint leads_project_id_fkey
  foreign key (project_id) references public.projects(id) on delete set null;

-- =====================================================================
-- Indexes
-- =====================================================================
-- parking_sessions
create index parking_sessions_location_entry_idx on public.parking_sessions (location_id, entry_time desc);
create index parking_sessions_plate_status_idx   on public.parking_sessions (plate_normalized, session_status);
create index parking_sessions_payment_status_idx on public.parking_sessions (payment_status);
create index parking_sessions_vehicle_idx        on public.parking_sessions (vehicle_id);
-- one open row per edge_session_id (idempotent offline-queue sync)
create unique index parking_sessions_edge_session_id_key
  on public.parking_sessions (edge_session_id) where edge_session_id is not null;

-- vehicles: unique normalized plate (the global identity)
create unique index vehicles_plate_normalized_key on public.vehicles (plate_normalized);

-- lanes: api_key is already unique (constraint builds the index); add the FK index
create index lanes_location_idx on public.lanes (location_id);

-- members
create index members_location_plate_active_idx on public.members (location_id, plate_normalized, active);

-- leads
create index leads_status_idx on public.leads (status);
create index leads_email_idx  on public.leads (lower(email));

-- supporting FK indexes
create index locations_org_idx        on public.locations (org_id);
create index payments_session_idx     on public.payments (session_id);
create index plate_rules_location_idx on public.plate_rules (location_id, plate_normalized);
create index users_org_idx            on public.users (org_id);
create index projects_lead_idx        on public.projects (lead_id);

-- =====================================================================
-- Security helper functions
-- Used by RLS (migration 002) and by triggers below. They are
-- SECURITY DEFINER so they can read public.users WITHOUT triggering RLS,
-- which also prevents recursive policy evaluation on the users table.
-- =====================================================================
create or replace function public.current_org_id()
returns uuid language sql stable security definer set search_path = '' as $$
  select org_id from public.users where id = (select auth.uid()) and active
$$;

create or replace function public.current_user_role()
returns public.user_role language sql stable security definer set search_path = '' as $$
  select role from public.users where id = (select auth.uid()) and active
$$;

create or replace function public.is_org_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.users
    where id = (select auth.uid()) and active and role = 'admin'
  )
$$;

create or replace function public.is_org_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.users
    where id = (select auth.uid()) and active and role in ('admin', 'operator')
  )
$$;

create or replace function public.location_in_org(p_location_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.locations l
    join public.users u on u.org_id = l.org_id
    where l.id = p_location_id
      and u.id = (select auth.uid())
      and u.active
  )
$$;

-- =====================================================================
-- Behavioural triggers
-- =====================================================================

-- Bump vehicle stats whenever a new parking session is recorded.
create or replace function public.touch_vehicle_on_session()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.vehicle_id is not null then
    update public.vehicles
       set last_seen   = greatest(coalesce(last_seen, new.entry_time), new.entry_time),
           visit_count = visit_count + 1
     where id = new.vehicle_id;
  end if;
  return new;
end;
$$;
create trigger trg_session_touch_vehicle
  after insert on public.parking_sessions
  for each row execute function public.touch_vehicle_on_session();

-- Auto-provision a public.users row when a new auth user signs up.
-- org_id stays null until an admin assigns the user, so a brand-new
-- account can see nothing (RLS denies all) until it is provisioned.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Stop a non-admin from escalating their own privileges via the dashboard.
create or replace function public.guard_user_self_update()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if (select auth.uid()) = new.id and not public.is_org_admin() then
    if new.role        is distinct from old.role
       or new.org_id      is distinct from old.org_id
       or new.active      is distinct from old.active
       or new.location_id is distinct from old.location_id then
      raise exception 'permission denied: cannot change role, org, active or location on your own account';
    end if;
  end if;
  return new;
end;
$$;
create trigger trg_users_guard_self_update
  before update on public.users
  for each row execute function public.guard_user_self_update();

-- =====================================================================
-- Public RPC surface
-- =====================================================================
-- Public plate<->phone linking. Exposed to `anon` as the ONLY way the
-- public can write to `vehicles`. It is SECURITY DEFINER so the caller can
-- perform a true upsert WITHOUT being granted SELECT on the table — which
-- keeps the global phone book private (a raw anon table upsert would require
-- granting anon SELECT on vehicles, exposing every phone number).
-- No verification by design (per product spec). Returns the vehicle id.
create or replace function public.link_vehicle(
  p_plate        text,
  p_phone        text default null,
  p_push         jsonb default null,
  p_vehicle_type public.vehicle_type default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_norm text := upper(regexp_replace(coalesce(p_plate, ''), '[^A-Za-z0-9]+', '', 'g'));
  v_id   uuid;
begin
  if v_norm = '' then
    raise exception 'plate is required';
  end if;

  insert into public.vehicles (plate, phone, push_subscription, vehicle_type)
  values (p_plate, p_phone, p_push, p_vehicle_type)
  on conflict (plate_normalized) do update
    set phone             = coalesce(excluded.phone, public.vehicles.phone),
        push_subscription = coalesce(excluded.push_subscription, public.vehicles.push_subscription),
        vehicle_type      = coalesce(excluded.vehicle_type, public.vehicles.vehicle_type),
        last_seen         = now()
  returning id into v_id;

  return v_id;
end;
$$;

-- =====================================================================
-- Realtime — publish live tables for the dashboard (Supabase only)
-- =====================================================================
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.parking_sessions;
    alter publication supabase_realtime add table public.lanes;
    alter publication supabase_realtime add table public.payments;
  end if;
end $$;

-- =====================================================================
-- Documentation
-- =====================================================================
comment on table public.organizations    is 'Multi-tenant root. Every tenant (parking operator) is one organization.';
comment on table public.locations         is 'Parking facilities owned by an organization.';
comment on table public.lanes             is 'Entry/exit hardware. Each lane is one Raspberry Pi running the edge binary.';
comment on table public.vehicles          is 'Global plate identity. plate_normalized is unique across the whole system.';
comment on table public.members           is 'Location-scoped membership. A member at one location is not a member at another.';
comment on table public.parking_sessions  is 'Core parking transaction, synced from the edge (Raspberry Pi) lanes.';
comment on table public.payments          is 'Payment records. Provider webhooks are written by the service role (bypasses RLS).';
comment on table public.plate_rules       is 'Per-location whitelist / blacklist / vip overrides.';
comment on table public.users             is 'Dashboard users, 1:1 with auth.users. Scoped to an organization.';
comment on table public.leads             is 'Platform-level inbound onboarding funnel (SupaPark sales).';
comment on table public.projects          is 'Platform-level deployment pipeline (SupaPark delivery).';
comment on column public.locations.tariff_config is
  'Per-vehicle-type tariff in IDR/minutes. Shape: {"car":{first_hour,next_hour,max_daily,grace_min},"motorcycle":{...}}';
comment on column public.lanes.api_key is
  'Secret used by the edge binary. Edge endpoints run with the service role and bypass RLS.';
comment on column public.parking_sessions.edge_session_id is
  'Stable id minted by the lane offline queue; used as an idempotency key on sync.';
