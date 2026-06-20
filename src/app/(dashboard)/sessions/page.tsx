"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  EmptyState,
  ErrorState,
  NoLocation,
  TableSkeleton,
} from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listParkingSessionsPaged } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useAsync } from "@/lib/use-async";
import { useRealtime } from "@/lib/use-realtime";
import { formatDateTime, formatDuration, formatRupiah } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { PaymentStatus } from "@/types";

const PAGE_SIZE = 20;
const PAYMENT_STATUSES: PaymentStatus[] = [
  "paid",
  "pending",
  "failed",
  "expired",
  "refunded",
  "cancelled",
];

export default function SessionsPage() {
  const locationId = useAppStore((s) => s.selectedLocationId);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(0);

  const { data, loading, error, reload } = useAsync(async () => {
    if (!locationId) return null;
    return listParkingSessionsPaged(createClient(), {
      locationId,
      search: search || undefined,
      paymentStatus: paymentStatus || undefined,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(to + "T23:59:59").toISOString() : undefined,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    });
  }, [locationId, search, paymentStatus, from, to, page]);

  useRealtime({
    table: "parking_sessions",
    filter: locationId ? `location_id=eq.${locationId}` : undefined,
    enabled: !!locationId,
    onChange: () => {
      if (page === 0) reload();
    },
  });

  if (!locationId) {
    return (
      <>
        <PageHeader title="Sessions" />
        <NoLocation />
      </>
    );
  }

  const rows = data?.rows ?? [];
  const total = data?.count ?? 0;
  const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);

  return (
    <>
      <PageHeader
        title="Sessions"
        description="Sesi masuk/keluar dari setiap jalur."
      />

      <Card className="mb-4 p-4">
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(0);
            setSearch(searchInput.trim());
          }}
        >
          <div className="flex flex-1 items-center gap-2">
            <Input
              placeholder="Cari plat…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="min-w-[160px]"
            />
            <Button type="submit" size="md" variant="secondary">
              <Search size={16} />
            </Button>
          </div>
          <Select
            value={paymentStatus}
            onChange={(e) => {
              setPage(0);
              setPaymentStatus(e.target.value as PaymentStatus | "");
            }}
            className="w-auto"
          >
            <option value="">Semua pembayaran</option>
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </Select>
          <Input
            type="date"
            value={from}
            onChange={(e) => {
              setPage(0);
              setFrom(e.target.value);
            }}
            className="w-auto"
            aria-label="Dari tanggal"
          />
          <Input
            type="date"
            value={to}
            onChange={(e) => {
              setPage(0);
              setTo(e.target.value);
            }}
            className="w-auto"
            aria-label="Sampai tanggal"
          />
        </form>
      </Card>

      <Card className="p-3">
        {error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : loading ? (
          <TableSkeleton cols={6} />
        ) : !rows.length ? (
          <EmptyState message="Tidak ada sesi yang cocok." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Plat</TH>
                <TH>Jenis</TH>
                <TH>Masuk</TH>
                <TH>Keluar</TH>
                <TH>Durasi</TH>
                <TH className="text-right">Biaya</TH>
                <TH>Bayar</TH>
                <TH>Sesi</TH>
              </TR>
            </THead>
            <TBody>
              {rows.map((s) => (
                <TR key={s.id}>
                  <TD className="plate text-sm">{s.plate}</TD>
                  <TD className="capitalize text-muted">
                    {s.vehicle_type ?? "—"}
                  </TD>
                  <TD className="text-muted">{formatDateTime(s.entry_time)}</TD>
                  <TD className="text-muted">{formatDateTime(s.exit_time)}</TD>
                  <TD className="text-muted">{formatDuration(s.duration_min)}</TD>
                  <TD className="text-right font-mono">
                    {formatRupiah(s.fee_paid)}
                  </TD>
                  <TD>
                    <StatusBadge value={s.payment_status} />
                  </TD>
                  <TD>
                    <StatusBadge value={s.session_status} />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}

        <div className="flex items-center justify-between px-2 pt-3 text-xs text-muted">
          <span>
            {total > 0
              ? `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} dari ${total}`
              : "0 sesi"}
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 0 || loading}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Sebelumnya
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= lastPage || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
