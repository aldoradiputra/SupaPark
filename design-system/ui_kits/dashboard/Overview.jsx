/* SupaPark Dashboard — Overview page. window.SP_Overview */
(function () {
  const U = window.SPUI;
  const { StatCard, Panel, Table, THRow, TD, RevenueChart, OccupancyGauge, Icon } = U;
  const _DS = window.SupaParkDesignSystem_80b640;
  const { StatusBadge, PlateDisplay } = _DS;

  function Overview({ t, locale }) {
    const D = window.SP_DATA;
    const carType = locale === "en" ? "Car" : "Mobil";
    const motoType = locale === "en" ? "Moto" : "Motor";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <U.PageHeader title={t.liveOverview} sub={locale === "en" ? "Real-time across all lanes · updated 3s ago" : "Real-time semua jalur · diperbarui 3 detik lalu"} />

        {/* stats */}
        <div className="sp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          <StatCard label={t.activeSessions} value="47" trend={locale === "en" ? "3 awaiting payment" : "3 menunggu bayar"} trendDir="muted" accent="#F5A623" icon="clock" />
          <StatCard label={t.todayRevenue} value={U.rupiah(D.stats.revenueToday)} trend="+12% vs kemarin" trendDir="up" accent="#22C55E" icon="dollar-sign" />
          <StatCard label={t.occupancy} value="72%" trend={locale === "en" ? "139 free" : "139 slot kosong"} trendDir="muted" accent="#3B82F6" icon="gauge" />
          <StatCard label={t.alerts} value="1" trend={locale === "en" ? "Exit B offline" : "Exit B offline"} trendDir="down" accent="#EF4444" icon="triangle-alert" />
        </div>

        {/* revenue + occupancy */}
        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
          <Panel title={locale === "en" ? "Revenue — last 7 days" : "Pendapatan — 7 hari terakhir"} icon="trending-up"
            right={<span style={{ fontSize: 13, fontWeight: 700, color: "var(--amber)", fontVariantNumeric: "tabular-nums" }}>{U.rupiahFull(D.revenue7d.reduce((a, b) => a + b.v, 0))}</span>}>
            <RevenueChart data={D.revenue7d} />
          </Panel>
          <Panel title={t.occupancy} icon="gauge">
            <OccupancyGauge mix={D.occupancyMix} />
          </Panel>
        </div>

        {/* sessions + alerts */}
        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
          <Panel title={t.recentSessions} icon="clock" pad={false}
            right={<span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{locale === "en" ? "Last 8" : "8 terakhir"}</span>}>
            <Table columns={[{ label: t.plate }, { label: t.type }, { label: t.entry }, { label: t.duration }, { label: t.status }]}>
              {D.recentSessions.map((s, i) => (
                <THRow key={i} last={i === D.recentSessions.length - 1}>
                  <TD><PlateDisplay plate={s.plate} size="sm" /></TD>
                  <TD>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Icon name={s.type === "car" ? "car" : "bike"} size={14} color="var(--text-secondary)" />
                      {s.type === "car" ? carType : motoType}
                    </span>
                  </TD>
                  <TD mono>{s.entry}</TD>
                  <TD strong mono>{s.dur}</TD>
                  <TD><StatusBadge value={s.st} /></TD>
                </THRow>
              ))}
            </Table>
          </Panel>

          <Panel title={t.alerts} icon="triangle-alert"
            right={<span style={{ fontSize: 11, fontWeight: 600, color: "var(--error)", background: "rgba(239,68,68,.15)", borderRadius: 999, padding: "2px 9px" }}>1</span>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, border: "1px solid var(--border)", background: "var(--surface-overlay)", borderRadius: 10, padding: 14 }}>
                <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8, background: "rgba(239,68,68,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="wifi-off" size={16} color="var(--error)" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{locale === "en" ? "Lane Exit B offline" : "Jalur Exit B offline"}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--error)", background: "rgba(239,68,68,.15)", borderRadius: 5, padding: "2px 6px" }}>Critical</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 5, lineHeight: 1.5 }}>
                    {locale === "en" ? "No heartbeat for 5 minutes. Gate sensor error detected." : "Tidak ada heartbeat selama 5 menit. Sensor portal terdeteksi error."}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                    <button style={{ height: 30, padding: "0 12px", fontSize: 12, fontWeight: 600, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface-raised)", color: "var(--text-primary)", cursor: "pointer", fontFamily: "var(--font-ui)" }}>{t.resolve}</button>
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>5m ago</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", padding: "8px 0 2px", fontSize: 12, color: "var(--text-tertiary)" }}>
                {locale === "en" ? "All other lanes operational" : "Jalur lain beroperasi normal"}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  window.SP_Overview = Overview;
})();
