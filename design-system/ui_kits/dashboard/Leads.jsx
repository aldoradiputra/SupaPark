/* SupaPark Dashboard — Leads list + detail. window.SP_Leads, window.SP_LeadDetail */
(function () {
  const U = window.SPUI;
  const { StatCard, Panel, Table, THRow, TD, SearchInput, Select, FilterBar, StatusPill, EmptyState, MapPanel, PageHeader, Icon } = U;

  const fmtDate = (s, locale) => {
    if (!s || s === "—") return "—";
    const d = new Date(s);
    return d.toLocaleDateString(locale === "en" ? "en-GB" : "id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  /* ---------- LIST ---------- */
  function Leads({ t, locale, go }) {
    const D = window.SP_DATA;
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("all");
    const [source, setSource] = React.useState("all");

    const counts = { total: D.leads.length, new: 0, qualified: 0, converted: 0 };
    D.leads.forEach((l) => { if (counts[l.status] != null) counts[l.status]++; });

    const sources = ["all", ...Array.from(new Set(D.leads.map((l) => l.source)))];
    const filtered = D.leads.filter((l) => {
      const mq = !q || (l.name + l.facility + l.city).toLowerCase().includes(q.toLowerCase());
      const ms = status === "all" || l.status === status;
      const msrc = source === "all" || l.source === source;
      return mq && ms && msrc;
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <PageHeader title={t.leads} sub={locale === "en" ? "Inbound prospects across Indonesia" : "Calon pelanggan dari seluruh Indonesia"}
          actions={<button style={btnPrimary}><Icon name="plus" size={16} color="#0A0A0A" />{locale === "en" ? "Add Lead" : "Tambah Lead"}</button>} />

        <div className="sp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          <StatCard label={locale === "en" ? "Total Leads" : "Total Lead"} value={counts.total} accent="#A3A39A" icon="users" />
          <StatCard label={U.LEAD_STATUS.new[locale]} value={counts.new} accent={U.CAT.blue} icon="sparkles" />
          <StatCard label={U.LEAD_STATUS.qualified[locale]} value={counts.qualified} accent={U.CAT.green} icon="badge-check" />
          <StatCard label={U.LEAD_STATUS.converted[locale]} value={counts.converted} accent={U.CAT.purple} icon="git-branch" />
        </div>

        <FilterBar>
          <SearchInput value={q} onChange={setQ} placeholder={locale === "en" ? "Search name, facility, city…" : "Cari nama, fasilitas, kota…"} />
          <Select value={status} onChange={setStatus} icon="filter" options={[{ value: "all", label: locale === "en" ? "All status" : "Semua status" }, ...Object.keys(U.LEAD_STATUS).map((k) => ({ value: k, label: U.LEAD_STATUS[k][locale] }))]} />
          <Select value={source} onChange={setSource} icon="radio" options={sources.map((s) => ({ value: s, label: s === "all" ? (locale === "en" ? "All sources" : "Semua sumber") : s }))} />
          <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-tertiary)" }}>{filtered.length} {locale === "en" ? "results" : "hasil"}</span>
        </FilterBar>

        <Panel pad={false}>
          {filtered.length === 0 ? (
            <EmptyState icon="search-x" title={locale === "en" ? "No leads found" : "Lead tidak ditemukan"} sub={locale === "en" ? "Try adjusting your filters or search." : "Coba ubah filter atau kata kunci."} />
          ) : (
            <Table columns={[{ label: locale === "en" ? "Name" : "Nama" }, { label: locale === "en" ? "Facility" : "Fasilitas" }, { label: locale === "en" ? "City" : "Kota" }, { label: t.status }, { label: locale === "en" ? "Source" : "Sumber" }, { label: locale === "en" ? "Date" : "Tanggal" }, { label: "", align: "right" }]}>
              {filtered.map((l, i) => (
                <THRow key={l.id} last={i === filtered.length - 1} onClick={() => go("leadDetail", l.id)}>
                  <TD strong>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={avatar(l.name)}>{initials(l.name)}</span>{l.name}
                    </div>
                  </TD>
                  <TD>{l.facility}</TD>
                  <TD>{l.city}</TD>
                  <TD><StatusPill kind="lead" value={l.status} locale={locale} /></TD>
                  <TD>{l.source}</TD>
                  <TD mono>{fmtDate(l.date, locale)}</TD>
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
  function LeadDetail({ t, locale, id, go }) {
    const l = window.SP_DATA.leads.find((x) => x.id === id) || window.SP_DATA.leads[0];
    const [notes, setNotes] = React.useState(l.notes);
    const en = locale === "en";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <PageHeader back={() => go("leads")}
          title={<React.Fragment>{l.name}<StatusPill kind="lead" value={l.status} locale={locale} size="lg" /></React.Fragment>}
          sub={l.facility + " · " + l.city}
          actions={<React.Fragment>
            <button style={btnGhost}><Icon name="refresh-cw" size={15} color="var(--text-secondary)" />{en ? "Change Status" : "Ubah Status"}</button>
            {l.status === "qualified" && <button style={btnPrimary}><Icon name="git-branch" size={15} color="#0A0A0A" />{en ? "Convert to Project" : "Jadikan Proyek"}</button>}
          </React.Fragment>} />

        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Panel title={en ? "Contact" : "Kontak"} icon="user">
            <InfoList rows={[
              { ic: "user", k: en ? "Name" : "Nama", v: l.name },
              { ic: "mail", k: "Email", v: l.email, mono: true },
              { ic: "phone", k: en ? "Phone" : "Telepon", v: l.phone, mono: true },
              { ic: "building-2", k: en ? "Facility" : "Fasilitas", v: l.facility },
              { ic: "radio", k: en ? "Source" : "Sumber", v: l.source },
              { ic: "calendar", k: en ? "Registered" : "Terdaftar", v: fmtDate(l.date, locale), mono: true },
            ]} />
          </Panel>
          <Panel title={en ? "Facility details" : "Detail Fasilitas"} icon="building-2">
            <InfoList rows={[
              { ic: "map-pin", k: en ? "City" : "Kota", v: l.city },
              { ic: "navigation", k: en ? "Address" : "Alamat", v: l.address },
              { ic: "arrow-down-left", k: en ? "Lanes" : "Jalur", v: `${l.lanesIn} ${en ? "entry" : "masuk"} · ${l.lanesOut} ${en ? "exit" : "keluar"}` },
              { ic: "cpu", k: en ? "Current system" : "Sistem saat ini", v: l.system },
              { ic: "activity", k: en ? "Daily volume" : "Volume harian", v: `${l.volume.toLocaleString("id-ID")} ${en ? "vehicles" : "kendaraan"}` },
              { ic: "calendar-clock", k: en ? "Preferred date" : "Tanggal diinginkan", v: fmtDate(l.prefDate, locale), mono: true },
            ]} />
          </Panel>
        </div>

        <Panel title={en ? "Location" : "Lokasi"} icon="map" pad={false}>
          <div style={{ padding: 0 }}><MapPanel lat={l.lat} lng={l.lng} label={l.address} height={300} /></div>
        </Panel>

        <Panel title={en ? "Notes" : "Catatan"} icon="sticky-note"
          right={<button style={{ ...btnGhost, height: 30, padding: "0 12px", fontSize: 12 }}><Icon name="save" size={14} color="var(--text-secondary)" />{en ? "Save" : "Simpan"}</button>}>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={en ? "Add a note about this lead…" : "Tambahkan catatan tentang lead ini…"}
            style={{ width: "100%", minHeight: 96, padding: 14, background: "var(--surface-overlay)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-primary)", fontSize: 14, fontFamily: "var(--font-ui)", lineHeight: 1.6, resize: "vertical", boxSizing: "border-box" }} />
        </Panel>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={{ ...btnGhost, color: "var(--error)", borderColor: "rgba(239,68,68,.3)" }}><Icon name="trash-2" size={15} color="var(--error)" />{en ? "Delete Lead" : "Hapus Lead"}</button>
        </div>
      </div>
    );
  }

  /* ---------- shared bits ---------- */
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

  function initials(n) { return n.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(); }
  const AV = ["#F5A623", "#3B82F6", "#22C55E", "#A855F7", "#F97316"];
  function avatar(name) {
    let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    const c = AV[Math.abs(h) % AV.length];
    return { width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: c + "22", color: c, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)" };
  }

  window.SP_Leads = Leads;
  window.SP_LeadDetail = LeadDetail;
})();
