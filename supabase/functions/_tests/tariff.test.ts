// Run: deno test supabase/functions/_tests/
// (_tests is underscore-prefixed so Supabase never deploys it as a function.)
import { asVehicleType, calculateFee, type TariffTier } from "../_shared/tariff.ts";

function assertEquals(actual: unknown, expected: unknown) {
  if (actual !== expected) {
    throw new Error(`expected ${expected}, got ${actual}`);
  }
}

const car: TariffTier = {
  first_hour: 5000,
  next_hour: 3000,
  max_daily: 50000,
  grace_min: 15,
};
const moto: TariffTier = {
  first_hour: 2000,
  next_hour: 1000,
  max_daily: 20000,
  grace_min: 15,
};

Deno.test("members park free", () => {
  assertEquals(calculateFee(car, 600, true), 0);
});

Deno.test("within grace is free", () => {
  assertEquals(calculateFee(car, 15, false), 0);
  assertEquals(calculateFee(car, 10, false), 0);
});

Deno.test("first hour", () => {
  assertEquals(calculateFee(car, 16, false), 5000);
  assertEquals(calculateFee(car, 60, false), 5000);
});

Deno.test("subsequent hours round up", () => {
  assertEquals(calculateFee(car, 90, false), 8000); // 5000 + 1*3000
  assertEquals(calculateFee(car, 121, false), 11000); // 5000 + 2*3000
});

Deno.test("daily cap applies", () => {
  // 20h -> 5000 + 19*3000 = 62000, capped at 50000
  assertEquals(calculateFee(car, 20 * 60, false), 50000);
});

Deno.test("multi-day caps per day", () => {
  // 48h -> capped at 2 * 50000
  assertEquals(calculateFee(car, 48 * 60, false), 100000);
});

Deno.test("motorcycle tier", () => {
  assertEquals(calculateFee(moto, 60, false), 2000);
  assertEquals(calculateFee(moto, 90, false), 3000);
});

Deno.test("null tier is free", () => {
  assertEquals(calculateFee(null, 600, false), 0);
});

Deno.test("vehicle type coercion", () => {
  assertEquals(asVehicleType("motorcycle"), "motorcycle");
  assertEquals(asVehicleType("car"), "car");
  assertEquals(asVehicleType(undefined), "car");
  assertEquals(asVehicleType("truck"), "car");
});
