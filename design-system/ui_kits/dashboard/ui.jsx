/* SupaPark Dashboard — shared UI primitives.
   Composes design-system components from window.SupaParkDesignSystem_80b640
   and Lucide icons. Exposes window.SPUI + window.SPIcon. */

const _DS = window.SupaParkDesignSystem_80b640;

/* ---------- Lucide icon ---------- */
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.75, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (el && window.lucide) {
      el.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      el.appendChild(i);
      window.lucide.createIcons({
        attrs: { width: size, height: size, stroke: color, "stroke-width": strokeWidth },
        nameAttr: "data-lucide",
      });
    }
  });
  return <span ref={ref} style={{ display: "inline-flex", width: size, height: size, flexShrink: 0, ...style }} />;
}
window.SPIcon = Icon;

/* ---------- CRM taxonomy colors (category, not brand) ---------- */
const CAT = {
  blue: "#3B82F6", amber: "#F5A623", green: "#22C55E",
  purple: "#A855F7", red: "#EF4444", orange: "#F97316",
};
const LEAD_STATUS = {
  new: { c: "blue", en: "New", id: "Baru" },
  contacted: { c: "amber", en: "Contacted", id: "Dihubungi" },
  qualified: { c: "green", en: "Qualified", id: "Terkualifikasi" },
  converted: { c: "purple", en: "Converted", id: "Dikonversi" },
  lost: { c: "red", en: "Lost", id: "Hilang" },
};
const PROJECT_STATUS = {
  planning: { c: "blue", en: "Planning", id: "Perencanaan" },
  procurement: { c: "amber", en: "Procurement", id: "Pengadaan" },
  installation: { c: "orange", en: "Installation", id: "Pemasangan" },
  testing: { c: "purple", en: "Testing", id: "Pengujian" },
  live: { c: "green", en: "Live", id: "Aktif" },
};

/* ---------- Status pill (CRM) ---------- */
function StatusPill({ kind, value, locale = "id", size = "md" }) {
  const map = kind === "lead" ? LEAD_STATUS : PROJECT_STATUS;
  const cfg = map[value] || { c: "blue", en: value, id: value };
  const color = CAT[cfg.c];
  const pad = size === "lg" ? "5px 14px" : "2px 9px";
  const fs = size === "lg" ? 14 : 12;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: pad,
      borderRadius: 999, fontSize: fs, fontWeight: 600, lineHeight: 1.4,
      color, background: color + "1f", whiteSpace: "nowrap" }}>
      <span style={{ width: size === "lg" ? 7 : 6, height: size === "lg" ? 7 : 6, borderRadius: "50%", background: color }} />
      {cfg[locale] || cfg.en}
    </span>
  );
}

