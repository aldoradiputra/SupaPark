# SupaPark Edge Functions

Machine-to-machine functions for edge↔cloud communication (Deno + supabase-js).
Each uses the **service role** (bypasses RLS) and authorizes itself — lanes via
the `X-API-Key` header (matched against `lanes.api_key`), the webhook via an HMAC
signature. They run with `verify_jwt = false` (see `../config.toml`).

```
functions/
├── _shared/            # cors, http, supabase admin client, lane auth, plate, tariff
├── _tests/             # deno unit tests (never deployed)
├── session-entry/      # POST  open a session
├── session-exit/       # POST  close a session + (stub) QRIS
├── session-sync/       # POST  bulk upsert offline sessions
├── qris-webhook/       # POST  payment provider callback (signature verified)
└── lane-heartbeat/     # POST  lane liveness
```

## Auth & env

- Lane functions require header `X-API-Key: <lanes.api_key>`.
- Env (auto-injected by Supabase): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Optional: `QRIS_STUB` (default `true` — auto-settles QRIS at exit),
  `QRIS_WEBHOOK_SECRET` (when set, the webhook verifies `X-Signature` = HMAC-SHA256
  of the raw body; when unset, verification is skipped for local testing).

## Contracts

| Function | Request body | Response |
|----------|--------------|----------|
| `session-entry` | `{ plate, plate_normalized?, vehicle_type?, confidence?, lane_id? }` | `{ session_id, is_member, phone, tariff_info, slots_available }` (403 if blacklisted) |
| `session-exit` | `{ plate, plate_normalized?, lane_id? }` | `{ session_id, plate, fee, is_member, payment_status, qr_string?, qr_url?, payment_id? }` (404 if no active session) |
| `session-sync` | `{ sessions: EdgeSession[] }` | `{ synced, errors }` |
| `qris-webhook` | provider payload incl. `order_id`/`external_id` + `status` | `{ ok: true }` |
| `lane-heartbeat` | `{ lane_id?, status?, firmware_version? }` | `{ ok: true, lane_id, status }` |

Notes:
- Vehicle `last_seen` / `visit_count` are bumped by the `parking_sessions` insert
  trigger, so entry/sync don't touch them directly.
- QRIS is stubbed: a mock `qr_string`/`qr_url` is returned and (in stub mode) the
  payment is settled immediately. Real settlement flows through `qris-webhook`.
- `lane-heartbeat` accepts `firmware_version` but doesn't persist it (no column).

## Local dev

```bash
supabase start
supabase functions serve --no-verify-jwt        # serves all functions locally

# example
curl -X POST http://localhost:54321/functions/v1/lane-heartbeat \
  -H "X-API-Key: lane_demo_entry_7f3a9c2b8e1d40561a2b3c4d" \
  -H "Content-Type: application/json" \
  -d '{"status":"online","firmware_version":"1.0.0"}'
```

Type-check + tests:

```bash
deno check supabase/functions/*/index.ts
deno test supabase/functions/_tests/
```

## Deploy

```bash
supabase functions deploy session-entry session-exit session-sync qris-webhook lane-heartbeat
```
