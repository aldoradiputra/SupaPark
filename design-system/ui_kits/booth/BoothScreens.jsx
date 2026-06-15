/* SupaPark — Booth Kiosk Screens
   Ultra-contrast pure-black kiosk UI for the 7" 1024×600 lane display.
   All copy is Bahasa Indonesia. Palette: #000 bg, #FFF text, #999 secondary,
   #F5A623 amber, #00FF88 neon-success, #FF3333 error.
   Exposes BoothShell + every screen + BoothSimulator on window. */

const B = {
  bg: "#000000",
  text: "#FFFFFF",
  sub: "#999999",
  amber: "#F5A623",
  green: "#00FF88",
  red: "#FF3333",
  ui: "'Plus Jakarta Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

/* ---- keyframes (injected once) ---- */
(function injectBoothKeyframes() {
  if (typeof document === "undefined" || document.getElementById("booth-kf")) return;
  const s = document.createElement("style");
  s.id = "booth-kf";
  s.textContent = `
    @keyframes boothPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes boothScan{0%{top:8%}100%{top:92%}}
    @keyframes boothPop{0%{transform:scale(.7)}60%{transform:scale(1.06)}100%{transform:scale(1)}}
    @keyframes boothBlink{0%,100%{opacity:1}50%{opacity:.25}}
  `;
  document.head.appendChild(s);
})();

/* ---- Logo mark (barrier-gate P) ---- */
function Mark({ size = 96, color = B.amber }) {
  return (
    React.createElement("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none" },
      React.createElement("rect", { x: 10, y: 8, width: 10, height: 32, rx: 3, fill: color }),
      React.createElement("path", { d: "M20 8h10a10 10 0 0 1 0 20H20", stroke: color, strokeWidth: 8, strokeLinecap: "round", fill: "none" })
    )
  );
}

/* ---- Top status bar (small logo + location) ---- */
function TopBar({ location = "Mall Grand Indonesia", lane = "EXIT A" }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", borderBottom: "1px solid #1a1a1a" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Mark size={22} />
        <span style={{ fontFamily: B.ui, fontWeight: 700, fontSize: 14, letterSpacing: ".12em", color: B.amber }}>SUPAPARK</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: B.ui, fontSize: 13, color: B.sub }}>{location}</span>
        <span style={{ fontFamily: B.mono, fontSize: 12, color: B.sub, border: "1px solid #2a2a2a", borderRadius: 6, padding: "3px 8px", letterSpacing: ".08em" }}>{lane}</span>
      </div>
    </div>
  );
}

/* ---- Big plate ---- */
function Plate({ value, size = 56 }) {
  return (
    <div style={{ fontFamily: B.mono, fontWeight: 700, fontSize: size, color: B.text, letterSpacing: ".1em", lineHeight: 1, whiteSpace: "nowrap" }}>
      {value}
    </div>
  );
}

/* ---- Status icon disc (check / x) ---- */
function StatusIcon({ kind = "check", color = B.green, size = 132 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 ${size * 0.5}px ${color}55`, animation: "boothPop 420ms cubic-bezier(.2,.8,.2,1) both" }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none"
        stroke="#000" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {kind === "check"
          ? <path d="M5 13l4 4L19 7" />
          : <g><path d="M6 6l12 12" /><path d="M18 6L6 18" /></g>}
      </svg>
    </div>
  );
}

/* ---- Deterministic QR-like code (white card, black modules) ---- */
function QRCode({ size = 220 }) {
  const N = 25;
  // deterministic pseudo-random modules
  const cells = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const finder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (finder(r, c)) continue;
    if (rnd() > 0.5) cells.push([r, c]);
  }
  const FinderEye = ({ x, y }) => (
    <g>
      <rect x={x} y={y} width={7} height={7} fill="#000" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#000" />
    </g>
  );
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "inline-block" }}>
      <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges">
        <rect width={N} height={N} fill="#fff" />
        {cells.map(([r, c], i) => <rect key={i} x={c} y={r} width={1} height={1} fill="#000" />)}
        <FinderEye x={0} y={0} />
        <FinderEye x={N - 7} y={0} />
        <FinderEye x={0} y={N - 7} />
      </svg>
    </div>
  );
}

/* ---- Shell: the 1024×600 black frame ---- */
function BoothShell({ children, withBar = false, location, lane, glow }) {
  return (
    <div style={{ position: "relative", width: 1024, height: 600, background: B.bg,
      overflow: "hidden", fontFamily: B.ui, color: B.text,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {glow && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${glow}14 0%, transparent 60%)` }} />}
      {withBar && <TopBar location={location} lane={lane} />}
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center", paddingTop: withBar ? 56 : 0 }}>
        {children}
      </div>
    </div>
  );
}

/* ================= SCREENS ================= */

/* --- Idle (shared exit/entry) --- */
function IdleScreen() {
  return (
    <BoothShell>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
          <Mark size={104} />
          <span style={{ fontFamily: B.ui, fontWeight: 800, fontSize: 72, letterSpacing: ".12em", color: B.text }}>SUPAPARK</span>
        </div>
        <div style={{ marginTop: 44, fontSize: 26, color: B.sub, animation: "boothPulse 2.2s ease-in-out infinite" }}>
          Menunggu kendaraan…
        </div>
      </div>
    </BoothShell>
  );
}

