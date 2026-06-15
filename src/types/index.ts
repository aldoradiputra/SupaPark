import type { Database } from "@/types/database.types";

// Convenience aliases over the generated schema, so app code imports
// `ParkingSession` instead of the verbose Database[...] indexing.
type Tables = Database["public"]["Tables"];
export type Enums = Database["public"]["Enums"];

export type Organization = Tables["organizations"]["Row"];
export type Location = Tables["locations"]["Row"];
export type Lane = Tables["lanes"]["Row"];
export type Vehicle = Tables["vehicles"]["Row"];
export type Member = Tables["members"]["Row"];
export type ParkingSession = Tables["parking_sessions"]["Row"];
export type Payment = Tables["payments"]["Row"];
export type PlateRule = Tables["plate_rules"]["Row"];
export type AppUser = Tables["users"]["Row"];
export type Lead = Tables["leads"]["Row"];
export type Project = Tables["projects"]["Row"];

export type VehicleType = Enums["vehicle_type"];
export type LaneType = Enums["lane_type"];
export type LaneStatus = Enums["lane_status"];
export type PaymentMethod = Enums["payment_method"];
export type PaymentStatus = Enums["payment_status"];
export type SessionStatus = Enums["session_status"];
export type PlateRuleType = Enums["plate_rule_type"];
export type UserRole = Enums["user_role"];
export type LeadSource = Enums["lead_source"];
export type LeadStatus = Enums["lead_status"];
export type ProjectStatus = Enums["project_status"];

// Shape of locations.tariff_config (stored as JSONB).
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
