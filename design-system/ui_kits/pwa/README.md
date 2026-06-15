# Parking PWA — UI Kit

The visitor-facing mobile web app at **supapark.id** (PWA). A parker scans a QR code posted on a pillar/wall, links their plate to a phone number once, and **prepays before reaching the exit gate** so the barrier opens automatically. Mobile-only (375px), pure Bahasa Indonesia, dark theme.

- **`index.html`** — the running app inside an iPhone frame (status bar + home indicator). The **Layar PWA** navigator beside the phone hops between screens; the bottom toggle flips Session History between **terisi / kosong**.
- **`pwa.jsx`** (`window.PWA_App`) — all 5 screens, the router, the live fee timer, and a self-contained QR generator.

### Screens
1. **Landing / Link Plate** — small logo, QR-detected location chip ("Plaza Yogyakarta"), "Hubungkan Plat Anda", plate input (uppercase **JetBrains Mono**, centered) + phone input, "Hubungkan", "Cek sesi Anda" link. Validates plate format + `08xxxxxxxxxx`.
2. **Active Session** — live "Sedang Parkir" pill, large amber plate, location + address, info card (Waktu Masuk, **live Durasi**, **live Biaya Saat Ini** in big amber, tarif), "Bayar Sekarang — Rp 11.000".
3. **Payment (QRIS)** — compact plate + total, large QR (tap to simulate pay), "Scan QR atau ketuk untuk bayar", 5:00 countdown (turns red under 1 min), "Batal".
4. **Payment Success** — green `#00FF88` check (pop), "Pembayaran Berhasil!", amount, "gerbang terbuka otomatis" note, "Selesai".
5. **Session History** — "Riwayat Parkir", cards (location, date, durasi, amount, **Lunas** green / **Belum Bayar** red pill) + **empty state** ("Belum ada riwayat").

### Fee model
`Rp 5.000` first hour, `Rp 3.000` each subsequent (ceil) hour. The session screen recomputes Biaya/Durasi every second from entry time.

### Notes
Status colors use the booth-bright set (`#00FF88` / `#FF3333`) per the PWA brief — these read well on a phone in a dim garage. The QR is a deterministic decorative pattern (not a real payment code). Self-contained — only depends on React + Lucide + the design-system stylesheet.
