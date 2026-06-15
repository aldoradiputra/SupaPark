-- =====================================================================
-- SupaPark — Migration 003: Onboarding funnel RPC
-- =====================================================================
-- The public onboarding funnel needs anonymous visitors to fill in step-2
-- details for the lead they created in step 1, without granting anon any
-- SELECT/UPDATE on the leads table (which would expose every lead's PII).
--
-- Pattern mirrors public.link_vehicle: a SECURITY DEFINER function performs
-- the write as the table owner (bypassing RLS). The lead's UUID id is the
-- capability — only the visitor who created it has it (it lives in their URL).
-- =====================================================================

create or replace function public.submit_onboarding_lead(
  p_id             uuid,
  p_city           text default null,
  p_address        text default null,
  p_latitude       numeric default null,
  p_longitude      numeric default null,
  p_entry_lanes    integer default null,
  p_exit_lanes     integer default null,
  p_current_system public.current_system_type default null,
  p_daily_volume   integer default null,
  p_preferred_date date default null,
  p_notes          text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  update public.leads
     set city           = coalesce(p_city, city),
         address        = coalesce(p_address, address),
         latitude       = coalesce(p_latitude, latitude),
         longitude      = coalesce(p_longitude, longitude),
         entry_lanes    = coalesce(p_entry_lanes, entry_lanes),
         exit_lanes     = coalesce(p_exit_lanes, exit_lanes),
         current_system = coalesce(p_current_system, current_system),
         daily_volume   = coalesce(p_daily_volume, daily_volume),
         preferred_date = coalesce(p_preferred_date, preferred_date),
         notes          = coalesce(p_notes, notes),
         onboarded_at   = coalesce(onboarded_at, now())
   where id = p_id
   returning id into v_id;

  if v_id is null then
    raise exception 'lead not found';
  end if;
  return v_id;
end;
$$;

revoke all on function public.submit_onboarding_lead(
  uuid, text, text, numeric, numeric, integer, integer,
  public.current_system_type, integer, date, text
) from public;

grant execute on function public.submit_onboarding_lead(
  uuid, text, text, numeric, numeric, integer, integer,
  public.current_system_type, integer, date, text
) to anon, authenticated;

comment on function public.submit_onboarding_lead is
  'Public onboarding step 2: fills step-2 details for a lead by id (capability = the lead UUID). SECURITY DEFINER so anon never needs UPDATE on leads.';
