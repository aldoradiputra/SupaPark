export type VehicleType = "car" | "motorcycle";

export interface TariffTier {
  first_hour: number;
  next_hour: number;
  max_daily: number;
  grace_min: number;
}

export interface TariffConfig {
  car: TariffTier;
  motorcycle: TariffTier;
}

/** Coerce arbitrary ALPR input to a known vehicle type (defaults to car). */
export function asVehicleType(value: unknown): VehicleType {
  return value === "motorcycle" ? "motorcycle" : "car";
}

export function tierFor(
  config: TariffConfig | null | undefined,
  vt: VehicleType,
): TariffTier | null {
  return config?.[vt] ?? null;
}

/**
 * Fee in whole IDR.
 *   - members and durations within the grace window are free
 *   - first hour at first_hour, each additional (ceil) hour at next_hour
 *   - capped at max_daily per started 24h day
 */
export function calculateFee(
  tier: TariffTier | null,
  durationMin: number,
  isMember: boolean,
): number {
  if (isMember || !tier) return 0;
  if (durationMin <= tier.grace_min) return 0;

  const hours = Math.max(1, Math.ceil(durationMin / 60));
  const raw = tier.first_hour + (hours - 1) * tier.next_hour;
  const days = Math.max(1, Math.ceil(durationMin / 1440));
  return Math.min(raw, days * tier.max_daily);
}
