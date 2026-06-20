/** Normalize a plate exactly like the DB generated column. */
export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]+/g, "");
}
