"use client";

import { useEffect, useRef } from "react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type Payload = RealtimePostgresChangesPayload<Record<string, unknown>>;

/**
 * Subscribe to postgres_changes on a table (optionally filtered, e.g.
 * `location_id=eq.<uuid>`) and run onChange for each event. Cleans up the
 * channel on unmount / dependency change. The callback is held in a ref so
 * changing it doesn't re-subscribe.
 */
export function useRealtime(opts: {
  table: string;
  filter?: string;
  enabled?: boolean;
  onChange: (payload: Payload) => void;
}) {
  const { table, filter, enabled = true, onChange } = opts;
  const cb = useRef(onChange);
  cb.current = onChange;

  useEffect(() => {
    if (!enabled) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`rt-${table}-${filter ?? "all"}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, ...(filter ? { filter } : {}) },
        (payload) => cb.current(payload as Payload),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, filter, enabled]);
}
