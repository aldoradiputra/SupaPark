/* SupaPark — Operator Dashboard demo data.
   Realistic Indonesian operators, facilities, cities, Rupiah amounts.
   Exposes window.SP_DATA. */

window.SP_DATA = {
  locations: [
    "Mall Grand Indonesia",
    "RS Siloam Kebon Jeruk",
    "Kampus BINUS Anggrek",
    "Ruko Galaxy Bekasi",
  ],

  /* --- Overview --- */
  stats: {
    activeSessions: 47,
    revenueToday: 12450000,
    occupancy: 72,
    alerts: 1,
  },
  // last 7 days revenue (in Rupiah)
  revenue7d: [
    { d: "Sen", v: 9800000 },
    { d: "Sel", v: 11200000 },
    { d: "Rab", v: 10400000 },
    { d: "Kam", v: 13100000 },
    { d: "Jum", v: 15600000 },
    { d: "Sab", v: 18200000 },
    { d: "Min", v: 12450000 },
  ],
  occupancyMix: { car: { cur: 187, cap: 250 }, moto: { cur: 312, cap: 500 } },
  recentSessions: [
    { plate: "B 1234 KJP", type: "car", entry: "14:02", dur: "1h 47m", st: "pending" },
    { plate: "D 5678 ABC", type: "moto", entry: "13:48", dur: "2h 01m", st: "paid" },
    { plate: "B 9012 DEF", type: "car", entry: "14:31", dur: "0h 30m", st: "pending" },
    { plate: "F 3456 GHI", type: "car", entry: "13:15", dur: "1h 34m", st: "override" },
    { plate: "B 7890 JKL", type: "moto", entry: "14:46", dur: "0h 15m", st: "pending" },
    { plate: "B 2345 MNO", type: "car", entry: "12:50", dur: "2h 11m", st: "paid" },
    { plate: "L 6677 PQR", type: "moto", entry: "14:20", dur: "0h 41m", st: "pending" },
    { plate: "B 8899 STU", type: "car", entry: "11:30", dur: "3h 32m", st: "paid" },
  ],

  /* --- Leads (CRM) --- */
  leads: [
    { id: "ld_01", name: "Budi Santoso", facility: "Apartemen Taman Anggrek", city: "Jakarta Barat", status: "qualified", source: "Website", date: "2026-06-12",
      email: "budi.santoso@tamananggrek.id", phone: "+62 812-1100-2031", address: "Jl. Letjen S. Parman Kav. 21, Jakarta Barat", lanesIn: 3, lanesOut: 2, system: "Manual (karcis)", volume: 1800, lat: -6.178, lng: 106.792, prefDate: "2026-07-01",
      notes: "Pengelola ingin demo lapangan minggu depan. Tertarik fitur QRIS + member bulanan." },
    { id: "ld_02", name: "Siti Nurhaliza", facility: "RS Permata Hijau", city: "Jakarta Selatan", status: "new", source: "Referral", date: "2026-06-14",
      email: "siti.n@rspermata.co.id", phone: "+62 813-5566-7788", address: "Jl. Permata Hijau No. 9, Jakarta Selatan", lanesIn: 2, lanesOut: 2, system: "Gate lama (rusak)", volume: 2400, lat: -6.224, lng: 106.783, prefDate: "2026-07-15",
      notes: "" },
    { id: "ld_03", name: "Agus Wijaya", facility: "Pasar Modern BSD", city: "Tangerang", status: "contacted", source: "Pameran", date: "2026-06-10",
      email: "agus.wijaya@pasarbsd.id", phone: "+62 811-2233-4455", address: "Jl. Pahlawan Seribu, BSD City, Tangerang", lanesIn: 4, lanesOut: 3, system: "Tanpa sistem", volume: 3600, lat: -6.301, lng: 106.653, prefDate: "2026-08-01",
      notes: "Volume tinggi, butuh 7 lane. Sudah kirim proposal harga." },
    { id: "ld_04", name: "Dewi Lestari", facility: "Kampus Universitas Trisakti", city: "Jakarta Barat", status: "converted", source: "Website", date: "2026-05-28",
      email: "dewi.l@trisakti.ac.id", phone: "+62 812-9988-7766", address: "Jl. Kyai Tapa No. 1, Grogol, Jakarta Barat", lanesIn: 3, lanesOut: 3, system: "Manual (karcis)", volume: 2900, lat: -6.168, lng: 106.788, prefDate: "2026-06-20",
      notes: "Sudah dikonversi ke proyek. Kontrak ditandatangani 1 Juni." },
    { id: "ld_05", name: "Rudi Hartono", facility: "Ruko Pluit Village", city: "Jakarta Utara", status: "lost", source: "Referral", date: "2026-05-20",
      email: "rudi.h@pluitvillage.id", phone: "+62 813-1212-3434", address: "Jl. Pluit Indah Raya, Jakarta Utara", lanesIn: 1, lanesOut: 1, system: "Gate kompetitor", volume: 800, lat: -6.124, lng: 106.790, prefDate: "—",
      notes: "Memilih vendor lain karena harga. Follow-up Q4." },
    { id: "ld_06", name: "Maya Anggraini", facility: "Hotel Santika Premiere", city: "Bandung", status: "qualified", source: "Pameran", date: "2026-06-08",
      email: "maya.a@santika.com", phone: "+62 811-7070-8080", address: "Jl. Sumatera No. 52, Bandung", lanesIn: 2, lanesOut: 2, system: "Manual (karcis)", volume: 1500, lat: -6.908, lng: 107.610, prefDate: "2026-07-25",
      notes: "Manajemen tertarik integrasi WhatsApp receipt." },
    { id: "ld_07", name: "Hendra Gunawan", facility: "Mega Mall Pluit", city: "Jakarta Utara", status: "new", source: "Website", date: "2026-06-15",
      email: "hendra.g@megamall.id", phone: "+62 812-4545-6767", address: "Jl. Pluit Indah, Jakarta Utara", lanesIn: 6, lanesOut: 5, system: "Gate lama", volume: 5200, lat: -6.118, lng: 106.795, prefDate: "2026-09-01",
      notes: "" },
  ],

  /* --- Projects --- */
  projects: [
    { id: "pj_01", facility: "Universitas Trisakti", contact: "Dewi Lestari", city: "Jakarta Barat", lanesIn: 3, lanesOut: 3, status: "installation", targetLive: "2026-07-10", startDate: "2026-06-02", actualLive: "—",
      email: "dewi.l@trisakti.ac.id", phone: "+62 812-9988-7766", address: "Jl. Kyai Tapa No. 1, Grogol, Jakarta Barat", lat: -6.168, lng: 106.788,
      notes: "Pemasangan kamera ANPR di 6 lane berjalan. Estimasi selesai 5 Juli." },
    { id: "pj_02", facility: "Mall Grand Indonesia", contact: "Andi Pratama", city: "Jakarta Pusat", lanesIn: 4, lanesOut: 4, status: "live", targetLive: "2026-04-01", startDate: "2026-02-15", actualLive: "2026-03-28",
      email: "andi.p@grandindonesia.com", phone: "+62 811-3030-4040", address: "Jl. M.H. Thamrin No. 1, Jakarta Pusat", lat: -6.195, lng: 106.820,
      notes: "Live sejak Maret. Uptime 99.8%. Revenue naik 14% vs sistem lama." },
    { id: "pj_03", facility: "RS Siloam Kebon Jeruk", contact: "Putri Maharani", city: "Jakarta Barat", lanesIn: 2, lanesOut: 2, status: "testing", targetLive: "2026-06-25", startDate: "2026-05-10", actualLive: "—",
      email: "putri.m@siloam.co.id", phone: "+62 813-6060-7070", address: "Jl. Perjuangan, Kebon Jeruk, Jakarta Barat", lat: -6.190, lng: 106.770,
      notes: "Uji coba 1 minggu. Akurasi plat 97,4%. Tuning kamera lane 2." },
    { id: "pj_04", facility: "Kampus BINUS Anggrek", contact: "Fajar Nugroho", city: "Jakarta Barat", lanesIn: 3, lanesOut: 2, status: "procurement", targetLive: "2026-08-15", startDate: "2026-06-10", actualLive: "—",
      email: "fajar.n@binus.edu", phone: "+62 812-8080-9090", address: "Jl. Kebon Jeruk Raya No. 27, Jakarta Barat", lat: -6.201, lng: 106.782,
      notes: "PO hardware dikirim. Menunggu kedatangan barrier gate (ETA 2 minggu)." },
    { id: "pj_05", facility: "Pasar Modern BSD", contact: "Agus Wijaya", city: "Tangerang", lanesIn: 4, lanesOut: 3, status: "planning", targetLive: "2026-09-30", startDate: "2026-06-14", actualLive: "—",
      email: "agus.wijaya@pasarbsd.id", phone: "+62 811-2233-4455", address: "Jl. Pahlawan Seribu, BSD City, Tangerang", lat: -6.301, lng: 106.653,
      notes: "Survey lokasi terjadwal 20 Juni. Finalisasi jumlah lane." },
  ],

  // pipeline order
  pipeline: ["planning", "procurement", "installation", "testing", "live"],
};
