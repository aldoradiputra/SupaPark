# SupaPark — Design System

> Smart Parking System — Built for Indonesia.
> *"Prevent Leakage, Maximize Revenue."*

SupaPark is an **affordable, ticketless, offline-first parking system** for the Indonesian market. It replaces expensive enterprise parking hardware (Rp 50–150jt/lane) with commodity parts and software where **the license plate IS the ticket** (ANPR — automatic number-plate recognition). Drivers pay by QRIS or tap e-money; operators get live revenue and occupancy data. Target customers are ruko/kos, private campuses, hospitals/clinics, offices, malls, and markets/UMKM.

The brand idea is **"Operational Authority"** — the product handles money, controls physical gates, and runs 24/7 outdoors, so every surface must read as: *this works, it's reliable, trust it with your money.* Reference mental models: Grab Mitra, airport gate signage, an industrial control panel, a Bloomberg terminal. It is explicitly **NOT** a consumer lifestyle app, a generic SaaS dashboard, cute/playful, or heavy enterprise gray.

## Products / surfaces

| Surface | What it is | Language | Theme |
|---|---|---|---|
| **Booth kiosk** | 7–10" touchscreen at each lane gate (Raspberry Pi). Entry & exit flows. | Bahasa only | **Ultra-contrast pure black** |
| **Operator dashboard** | Next.js web app — live overview, sessions, revenue, members, leads, projects, devices, settings. | EN / ID toggle | Soft dark (#0A0A0A) |
| **Onboarding funnel** | Public 2-step registration page at supapark.id/onboarding. | Bahasa only | Soft dark, marketing feel |
| **Parking PWA** | Visitor mobile web app — scan QR, link plate, prepay before the exit gate. | Bahasa only | Dark, booth-bright status |
| **Attendant tablet** | Override controls for attended/hybrid lanes. | Bahasa only | Soft dark, large taps |
| **WhatsApp receipts** | Payment receipts to drivers. | Bahasa only | — |

Staffing modes: **Unattended** (ruko/kos, fully automated) · **Attended** (mall/RS/pasar, tablet overrides) · **Hybrid** (kampus, staffed at peak only).

---

## Sources

This system was reverse-engineered from the founder's own repositories. If you have access, explore them to build more accurate SupaPark designs:

- **Brand book** — `github.com/aldoradiputra/supapark-brandbook` — the single-file visual identity system (colors, type, logo, booth UI, dashboard UI, voice, GTM). **Primary source of truth** for this design system.
- **Product code** — `github.com/aldoradiputra/parkir` — the real monorepo. The `dashboard/` Next.js app (shadcn-style UI primitives, Tailwind tokens, live screens) is the source for the components and dashboard UI kit here.
- **Landing page** — `github.com/aldoradiputra/parkir-landing` — marketing site.

Tokens in this system were lifted directly from `dashboard/tailwind.config.ts` and the brand book; components from `dashboard/src/components/`.

---

## CONTENT FUNDAMENTALS

**Voice: professional, direct, confidence-inspiring. Never casual.** SupaPark handles money and physical security, so copy is operational and calm — it states status, it does not emote.

- **Tone** — Operational and matter-of-fact. *"Sesi Aktif"* (Active Session), not *"Mobil yang Parkir"* (Cars that are Parked). Focus claims on uptime, offline capability, and security.
- **No exclamation marks on status.** A gate opening is *"Portal Terbuka"*, full stop. The one warm exception is the booth thank-you: *"Terima Kasih"* / *"Terima kasih!"* after a completed payment.
- **Person** — Product speaks *about* the system and the vehicle, not in first person. To the operator it is neutral/instructional ("Resolve", "Selesaikan"). To the driver at the booth it is brief and imperative ("Scan untuk bayar", "Tap kartu").
- **Casing** — `SUPAPARK` wordmark is always uppercase with wide tracking. Section headers in the dashboard are UPPERCASE 11px with letter-spacing (e.g. `ACTIVE SESSIONS`). Body and titles are sentence case.
- **No emoji** in product UI. (The brand book uses a few emoji as documentation icons only — never ship them in a booth or dashboard screen. Use Lucide icons instead.)
- **Numbers & money** — Always `Rp` prefix, thousands with a dot, no decimals: `Rp 5.000`, `Rp 2,4jt`. Plates are uppercase monospace with a single space: `B 1234 ABC`. Times use `WIB`. Indonesian counts of time are conversational: *"1 jam 47 menit"*.

**Bilingual rules**

| Surface | Language |
|---|---|
| Booth | Always Bahasa |
| Attendant tablet | Always Bahasa |
| Dashboard | EN / ID toggle (operator's choice) |
| WhatsApp receipts | Always Bahasa |

**String examples (EN / ID)** — Gate Open / *Portal Terbuka* · Gate Stuck — Alert Sent / *Portal Macet — Notifikasi Terkirim* · Payment Confirmed / *Pembayaran Diterima* · Awaiting Payment / *Menunggu Pembayaran* · Valid Member / *Member Aktif* · Pass Expired / *Pass Kadaluarsa* · Today's Revenue / *Pendapatan Hari Ini*.

---

## VISUAL FOUNDATIONS

**Overall vibe** — Dark, dense, authoritative. "Vercel meets Bloomberg" for the dashboard; airport/industrial signage for the booth. High signal, zero decoration. Every pixel earns its place.

### Color
- **Dark-only**, two contexts. Dashboard surfaces step up in lightness, not shadow: `#0A0A0A` base → `#111` raised cards → `#1A1A1A` overlay → `#222` elevated/hover. Hairline borders `#2A2A2A` or `rgba(255,255,255,.06)`.
- **Booth is its own ultra-contrast world**: pure black `#000000` (never gray — it sits behind a screen in garage glare), pure white `#FFFFFF` text, `#999999` secondary, neon green `#00FF88` for confirmation, bright red `#FF3333` for errors.
- **Amber `#F5A623` is the only brand color** and it is reserved for *action and authority* — primary buttons, gate controls, the logo, plate numbers, the active-fee figure. Never use amber as a generic informational accent. Hover → `#FFB830`, pressed → `#B57A18`, tinted fills at ~15% (`amber/15`).
- **Status colors are earned, not decorative**: green `#22C55E` only when something is *done/valid*; red `#EF4444` only for *errors/stuck*; blue `#3B82F6` for neutral info/links only.

### Type
- **Plus Jakarta Sans** for all UI (400–800). **JetBrains Mono** for plate numbers, money, IDs, timestamps — anything machine-read. Plates are always mono, amber, tracked `0.1em`.
- No serif fonts, ever. Tabular numerals on metrics (`font-variant-numeric: tabular-nums`).
- Booth font floor is **20px**; the plate is 48px, the fee 64px. Dashboard scale runs 11px labels → 24px page titles → 28px metrics.

### Backgrounds, borders, radius, elevation
- Backgrounds are **flat solid color**. **No gradients on surfaces** (the only gradients allowed are the cover wordmark text-fill and the booth scan-line). No images or textures in product UI — this is a control surface, not a marketing page.
- **Corner radius ceiling is 12px** (cards/panels). Buttons & inputs 8px, badges/chips 6px, status pills fully rounded. Never rounder than 12px on a container.
- **Elevation = surface color steps + hairline borders**, not drop shadows. The only shadow in the kit is a soft amber *glow* (`0 0 40px rgba(245,166,35,.08)`) reserved for a hero/feature card, and a green glow on the booth confirm state.
- Cards: `background:#111`, `1px`/`0.5px` border, `12px` radius, generous internal padding (16–24px). No left-accent-border-only cards.

### Motion
- **Restrained.** Color/opacity transitions ~150ms. **No count-up animations, no spinners** (use skeletons), no bounce. Allowed: a subtle pulse on the idle "Menunggu kendaraan…" line, and a single amber scan-line sweeping top→bottom during plate detection. Status changes are instant — a gate is open or it isn't.
- Respect `prefers-reduced-motion`: animations are enhancements over a legible base state.

### Interaction states
- **Hover** — lighten the surface one step (`#111`→`#1A1A1A`/`#222`) or amber→`#FFB830`; ghost buttons gain a faint surface fill and brighter text. **Press** — darken (amber→`#B57A18`); no scale/shrink on dashboard. Booth taps invert to a solid amber fill.
- **Focus** — 2px amber ring with a base-color offset (`ring-amber ring-offset-2 ring-offset-surface-base`). High-contrast, keyboard-visible.
- **Disabled** — 50% opacity, no pointer events.

### Layout
- Dashboard: fixed 240px left sidebar (logo, location selector, nav with a 3px amber active rail, language toggle) on desktop; a fixed bottom nav on mobile. Content max-width with comfortable gutters; metric cards in a 4-up grid, tables full-width.
- Booth: full-bleed single-purpose screen, centered content, one job per state. Touch targets ≥80px, QR ≥240px on white. No tooltips, no chrome.
- Transparency/blur is used only on the dashboard's sticky nav (`backdrop-filter: blur(12px)` over `rgba(10,10,10,.92)`).

### What NOT to do (hard rules)
No gradients on surfaces · no count-up animations · no corners > 12px · no serif fonts · no pastel colors · no white backgrounds (except a QR code) · no tooltips on the booth · no tap targets < 56px on tablet / < 80px on booth · no spinners (skeleton only) · no "loading…" text.

---

## ICONOGRAPHY

- **Lucide** (`lucide.dev`) is the icon system — it's what the real dashboard uses (`lucide-react`). Stroke icons, ~1.75px weight, sized 16–20px in the dashboard. Examples in use: `LayoutDashboard, Clock, DollarSign, Users, ShieldCheck, Cpu, Settings, Globe, ParkingCircle, Car, Bike, AlertTriangle, CheckCircle, ArrowDownLeft, ArrowUpRight, Activity`. Load from CDN (`unpkg.com/lucide@latest`) — no icon font is bundled.
- **The SupaPark logomark is a custom SVG**, not an icon-font glyph: a stylized **"P"** where the vertical stroke is the gate post and the curve is the barrier arm raised — `assets/logo-mark.svg` (amber), `assets/logo-mark-white.svg` (booth/mono), `assets/logo-lockup.svg` (mark + wordmark). Minimum size 24px. On the booth, prefer the white or amber mark on pure black.
- **Status dots** — an 8px filled circle in the status color, paired with a label, is the canonical "device/lane online" indicator (not an icon).
- **No emoji and no Unicode-glyph icons** in shipped product UI. Booth checkmark/cross states use a large filled circle/shape in the status color, drawn with Lucide `Check` / `X` inside, never an emoji.

---

## INDEX

**Foundations**
- `styles.css` — global entry point (link this).
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`
- `guidelines/*.card.html` — foundation specimen cards (Design System tab).

**Components** (`components/core/`) — `Logo`, `Button`, `Badge`, `StatusBadge`, `Card`, `Input`, `PlateDisplay`, `MetricCard`, `BoothButton`. React primitives lifted from the real dashboard. See each `*.prompt.md`.

**UI kits**
- `ui_kits/booth/` — **the parking booth kiosk** (1024×600). All 10 entry/exit screen states, interactive.
- `ui_kits/dashboard/` — operator dashboard: shell, overview, leads + projects (with details), desktop + mobile.
- `ui_kits/onboarding/` — public registration funnel (supapark.id/onboarding): 2-step form + dark map + success, mobile/desktop, all field states.
- `ui_kits/pwa/` — visitor Parking PWA (375px): link plate, prepay (QRIS), session + history. 5 screens, Bahasa.

**Assets** (`assets/`) — `logo-mark.svg`, `logo-mark-white.svg`, `logo-lockup.svg`.

**Other** — `SKILL.md` (Agent Skill wrapper), this `README.md`.
