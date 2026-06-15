-- =====================================================================
-- SupaPark — Seed data
-- One demo org, one location, two lanes (entry/exit), sample tariff
-- config, plus a few rules/members/vehicles and a CRM lead + project.
-- Applied automatically by `supabase db reset`.
-- Fixed UUIDs keep relationships reproducible across resets.
-- =====================================================================

-- 1) Organization ------------------------------------------------------
insert into public.organizations (id, name, slug)
values ('11111111-1111-1111-1111-111111111111', 'SupaPark Demo', 'supapark-demo')
on conflict (id) do nothing;

-- 2) Location (Jakarta) -----------------------------------------------
insert into public.locations
  (id, org_id, name, address, city, timezone, latitude, longitude,
   capacity_car, capacity_moto, tariff_config, active)
values
  ('22222222-2222-2222-2222-222222222222',
   '11111111-1111-1111-1111-111111111111',
   'SupaPark Plaza Indonesia',
   'Jl. M.H. Thamrin No.28-30, Gondangdia, Menteng',
   'Jakarta Pusat',
   'Asia/Jakarta',
   -6.1936000, 106.8222000,
   350, 500,
   '{
     "car":        {"first_hour": 5000, "next_hour": 3000, "max_daily": 50000, "grace_min": 15},
     "motorcycle": {"first_hour": 2000, "next_hour": 1000, "max_daily": 20000, "grace_min": 15}
   }'::jsonb,
   true)
on conflict (id) do nothing;

-- 3) Two lanes — one entry, one exit (deterministic demo API keys) ----
insert into public.lanes (id, location_id, name, lane_type, api_key, status, camera_url)
values
  ('33333333-3333-3333-3333-333333333333',
   '22222222-2222-2222-2222-222222222222',
   'North Gate — Entry', 'entry',
   'lane_demo_entry_7f3a9c2b8e1d40561a2b3c4d', 'online',
   'rtsp://10.0.0.11:554/stream1'),
  ('44444444-4444-4444-4444-444444444444',
   '22222222-2222-2222-2222-222222222222',
   'North Gate — Exit', 'exit',
   'lane_demo_exit_2c9d8a1f6b3e5074aa11bb22cc', 'online',
   'rtsp://10.0.0.12:554/stream1')
on conflict (id) do nothing;

-- 4) Plate rules (VIP + blacklist) ------------------------------------
insert into public.plate_rules (location_id, plate, rule_type, reason)
values
  ('22222222-2222-2222-2222-222222222222', 'B 1 SUPA', 'vip',       'Owner / management vehicle'),
  ('22222222-2222-2222-2222-222222222222', 'B 666 XX', 'blacklist', 'Repeated unpaid sessions')
on conflict (location_id, plate_normalized, rule_type) do nothing;

-- 5) A location member (monthly subscriber) ---------------------------
insert into public.members
  (location_id, plate, vehicle_type, name, phone, valid_from, valid_until, active)
values
  ('22222222-2222-2222-2222-222222222222', 'B 1234 ABC', 'car',
   'Budi Santoso', '+6281234567890', current_date, current_date + interval '1 year', true)
on conflict (location_id, plate_normalized) do nothing;

-- 6) Global vehicles (plate<->phone links) ----------------------------
insert into public.vehicles (id, plate, vehicle_type, phone, first_seen, last_seen, visit_count)
values
  ('66666666-6666-6666-6666-666666666666', 'B 1234 ABC', 'car',
   '+6281234567890', now() - interval '30 days', now(), 12),
  ('77777777-7777-7777-7777-777777777777', 'B 4321 DEF', 'motorcycle',
   '+6281298765432', now() - interval '10 days', now(), 4)
on conflict (id) do nothing;

-- 7) One currently-active session (a car parked inside) ---------------
insert into public.parking_sessions
  (location_id, entry_lane_id, vehicle_id, plate, plate_confidence, vehicle_type,
   entry_time, fee_calculated, payment_status, session_status, is_member, edge_session_id)
values
  ('22222222-2222-2222-2222-222222222222',
   '33333333-3333-3333-3333-333333333333',
   '66666666-6666-6666-6666-666666666666',
   'B 1234 ABC', 98.50, 'car',
   now() - interval '40 minutes', 0, 'pending', 'active', true,
   'edge-demo-0001')
on conflict (edge_session_id) where edge_session_id is not null do nothing;

-- 8) CRM: one lead and the project it converted into ------------------
insert into public.leads
  (id, name, email, phone, facility_name, source, status, city, address,
   latitude, longitude, entry_lanes, exit_lanes, current_system, daily_volume,
   preferred_date, notes, onboarded_at)
values
  ('88888888-8888-8888-8888-888888888888',
   'Siti Rahayu', 'siti@example.co.id', '+6281355512345',
   'Grand Galaxy Mall', 'website', 'qualified',
   'Bekasi', 'Jl. Boulevard Raya, Grand Galaxy City',
   -6.2615000, 106.9756000, 2, 2, 'manual', 1800,
   current_date + interval '14 days',
   'Wants QRIS + member packages. Two lanes in, two out.',
   now() - interval '5 days')
on conflict (id) do nothing;

insert into public.projects
  (id, lead_id, facility_name, contact_name, contact_email, contact_phone,
   city, address, latitude, longitude, entry_lanes, exit_lanes, status,
   start_date, target_live, notes)
values
  ('99999999-9999-9999-9999-999999999999',
   '88888888-8888-8888-8888-888888888888',
   'Grand Galaxy Mall', 'Siti Rahayu', 'siti@example.co.id', '+6281355512345',
   'Bekasi', 'Jl. Boulevard Raya, Grand Galaxy City',
   -6.2615000, 106.9756000, 2, 2, 'installation',
   current_date - interval '7 days', current_date + interval '21 days',
   'Hardware procured; installing lane controllers.')
on conflict (id) do nothing;

update public.leads
   set project_id   = '99999999-9999-9999-9999-999999999999',
       status       = 'converted',
       converted_at = now()
 where id = '88888888-8888-8888-8888-888888888888';

-- 9) Demo admin user (LOCAL/DEV convenience) --------------------------
-- Creates a Supabase Auth user and promotes it to org admin.
--   email:    admin@supapark.id
--   password: supapark123
-- Wrapped in a sub-transaction so any difference in your local GoTrue
-- schema cannot abort the rest of the seed above.
do $$
declare
  v_user_id uuid := '55555555-5555-5555-5555-555555555555';
  v_org_id  uuid := '11111111-1111-1111-1111-111111111111';
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change
  )
  values (
    '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
    'admin@supapark.id', extensions.crypt('supapark123', extensions.gen_salt('bf')),
    now(), '{"provider":"email","providers":["email"]}', '{"name":"Demo Admin"}',
    now(), now(), '', '', '', ''
  )
  on conflict (id) do nothing;

  insert into auth.identities (
    provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  )
  values (
    v_user_id::text, v_user_id,
    jsonb_build_object('sub', v_user_id::text, 'email', 'admin@supapark.id'),
    'email', now(), now(), now()
  )
  on conflict do nothing;

  -- handle_new_user() already created the public.users row; promote it.
  insert into public.users (id, org_id, email, name, role, active)
  values (v_user_id, v_org_id, 'admin@supapark.id', 'Demo Admin', 'admin', true)
  on conflict (id) do update
    set org_id = excluded.org_id,
        role   = excluded.role,
        name   = excluded.name,
        active = true;

  raise notice 'Seeded demo admin: admin@supapark.id / supapark123';
exception when others then
  raise notice 'Skipped demo auth user (auth schema mismatch?): %', sqlerrm;
end $$;
