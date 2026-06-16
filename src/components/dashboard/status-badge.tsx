import { Badge, type BadgeProps } from "@/components/ui/badge";

const TONE: Record<string, BadgeProps["tone"]> = {
  // session
  active: "info",
  completed: "success",
  cancelled: "neutral",
  abandoned: "neutral",
  // payment
  paid: "success",
  pending: "amber",
  failed: "error",
  expired: "neutral",
  refunded: "neutral",
  free: "success",
  // lead
  new: "neutral",
  contacted: "info",
  qualified: "amber",
  converted: "success",
  lost: "error",
  // project
  planning: "neutral",
  procurement: "info",
  installation: "amber",
  testing: "info",
  live: "success",
  maintenance: "amber",
  // lane
  online: "success",
  offline: "neutral",
  disabled: "error",
};

export function StatusBadge({ value }: { value: string | null | undefined }) {
  if (!value) return <span className="text-faint">—</span>;
  const label = value.replace(/_/g, " ");
  return (
    <Badge tone={TONE[value] ?? "neutral"} className="capitalize">
      {label}
    </Badge>
  );
}
