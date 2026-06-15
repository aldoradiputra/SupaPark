import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Globe,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  QrCode,
  ScanLine,
  Sparkles,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { LocationMap } from "@/components/map/location-map";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STEPS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: LogIn,
    title: "Masuk",
    desc: "Kamera ALPR membaca plat nomor secara otomatis. Portal terbuka — tanpa ambil tiket.",
  },
  {
    icon: Car,
    title: "Parkir",
    desc: "Sesi parkir tercatat otomatis. Tanpa tiket, tanpa kartu, tanpa antre.",
  },
  {
    icon: LogOut,
    title: "Keluar",
    desc: "Bayar dengan QRIS atau e-wallet di pintu keluar. Portal terbuka, selesai.",
  },
];

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ScanLine,
    title: "ALPR Otomatis",
    desc: "Plat nomor adalah tiket Anda. Terbaca otomatis tanpa perlu ambil tiket.",
  },
  {
    icon: QrCode,
    title: "QRIS + E-Wallet",
    desc: "Pembayaran nontunai lewat QRIS atau dompet digital favorit pelanggan.",
  },
  {
    icon: Users,
    title: "Manajemen Member",
    desc: "Parkir gratis atau berlangganan untuk member terdaftar per lokasi.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Real-time",
    desc: "Pantau okupansi dan pendapatan dari mana saja, kapan saja.",
  },
  {
    icon: WifiOff,
    title: "Mampu Offline",
    desc: "Tetap beroperasi saat internet padam, lalu sinkron otomatis.",
  },
  {
    icon: Building2,
    title: "Multi-Lokasi",
    desc: "Satu sistem untuk banyak lokasi parkir dalam satu jaringan.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Badge tone="amber" className="gap-1.5">
          <Sparkles size={13} />
          Sistem Parkir Cerdas
        </Badge>
        <Logo size={56} />
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Sistem Parkir Cerdas untuk Indonesia
        </h1>
        <p className="max-w-2xl text-base text-muted sm:text-lg">
          Plat nomor adalah tiket Anda. Masuk dan keluar tanpa tiket, bayar
          dengan QRIS atau e-wallet — cepat, aman, dan tanpa antre. Ditenagai
          ALPR dan pembayaran nontunai.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link href="/onboarding" className={buttonClassName({ size: "lg" })}>
            Mulai Sekarang
            <ArrowRight size={18} />
          </Link>
          <a
            href="#cara-kerja"
            className={buttonClassName({ variant: "secondary", size: "lg" })}
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* 2 — How it works */}
      <section
        id="cara-kerja"
        className="scroll-mt-24 border-t border-border bg-surface/40"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Cara Kerjanya
            </h2>
            <p className="mt-2 text-muted">
              Tanpa tiket. Tanpa tunai. Cukup berkendara.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <Card className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-subtle text-amber">
                      <step.icon size={22} />
                    </span>
                    <span className="font-mono text-sm text-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{step.desc}</p>
                  </div>
                </Card>
                {i < STEPS.length - 1 ? (
                  <ArrowRight
                    size={20}
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-faint md:block"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Features */}
      <section id="fitur" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Semua yang Anda butuhkan
            </h2>
            <p className="mt-2 text-muted">
              Perangkat keras hemat, perangkat lunak tangguh.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card
                key={f.title}
                className="flex flex-col gap-3 p-6 transition-colors hover:border-amber/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-subtle text-amber">
                  <f.icon size={20} />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Pricing / value */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Harga yang masuk akal
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Gantikan perangkat parkir mahal dengan solusi SupaPark. Setiap
            fasilitas berbeda — kami siapkan penawaran sesuai kebutuhan Anda.
          </p>
          <p className="mt-6 text-lg font-semibold text-amber">
            Hubungi kami untuk penawaran khusus
          </p>
          <div className="mt-6">
            <Link
              href="/onboarding"
              className={buttonClassName({ size: "lg" })}
            >
              Ajukan Penawaran
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5 — Map */}
      <section id="lokasi" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Bergabung dengan jaringan SupaPark
            </h2>
            <p className="mt-2 text-muted">
              Lokasi yang sudah menggunakan SupaPark di seluruh Indonesia.
            </p>
          </div>
          <LocationMap />
        </div>
      </section>

      {/* 6 — CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Siap Memulai?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Daftarkan fasilitas Anda dalam dua langkah singkat. Tim kami akan
            menghubungi Anda.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className={buttonClassName({ size: "lg", className: "flex-1" })}
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className={buttonClassName({
                variant: "secondary",
                size: "lg",
                className: "flex-1",
              })}
            >
              Masuk Dashboard
            </Link>
          </div>
          <p className="mt-4 text-xs text-faint">
            Tanpa komitmen. Konsultasi gratis.
          </p>
        </div>
      </section>

      {/* 7 — Footer */}
      <footer className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5">
                <Logo size={26} />
                <span className="text-lg font-bold tracking-[0.01em] text-foreground">
                  SupaPark
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">
                Sistem parkir ticketless &amp; offline-first untuk Indonesia.
                Cegah kebocoran, maksimalkan pendapatan.
              </p>
            </div>

            <nav className="flex flex-col gap-2 text-sm">
              <span className="text-xs font-semibold uppercase tracking-label text-faint">
                Tautan
              </span>
              <Link href="#fitur" className="text-muted hover:text-foreground">
                Tentang
              </Link>
              <a
                href="mailto:halo@supapark.id"
                className="text-muted hover:text-foreground"
              >
                Kontak
              </a>
              <Link href="#" className="text-muted hover:text-foreground">
                Kebijakan Privasi
              </Link>
            </nav>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-label text-faint">
                Terhubung
              </span>
              <div className="flex gap-2">
                {[
                  { icon: Mail, href: "mailto:halo@supapark.id", label: "Email" },
                  { icon: MessageCircle, href: "#", label: "WhatsApp" },
                  { icon: Globe, href: "#", label: "Website" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-amber/40 hover:text-amber"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-xs text-faint">
            © {new Date().getFullYear()} SupaPark. Semua hak dilindungi.
          </div>
        </div>
      </footer>
    </>
  );
}
