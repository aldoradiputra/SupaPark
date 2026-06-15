-- =====================================================================
-- SupaPark — Migration 002: Row Level Security
-- =====================================================================
-- Supabase roles
--   anon          — unauthenticated requests (public landing / onboarding).
--   authenticated — logged-in dashboard users, scoped via public.users.
--   service_role  — server & Edge Functions; BYPASSES RLS entirely.
--
-- Edge (Raspberry Pi) lanes authenticate with lanes.api_key inside an Edge
-- Function, which then talks to Postgres with the service role. Because the
-- service role bypasses RLS, there are intentionally NO "lane" policies here.
--
-- Model summary
--   * Tenant data is scoped by organization (users see only their org).
--   * locations: public (anon) read of active rows for the onboarding map.
--   * vehicles : public (anon) upsert for plate<->phone linking.
--   * leads    : public (anon) INSERT (step-1 form); admin-only otherwise.
--   * leads/projects are platform-level: any active admin manages them.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Enable RLS on every table (Supabase grants table privileges to anon/
-- authenticated by default, so RLS is the real gate — it MUST be on).
-- ---------------------------------------------------------------------
alter table public.organizations    enable row level security;
alter table public.locations        enable row level security;
alter table public.lanes            enable row level security;
alter table public.vehicles         enable row level security;
alter table public.members          enable row level security;
alter table public.parking_sessions enable row level security;
alter table public.payments         enable row level security;
alter table public.plate_rules      enable row level security;
alter table public.users            enable row level security;
alter table public.leads            enable row level security;
alter table public.projects         enable row level security;

-- ---------------------------------------------------------------------
-- Table privileges (defense in depth on top of RLS).
-- Tighten anon down to only the public surfaces; keep full DML for
-- authenticated (RLS decides what is actually visible/writable).
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

revoke all on all tables in schema public from anon;
grant select on public.locations to anon;   -- public map of active facilities
grant insert on public.leads     to anon;   -- onboarding step 1 (no auth)
-- NOTE: anon gets NO direct table access to vehicles. Public plate<->phone
-- linking goes through the link_vehicle() SECURITY DEFINER RPC below, so the
-- global phone book is never exposed for SELECT.

grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

grant execute on function
  public.current_org_id(),
  public.current_user_role(),
  public.is_org_admin(),
  public.is_org_staff(),
  public.location_in_org(uuid)
to authenticated;

-- Public plate<->phone linking RPC: callable by anyone, no table grants needed.
revoke all     on function public.link_vehicle(text, text, jsonb, public.vehicle_type) from public;
grant  execute on function public.link_vehicle(text, text, jsonb, public.vehicle_type) to anon, authenticated;

-- =====================================================================
-- Policies
-- =====================================================================

-- organizations -------------------------------------------------------
create policy organizations_select on public.organizations
  for select to authenticated
  using (id = public.current_org_id());

create policy organizations_admin_write on public.organizations
  for all to authenticated
  using      (id = public.current_org_id() and public.is_org_admin())
  with check (id = public.current_org_id() and public.is_org_admin());

-- locations -----------------------------------------------------------
-- Public read of ACTIVE facilities (onboarding map).
create policy locations_public_read on public.locations
  for select to anon
  using (active);

-- Authenticated users see active facilities everywhere plus all of their own.
create policy locations_auth_read on public.locations
  for select to authenticated
  using (active or org_id = public.current_org_id());

create policy locations_admin_write on public.locations
  for all to authenticated
  using      (org_id = public.current_org_id() and public.is_org_admin())
  with check (org_id = public.current_org_id() and public.is_org_admin());

-- lanes ---------------------------------------------------------------
create policy lanes_select on public.lanes
  for select to authenticated
  using (public.location_in_org(location_id));

create policy lanes_admin_write on public.lanes
  for all to authenticated
  using      (public.location_in_org(location_id) and public.is_org_admin())
  with check (public.location_in_org(location_id) and public.is_org_admin());

-- vehicles (global identity) -----------------------------------------
-- The public never touches this table directly — they use link_vehicle().
-- Any authenticated staff member can read/manage the global vehicle book.
create policy vehicles_auth_all on public.vehicles
  for all to authenticated
  using (true) with check (true);

-- members -------------------------------------------------------------
create policy members_select on public.members
  for select to authenticated
  using (public.location_in_org(location_id));

create policy members_staff_write on public.members
  for all to authenticated
  using      (public.location_in_org(location_id) and public.is_org_staff())
  with check (public.location_in_org(location_id) and public.is_org_staff());

-- parking_sessions ----------------------------------------------------
-- (Most writes arrive from the edge via the service role and bypass RLS;
--  these policies cover dashboard reads and manual corrections.)
create policy parking_sessions_select on public.parking_sessions
  for select to authenticated
  using (public.location_in_org(location_id));

create policy parking_sessions_staff_write on public.parking_sessions
  for all to authenticated
  using      (public.location_in_org(location_id) and public.is_org_staff())
  with check (public.location_in_org(location_id) and public.is_org_staff());

-- payments ------------------------------------------------------------
-- Scoped through the parent session's location.
create policy payments_select on public.payments
  for select to authenticated
  using (exists (
    select 1 from public.parking_sessions s
    where s.id = payments.session_id
      and public.location_in_org(s.location_id)
  ));

create policy payments_staff_write on public.payments
  for all to authenticated
  using (exists (
    select 1 from public.parking_sessions s
    where s.id = payments.session_id
      and public.location_in_org(s.location_id)
      and public.is_org_staff()
  ))
  with check (exists (
    select 1 from public.parking_sessions s
    where s.id = payments.session_id
      and public.location_in_org(s.location_id)
      and public.is_org_staff()
  ));

-- plate_rules ---------------------------------------------------------
create policy plate_rules_select on public.plate_rules
  for select to authenticated
  using (public.location_in_org(location_id));

create policy plate_rules_staff_write on public.plate_rules
  for all to authenticated
  using      (public.location_in_org(location_id) and public.is_org_staff())
  with check (public.location_in_org(location_id) and public.is_org_staff());

-- users ---------------------------------------------------------------
-- Read your own profile, or (as admin) anyone in your organization.
create policy users_select on public.users
  for select to authenticated
  using (
    id = (select auth.uid())
    or (org_id = public.current_org_id() and public.is_org_admin())
  );

-- Update your own profile. Role/org/active/location changes are blocked
-- for non-admins by the guard_user_self_update() trigger.
create policy users_update_self on public.users
  for update to authenticated
  using      (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Admins fully manage users within their organization.
create policy users_admin_write on public.users
  for all to authenticated
  using      (org_id = public.current_org_id() and public.is_org_admin())
  with check (org_id = public.current_org_id() and public.is_org_admin());

-- leads (platform-level CRM) -----------------------------------------
-- Public can submit the onboarding form (step 1) with no auth.
create policy leads_public_insert on public.leads
  for insert to anon
  with check (true);

-- Admins manage everything else.
create policy leads_admin_all on public.leads
  for all to authenticated
  using      (public.is_org_admin())
  with check (public.is_org_admin());

-- projects (platform-level deployment pipeline) ----------------------
create policy projects_admin_all on public.projects
  for all to authenticated
  using      (public.is_org_admin())
  with check (public.is_org_admin());
