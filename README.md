# SupaPark

Smart parking system for Indonesia.

- **One Next.js app** on Render — landing + onboarding + dashboard (this repo root). See [DEPLOY.md](./DEPLOY.md).
- **Supabase** backend — Postgres + Auth + Realtime + Edge Functions (`supabase/`)
- **One lean Go binary per Raspberry Pi lane** — ALPR + gate relay + offline queue
- **Design system** — brand tokens, components, UI kits (`design-system/`)

## Layout

```
.                          # Next.js 14 app (App Router, src/)
├── src/
│   ├── app/               # (public) + (dashboard) route groups, login, root layout
│   ├── components/        # ui primitives, sidebar, logo, auth form
│   ├── lib/
│   │   ├── supabase/      # browser + server clients, session middleware
│   │   └── queries/       # typed query functions (replace the old axios api)
│   ├── store/             # zustand (locale + selected location; no auth token)
│   ├── types/             # database.types.ts + domain aliases
│   └── middleware.ts      # route protection + session refresh
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   │   ├── 20260614120000_initial_schema.sql    # types, tables, indexes, triggers, RPC
│   │   └── 20260614121000_rls_policies.sql      # RLS enable + grants + policies
│   └── seed.sql                                 # demo org, location, 2 lanes, tariff, CRM
└── design-system/                               # brand tokens, components, UI kits
```

## Run the web app

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase URL + anon key
npm run dev                        # http://localhost:3000
```

Public routes: `/`, `/onboarding`, `/login`. Everything else (the dashboard:
`/overview`, `/sessions`, `/revenue`, `/members`, `/plate-rules`, `/leads`,
`/projects`, `/devices`, `/settings`) requires a Supabase session — the
middleware redirects to `/login` otherwise.

## Run the database locally

```bash
supabase start          # boots Postgres + Auth + Studio (Docker)
supabase db reset       # applies both migrations, then runs seed.sql
```

Or push to a hosted project:

```bash
supabase link --project-ref <ref>
supabase db push
```

Demo admin created by the seed (local only): **`admin@supapark.id` / `supapark123`**.

## Tables

| # | Table | Scope | Notes |
|---|-------|-------|-------|
| 1 | `organizations` | tenant root | multi-tenant baked in from day one |
| 2 | `locations` | org | facilities; holds `tariff_config` (JSONB) and capacity |
| 3 | `lanes` | location | entry/exit hardware; `api_key` authenticates the Pi |
| 4 | `vehicles` | **global** | plate = universal identity; `plate_normalized` unique |
| 5 | `members` | location | membership at A ≠ membership at B |
| 6 | `parking_sessions` | location | core transaction; synced from the edge |
| 7 | `payments` | via session | QRIS / e-wallet / card / cash; `order_id` unique |
| 8 | `plate_rules` | location | whitelist / blacklist / vip |
| 9 | `users` | org | dashboard users, 1:1 with `auth.users` |
| 10 | `leads` | platform | two-step onboarding funnel |
| 11 | `projects` | platform | deployment pipeline (`leads` ↔ `projects`) |

### Plate normalization

`plate_normalized` is a **generated column** on `vehicles`, `members`, `parking_sessions`
and `plate_rules`:

```
upper(regexp_replace(plate, '[^A-Za-z0-9]+', '', 'g'))   -- "B 1234 ABC" -> "B1234ABC"
```

It is the join/lookup key and is guaranteed consistent everywhere. `vehicles.plate_normalized`
is globally unique.

### Tariff config shape

```json
{
  "car":        { "first_hour": 5000, "next_hour": 3000, "max_daily": 50000, "grace_min": 15 },
  "motorcycle": { "first_hour": 2000, "next_hour": 1000, "max_daily": 20000, "grace_min": 15 }
}
```

Amounts are whole **IDR**; `grace_min` is minutes. This exact object is the column default and the
demo location's value.

## RLS model

Roles: `anon` (public), `authenticated` (dashboard users), `service_role` (server / Edge
Functions — **bypasses RLS**). Tenant isolation is derived from `public.users` via SECURITY
DEFINER helpers (`current_org_id()`, `is_org_admin()`, `is_org_staff()`, `location_in_org()`).
They are SECURITY DEFINER so reading `users` inside a `users` policy can't recurse.

| Table | anon | authenticated (in org) | who can write |
|-------|------|------------------------|---------------|
| organizations | — | read own org | admin |
| locations | **read active** | read active + own | admin |
| lanes | — | read | admin |
| vehicles | link via `link_vehicle()` RPC | read/write all (global) | any staff |
| members | — | read | admin / operator |
| parking_sessions | — | read | admin / operator (+ edge via service role) |
| payments | — | read | admin / operator (+ webhooks via service role) |
| plate_rules | — | read | admin / operator |
| users | — | read self (+ org if admin) | self (limited) / admin |
| leads | **insert** | admin read/write | admin |
| projects | — | admin read/write | admin |

### Edge ↔ cloud

The Raspberry Pi binary calls an **Edge Function**, presenting `lanes.api_key`. The function
verifies the key, then writes with the **service role** (which bypasses RLS). So lane traffic
never relies on a Postgres policy. `parking_sessions.edge_session_id` is the idempotency key for
the offline queue (unique where not null), so re-syncing the same offline event won't duplicate
rows.

### Public plate↔phone linking

The public links a plate to a phone (and Web Push subscription) by calling the
`public.link_vehicle(p_plate, p_phone, p_push, p_vehicle_type)` RPC
(`POST /rest/v1/rpc/link_vehicle`). It is `SECURITY DEFINER` and performs an upsert, so `anon`
needs **no table grants** on `vehicles`. This is deliberate: a raw anon table upsert in Postgres
requires `SELECT` privilege (for `ON CONFLICT` inference), which would expose every stored phone
number. The RPC gives the same "public upsert" capability while keeping the phone book private.

### Realtime

`parking_sessions`, `lanes` and `payments` are added to the `supabase_realtime` publication for
live dashboards (guarded so the migration also runs on plain Postgres).

## Design decisions & trade-offs

- **`leads` / `projects` are platform-level**, not tenant data — they are SupaPark's own sales and
  delivery pipeline. The policies grant access to any active `admin`. If you later run true
  multi-tenant separation between the SupaPark team and customer operators, gate these on a
  dedicated platform org or a `super_admin` role.
- **Public vehicle linking has no verification** (per spec: "phone is a global plate→phone link, no
  verification needed"). Anyone can set the notification phone for any plate via `link_vehicle()`.
  The function already isolates the write path (no table exposure); for production, add OTP
  verification inside it before hardening to launch.
- **New auth users** get a `public.users` row automatically (`handle_new_user` trigger) with a null
  `org_id` — they can see nothing until an admin provisions them. A guard trigger stops non-admins
  from editing their own `role` / `org_id` / `active` / `location_id`.
- Money is integer IDR (no cents). Lat/long are `numeric(10,7)`.
