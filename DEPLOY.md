# SupaPark — Deployment

| Component | Host | Notes |
|-----------|------|-------|
| Next.js app | **Render** (web service) → `supapark.id` | `supapark.onrender.com` |
| Backend | **Supabase** (managed) | `https://umtjszvcnuhopnnlnmpa.supabase.co` |
| Edge binary | **Raspberry Pi** per lane | cross-compiled for ARM, no cloud deploy |

DNS is managed at **Cloudflare**.

---

## 0. Keys & secrets (read first)

| Key | Where it goes | Secret? |
|-----|---------------|---------|
| Project URL `https://umtjszvcnuhopnnlnmpa.supabase.co` | app + edge env | no (public) |
| Publishable key `sb_publishable_…` | app (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) + edge (`EDGE_SUPABASE_ANON_KEY`) | no — designed for browsers; **RLS** protects data |
| Service role / secret key `sb_secret_…` | **only** Supabase edge functions (auto-injected) | **YES** — never in the app, repo, or browser |
| Database password | **only** local `supabase` CLI prompts | **YES** — never commit |

> ⚠️ **Rotate the database password** if it has ever been shared in plain text
> (chat, tickets, etc.): Supabase → Settings → Database → Reset database password.
> It bypasses RLS, so treat it like a root credential.

---

## 1. Supabase

Install the CLI and link the project (the DB password is entered at the prompt,
never stored in the repo):

```bash
npm i -g supabase            # or: brew install supabase/tap/supabase
supabase login               # opens browser for your access token
supabase link --project-ref umtjszvcnuhopnnlnmpa
```

### 1a. Apply the schema (migrations + seed)

```bash
supabase db push             # applies supabase/migrations/* to the live project
# (optional, demo data) one-off:
# psql "$DATABASE_URL" -f supabase/seed.sql
```

This creates all tables, **enables RLS on every table**, the helper/RPC
functions, indexes, and adds `parking_sessions`, `lanes`, `payments` to the
`supabase_realtime` publication.

> Project settings (you've enabled these): **Data API on**, **auto-expose new
> tables**, **RLS enforced**. Our migrations always `enable row level security`,
> so newly added tables are safe by default.

### 1b. Deploy the edge functions

```bash
supabase functions deploy session-entry
supabase functions deploy session-exit
supabase functions deploy session-sync
supabase functions deploy qris-webhook
supabase functions deploy lane-heartbeat
```

`verify_jwt = false` (set in `supabase/config.toml`) — they authorize
themselves via the lane `X-API-Key` / webhook signature. `SUPABASE_URL` and the
service role key are injected automatically.

Optional function secrets:

```bash
supabase secrets set QRIS_STUB=true            # auto-settle QRIS in stub mode
# When integrating a real PSP:
# supabase secrets set QRIS_WEBHOOK_SECRET=your-hmac-secret QRIS_STUB=false
```

Function URLs are `https://umtjszvcnuhopnnlnmpa.supabase.co/functions/v1/<name>`.

---

## 2. Render (Next.js app)

The app is a Node web service (`next start`) — middleware + SSR run on Node.

**Option A — Blueprint:** connect this repo in Render; it reads `render.yaml`.

**Option B — existing service** (`srv-d8qvdvfavr4c73dsni5g`): set in the dashboard
→ Settings:

| Setting | Value |
|---------|-------|
| Runtime | Node |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Node version | `20.18.0` (env `NODE_VERSION` or `.node-version`) |
| Health check path | `/` |

**Environment variables** (Render → Environment):

```
NEXT_PUBLIC_SUPABASE_URL=https://umtjszvcnuhopnnlnmpa.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_aMumKtMClxcat0BPaTQ5cg_ZHPEdKdq
NEXT_TELEMETRY_DISABLED=1
```

> Do **not** put the service role / DB password here — the app never needs them.

Render injects `PORT`; `next start` honors it. Pushing to `main` auto-deploys.

### Route protection (sanity check)

`src/middleware.ts` keeps `/`, `/onboarding/*`, and `/login` public and redirects
everything else (the dashboard) to `/login` without a session. No change needed
for Render — it's plain Node middleware.

---

## 3. Custom domain + Cloudflare DNS

1. **Render → Settings → Custom Domains:** add `supapark.id` and `www.supapark.id`.
   Render shows the exact DNS target and a verification status.
2. **Cloudflare → DNS:**

   | Type | Name | Target | Proxy |
   |------|------|--------|-------|
   | CNAME | `supapark.id` (`@`) | `supapark.onrender.com` | DNS only → then proxied |
   | CNAME | `www` | `supapark.onrender.com` | DNS only → then proxied |

   Cloudflare flattens the apex CNAME automatically. (If you prefer A records,
   use the IP Render shows for the apex.)
3. **Order matters with the proxy:** keep records **DNS-only (grey cloud)** until
   Render verifies the domain and issues its TLS cert, then switch to **Proxied
   (orange cloud)**.
4. **Cloudflare → SSL/TLS:** set encryption mode to **Full (Strict)** (Render's
   origin presents a valid certificate).

---

## 4. Edge binary (Raspberry Pi, per lane)

Cross-compile (pure-Go, no C toolchain needed):

```bash
cd edge
make build-arm64     # Pi 3/4/5, 64-bit OS  -> supapark-edge-arm64
# make build-arm     # Pi 2/3, 32-bit OS    -> supapark-edge-armv7
```

Copy the binary + a `.env` (from `edge/.env.example`) to the Pi. Each lane uses
its **own** `EDGE_LANE_API_KEY` (from that lane's `lanes.api_key`) and
`EDGE_LANE_MODE` (`entry`/`exit`). `EDGE_SUPABASE_ANON_KEY` is the publishable key.

systemd unit (`/etc/systemd/system/supapark-edge.service`):

```ini
[Unit]
Description=SupaPark edge (lane)
After=network-online.target
Wants=network-online.target

[Service]
EnvironmentFile=/opt/supapark/.env
ExecStart=/opt/supapark/supapark-edge-arm64
Restart=always
RestartSec=3
User=supapark

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now supapark-edge
journalctl -u supapark-edge -f
```

The booth screen (SSE + PWA) is served on `EDGE_HTTP_ADDR` (default `:8080`).

---

## 5. Smoke tests

```bash
# App
curl -I https://supapark.id            # 200
curl -I https://supapark.id/overview   # 307 -> /login (protected)

# Edge function (use a real lane api key)
curl -X POST https://umtjszvcnuhopnnlnmpa.supabase.co/functions/v1/lane-heartbeat \
  -H "Authorization: Bearer sb_publishable_aMumKtMClxcat0BPaTQ5cg_ZHPEdKdq" \
  -H "apikey: sb_publishable_aMumKtMClxcat0BPaTQ5cg_ZHPEdKdq" \
  -H "X-API-Key: <lane api key>" \
  -H "Content-Type: application/json" \
  -d '{"status":"online","firmware_version":"1.0.0"}'
# -> {"ok":true,...}; the lane's last_heartbeat updates (visible on Devices page)
```

## Deploy checklist

- [ ] Rotate the DB password (if shared)
- [ ] `supabase db push` (migrations applied)
- [ ] 5 edge functions deployed
- [ ] Render env vars set; deploy green; health check passing
- [ ] `supapark.id` + `www` added in Render and verified
- [ ] Cloudflare DNS records added; SSL = Full (Strict); proxy enabled after verification
- [ ] Per-lane Pi `.env` with unique `EDGE_LANE_API_KEY`; service running
- [ ] Smoke tests pass