/* ---------- Page header ---------- */
function PageHeader({ title, sub, actions, back }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        {back && (
          <button onClick={back} aria-label="Back"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-secondary)", cursor: "pointer", flexShrink: 0 }}>
            <Icon name="arrow-left" size={18} color="var(--text-secondary)" />
          </button>
        )}
        <div style={{ minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>{title}</h1>
          {sub && <div style={{ marginTop: 4, fontSize: 13, color: "var(--text-secondary)" }}>{sub}</div>}
        </div>
      </div>
      {actions && <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

/* ---------- Stat card ---------- */
function StatCard({ label, value, trend, trendDir = "muted", accent, icon }) {
  const tc = { up: "var(--success)", down: "var(--error)", muted: "var(--text-tertiary)" }[trendDir];
  return (
    <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)" }}>{label}</span>
        {icon && (
          <span style={{ display: "inline-flex", width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center", background: (accent || "var(--text-tertiary)") + "1a" }}>
            <Icon name={icon} size={15} color={accent || "var(--text-tertiary)"} />
          </span>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>{value}</div>
      {trend != null && (
        <div style={{ marginTop: 6, fontSize: 12, fontWeight: 500, color: tc, display: "flex", alignItems: "center", gap: 4 }}>
          {trendDir === "up" && <Icon name="trending-up" size={13} color={tc} />}
          {trendDir === "down" && <Icon name="trending-down" size={13} color={tc} />}
          {trend}
        </div>
      )}
    </div>
  );
}

/* ---------- Filter bar ---------- */
function SearchInput({ placeholder, value, onChange, width = 280 }) {
  return (
    <div style={{ position: "relative", width }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="search" size={16} color="var(--text-tertiary)" />
      </span>
      <input value={value} onChange={(e) => onChange && onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", height: 40, padding: "0 12px 0 36px", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-ui)", boxSizing: "border-box" }} />
    </div>
  );
}
function Select({ value, onChange, options, icon }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {icon && <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name={icon} size={15} color="var(--text-tertiary)" /></span>}
      <select value={value} onChange={(e) => onChange && onChange(e.target.value)}
        style={{ height: 40, padding: icon ? "0 34px 0 32px" : "0 34px 0 12px", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-ui)", cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}>
        {options.map((o) => <option key={o.value} value={o.value} style={{ background: "#1A1A1A" }}>{o.label}</option>)}
      </select>
      <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevron-down" size={15} color="var(--text-tertiary)" /></span>
    </div>
  );
}
function FilterBar({ children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>{children}</div>;
}

/* ---------- Surface card ---------- */
function Panel({ title, icon, right, children, pad = true, style }) {
  return (
    <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 12, ...style }}>
      {title && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
            {icon && <Icon name={icon} size={16} color="var(--text-secondary)" />}{title}
          </div>
          {right}
        </div>
      )}
      <div style={{ padding: pad ? 20 : 0 }}>{children}</div>
    </div>
  );
}

/* ---------- Data table ---------- */
function Table({ columns, children }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i} style={{ textAlign: c.align || "left", padding: "11px 20px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-tertiary)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
function THRow({ onClick, children, last }) {
  const [h, setH] = React.useState(false);
  return (
    <tr onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderBottom: last ? "none" : "1px solid var(--border-faint)", cursor: onClick ? "pointer" : "default", background: h && onClick ? "var(--surface-overlay)" : "transparent", transition: "background 120ms" }}>
      {children}
    </tr>
  );
}
function TD({ children, align, mono, strong, color }) {
  return (
    <td style={{ padding: "13px 20px", textAlign: align || "left", color: color || (strong ? "var(--text-primary)" : "var(--text-secondary)"), fontWeight: strong ? 600 : 400, fontFamily: mono ? "var(--font-mono)" : "inherit", whiteSpace: "nowrap" }}>{children}</td>
  );
}

/* ---------- Empty state ---------- */
function EmptyState({ icon = "inbox", title, sub }) {
  return (
    <div style={{ padding: "64px 20px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, margin: "0 auto 18px", borderRadius: 16, background: "var(--surface-overlay)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={28} color="var(--text-tertiary)" />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>{title}</div>
      {sub && <div style={{ marginTop: 6, fontSize: 13, color: "var(--text-secondary)" }}>{sub}</div>}
    </div>
  );
}

/* ---------- Stylized dark map (on-brand, no light OSM tiles) ---------- */
function MapPanel({ lat, lng, label, height = 280 }) {
  // deterministic street layout seeded by coords
  const seed = Math.abs(Math.round((lat * 1000 + lng * 1000)));
  const rnd = (n) => { let s = seed + n * 97; s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const vlines = [14, 30, 47, 63, 80].map((x, i) => x + (rnd(i) - 0.5) * 6);
  const hlines = [18, 38, 58, 78].map((y, i) => y + (rnd(i + 9) - 0.5) * 6);
  const blocks = [];
  for (let i = 0; i < 7; i++) {
    blocks.push({ x: rnd(i * 2) * 78 + 4, y: rnd(i * 2 + 1) * 70 + 6, w: 7 + rnd(i + 3) * 12, h: 6 + rnd(i + 5) * 10 });
  }
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", height, background: "#0c0d0e" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <rect width="100" height="100" fill="#0c0d0e" />
        {/* park / water blobs */}
        <rect x="62" y="8" width="30" height="22" rx="3" fill="#10211a" />
        <path d="M0 86 Q 20 78 40 86 T 80 86 L 100 82 L 100 100 L 0 100 Z" fill="#0a1620" />
        {/* blocks */}
        {blocks.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1.4" fill="#15171a" stroke="#1d2024" strokeWidth="0.4" />)}
        {/* streets */}
        {vlines.map((x, i) => <line key={"v" + i} x1={x} y1="0" x2={x} y2="100" stroke="#1f2226" strokeWidth={i === 2 ? 2.2 : 1.1} />)}
        {hlines.map((y, i) => <line key={"h" + i} x1="0" y1={y} x2="100" y2={y} stroke="#1f2226" strokeWidth={i === 1 ? 2.2 : 1.1} />)}
        {/* main road accent */}
        <line x1={vlines[2]} y1="0" x2={vlines[2]} y2="100" stroke="#26292e" strokeWidth="2.6" />
      </svg>
      {/* pin */}
      <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%,-100%)" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "100%", marginLeft: -13, marginTop: -13, width: 26, height: 26, borderRadius: "50%", background: "rgba(245,166,35,.28)", animation: "spPing 2.2s ease-out infinite" }} />
          <svg width="30" height="40" viewBox="0 0 24 32" fill="none" style={{ position: "relative", filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))" }}>
            <path d="M12 0C5.4 0 0 5.4 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.4 18.6 0 12 0z" fill="#F5A623" />
            <circle cx="12" cy="12" r="4.5" fill="#0A0A0A" />
          </svg>
        </div>
      </div>
      {label && (
        <div style={{ position: "absolute", left: 12, bottom: 12, background: "rgba(10,10,10,.85)", backdropFilter: "blur(8px)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, maxWidth: "85%" }}>
          <Icon name="map-pin" size={14} color="var(--amber)" />
          <span style={{ fontSize: 12, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        </div>
      )}
      <div style={{ position: "absolute", right: 12, top: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-tertiary)", background: "rgba(10,10,10,.7)", borderRadius: 6, padding: "3px 7px" }}>
        {lat.toFixed(3)}, {lng.toFixed(3)}
      </div>
    </div>
  );
}

/* ---------- Project pipeline bar ---------- */
function Pipeline({ status, locale = "id" }) {
  const order = window.SP_DATA.pipeline;
  const cur = order.indexOf(status);
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {order.map((step, i) => {
        const done = i < cur, active = i === cur;
        const cfg = PROJECT_STATUS[step];
        const barColor = done ? "var(--success)" : active ? "var(--amber)" : "var(--surface-elevated)";
        const txtColor = active ? "var(--amber)" : done ? "var(--text-secondary)" : "var(--text-tertiary)";
        return (
          <div key={step} style={{ flex: 1, minWidth: 0 }}>
            <div style={{ height: 6, borderRadius: 999, background: barColor, boxShadow: active ? "0 0 12px rgba(245,166,35,.4)" : "none" }} />
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              {done && <Icon name="check" size={13} color="var(--success)" />}
              {active && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--amber)", flexShrink: 0 }} />}
              <span style={{ fontSize: 12, fontWeight: active ? 600 : 500, color: txtColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cfg[locale]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Revenue area chart (SVG) ---------- */
function RevenueChart({ data, height = 180 }) {
  const W = 600, H = height, pl = 8, pr = 8, pt = 14, pb = 26;
  const vals = data.map((d) => d.v);
  const max = Math.max(...vals) * 1.12, min = 0;
  const ix = (i) => pl + (i * (W - pl - pr)) / (data.length - 1);
  const iy = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
  const pts = data.map((d, i) => [ix(i), iy(d.v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${ix(data.length - 1)} ${H - pb} L ${ix(0)} ${H - pb} Z`;
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * W;
          let best = 0, bd = 1e9;
          pts.forEach((p, i) => { const d = Math.abs(p[0] - x); if (d < bd) { bd = d; best = i; } });
          setHover(best);
        }}>
        <defs>
          <linearGradient id="revfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pl} x2={W - pr} y1={pt + g * (H - pt - pb)} y2={pt + g * (H - pt - pb)} stroke="#1c1c1c" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#revfill)" />
        <path d={line} fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={hover === i ? 5 : 3} fill={hover === i ? "#FFB830" : "#F5A623"} stroke="#0A0A0A" strokeWidth="2" />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 6px", marginTop: 2 }}>
        {data.map((d, i) => <span key={i} style={{ fontSize: 11, color: hover === i ? "var(--text-primary)" : "var(--text-tertiary)", fontWeight: hover === i ? 600 : 400 }}>{d.d}</span>)}
      </div>
      {hover != null && (
        <div style={{ position: "absolute", left: `${(pts[hover][0] / W) * 100}%`, top: 0, transform: "translateX(-50%)", background: "var(--surface-overlay)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", pointerEvents: "none", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{data[hover].d}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{window.SPUI.rupiah(data[hover].v)}</div>
        </div>
      )}
    </div>
  );
}

/* ---------- Occupancy donut gauge ---------- */
function OccupancyGauge({ mix }) {
  const car = mix.car, moto = mix.moto;
  const total = car.cur + moto.cur, totalCap = car.cap + moto.cap;
  const pct = Math.round((total / totalCap) * 100);
  const R = 52, C = 2 * Math.PI * R;
  const carFrac = car.cur / totalCap, motoFrac = moto.cur / totalCap;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ position: "relative", width: 132, height: 132, flexShrink: 0 }}>
        <svg width="132" height="132" viewBox="0 0 132 132" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="66" cy="66" r={R} fill="none" stroke="var(--surface-overlay)" strokeWidth="13" />
          <circle cx="66" cy="66" r={R} fill="none" stroke="#F5A623" strokeWidth="13" strokeLinecap="round"
            strokeDasharray={`${carFrac * C} ${C}`} />
          <circle cx="66" cy="66" r={R} fill="none" stroke="#3B82F6" strokeWidth="13" strokeLinecap="round"
            strokeDasharray={`${motoFrac * C} ${C}`} strokeDashoffset={`${-carFrac * C}`} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{total}/{totalCap}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {[{ k: "car", lbl: "Mobil", lblEn: "Cars", c: "#F5A623", o: car }, { k: "moto", lbl: "Motor", lblEn: "Motorcycles", c: "#3B82F6", o: moto }].map((row) => (
          <div key={row.k}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: row.c }} />{row.lbl}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
                {row.o.cur}<span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}> / {row.o.cap}</span>
              </span>
            </div>
            <div style={{ height: 6, background: "var(--surface-overlay)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(row.o.cur / row.o.cap) * 100}%`, background: row.c, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function rupiah(n) {
  if (n >= 1e9) return "Rp " + (n / 1e9).toFixed(1).replace(".", ",") + "M";
  if (n >= 1e6) return "Rp " + (n / 1e6).toFixed(1).replace(".", ",") + "jt";
  return "Rp " + n.toLocaleString("id-ID");
}
function rupiahFull(n) { return "Rp " + n.toLocaleString("id-ID"); }

window.SPUI = {
  Icon, StatusPill, PageHeader, StatCard, SearchInput, Select, FilterBar, Panel,
  Table, THRow, TD, EmptyState, MapPanel, Pipeline, RevenueChart, OccupancyGauge,
  CAT, LEAD_STATUS, PROJECT_STATUS, rupiah, rupiahFull,
};
