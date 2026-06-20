/* SupaPark Onboarding — two-step public registration funnel + success.
   Dark Leaflet map (CartoDB dark) with existing-location markers, a draggable
   amber pin, and reverse-geocode autofill. Mobile-first, 375 / 1024 toggle.
   window.OB_App */
(function () {
  const {
    Icon, Field, TextInput, NumberInput, SelectInput, DateInput, TextArea,
    PrimaryButton, OutlineButton, Progress, BrandHeader, SuccessCheck,
  } = window.OB;

  /* Existing SupaPark locations (blue markers) */
  const EXISTING = [
    { name: "Mall Grand Indonesia", lat: -6.195, lng: 106.820 },
    { name: "RS Siloam Kebon Jeruk", lat: -6.190, lng: 106.770 },
    { name: "Kampus BINUS Anggrek", lat: -6.201, lng: 106.782 },
    { name: "Universitas Trisakti", lat: -6.168, lng: 106.788 },
    { name: "Ruko Pluit Village", lat: -6.124, lng: 106.790 },
  ];

  /* Offline reverse-geocoder — nearest Jakarta district + synthesized street */
  const AREAS = [
    { name: "Menteng", city: "Jakarta Pusat", lat: -6.196, lng: 106.832, streets: ["Jl. HOS Cokroaminoto", "Jl. Sutan Syahrir", "Jl. Teuku Umar"] },
    { name: "Tanah Abang", city: "Jakarta Pusat", lat: -6.186, lng: 106.812, streets: ["Jl. K.H. Mas Mansyur", "Jl. Kebon Kacang", "Jl. Jati Baru"] },
    { name: "Kebayoran Baru", city: "Jakarta Selatan", lat: -6.244, lng: 106.800, streets: ["Jl. Senopati", "Jl. Wijaya", "Jl. Suryo"] },
    { name: "Kebon Jeruk", city: "Jakarta Barat", lat: -6.190, lng: 106.772, streets: ["Jl. Perjuangan", "Jl. Panjang", "Jl. Arjuna Utara"] },
    { name: "Grogol", city: "Jakarta Barat", lat: -6.166, lng: 106.789, streets: ["Jl. Kyai Tapa", "Jl. Daan Mogot", "Jl. S. Parman"] },
    { name: "Pluit", city: "Jakarta Utara", lat: -6.124, lng: 106.790, streets: ["Jl. Pluit Indah Raya", "Jl. Pluit Selatan", "Jl. Pluit Permai"] },
    { name: "Kelapa Gading", city: "Jakarta Utara", lat: -6.158, lng: 106.906, streets: ["Jl. Boulevard Raya", "Jl. Kelapa Nias", "Jl. Boulevard Barat"] },
    { name: "Cawang", city: "Jakarta Timur", lat: -6.242, lng: 106.866, streets: ["Jl. Mayjen Sutoyo", "Jl. D.I. Panjaitan", "Jl. Otista Raya"] },
  ];
  function reverseGeocode(lat, lng) {
    let best = AREAS[0], bd = Infinity;
    AREAS.forEach((a) => { const d = (a.lat - lat) ** 2 + (a.lng - lng) ** 2; if (d < bd) { bd = d; best = a; } });
    const h = Math.abs(Math.round((lat * 1000 + lng * 1000)));
    const street = best.streets[h % best.streets.length];
    const no = (h % 90) + 1;
    return { city: best.city, address: `${street} No. ${no}, ${best.name}, ${best.city}` };
  }

  const amberPinSVG = `<svg width="32" height="42" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,.55))"><path d="M12 0C5.4 0 0 5.4 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.4 18.6 0 12 0z" fill="#F5A623"/><circle cx="12" cy="12" r="4.5" fill="#0A0A0A"/></svg>`;

  /* ---------- Map field ---------- */
  function MapField({ hasPin, onPlace, mode }) {
    const elRef = React.useRef(null);
    const mapRef = React.useRef(null);
    const markerRef = React.useRef(null);

    React.useEffect(() => {
      if (!window.L || !elRef.current || mapRef.current) return;
      const map = window.L.map(elRef.current, { zoomControl: true, attributionControl: false, scrollWheelZoom: false }).setView([-6.2088, 106.8200], 12);
      window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom: 19, subdomains: "abcd" }).addTo(map);
      EXISTING.forEach((loc) => {
        window.L.circleMarker([loc.lat, loc.lng], { radius: 6, color: "#0A0A0A", weight: 2, fillColor: "#3B82F6", fillOpacity: 1 })
          .addTo(map).bindTooltip(loc.name, { direction: "top", offset: [0, -4] });
      });
      const icon = window.L.divIcon({ className: "ob-pin", html: amberPinSVG, iconSize: [32, 42], iconAnchor: [16, 42] });
      const place = (latlng) => {
        if (!markerRef.current) {
          markerRef.current = window.L.marker(latlng, { icon, draggable: true }).addTo(map);
          markerRef.current.on("dragend", () => { const p = markerRef.current.getLatLng(); onPlace(p.lat, p.lng); });
        } else markerRef.current.setLatLng(latlng);
        onPlace(latlng.lat, latlng.lng);
      };
      map.on("click", (e) => place(e.latlng));
      mapRef.current = map;
      setTimeout(() => map.invalidateSize(), 120);
      setTimeout(() => map.invalidateSize(), 420);
      return () => { map.remove(); mapRef.current = null; markerRef.current = null; };
    }, []);

    React.useEffect(() => { if (mapRef.current) setTimeout(() => mapRef.current.invalidateSize(), 120); }, [mode]);

    return (
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
        <div ref={elRef} style={{ height: 300, width: "100%", background: "#0c0d0e" }} />
        {/* instruction overlay */}
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 500, display: "flex", justifyContent: "center", pointerEvents: "none", opacity: hasPin ? 0 : 1, transition: "opacity 200ms" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(10,10,10,.86)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", borderRadius: 999, padding: "8px 14px", maxWidth: "100%" }}>
            <Icon name="hand-pointer" size={15} color="#F5A623" />
            <span style={{ fontSize: 12.5, color: "var(--text-primary)", lineHeight: 1.3 }}>Ketuk peta untuk menandai lokasi fasilitas Anda</span>
          </div>
        </div>
        {/* legend */}
        <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 500, display: "flex", gap: 12, background: "rgba(10,10,10,.82)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 11px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)" }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#3B82F6" }} />Lokasi SupaPark</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)" }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#F5A623" }} />Fasilitas Anda</span>
        </div>
      </div>
    );
  }

  /* ---------- Card shell ---------- */
  function Card({ children, style }) {
    return <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 18, padding: 24, ...style }}>{children}</div>;
  }

  /* ====================== SCREENS ====================== */
  function Step1({ form, errors, set, next, mode }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "obUp 360ms ease" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 14 }}>
          <BrandHeader size={mode === "desktop" ? "lg" : "md"} />
          <div>
            <h1 style={{ margin: 0, fontSize: mode === "desktop" ? 34 : 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Mulai dengan SupaPark</h1>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>Isi form singkat untuk memulai</p>
          </div>
        </div>
        <Progress step={1} />
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Field label="Nama Lengkap" error={errors.nama}>
              <TextInput value={form.nama} onChange={(v) => set("nama", v)} placeholder="Mis. Budi Santoso" icon="user" error={!!errors.nama} />
            </Field>
            <Field label="Email" error={errors.email}>
              <TextInput type="email" inputMode="email" value={form.email} onChange={(v) => set("email", v)} placeholder="nama@email.com" icon="mail" error={!!errors.email} />
            </Field>
            <Field label="No. Handphone" error={errors.phone}>
              <TextInput type="tel" inputMode="tel" value={form.phone} onChange={(v) => set("phone", v)} placeholder="08xxxxxxxxxx" icon="phone" error={!!errors.phone} />
            </Field>
            <Field label="Nama Fasilitas" error={errors.facility}>
              <TextInput value={form.facility} onChange={(v) => set("facility", v)} placeholder="Mall / Gedung / Apartemen" icon="building-2" error={!!errors.facility} />
            </Field>
            <div style={{ marginTop: 4 }}>
              <PrimaryButton onClick={next}>Lanjutkan<Icon name="arrow-right" size={18} color="#0A0A0A" /></PrimaryButton>
            </div>
          </div>
        </Card>
        <div style={{ textAlign: "center", fontSize: 14, color: "var(--text-secondary)" }}>
          Sudah terdaftar? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#F5A623", fontWeight: 600, textDecoration: "none" }}>Hubungi kami</a>
        </div>
      </div>
    );
  }

  function Step2({ form, errors, set, hasPin, onPlace, back, submit, mode }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22, animation: "obUp 360ms ease" }}>
        <div style={{ textAlign: "center" }}><BrandHeader size="md" /></div>
        <Progress step={2} />
        {/* pre-filled header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(245,166,35,.06)", border: "1px solid rgba(245,166,35,.25)", borderRadius: 12, padding: "12px 16px" }}>
          <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 10, background: "rgba(245,166,35,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="building-2" size={19} color="#F5A623" />
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".06em" }}>Fasilitas</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.facility || "Fasilitas Anda"}</div>
          </div>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#22C55E", flexShrink: 0 }}><Icon name="check" size={14} color="#22C55E" />Langkah 1</span>
        </div>

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Field label="Kota" error={errors.kota}>
              <TextInput value={form.kota} onChange={(v) => set("kota", v)} placeholder="Mis. Jakarta Selatan" icon="map-pin" error={!!errors.kota} />
            </Field>

            <Field label="Lokasi Fasilitas" hint="Ketuk peta untuk menandai — alamat terisi otomatis">
              <MapField hasPin={hasPin} onPlace={onPlace} mode={mode} />
            </Field>

            <Field label="Alamat" error={errors.alamat} hint={!form.alamat ? "Terisi otomatis dari titik peta" : null}>
              <TextInput value={form.alamat} onChange={(v) => set("alamat", v)} placeholder="Alamat lengkap fasilitas" icon="navigation" error={!!errors.alamat} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Jalur Masuk" error={errors.lanesIn}>
                <NumberInput value={form.lanesIn} onChange={(v) => set("lanesIn", v)} placeholder="0" error={!!errors.lanesIn} />
              </Field>
              <Field label="Jalur Keluar" error={errors.lanesOut}>
                <NumberInput value={form.lanesOut} onChange={(v) => set("lanesOut", v)} placeholder="0" error={!!errors.lanesOut} />
              </Field>
            </div>

            <Field label="Sistem Saat Ini" error={errors.system}>
              <SelectInput value={form.system} onChange={(v) => set("system", v)} placeholder="Pilih sistem parkir saat ini" error={!!errors.system}
                options={["Manual", "Boom Gate", "Tiket", "RFID", "Lainnya"]} />
            </Field>

            <Field label="Volume Harian" error={errors.volume}>
              <NumberInput value={form.volume} onChange={(v) => set("volume", v)} placeholder="Estimasi kendaraan/hari" error={!!errors.volume} />
            </Field>

            <Field label="Tanggal Demo Diinginkan" error={errors.demoDate}>
              <DateInput value={form.demoDate} onChange={(v) => set("demoDate", v)} error={!!errors.demoDate} />
            </Field>

            <Field label="Catatan Tambahan" optional>
              <TextArea value={form.notes} onChange={(v) => set("notes", v)} placeholder="Kebutuhan khusus, jam operasional, dll." />
            </Field>

            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <div style={{ width: 96, flexShrink: 0 }}><OutlineButton onClick={back}><Icon name="arrow-left" size={18} color="var(--text-primary)" /></OutlineButton></div>
              <PrimaryButton onClick={submit}>Kirim Pendaftaran<Icon name="send" size={17} color="#0A0A0A" /></PrimaryButton>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  function Success({ form, reset, mode }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center", animation: "obUp 360ms ease", paddingTop: mode === "desktop" ? 20 : 8 }}>
        <BrandHeader size="md" />
        <SuccessCheck size={mode === "desktop" ? 128 : 112} />
        <div>
          <h1 style={{ margin: 0, fontSize: mode === "desktop" ? 32 : 26, fontWeight: 700, color: "var(--text-primary)" }}>Pendaftaran Berhasil!</h1>
          <p style={{ margin: "10px auto 0", fontSize: 15, color: "var(--text-secondary)", maxWidth: 340, lineHeight: 1.6 }}>Tim kami akan menghubungi Anda dalam 1×24 jam untuk menjadwalkan demo.</p>
        </div>
        <Card style={{ width: "100%", textAlign: "left", padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-tertiary)", marginBottom: 14 }}>Ringkasan Pendaftaran</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { ic: "user", k: "Nama", v: form.nama },
              { ic: "building-2", k: "Fasilitas", v: form.facility },
              { ic: "map-pin", k: "Kota", v: form.kota },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 2 ? "1px solid var(--border-faint)" : "none" }}>
                <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8, background: "var(--surface-overlay)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={r.ic} size={15} color="var(--text-tertiary)" /></span>
                <span style={{ fontSize: 13, color: "var(--text-tertiary)", width: 72 }}>{r.k}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ width: "100%" }}><OutlineButton onClick={reset}><Icon name="home" size={18} color="var(--text-primary)" />Kembali ke Beranda</OutlineButton></div>
      </div>
    );
  }

  /* ====================== ROOT ====================== */
  const BLANK = { nama: "", email: "", phone: "", facility: "", kota: "", alamat: "", lanesIn: "", lanesOut: "", system: "", volume: "", demoDate: "", notes: "" };

  function validate1(f) {
    const e = {};
    if (!f.nama.trim()) e.nama = "Nama lengkap wajib diisi";
    if (!f.email.trim()) e.email = "Email wajib diisi";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Format email tidak valid";
    if (!f.phone.trim()) e.phone = "No. handphone wajib diisi";
    else if (!/^08[0-9]{8,12}$/.test(f.phone)) e.phone = "Gunakan format 08xxxxxxxxxx";
    if (!f.facility.trim()) e.facility = "Nama fasilitas wajib diisi";
    return e;
  }
  function validate2(f) {
    const e = {};
    if (!f.kota.trim()) e.kota = "Kota wajib diisi";
    if (!f.alamat.trim()) e.alamat = "Tandai lokasi pada peta atau isi alamat";
    if (!f.lanesIn || +f.lanesIn < 1) e.lanesIn = "Min. 1 jalur";
    if (!f.lanesOut || +f.lanesOut < 1) e.lanesOut = "Min. 1 jalur";
    if (!f.system) e.system = "Pilih sistem saat ini";
    if (!f.volume || +f.volume < 1) e.volume = "Estimasi volume wajib diisi";
    if (!f.demoDate) e.demoDate = "Pilih tanggal demo";
    return e;
  }

  function App() {
    const [mode, setMode] = React.useState("mobile");
    const [step, setStep] = React.useState(1);
    const [form, setForm] = React.useState(BLANK);
    const [errors, setErrors] = React.useState({});
    const [hasPin, setHasPin] = React.useState(false);

    const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e)); };

    const onPlace = React.useCallback((lat, lng) => {
      const g = reverseGeocode(lat, lng);
      setHasPin(true);
      setForm((f) => ({ ...f, kota: g.city, alamat: g.address }));
      setErrors((e) => ({ ...e, kota: undefined, alamat: undefined }));
    }, []);

    const next = () => { const e = validate1(form); setErrors(e); if (Object.keys(e).length === 0) { setStep(2); scrollTop(); } };
    const submit = () => { const e = validate2(form); setErrors(e); if (Object.keys(e).length === 0) { setStep(3); scrollTop(); } };
    const back = () => { setStep(1); setErrors({}); scrollTop(); };
    const reset = () => { setForm(BLANK); setErrors({}); setHasPin(false); setStep(1); scrollTop(); };
    const scrollTop = () => { const s = document.querySelector(".ob-scroll"); if (s) s.scrollTop = 0; };

    React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    const contentMax = mode === "desktop" ? (step === 2 ? 760 : 560) : 380;

    return (
      <div style={{ minHeight: "100vh", background: "var(--surface-base)" }}>
        <div className="ob-scroll" style={{ minHeight: "100vh", maxHeight: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: mode === "desktop" ? "40px 24px 80px" : "20px 16px 64px" }}>
          {/* browser url chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "7px 14px", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 999, fontSize: 12.5, color: "var(--text-tertiary)" }}>
            <Icon name="lock" size={12} color="var(--text-tertiary)" />
            <span style={{ fontFamily: "var(--font-mono)" }}>supapark.id/onboarding</span>
          </div>
          <div style={{ width: "100%", maxWidth: contentMax, transition: "max-width 200ms" }}>
            {step === 1 && <Step1 form={form} errors={errors} set={set} next={next} mode={mode} />}
            {step === 2 && <Step2 form={form} errors={errors} set={set} hasPin={hasPin} onPlace={onPlace} back={back} submit={submit} mode={mode} />}
            {step === 3 && <Success form={form} reset={reset} mode={mode} />}
          </div>
        </div>

        {/* viewport toggle */}
        <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 2000, display: "flex", gap: 3, padding: 4, background: "rgba(26,26,26,.92)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}>
          {[["mobile", "smartphone", "375"], ["desktop", "monitor", "1024"]].map(([m, ic, lbl]) => (
            <button key={m} onClick={() => setMode(m)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, background: mode === m ? "#F5A623" : "transparent", color: mode === m ? "#0A0A0A" : "var(--text-secondary)" }}>
              <Icon name={ic} size={15} color={mode === m ? "#0A0A0A" : "var(--text-secondary)"} />{lbl}
            </button>
          ))}
        </div>
      </div>
    );
  }

  window.OB_App = App;
})();
