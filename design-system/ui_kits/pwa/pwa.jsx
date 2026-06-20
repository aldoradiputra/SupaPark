/* SupaPark Parking PWA — visitor mobile web app (375px).
   Scan QR on a pillar → link plate → prepay before the exit gate.
   Bahasa Indonesia. window.PWA_App */
(function () {
  const C = {
    bg: "#0A0A0A", card: "#111111", overlay: "#1A1A1A", elevated: "#222222",
    border: "#2A2A2A", borderFaint: "rgba(255,255,255,.06)",
    text: "#F5F5F0", sub: "#A3A39A", faint: "#666660",
    amber: "#F5A623", amberHover: "#FFB830", green: "#00FF88", red: "#FF3333",
    ui: "var(--font-ui)", mono: "var(--font-mono)",
  };

  function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75, style }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (el && window.lucide) {
        el.innerHTML = "";
        const i = document.createElement("i");
        i.setAttribute("data-lucide", name);
        el.appendChild(i);
        window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, "stroke-width": strokeWidth }, nameAttr: "data-lucide" });
      }
    });
    return <span ref={ref} style={{ display: "inline-flex", width: size, height: size, flexShrink: 0, ...style }} />;
  }

  /* ---------- deterministic QR ---------- */
  function QRCode({ size = 220 }) {
    const N = 25;
    const cells = [];
    let seed = 13;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { if (finder(r, c)) continue; if (rnd() > 0.5) cells.push([r, c]); }
    const Eye = ({ x, y }) => (<g><rect x={x} y={y} width="7" height="7" fill="#000" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" fill="#000" /></g>);
    return (
      <div style={{ background: "#fff", borderRadius: 14, padding: 14, display: "inline-block" }}>
        <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges">
          <rect width={N} height={N} fill="#fff" />
          {cells.map(([r, c], i) => <rect key={i} x={c} y={r} width="1" height="1" fill="#000" />)}
          <Eye x={0} y={0} /><Eye x={N - 7} y={0} /><Eye x={0} y={N - 7} />
        </svg>
      </div>
    );
  }

  /* ---------- fee model ---------- */
  function feeFor(minutes) {
    const hrs = Math.max(1, Math.ceil(minutes / 60));
    return 5000 + (hrs - 1) * 3000;
  }
  function rupiah(n) { return "Rp " + n.toLocaleString("id-ID"); }
  function durText(minutes) {
    const h = Math.floor(minutes / 60), m = minutes % 60;
    if (h === 0) return `${m} menit`;
    return `${h} jam ${m} menit`;
  }

  /* ---------- buttons ---------- */
  function PrimaryBtn({ children, onClick, color = C.amber, textColor = "#0A0A0A" }) {
    const [h, setH] = React.useState(false);
    return (
      <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ width: "100%", minHeight: 54, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
          background: h ? "#FFB830" : color, color: textColor, border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
          fontFamily: C.ui, cursor: "pointer", transition: "background 140ms", padding: "0 18px" }}>
        {children}
      </button>
    );
  }

  /* ---------- plate input ---------- */
  function PlateInput({ value, onChange, error }) {
    const [f, setF] = React.useState(false);
    return (
      <input value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} onFocus={() => setF(true)} onBlur={() => setF(false)}
        placeholder="B 1234 ABC"
        style={{ width: "100%", height: 56, padding: "0 16px", boxSizing: "border-box", textAlign: "center",
          background: C.bg, color: C.amber, border: `1px solid ${error ? C.red : f ? C.amber : C.border}`, borderRadius: 12,
          fontFamily: C.mono, fontSize: 24, fontWeight: 700, letterSpacing: "0.12em",
          boxShadow: `0 0 0 3px ${error ? "rgba(255,51,51,.16)" : f ? "rgba(245,166,35,.18)" : "transparent"}`,
          outline: "none", transition: "border-color 140ms, box-shadow 140ms" }} />
    );
  }
  function PhoneInput({ value, onChange, error }) {
    const [f, setF] = React.useState(false);
    return (
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="phone" size={17} color={f ? C.amber : C.faint} /></span>
        <input value={value} onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))} onFocus={() => setF(true)} onBlur={() => setF(false)}
          type="tel" inputMode="tel" placeholder="08xxxxxxxxxx"
          style={{ width: "100%", height: 52, padding: "0 14px 0 42px", boxSizing: "border-box",
            background: C.bg, color: C.text, border: `1px solid ${error ? C.red : f ? C.amber : C.border}`, borderRadius: 12,
            fontFamily: C.ui, fontSize: 16, boxShadow: `0 0 0 3px ${error ? "rgba(255,51,51,.16)" : f ? "rgba(245,166,35,.18)" : "transparent"}`,
            outline: "none", transition: "border-color 140ms, box-shadow 140ms" }} />
      </div>
    );
  }

  function Field({ label, error, children }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{label}</label>
        {children}
        {error && <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.red }}><Icon name="alert-circle" size={14} color={C.red} />{error}</div>}
      </div>
    );
  }

  function PlatePill({ plate, size = 20 }) {
    return <span style={{ fontFamily: C.mono, fontWeight: 700, color: C.amber, letterSpacing: "0.1em", fontSize: size }}>{plate}</span>;
  }

  function Logo({ size = 22, withWord = true }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="10" height="32" rx="3" fill={C.amber} /><path d="M20 8h10a10 10 0 0 1 0 20H20" stroke={C.amber} strokeWidth="8" strokeLinecap="round" fill="none" /></svg>
        {withWord && <span style={{ fontSize: size * 0.62, fontWeight: 800, letterSpacing: ".12em", color: C.text }}>SUPAPARK</span>}
      </span>
    );
  }

  /* ====================== SCREENS ====================== */

  /* 1. Landing / Link plate */
  function Landing({ go, state, set }) {
    const [plate, setPlate] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [err, setErr] = React.useState({});
    const submit = () => {
      const e = {};
      if (!/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/.test(plate.trim())) e.plate = "Masukkan plat yang valid (mis. B 1234 ABC)";
      if (!/^08\d{8,12}$/.test(phone)) e.phone = "Gunakan format 08xxxxxxxxxx";
      setErr(e);
      if (Object.keys(e).length === 0) { set({ plate: plate.trim() }); go("session"); }
    };
    return (
      <ScreenScroll>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}><Logo size={20} /></div>
        {/* location chip */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.overlay, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 14px", fontSize: 13, color: C.text }}>
            <Icon name="map-pin" size={14} color={C.amber} />{state.location}
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: 22 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: C.text }}>Hubungkan Plat Anda</h1>
          <p style={{ margin: "8px 16px 0", fontSize: 14.5, color: C.sub, lineHeight: 1.5 }}>Satu kali saja — berlaku di semua lokasi SupaPark</p>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 20, marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="Nomor Plat" error={err.plate}><PlateInput value={plate} onChange={setPlate} error={!!err.plate} /></Field>
          <Field label="No. Handphone" error={err.phone}><PhoneInput value={phone} onChange={setPhone} error={!!err.phone} /></Field>
          <PrimaryBtn onClick={submit}>Hubungkan<Icon name="arrow-right" size={18} color="#0A0A0A" /></PrimaryBtn>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.sub }}>
          Sudah terhubung? <a href="#" onClick={(e) => { e.preventDefault(); set({ plate: "B 1234 ABC" }); go("session"); }} style={{ color: C.amber, fontWeight: 600, textDecoration: "none" }}>Cek sesi Anda</a>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 22, padding: "12px 14px", background: "rgba(245,166,35,.05)", border: "1px solid rgba(245,166,35,.18)", borderRadius: 12 }}>
          <Icon name="shield-check" size={16} color={C.amber} style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.5 }}>Plat & nomor Anda aman. Digunakan hanya untuk verifikasi parkir.</span>
        </div>
      </ScreenScroll>
    );
  }

  /* 2. Active session */
  function Session({ go, state }) {
    const [mins, setMins] = React.useState(135);
    React.useEffect(() => {
      const base = Date.now();
      const id = setInterval(() => setMins(135 + Math.floor((Date.now() - base) / 60000)), 1000);
      // tick seconds for live feel via re-render
      return () => clearInterval(id);
    }, []);
    const [sec, setSec] = React.useState(0);
    React.useEffect(() => { const id = setInterval(() => setSec((s) => (s + 1) % 60), 1000); return () => clearInterval(id); }, []);
    const fee = feeFor(mins);
    return (
      <ScreenScroll>
        <TopBar onBack={() => go("landing")} title="Sesi Aktif" right={<button onClick={() => go("history")} style={iconBtn}><Icon name="history" size={18} color={C.sub} /></button>} />
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(0,255,136,.1)", marginBottom: 14 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pwaPulse 1.6s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>Sedang Parkir</span>
          </div>
          <div><PlatePill plate={state.plate} size={34} /></div>
          <div style={{ marginTop: 8, fontSize: 14, color: C.text, fontWeight: 600 }}>{state.location}</div>
          <div style={{ fontSize: 12.5, color: C.faint, marginTop: 2 }}>{state.address}</div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 4, marginTop: 22 }}>
          <Row icon="log-in" label="Waktu Masuk" value="14:35 WIB, 14 Jun 2026" />
          <Row icon="timer" label="Durasi" value={<span style={{ fontFamily: C.mono }}>{durText(mins)} {String(sec).padStart(2, "0")}s</span>} live />
          {/* current fee highlight */}
          <div style={{ padding: "16px 16px", borderTop: `1px solid ${C.borderFaint}` }}>
            <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>Biaya Saat Ini</div>
            <div style={{ fontFamily: C.ui, fontSize: 40, fontWeight: 800, color: C.amber, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{rupiah(fee)}</div>
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.borderFaint}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Icon name="receipt-text" size={15} color={C.faint} style={{ marginTop: 2 }} />
            <span style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.5 }}>Tarif: Rp 5.000/jam pertama, Rp 3.000/jam berikutnya</span>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryBtn onClick={() => go("payment")}>Bayar Sekarang — {rupiah(fee)}</PrimaryBtn>
          <p style={{ textAlign: "center", margin: "12px 8px 0", fontSize: 12.5, color: C.sub, lineHeight: 1.5 }}>Bayar sebelum keluar untuk melewati gerbang lebih cepat</p>
        </div>
      </ScreenScroll>
    );
  }

  /* 3. Payment QRIS */
  function Payment({ go, state }) {
    const fee = feeFor(135);
    const [t, setT] = React.useState(300);
    React.useEffect(() => { const id = setInterval(() => setT((x) => (x > 0 ? x - 1 : 0)), 1000); return () => clearInterval(id); }, []);
    const mm = Math.floor(t / 60), ss = String(t % 60).padStart(2, "0");
    return (
      <ScreenScroll>
        <TopBar onBack={() => go("session")} title="Pembayaran" />
        {/* compact plate + fee */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 16px", marginTop: 12 }}>
          <div><div style={{ fontSize: 12, color: C.faint }}>Plat</div><PlatePill plate={state.plate} size={18} /></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: C.faint }}>Total</div><div style={{ fontFamily: C.ui, fontSize: 22, fontWeight: 800, color: C.amber }}>{rupiah(fee)}</div></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 26 }}>
          <button onClick={() => go("success")} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
            <QRCode size={208} />
          </button>
          <div style={{ marginTop: 18, fontSize: 16, fontWeight: 700, color: C.text }}>Scan QR atau ketuk untuk bayar</div>
          <div style={{ marginTop: 6, fontSize: 13, color: C.sub }}>QRIS · GoPay · OVO · Dana · ShopeePay</div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: C.overlay, border: `1px solid ${C.border}` }}>
            <Icon name="clock" size={15} color={t < 60 ? C.red : C.amber} />
            <span style={{ fontSize: 14, color: C.text }}>Berlaku <span style={{ fontFamily: C.mono, fontWeight: 700, color: t < 60 ? C.red : C.text }}>{mm}:{ss}</span> menit</span>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); go("session"); }} style={{ color: C.sub, fontSize: 15, textDecoration: "none" }}>Batal</a>
        </div>
      </ScreenScroll>
    );
  }

  /* 4. Payment success */
  function Success({ go }) {
    const fee = feeFor(135);
    return (
      <ScreenScroll center>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(0,255,136,.12)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pwaPop 520ms cubic-bezier(.2,.8,.2,1)" }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(0,255,136,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="52" height="52" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke={C.green} strokeWidth="3" /><path d="M15 27 l8 8 l15 -16" fill="none" stroke={C.green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: C.text }}>Pembayaran Berhasil!</h1>
            <div style={{ marginTop: 14, fontFamily: C.ui, fontSize: 44, fontWeight: 800, color: C.green }}>{rupiah(fee)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", margin: "0 8px" }}>
            <Icon name="door-open" size={20} color={C.amber} />
            <span style={{ fontSize: 13.5, color: C.text, textAlign: "left", lineHeight: 1.5 }}>Gerbang keluar akan terbuka otomatis saat Anda tiba</span>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <PrimaryBtn onClick={() => go("history")}>Selesai</PrimaryBtn>
        </div>
      </ScreenScroll>
    );
  }

  /* 5. Session history */
  const HISTORY = [
    { loc: "Plaza Yogyakarta", date: "14 Jun 2026", dur: "2 jam 15 menit", amount: 11000, status: "paid" },
    { loc: "Malioboro Mall", date: "10 Jun 2026", dur: "1 jam 30 menit", amount: 8000, status: "paid" },
    { loc: "RS Sardjito", date: "5 Jun 2026", dur: "0 jam 45 menit", amount: 5000, status: "unpaid" },
    { loc: "Hartono Mall", date: "28 Mei 2026", dur: "3 jam 10 menit", amount: 14000, status: "paid" },
    { loc: "Plaza Yogyakarta", date: "21 Mei 2026", dur: "1 jam 05 menit", amount: 8000, status: "paid" },
  ];
  function History({ go, empty }) {
    const data = empty ? [] : HISTORY;
    return (
      <ScreenScroll>
        <TopBar onBack={() => go("landing")} title="Riwayat Parkir" />
        {data.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: C.overlay, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <Icon name="receipt-text" size={30} color={C.faint} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>Belum ada riwayat</div>
            <div style={{ fontSize: 13.5, color: C.sub, marginTop: 6, maxWidth: 240, lineHeight: 1.5 }}>Sesi parkir Anda akan muncul di sini setelah pembayaran pertama.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {data.map((s, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{s.loc}</div>
                    <div style={{ fontSize: 12.5, color: C.faint, marginTop: 3 }}>{s.date}</div>
                  </div>
                  <StatusPill status={s.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderFaint}` }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.sub }}><Icon name="timer" size={14} color={C.faint} />{s.dur}</span>
                  <span style={{ fontFamily: C.ui, fontSize: 16, fontWeight: 700, color: C.text }}>{rupiah(s.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScreenScroll>
    );
  }

  function StatusPill({ status }) {
    const paid = status === "paid";
    const color = paid ? C.green : C.red;
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, background: color + "1f", color, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />{paid ? "Lunas" : "Belum Bayar"}
      </span>
    );
  }

  /* ---------- shared ---------- */
  const iconBtn = { width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer" };
  function TopBar({ onBack, title, right }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <button onClick={onBack} style={iconBtn}><Icon name="arrow-left" size={18} color={C.sub} /></button>
        <h2 style={{ margin: 0, flex: 1, fontSize: 18, fontWeight: 700, color: C.text }}>{title}</h2>
        {right}
      </div>
    );
  }
  function Row({ icon, label, value, live }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px" }}>
        <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: C.overlay, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={16} color={C.faint} /></span>
        <span style={{ fontSize: 13, color: C.sub, flex: 1 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 7 }}>
          {live && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pwaPulse 1.6s ease-in-out infinite" }} />}
          {value}
        </span>
      </div>
    );
  }
  function ScreenScroll({ children, center }) {
    return (
      <div className="pwa-scroll" style={{ height: "100%", overflowY: "auto", padding: "12px 18px 24px", display: "flex", flexDirection: "column", justifyContent: center ? "center" : "flex-start" }}>
        {children}
      </div>
    );
  }

  /* ====================== PHONE + ROUTER ====================== */
  function App() {
    const [screen, setScreen] = React.useState("landing");
    const [emptyHistory, setEmptyHistory] = React.useState(false);
    const [state, setState] = React.useState({ plate: "B 1234 ABC", location: "Plaza Yogyakarta", address: "Jl. Malioboro No. 52, Yogyakarta" });
    const set = (patch) => setState((s) => ({ ...s, ...patch }));
    const go = (s) => { setScreen(s); const el = document.querySelector(".pwa-scroll"); if (el) el.scrollTop = 0; };
    React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    const SCREENS = [
      ["landing", "Hubungkan", "link"],
      ["session", "Sesi Aktif", "car"],
      ["payment", "Bayar (QRIS)", "qr-code"],
      ["success", "Berhasil", "check-circle"],
      ["history", "Riwayat", "history"],
    ];

    let content;
    if (screen === "landing") content = <Landing go={go} state={state} set={set} />;
    else if (screen === "session") content = <Session go={go} state={state} />;
    else if (screen === "payment") content = <Payment go={go} state={state} />;
    else if (screen === "success") content = <Success go={go} />;
    else content = <History go={go} empty={emptyHistory} />;

    return (
      <div style={{ minHeight: "100vh", background: "#070707", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, padding: 30, flexWrap: "wrap" }}>
        {/* phone */}
        <div style={{ position: "relative", width: 375, height: 812, background: C.bg, borderRadius: 44, border: "11px solid #1a1a1a", overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,.6)", display: "flex", flexDirection: "column" }}>
          {/* status bar */}
          <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "relative", zIndex: 5 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>9:41</span>
            <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", width: 110, height: 26, background: "#000", borderRadius: 14 }} />
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Icon name="signal" size={15} color={C.text} /><Icon name="wifi" size={15} color={C.text} /><Icon name="battery-full" size={17} color={C.text} /></span>
          </div>
          {/* content */}
          <div style={{ flex: 1, minHeight: 0 }}>{content}</div>
          {/* home indicator */}
          <div style={{ height: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 134, height: 5, borderRadius: 3, background: "#3a3a3a" }} />
          </div>
        </div>

        {/* screen navigator */}
        <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.faint, marginBottom: 2 }}>Layar PWA</div>
          {SCREENS.map(([key, label, ic]) => {
            const on = screen === key;
            return (
              <button key={key} onClick={() => go(key)}
                style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", borderRadius: 10, border: `1px solid ${on ? C.amber : C.border}`, background: on ? "rgba(245,166,35,.08)" : C.card, color: on ? C.amber : C.sub, fontSize: 14, fontWeight: on ? 600 : 500, fontFamily: C.ui, cursor: "pointer", textAlign: "left" }}>
                <Icon name={ic} size={17} color={on ? C.amber : C.faint} />{label}
              </button>
            );
          })}
          <div style={{ height: 1, background: C.border, margin: "8px 0" }} />
          <button onClick={() => { setEmptyHistory((e) => !e); go("history"); }}
            style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 13px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.sub, fontSize: 13, fontFamily: C.ui, cursor: "pointer" }}>
            <Icon name="repeat" size={15} color={C.faint} />Riwayat: {emptyHistory ? "kosong" : "terisi"}
          </button>
        </div>
      </div>
    );
  }

  window.PWA_App = App;
})();
