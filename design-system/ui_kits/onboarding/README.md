# Onboarding Funnel — UI Kit

The public, two-step registration flow at **supapark.id/onboarding** where parking-facility owners register interest. Marketing-feel dark theme (more breathing room than the dashboard), **all copy in Bahasa Indonesia**, mobile-first. The floating **375 / 1024** pill (bottom-right) switches widths.

- **`index.html`** — the full clickable funnel (loads Leaflet + the design system).
- **`fields.jsx`** (`window.OB`) — form-field kit with every state: empty · **focused** (amber border + ring) · filled · **error** (red border + inline message). Plus `Progress`, `BrandHeader`, `SuccessCheck`, primary/outline buttons.
- **`app.jsx`** (`window.OB_App`) — the flow, validation, map, reverse-geocode, and the three screens.

### Screens
1. **Step 1 — Quick form** — logo, "Mulai dengan SupaPark", progress (Langkah 1 dari 2), 4 fields (Nama Lengkap, Email, No. Handphone, Nama Fasilitas), "Lanjutkan", "Sudah terdaftar? Hubungi kami".
2. **Step 2 — Full onboarding** — pre-filled facility header, Kota, **dark Leaflet map** (CartoDB `dark_all` tiles) with existing SupaPark locations as **blue markers** and a **draggable amber pin**; tapping/dragging the pin reverse-geocodes and **auto-fills Kota + Alamat**. Then Jalur Masuk/Keluar (number steppers), Sistem Saat Ini (select), Volume Harian, Tanggal Demo, Catatan (optional), "Kirim Pendaftaran".
3. **Success** — green `#00FF88` checkmark (pop animation), "Pendaftaran Berhasil!", 1×24-jam note, summary card (Nama, Fasilitas, Kota), "Kembali ke Beranda" (outline).

### Validation (Bahasa messages)
Required on all non-optional fields. Email format, phone `08xxxxxxxxxx` (`/^08\d{8,12}$/`), lanes ≥ 1, volume ≥ 1. Errors clear as the user corrects each field; Kota/Alamat clear when the map pin sets them.

### Notes
- The map uses **CartoDB dark tiles** (on-brand; no light OSM tiles). Reverse-geocoding is an **offline approximation** (nearest Jakarta district + synthesized street) so the flow works without a network geocoder — swap in Nominatim/Google if you want true addresses.
- Entrance animations are transform-only so content is always visible in static captures / print / reduced-motion.