/* --- Scanning (shared) --- */
function ScanningScreen() {
  return (
    <BoothShell withBar lane="LANE">
      <div style={{ position: "relative", width: 560, height: 320, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* scan frame */}
        <div style={{ position: "relative", width: 460, height: 220, border: "1px solid #1c1c1c", borderRadius: 14, overflow: "hidden", background: "#050505" }}>
          {/* corner brackets */}
          {[["8px","8px",null,null],[null,"8px","8px",null],["8px",null,null,"8px"],[null,null,"8px","8px"]].map((p,i)=>(
            <div key={i} style={{ position:"absolute", top:p[0], right:p[1], bottom:p[2], left:p[3], width:28, height:28,
              borderTop: p[0]?`3px solid ${B.amber}`:"none", borderRight:p[1]?`3px solid ${B.amber}`:"none",
              borderBottom:p[2]?`3px solid ${B.amber}`:"none", borderLeft:p[3]?`3px solid ${B.amber}`:"none", borderRadius:4 }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent, ${B.amber}, transparent)`,
            boxShadow: `0 0 16px ${B.amber}`, animation: "boothScan 1.6s ease-in-out infinite alternate" }} />
        </div>
        <div style={{ marginTop: 36, fontSize: 26, color: B.text, fontWeight: 600, animation: "boothPulse 1.4s ease-in-out infinite" }}>
          Memindai kendaraan…
        </div>
      </div>
    </BoothShell>
  );
}

/* --- Exit Payment (QRIS) --- */
function ExitPaymentScreen() {
  const [t, setT] = React.useState(45);
  React.useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  return (
    <BoothShell withBar lane="EXIT A">
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 56, alignItems: "center", padding: "0 56px", width: "100%" }}>
        {/* left */}
        <div>
          <div style={{ fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: B.sub, marginBottom: 12 }}>Total Pembayaran</div>
          <Plate value="B 1234 ABC" size={48} />
          <div style={{ fontSize: 15, color: B.sub, marginTop: 10 }}>Masuk 10:32 · 1 jam 47 menit · Mobil</div>
          <div style={{ fontSize: 80, fontWeight: 800, color: B.amber, marginTop: 18, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>Rp 15.000</div>
          <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: B.sub }}>Sisa waktu</span>
            <span style={{ fontFamily: B.mono, fontSize: 22, fontWeight: 700, color: B.text, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss}</span>
          </div>
        </div>
        {/* right: QR */}
        <div style={{ textAlign: "center" }}>
          <QRCode size={210} />
          <div style={{ marginTop: 16, fontSize: 22, fontWeight: 700, color: B.amber }}>Scan untuk bayar</div>
          <div style={{ marginTop: 4, fontSize: 14, color: B.sub }}>QRIS · GoPay · OVO · Dana</div>
        </div>
      </div>
    </BoothShell>
  );
}

/* --- Result template --- */
function ResultScreen({ icon, iconColor, title, titleColor, plate, footer }) {
  return (
    <BoothShell glow={iconColor}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StatusIcon kind={icon} color={iconColor} size={132} />
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: titleColor, marginTop: 30 }}>{title}</div>
        {plate && <div style={{ marginTop: 16 }}><Plate value={plate} size={40} /></div>}
        {footer && <div style={{ marginTop: 14, fontSize: 22, color: B.sub }}>{footer}</div>}
      </div>
    </BoothShell>
  );
}

function ExitSuccessScreen() {
  return <ResultScreen icon="check" iconColor={B.green} title="Pembayaran Berhasil" titleColor={B.green} plate="B 1234 ABC" footer="Terima Kasih" />;
}
function ExitMemberScreen() {
  return <ResultScreen icon="check" iconColor={B.amber} title="Member Terverifikasi" titleColor={B.amber} plate="B 1234 ABC" footer="Selamat Jalan" />;
}
function ErrorScreen() {
  return (
    <BoothShell glow={B.red}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StatusIcon kind="x" color={B.red} size={132} />
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: B.red, marginTop: 30 }}>Terjadi Kesalahan</div>
        <div style={{ marginTop: 16, fontSize: 22, color: B.sub, maxWidth: 560 }}>
          Plat tidak terdeteksi. Silakan hubungi petugas.
        </div>
        <div style={{ marginTop: 20, fontFamily: B.mono, fontSize: 18, color: B.text }}>0812-3456-7890</div>
      </div>
    </BoothShell>
  );
}

/* --- Entry success / member --- */
function InfoCell({ label, value, valueColor = B.text }) {
  return (
    <div style={{ background: "#0b0b0b", border: "1px solid #1c1c1c", borderRadius: 12, padding: "14px 18px" }}>
      <div style={{ fontSize: 13, color: B.sub, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: valueColor, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  );
}

function VehiclePill({ children, color = B.text }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
      borderRadius: 999, border: `1.5px solid ${color}`, color, fontSize: 16, fontWeight: 700, letterSpacing: ".04em" }}>
      {children}
    </span>
  );
}

function EntryScreen({ member }) {
  const accent = member ? B.amber : B.green;
  return (
    <BoothShell withBar lane="ENTRY A">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(380px,1fr) 1fr", gap: 40, alignItems: "center", padding: "0 48px", width: "100%" }}>
        {/* left */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StatusIcon kind="check" color={accent} size={96} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: accent, marginTop: 22 }}>Selamat Datang</div>
          <div style={{ marginTop: 18 }}><Plate value="B 1234 ABC" size={40} /></div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 10 }}>
            <VehiclePill color={B.text}>Mobil</VehiclePill>
            {member && <VehiclePill color={B.amber}>MEMBER</VehiclePill>}
          </div>
        </div>
        {/* right: info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <InfoCell label="Waktu Masuk" value="14:35 WIB" />
          {member
            ? <InfoCell label="Tarif" value="GRATIS" valueColor={B.green} />
            : <InfoCell label="Tarif" value="Rp 5.000/jam" />}
          <InfoCell label="Maks / hari" value="Rp 50.000" />
          <InfoCell label="Sisa Slot" value="142" valueColor={B.amber} />
        </div>
      </div>
    </BoothShell>
  );
}
function EntrySuccessScreen() { return <EntryScreen member={false} />; }
function EntryMemberScreen() { return <EntryScreen member />; }

/* ================= SIMULATOR ================= */
const SCREENS = {
  exit: [
    { id: "idle", label: "Idle", el: IdleScreen },
    { id: "scan", label: "Scanning", el: ScanningScreen },
    { id: "payment", label: "Payment (QRIS)", el: ExitPaymentScreen },
    { id: "success", label: "Success", el: ExitSuccessScreen },
    { id: "member", label: "Member", el: ExitMemberScreen },
    { id: "error", label: "Error", el: ErrorScreen },
  ],
  entry: [
    { id: "idle", label: "Idle", el: IdleScreen },
    { id: "scan", label: "Scanning", el: ScanningScreen },
    { id: "success", label: "Entry Success", el: EntrySuccessScreen },
    { id: "member", label: "Entry Member", el: EntryMemberScreen },
  ],
};

function BoothSimulator() {
  const [mode, setMode] = React.useState("exit");
  const [idx, setIdx] = React.useState(0);
  const list = SCREENS[mode];
  const Cur = list[Math.min(idx, list.length - 1)].el;

  const [scale, setScale] = React.useState(1);
  const holderRef = React.useRef(null);
  React.useEffect(() => {
    const fit = () => {
      if (!holderRef.current) return;
      const w = holderRef.current.clientWidth;
      setScale(Math.min(1, w / 1024));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const tab = (m, txt) => (
    <button onClick={() => { setMode(m); setIdx(0); }}
      style={{ fontFamily: B.ui, fontSize: 13, fontWeight: 700, letterSpacing: ".08em",
        padding: "9px 18px", borderRadius: 8, cursor: "pointer", border: "1px solid",
        textTransform: "uppercase",
        background: mode === m ? B.amber : "transparent",
        color: mode === m ? "#000" : B.sub,
        borderColor: mode === m ? B.amber : "#2a2a2a" }}>
      {txt}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", padding: "28px 24px 40px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 22, fontFamily: B.ui }}>
      {/* header */}
      <div style={{ width: "100%", maxWidth: 1024, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Mark size={28} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#F5F5F0", letterSpacing: ".04em" }}>Booth Kiosk</div>
            <div style={{ fontSize: 12, color: "#666660" }}>7" display · 1024 × 600 · Bahasa Indonesia</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>{tab("exit", "Exit")}{tab("entry", "Entry")}</div>
      </div>

      {/* device */}
      <div ref={holderRef} style={{ width: "100%", maxWidth: 1024, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 1024 * scale, height: 600 * scale }}>
          <div style={{ width: 1024, height: 600, transform: `scale(${scale})`, transformOrigin: "top left",
            borderRadius: 16, overflow: "hidden", border: "2px solid #1c1c1c",
            boxShadow: "0 30px 80px rgba(0,0,0,.6)" }}>
            <Cur />
          </div>
        </div>
      </div>

      {/* state selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 1024 }}>
        {list.map((s, i) => (
          <button key={s.id} onClick={() => setIdx(i)}
            style={{ fontFamily: B.ui, fontSize: 13, fontWeight: 600,
              padding: "8px 14px", borderRadius: 8, cursor: "pointer", border: "1px solid",
              background: i === idx ? "#1a1a1a" : "transparent",
              color: i === idx ? "#F5F5F0" : "#A3A39A",
              borderColor: i === idx ? "#F5A623" : "#2a2a2a" }}>
            <span style={{ color: "#666660", marginRight: 8, fontFamily: B.mono, fontSize: 11 }}>{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  BoothShell, IdleScreen, ScanningScreen, ExitPaymentScreen, ExitSuccessScreen,
  ExitMemberScreen, ErrorScreen, EntrySuccessScreen, EntryMemberScreen, BoothSimulator,
});
