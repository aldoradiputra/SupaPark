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
