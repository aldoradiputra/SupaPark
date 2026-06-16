# SupaPark Edge Binary (reference)

Per-lane Raspberry Pi binary, refactored to talk to **Supabase Edge Functions**
instead of a custom Go cloud API. The edge↔cloud contract is versioned by
function name (`session-entry`, `session-exit`, `session-sync`,
`lane-heartbeat`), not URL paths.

> This is a fresh **reference** module (the original lives in `aldoradiputra/parkir`).
> The ALPR pipeline, gate relay, and booth PWA are reduced to interfaces + stubs;
> port the real implementations across. The Supabase client, sync engine,
> detector loop, offline store, and config are complete.

## Layout

```
edge/
├── cmd/edge/main.go            # config wiring + HTTP (SSE + booth PWA)
├── cmd/edge/web/index.html     # booth screen (SSE consumer)
└── internal/edge/
    ├── config.go               # env config (Supabase + lane)
    ├── model/                  # shared types + function contracts
    ├── cloud/                  # HTTP client for the edge functions (5s timeout)
    ├── sync/                   # heartbeat + drain offline queue
    ├── detector/               # ALPR → session-entry/exit, BoltDB fallback
    ├── store/                  # BoltDB offline queue
    ├── gate/                   # gate relay (stub)
    ├── alpr/                   # plate-detection source (stub)
    └── sse/                    # local SSE broker for the booth
```

## Config (environment)

Replaces the old `EDGE_CLOUD_URL` / `EDGE_API_KEY`:

| Var | Required | Default | Notes |
|-----|----------|---------|-------|
| `EDGE_SUPABASE_URL` | ✓ | — | `https://xxx.supabase.co` |
| `EDGE_SUPABASE_ANON_KEY` | ✓ | — | sent as `Authorization: Bearer …` + `apikey` |
| `EDGE_LANE_API_KEY` | ✓ | — | sent as `X-API-Key` (verified by the function) |
| `EDGE_LANE_ID` | | — | included in heartbeat/sync bodies |
| `EDGE_LANE_TYPE` | | `entry` | `entry` or `exit` |
| `EDGE_FIRMWARE_VERSION` | | `0.0.0-dev` | reported on heartbeat |
| `EDGE_HTTP_ADDR` | | `:8080` | booth UI + SSE |
| `EDGE_BOLT_PATH` | | `supapark-edge.db` | offline queue file |
| `EDGE_SYNC_INTERVAL` | | `15s` | |
| `EDGE_HEARTBEAT_INTERVAL` | | `30s` | |

The cloud HTTP timeout is fixed at **5s** (fast fail → offline mode).

## Auth

Every cloud request sends both:

- `Authorization: Bearer {EDGE_SUPABASE_ANON_KEY}` + `apikey` — passes the Supabase gateway
- `X-API-Key: {EDGE_LANE_API_KEY}` — verified by the edge function against `lanes.api_key`

## Offline mode

If Supabase is unreachable, calls fail within 5s and the lane falls back to the
BoltDB queue (fail-open at the gate). The sync engine health-checks the cloud,
then drains the queue via `session-sync` (idempotent upserts keyed by
`edge_session_id`) once back online.

## Build / run / test

```bash
cd edge
go build ./...
go test ./...
go run ./cmd/edge   # needs the EDGE_* env vars above
```
