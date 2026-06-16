-- =====================================================================
-- SupaPark — Migration 004: Dashboard aggregation RPCs
-- =====================================================================
-- SECURITY INVOKER (default): these run as the calling dashboard user, so the
-- parking_sessions RLS policies scope every aggregate to the user's org.
-- Times are bucketed in Asia/Jakarta (WIB).
-- =====================================================================

-- Daily revenue + session count for the last p_days days (by exit date).
create or replace function public.revenue_daily(p_location_id uuid, p_days int default 30)
returns table (day date, revenue bigint, sessions bigint)
language sql
stable
set search_path = ''
as $$
  select (s.exit_time at time zone 'Asia/Jakarta')::date as day,
         coalesce(sum(s.fee_paid), 0)::bigint            as revenue,
         count(*)::bigint                                as sessions
  from public.parking_sessions s
  where s.location_id = p_location_id
    and s.exit_time is not null
    and s.exit_time >= (now() - make_interval(days => p_days))
  group by 1
  order by 1
$$;

-- Revenue + count grouped by payment method (last p_days days).
create or replace function public.revenue_by_method(p_location_id uuid, p_days int default 30)
returns table (method text, revenue bigint, sessions bigint)
language sql
stable
set search_path = ''
as $$
  select coalesce(s.payment_method::text, 'unknown') as method,
         coalesce(sum(s.fee_paid), 0)::bigint        as revenue,
         count(*)::bigint                            as sessions
  from public.parking_sessions s
  where s.location_id = p_location_id
    and s.exit_time is not null
    and s.exit_time >= (now() - make_interval(days => p_days))
  group by 1
  order by 2 desc
$$;

-- Session counts grouped by hour of day (entry time, last p_days days).
create or replace function public.sessions_peak_hours(p_location_id uuid, p_days int default 30)
returns table (hour int, sessions bigint)
language sql
stable
set search_path = ''
as $$
  select extract(hour from (s.entry_time at time zone 'Asia/Jakarta'))::int as hour,
         count(*)::bigint                                                    as sessions
  from public.parking_sessions s
  where s.location_id = p_location_id
    and s.entry_time >= (now() - make_interval(days => p_days))
  group by 1
  order by 1
$$;

grant execute on function public.revenue_daily(uuid, int)       to authenticated;
grant execute on function public.revenue_by_method(uuid, int)   to authenticated;
grant execute on function public.sessions_peak_hours(uuid, int) to authenticated;
