/* SupaPark Dashboard — Projects list + detail. window.SP_Projects, window.SP_ProjectDetail */
(function () {
  const U = window.SPUI;
  const { StatCard, Panel, Table, THRow, TD, SearchInput, Select, FilterBar, StatusPill, EmptyState, MapPanel, Pipeline, PageHeader, Icon } = U;

  const fmtDate = (s, locale) => {
    if (!s || s === "—") return "—";
    const d = new Date(s);
    return d.toLocaleDateString(locale === "en" ? "en-GB" : "id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  /* ---------- LIST ---------- */
  function Projects({ t, locale, go }) {
    const D = window.SP_DATA;
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("all");
    const en = locale === "en";

    const total = D.projects.length;
    const active = D.projects.filter((p) => p.status !== "live").length;
    const live = D.projects.filter((p) => p.status === "live").length;

    const filtered = D.projects.filter((p) => {
      const mq = !q || (p.facility + p.contact + p.city).toLowerCase().includes(q.toLowerCase());
      const ms = status === "all" || p.status === status;
      return mq && ms;
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <PageHeader title={t.projects} sub={en ? "Active rollouts and live deployments" : "Implementasi berjalan dan deployment aktif"}
          actions={<button style={btnPrimary}><Icon name="plus" size={16} color="#0A0A0A" />{en ? "New Project" : "Proyek Baru"}</button>} />

        <div className="sp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          <StatCard label={en ? "Total Projects" : "Total Proyek"} value={total} accent="#A3A39A" icon="folder" />
          <StatCard label={en ? "In Progress" : "Berjalan"} value={active} accent="#F5A623" icon="loader" />
          <StatCard label={U.PROJECT_STATUS.live[locale]} value={live} accent={U.CAT.green} icon="circle-check-big" />
        </div>

        <FilterBar>
          <SearchInput value={q} onChange={setQ} placeholder={en ? "Search facility, contact, city…" : "Cari fasilitas, kontak, kota…"} />
          <Select value={status} onChange={setStatus} icon="filter" options={[{ value: "all", label: en ? "All status" : "Semua status" }, ...Object.keys(U.PROJECT_STATUS).map((k) => ({ value: k, label: U.PROJECT_STATUS[k][locale] }))]} />
          <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-tertiary)" }}>{filtered.length} {en ? "results" : "hasil"}</span>
        </FilterBar>

        <Panel pad={false}>
          {filtered.length === 0 ? (
            <EmptyState icon="folder-x" title={en ? "No projects found" : "Proyek tidak ditemukan"} sub={en ? "Try adjusting your filters." : "Coba ubah filter pencarian."} />
          ) : (
            <Table columns={[{ label: en ? "Facility" : "Fasilitas" }, { label: en ? "Contact" : "Kontak" }, { label: en ? "City" : "Kota" }, { label: en ? "Lanes" : "Jalur", align: "center" }, { label: t.status }, { label: en ? "Target Live" : "Target Aktif" }, { label: "", align: "right" }]}>
              {filtered.map((p, i) => (
                <THRow key={p.id} last={i === filtered.length - 1} onClick={() => go("projectDetail", p.id)}>
                  <TD strong>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "var(--surface-overlay)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="building-2" size={15} color="var(--text-tertiary)" />
                      </span>{p.facility}
                    </div>
                  </TD>
                  <TD>{p.contact}</TD>
                  <TD>{p.city}</TD>
                  <TD align="center" mono>{p.lanesIn + p.lanesOut}</TD>
                  <TD><StatusPill kind="project" value={p.status} locale={locale} /></TD>
                  <TD mono>{fmtDate(p.targetLive, locale)}</TD>
                  <TD align="right"><Icon name="chevron-right" size={16} color="var(--text-tertiary)" /></TD>
                </THRow>
              ))}
            </Table>
          )}
        </Panel>
      </div>
    );
  }

  /* ---------- DETAIL ---------- */
  function ProjectDetail({ t, locale, id, go }) {
    const p = window.SP_DATA.projects.find((x) => x.id === id) || window.SP_DATA.projects[0];
    const [notes, setNotes] = React.useState(p.notes);
    const en = locale === "en";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <PageHeader back={() => go("projects")}
          title={<React.Fragment>{p.facility}<StatusPill kind="project" value={p.status} locale={locale} size="lg" /></React.Fragment>}
          sub={p.contact + " · " + p.city}
          actions={<button style={btnGhost}><Icon name="refresh-cw" size={15} color="var(--text-secondary)" />{en ? "Update Status" : "Perbarui Status"}</button>} />

        {/* pipeline */}
        <Panel title={en ? "Deployment pipeline" : "Alur Deployment"} icon="git-commit-horizontal">
          <Pipeline status={p.status} locale={locale} />
        </Panel>

        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Panel title={en ? "Contact" : "Kontak"} icon="user">
            <InfoList rows={[
              { ic: "user", k: en ? "Contact" : "Kontak", v: p.contact },
              { ic: "mail", k: "Email", v: p.email, mono: true },
              { ic: "phone", k: en ? "Phone" : "Telepon", v: p.phone, mono: true },
              { ic: "navigation", k: en ? "Address" : "Alamat", v: p.address },
            ]} />
          </Panel>
          <Panel title={en ? "Project details" : "Detail Proyek"} icon="clipboard-list">
            <InfoList rows={[
              { ic: "arrow-down-left", k: en ? "Lanes" : "Jalur", v: `${p.lanesIn} ${en ? "entry" : "masuk"} · ${p.lanesOut} ${en ? "exit" : "keluar"}` },
              { ic: "play", k: en ? "Start date" : "Tanggal mulai", v: fmtDate(p.startDate, locale), mono: true },
              { ic: "target", k: en ? "Target live" : "Target aktif", v: fmtDate(p.targetLive, locale), mono: true },
              { ic: "circle-check-big", k: en ? "Actual live" : "Aktif sejak", v: fmtDate(p.actualLive, locale), mono: true },
            ]} />
          </Panel>
        </div>

        <Panel title={en ? "Location" : "Lokasi"} icon="map" pad={false}>
          <MapPanel lat={p.lat} lng={p.lng} label={p.address} height={300} />
        </Panel>

        <Panel title={en ? "Notes" : "Catatan"} icon="sticky-note"
          right={<button style={{ ...btnGhost, height: 30, padding: "0 12px", fontSize: 12 }}><Icon name="save" size={14} color="var(--text-secondary)" />{en ? "Save" : "Simpan"}</button>}>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", minHeight: 96, padding: 14, background: "var(--surface-overlay)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-ui)", lineHeight: 1.6, resize: "vertical", boxSizing: "border-box" }} />
        </Panel>
      </div>
    );
  }

  function InfoList({ rows }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < rows.length - 1 ? "1px solid var(--border-faint)" : "none" }}>
            <span style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: "var(--surface-overlay)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
              <Icon name={r.ic} size={15} color="var(--text-tertiary)" />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginBottom: 2 }}>{r.k}</div>
              <div style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: r.mono ? "var(--font-mono)" : "inherit", wordBreak: "break-word" }}>{r.v}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const btnPrimary = { display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 16px", borderRadius: 8, border: "none", background: "var(--amber)", color: "#0A0A0A", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-ui)", cursor: "pointer" };
  const btnGhost = { display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-secondary)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-ui)", cursor: "pointer" };

  window.SP_Projects = Projects;
  window.SP_ProjectDetail = ProjectDetail;
})();
