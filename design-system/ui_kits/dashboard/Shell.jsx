/* SupaPark Dashboard — Shell: sidebar, routing, location selector, language
   toggle, secondary-page stubs, mobile layout + preview toggle. window.SP_App */
(function () {
  const U = window.SPUI;
  const { Icon, Panel, PageHeader, EmptyState } = U;
  const _DS = window.SupaParkDesignSystem_80b640;
  const { Logo } = _DS;

  const T = {
    en: { liveOverview: "Live Overview", overview: "Overview", sessions: "Sessions", revenue: "Revenue",
      members: "Members", plateRules: "Plate Rules", leads: "Leads", projects: "Projects", devices: "Devices",
      settings: "Settings", activeSessions: "Active Sessions", todayRevenue: "Today's Revenue", occupancy: "Occupancy",
      alerts: "Alerts", recentSessions: "Recent Sessions", plate: "Plate", type: "Type", entry: "Entry",
      duration: "Duration", status: "Status", resolve: "Resolve", lang: "English", langSwitch: "Bahasa Indonesia",
      soon: "Module preview", soonSub: "This screen is part of the SupaPark build. The Overview, Leads and Projects flows are fully designed in this kit." },
    id: { liveOverview: "Ringkasan Langsung", overview: "Ringkasan", sessions: "Sesi", revenue: "Pendapatan",
      members: "Anggota", plateRules: "Aturan Plat", leads: "Leads", projects: "Proyek", devices: "Perangkat",
      settings: "Pengaturan", activeSessions: "Sesi Aktif", todayRevenue: "Pendapatan Hari Ini", occupancy: "Okupansi",
      alerts: "Peringatan", recentSessions: "Sesi Terbaru", plate: "Plat", type: "Jenis", entry: "Masuk",
      duration: "Durasi", status: "Status", resolve: "Selesaikan", lang: "Bahasa Indonesia", langSwitch: "English",
      soon: "Pratinjau Modul", soonSub: "Layar ini bagian dari sistem SupaPark. Alur Ringkasan, Leads, dan Proyek telah dirancang lengkap di kit ini." },
  };

  const NAV = [
    { key: "overview", icon: "layout-dashboard" },
    { key: "sessions", icon: "clock" },
    { key: "revenue", icon: "dollar-sign" },
    { key: "members", icon: "users" },
    { key: "plateRules", icon: "scan-line" },
    { key: "leads", icon: "user-plus" },
    { key: "projects", icon: "folder-kanban" },
    { key: "devices", icon: "cpu" },
    { key: "settings", icon: "settings" },
  ];
  const MOBILE_NAV = ["overview", "sessions", "leads", "projects", "settings"];
  // page -> active nav key
  const ACTIVE_OF = { leadDetail: "leads", projectDetail: "projects" };

  function renderPage(page, id, t, locale, go) {
    switch (page) {
      case "overview": return <window.SP_Overview t={t} locale={locale} />;
      case "leads": return <window.SP_Leads t={t} locale={locale} go={go} />;
      case "leadDetail": return <window.SP_LeadDetail t={t} locale={locale} id={id} go={go} />;
      case "projects": return <window.SP_Projects t={t} locale={locale} go={go} />;
      case "projectDetail": return <window.SP_ProjectDetail t={t} locale={locale} id={id} go={go} />;
      default: return <Stub t={t} locale={locale} page={page} />;
    }
  }

  function Stub({ t, locale, page }) {
    const ICONS = { sessions: "clock", revenue: "dollar-sign", members: "users", plateRules: "scan-line", devices: "cpu", settings: "settings" };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <PageHeader title={t[page]} />
        <Panel pad={false}><EmptyState icon={ICONS[page] || "layers"} title={t.soon} sub={t.soonSub} /></Panel>
      </div>
    );
  }

  /* ---------- Location selector ---------- */
  function LocationSelector({ locale }) {
    const [open, setOpen] = React.useState(false);
    const [loc, setLoc] = React.useState(window.SP_DATA.locations[0]);
    return (
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpen((o) => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--surface-overlay)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, fontFamily: "var(--font-ui)", cursor: "pointer", textAlign: "left" }}>
          <Icon name="map-pin" size={15} color="var(--amber)" />
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{loc}</span>
          <Icon name={open ? "chevron-up" : "chevron-down"} size={15} color="var(--text-tertiary)" />
        </button>
        {open && (
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 30, background: "var(--surface-overlay)", border: "1px solid var(--border)", borderRadius: 10, padding: 5, boxShadow: "0 12px 32px rgba(0,0,0,.5)" }}>
            {window.SP_DATA.locations.map((l) => (
              <button key={l} onClick={() => { setLoc(l); setOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", background: l === loc ? "rgba(245,166,35,.08)" : "transparent", border: "none", borderRadius: 7, color: l === loc ? "var(--amber)" : "var(--text-secondary)", fontSize: 13, fontFamily: "var(--font-ui)", cursor: "pointer", textAlign: "left" }}>
                <Icon name="building" size={14} color={l === loc ? "var(--amber)" : "var(--text-tertiary)"} />
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l}</span>
                {l === loc && <Icon name="check" size={14} color="var(--amber)" />}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 4 }}>
              <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", background: "transparent", border: "none", borderRadius: 7, color: "var(--text-tertiary)", fontSize: 13, fontFamily: "var(--font-ui)", cursor: "pointer" }}>
                <Icon name="plus" size={14} color="var(--text-tertiary)" />{locale === "en" ? "Add location" : "Tambah lokasi"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------- Sidebar (desktop) ---------- */
  function Sidebar({ active, go, locale, setLocale }) {
    const t = T[locale];
    return (
      <aside style={{ width: 240, flexShrink: 0, background: "var(--surface-raised)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 20px 16px" }}>
          <Logo size={26} />
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", letterSpacing: ".01em" }}>SupaPark</span>
        </div>
        <div style={{ padding: "0 14px 14px" }}><LocationSelector locale={locale} /></div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          {NAV.map((n) => {
            const on = active === n.key;
            return (
              <button key={n.key} onClick={() => go(n.key)}
                style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 14, textAlign: "left", background: on ? "rgba(245,166,35,.07)" : "transparent", color: on ? "var(--amber)" : "var(--text-secondary)", fontWeight: on ? 600 : 400, transition: "background 120ms,color 120ms" }}>
                {on && <span style={{ position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)", width: 3, height: 22, background: "var(--amber)", borderRadius: "0 3px 3px 0" }} />}
                <Icon name={n.icon} size={18} color={on ? "var(--amber)" : "var(--text-tertiary)"} />
                {t[n.key]}
              </button>
            );
          })}
        </nav>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div style={{ padding: 14 }}>
          <button onClick={() => setLocale(locale === "en" ? "id" : "en")}
            style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-overlay)", color: "var(--text-secondary)", fontSize: 13, fontFamily: "var(--font-ui)", cursor: "pointer" }}>
            <Icon name="globe" size={16} color="var(--text-secondary)" />
            <span style={{ flex: 1, textAlign: "left" }}>{t.lang}</span>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{locale.toUpperCase()}</span>
          </button>
        </div>
      </aside>
    );
  }

  /* ---------- Desktop app ---------- */
  function DesktopApp({ route, go, locale, setLocale }) {
    const t = T[locale];
    const active = ACTIVE_OF[route.page] || route.page;
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-base)" }}>
        <Sidebar active={active} go={go} locale={locale} setLocale={setLocale} />
        <main style={{ flex: 1, minWidth: 0, padding: "28px 32px 48px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          {renderPage(route.page, route.id, t, locale, go)}
        </main>
      </div>
    );
  }

  /* ---------- Mobile app ---------- */
  function MobileApp({ route, go, locale, setLocale }) {
    const t = T[locale];
    const active = ACTIVE_OF[route.page] || route.page;
    const [sheet, setSheet] = React.useState(false);
    return (
      <div className="sp-mobile" style={{ position: "relative", width: 390, height: 820, background: "var(--surface-base)", borderRadius: 36, border: "10px solid #1a1a1a", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.6)", display: "flex", flexDirection: "column" }}>
        {/* status bar */}
        <div style={{ height: 30, flexShrink: 0, background: "var(--surface-raised)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
          <span>9:41</span>
          <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Icon name="signal" size={13} color="var(--text-primary)" /><Icon name="wifi" size={13} color="var(--text-primary)" /><Icon name="battery-full" size={15} color="var(--text-primary)" /></span>
        </div>
        {/* top bar */}
        <div style={{ height: 54, flexShrink: 0, background: "var(--surface-raised)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
          <Logo size={22} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1 }}>{locale === "en" ? "Location" : "Lokasi"}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{window.SP_DATA.locations[0]}</div>
          </div>
          <button onClick={() => setSheet(true)} style={{ width: 38, height: 38, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-overlay)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="menu" size={18} color="var(--text-secondary)" />
          </button>
        </div>
        {/* content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 14px 90px" }}>
          {renderPage(route.page, route.id, t, locale, go)}
        </div>
        {/* bottom nav */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 68, background: "rgba(17,17,17,.94)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--border)", display: "flex", alignItems: "stretch", padding: "0 6px" }}>
          {MOBILE_NAV.map((key) => {
            const n = NAV.find((x) => x.key === key);
            const on = active === key;
            return (
              <button key={key} onClick={() => go(key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, border: "none", background: "transparent", cursor: "pointer", color: on ? "var(--amber)" : "var(--text-tertiary)", paddingBottom: 8 }}>
                <Icon name={n.icon} size={20} color={on ? "var(--amber)" : "var(--text-tertiary)"} />
                <span style={{ fontSize: 10, fontWeight: on ? 600 : 500, fontFamily: "var(--font-ui)" }}>{t[key]}</span>
              </button>
            );
          })}
        </div>
        {/* nav sheet */}
        {sheet && (
          <div onClick={() => setSheet(false)} style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "flex-end" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", background: "var(--surface-raised)", borderRadius: "20px 20px 0 0", border: "1px solid var(--border)", padding: 16, maxHeight: "80%", overflowY: "auto" }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--surface-elevated)", margin: "0 auto 14px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {NAV.map((n) => {
                  const on = active === n.key;
                  return (
                    <button key={n.key} onClick={() => { go(n.key); setSheet(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 12px", borderRadius: 10, border: "1px solid var(--border)", background: on ? "rgba(245,166,35,.08)" : "var(--surface-overlay)", color: on ? "var(--amber)" : "var(--text-secondary)", fontSize: 13, fontWeight: on ? 600 : 500, fontFamily: "var(--font-ui)", cursor: "pointer", textAlign: "left" }}>
                      <Icon name={n.icon} size={17} color={on ? "var(--amber)" : "var(--text-tertiary)"} />{T[locale][n.key]}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setLocale(locale === "en" ? "id" : "en"); }}
                style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-overlay)", color: "var(--text-secondary)", fontSize: 13, fontFamily: "var(--font-ui)", cursor: "pointer" }}>
                <Icon name="globe" size={16} color="var(--text-secondary)" /><span style={{ flex: 1, textAlign: "left" }}>{T[locale].lang}</span><span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{locale.toUpperCase()}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------- Root ---------- */
  function App() {
    const [locale, setLocale] = React.useState("id");
    const [mode, setMode] = React.useState("desktop");
    const [route, setRoute] = React.useState({ page: "overview", id: null });
    const go = (page, id = null) => { setRoute({ page, id }); const m = document.querySelector(".sp-main-scroll"); if (m) m.scrollTop = 0; };

    React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    return (
      <div>
        {mode === "desktop"
          ? <DesktopApp route={route} go={go} locale={locale} setLocale={setLocale} />
          : <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 30, background: "var(--surface-base)" }}>
              <MobileApp route={route} go={go} locale={locale} setLocale={setLocale} />
            </div>}

        {/* preview toggle */}
        <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 200, display: "flex", gap: 3, padding: 4, background: "rgba(26,26,26,.92)", backdropFilter: "blur(12px)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}>
          {[["desktop", "monitor", "Desktop"], ["mobile", "smartphone", "Mobile"]].map(([m, ic, lbl]) => (
            <button key={m} onClick={() => setMode(m)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, background: mode === m ? "var(--amber)" : "transparent", color: mode === m ? "#0A0A0A" : "var(--text-secondary)" }}>
              <Icon name={ic} size={15} color={mode === m ? "#0A0A0A" : "var(--text-secondary)"} />{lbl}
            </button>
          ))}
        </div>
      </div>
    );
  }

  window.SP_App = App;
})();
