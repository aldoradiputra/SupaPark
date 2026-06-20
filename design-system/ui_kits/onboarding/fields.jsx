/* SupaPark Onboarding — form field components with full states:
   empty · focused (amber border) · filled · error (red border + message).
   Exposes window.OB. */
(function () {
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

  const FONT = "var(--font-ui)";

  function borderFor(error, focused) {
    return error ? "#EF4444" : focused ? "#F5A623" : "#2A2A2A";
  }
  function ringFor(error, focused) {
    return error ? "rgba(239,68,68,.16)" : focused ? "rgba(245,166,35,.18)" : "transparent";
  }
  const baseInput = (error, focused) => ({
    width: "100%", height: 48, padding: "0 14px", boxSizing: "border-box",
    background: "var(--surface-base)", color: "var(--text-primary)",
    border: `1px solid ${borderFor(error, focused)}`, borderRadius: 10,
    fontSize: 15, fontFamily: FONT, lineHeight: 1.4,
    boxShadow: `0 0 0 3px ${ringFor(error, focused)}`,
    transition: "border-color 140ms, box-shadow 140ms",
    outline: "none",
  });

  /* ---------- Field wrapper ---------- */
  function Field({ label, optional, error, children, hint }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {label && (
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
            {label}
            {optional && <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-tertiary)" }}>(opsional)</span>}
          </label>
        )}
        {children}
        {hint && !error && <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{hint}</div>}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#EF4444" }}>
            <Icon name="alert-circle" size={14} color="#EF4444" />{error}
          </div>
        )}
      </div>
    );
  }

  /* ---------- Text input (with optional leading icon) ---------- */
  function TextInput({ value, onChange, onCommit, type = "text", placeholder, error, icon, inputMode, autoComplete }) {
    const [f, setF] = React.useState(false);
    return (
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name={icon} size={17} color={f ? "#F5A623" : "var(--text-tertiary)"} /></span>}
        <input
          type={type} value={value} placeholder={placeholder} inputMode={inputMode} autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => { setF(false); onCommit && onCommit(); }}
          style={{ ...baseInput(error, f), paddingLeft: icon ? 42 : 14 }}
        />
      </div>
    );
  }

  /* ---------- Number input with steppers ---------- */
  function NumberInput({ value, onChange, placeholder, error, min = 0 }) {
    const [f, setF] = React.useState(false);
    const num = parseInt(value, 10);
    const set = (n) => onChange(String(Math.max(min, n)));
    return (
      <div style={{ position: "relative" }}>
        <input
          type="text" inputMode="numeric" value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ ...baseInput(error, f), paddingRight: 44 }}
        />
        <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 2 }}>
          {[["chevron-up", 1], ["chevron-down", -1]].map(([ic, d]) => (
            <button key={ic} type="button" tabIndex={-1} onClick={() => set((isNaN(num) ? 0 : num) + d)}
              style={{ width: 28, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "var(--surface-overlay)", borderRadius: 5, cursor: "pointer", color: "var(--text-secondary)" }}>
              <Icon name={ic} size={13} color="var(--text-secondary)" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Select ---------- */
  function SelectInput({ value, onChange, options, placeholder, error }) {
    const [f, setF] = React.useState(false);
    const empty = !value;
    return (
      <div style={{ position: "relative" }}>
        <select value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ ...baseInput(error, f), appearance: "none", WebkitAppearance: "none", color: empty ? "var(--text-tertiary)" : "var(--text-primary)", paddingRight: 42, cursor: "pointer" }}>
          <option value="" disabled style={{ background: "#1A1A1A" }}>{placeholder}</option>
          {options.map((o) => <option key={o} value={o} style={{ background: "#1A1A1A", color: "#F5F5F0" }}>{o}</option>)}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="chevron-down" size={17} color="var(--text-tertiary)" /></span>
      </div>
    );
  }

  /* ---------- Date ---------- */
  function DateInput({ value, onChange, error }) {
    const [f, setF] = React.useState(false);
    return (
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icon name="calendar" size={17} color={f ? "#F5A623" : "var(--text-tertiary)"} /></span>
        <input type="date" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ ...baseInput(error, f), paddingLeft: 42, color: value ? "var(--text-primary)" : "var(--text-tertiary)", colorScheme: "dark" }} />
      </div>
    );
  }

  /* ---------- Textarea ---------- */
  function TextArea({ value, onChange, placeholder, error }) {
    const [f, setF] = React.useState(false);
    return (
      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...baseInput(error, f), height: "auto", minHeight: 90, padding: 14, resize: "vertical", lineHeight: 1.6 }} />
    );
  }

  /* ---------- Primary / outline buttons ---------- */
  function PrimaryButton({ children, onClick, disabled, type = "button" }) {
    const [h, setH] = React.useState(false);
    return (
      <button type={type} onClick={onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ width: "100%", height: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
          background: disabled ? "#3a2e12" : h ? "#FFB830" : "#F5A623", color: disabled ? "#7a6a44" : "#0A0A0A",
          border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: FONT,
          cursor: disabled ? "not-allowed" : "pointer", transition: "background 140ms" }}>
        {children}
      </button>
    );
  }
  function OutlineButton({ children, onClick }) {
    const [h, setH] = React.useState(false);
    return (
      <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ width: "100%", height: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
          background: h ? "var(--surface-elevated)" : "transparent", color: "var(--text-primary)",
          border: "1px solid var(--border)", borderRadius: 12, fontSize: 16, fontWeight: 600, fontFamily: FONT, cursor: "pointer", transition: "background 140ms" }}>
        {children}
      </button>
    );
  }

  /* ---------- Progress (Step n of 2) ---------- */
  function Progress({ step }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#F5A623" }}>Langkah {step} dari 2</span>
          <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{step === 1 ? "Data singkat" : "Detail fasilitas"}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2].map((s) => (
            <div key={s} style={{ flex: 1, height: 5, borderRadius: 999, background: s <= step ? "#F5A623" : "var(--surface-elevated)", boxShadow: s === step ? "0 0 12px rgba(245,166,35,.4)" : "none", transition: "background 200ms" }} />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Brand header ---------- */
  function BrandHeader({ size = "md" }) {
    const big = size === "lg";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <svg width={big ? 34 : 28} height={big ? 34 : 28} viewBox="0 0 48 48" fill="none">
            <rect x="10" y="8" width="10" height="32" rx="3" fill="#F5A623" />
            <path d="M20 8h10a10 10 0 0 1 0 20H20" stroke="#F5A623" strokeWidth="8" strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ fontSize: big ? 24 : 20, fontWeight: 800, letterSpacing: ".14em", color: "#F5F5F0" }}>SUPAPARK</span>
        </span>
      </div>
    );
  }

  /* ---------- Animated success check ---------- */
  function SuccessCheck({ size = 120 }) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(0,255,136,.12)", display: "flex", alignItems: "center", justifyContent: "center", animation: "obPop 520ms cubic-bezier(.2,.8,.2,1)" }}>
        <div style={{ width: size * 0.7, height: size * 0.7, borderRadius: "50%", background: "rgba(0,255,136,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={size * 0.46} height={size * 0.46} viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="#00FF88" strokeWidth="3" />
            <path d="M15 27 l8 8 l15 -16" fill="none" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }

  window.OB = { Icon, Field, TextInput, NumberInput, SelectInput, DateInput, TextArea, PrimaryButton, OutlineButton, Progress, BrandHeader, SuccessCheck };
})();
