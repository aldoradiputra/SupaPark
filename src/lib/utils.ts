import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalize an Indonesian plate the same way the DB generated column does. */
export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]+/g, "");
}

/** Format whole Rupiah: 5000 -> "Rp 5.000". */
export function formatRupiah(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
}

/** Date + time in WIB, e.g. "16 Jun 14.05". */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Minutes -> "2j 15m" / "45m". */
export function formatDuration(min: number | null | undefined): string {
  if (min == null) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}j ${m}m` : `${m}m`;
}
