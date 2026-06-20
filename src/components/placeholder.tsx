import { Card } from "@/components/ui/card";

/**
 * Generic scaffold page. Each dashboard route renders one of these until its
 * real screen is wired to the queries in src/lib/queries.
 */
export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      <Card className="flex min-h-[280px] flex-col items-center justify-center gap-1 p-8 text-center">
        <p className="text-sm font-medium text-muted">Module placeholder</p>
        <p className="max-w-md text-xs text-faint">
          This screen is part of the SupaPark dashboard scaffold. Wire it to
          Supabase via <code className="font-mono">src/lib/queries</code>.
        </p>
      </Card>
    </div>
  );
}
