import { normalizePlate } from "@/lib/utils";
import type { TypedSupabaseClient } from "@/lib/supabase/types";
import type { Json } from "@/types/database.types";
import type { VehicleType } from "@/types";

export async function getVehicleByPlate(
  supabase: TypedSupabaseClient,
  plate: string,
) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("plate_normalized", normalizePlate(plate))
    .maybeSingle();
  if (error) throw error;
  return data;
}

export interface LinkVehicleInput {
  plate: string;
  phone?: string;
  push?: Json;
  vehicleType?: VehicleType;
}

/**
 * Public plate<->phone linking via the link_vehicle() SECURITY DEFINER RPC.
 * Returns the vehicle id. Works for anon (no table grants required).
 */
export async function linkVehicle(
  supabase: TypedSupabaseClient,
  { plate, phone, push, vehicleType }: LinkVehicleInput,
) {
  const { data, error } = await supabase.rpc("link_vehicle", {
    p_plate: plate,
    p_phone: phone ?? null,
    p_push: push ?? null,
    p_vehicle_type: vehicleType ?? null,
  });
  if (error) throw error;
  return data;
}
