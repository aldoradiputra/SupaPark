"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { Field } from "@/components/onboarding/field";
import { OnboardingMap } from "@/components/onboarding/onboarding-map";
import { onboardingStorageKey, type OnboardingDraft } from "./storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitOnboardingLead } from "@/lib/queries/leads";
import { createClient } from "@/lib/supabase/client";
import type { CurrentSystemType } from "@/types";

const CURRENT_SYSTEMS: { value: CurrentSystemType; label: string }[] = [
  { value: "manual", label: "Manual / petugas" },
  { value: "barrier_gate", label: "Palang otomatis" },
  { value: "ticket_dispenser", label: "Mesin tiket" },
  { value: "rfid", label: "RFID / e-toll" },
  { value: "competitor", label: "Sistem lain" },
  { value: "none", label: "Belum ada" },
  { value: "other", label: "Lainnya" },
];

const numStr = z
  .string()
  .trim()
  .regex(/^\d*$/, "Hanya angka")
  .optional();

const schema = z.object({
  city: z.string().trim().min(1, "Kota wajib diisi"),
  address: z.string().trim().min(1, "Alamat wajib diisi"),
  entryLanes: numStr,
  exitLanes: numStr,
  currentSystem: z.string().optional(),
  dailyVolume: numStr,
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const toNum = (s?: string) =>
  s && s.trim() !== "" ? Number(s) : undefined;

export function Step2Form({ id }: { id: string }) {
  const router = useRouter();
  const [facilityName, setFacilityName] = useState<string | null>(null);
  const [picked, setPicked] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(onboardingStorageKey(id));
      if (raw) {
        const draft = JSON.parse(raw) as OnboardingDraft;
        setFacilityName(draft.facilityName ?? null);
      }
    } catch {
      // no draft — facility name just won't prefill
    }
  }, [id]);

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const supabase = createClient();
      await submitOnboardingLead(supabase, id, {
        city: values.city,
        address: values.address,
        latitude: picked?.lat,
        longitude: picked?.lng,
        entryLanes: toNum(values.entryLanes),
        exitLanes: toNum(values.exitLanes),
        currentSystem: values.currentSystem
          ? (values.currentSystem as CurrentSystemType)
          : undefined,
        dailyVolume: toNum(values.dailyVolume),
        preferredDate: values.preferredDate || undefined,
        notes: values.notes || undefined,
      });
      sessionStorage.removeItem(onboardingStorageKey(id));
      router.push("/onboarding/success");
    } catch {
      setSubmitError("Gagal menyimpan data. Silakan coba lagi.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {facilityName ? (
        <div className="rounded-lg border border-border bg-surface-overlay px-3 py-2.5 text-sm">
          <span className="text-faint">Fasilitas: </span>
          <span className="font-medium text-foreground">{facilityName}</span>
        </div>
      ) : null}

      <Field label="Lokasi di Peta">
        <OnboardingMap
          value={picked}
          onPick={({ lat, lng, address }) => {
            setPicked({ lat, lng });
            if (address) setValue("address", address, { shouldValidate: true });
          }}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Kota" htmlFor="city" error={errors.city?.message}>
          <Input id="city" placeholder="Jakarta Pusat" {...register("city")} />
        </Field>
        <Field
          label="Tanggal Demo"
          htmlFor="preferredDate"
          error={errors.preferredDate?.message}
        >
          <Input id="preferredDate" type="date" {...register("preferredDate")} />
        </Field>
      </div>

      <Field
        label="Alamat"
        htmlFor="address"
        error={errors.address?.message}
        hint="Terisi otomatis dari peta — boleh disunting."
      >
        <Textarea
          id="address"
          placeholder="Alamat lengkap fasilitas"
          {...register("address")}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Jalur Masuk"
          htmlFor="entryLanes"
          error={errors.entryLanes?.message}
        >
          <Input
            id="entryLanes"
            inputMode="numeric"
            placeholder="2"
            {...register("entryLanes")}
          />
        </Field>
        <Field
          label="Jalur Keluar"
          htmlFor="exitLanes"
          error={errors.exitLanes?.message}
        >
          <Input
            id="exitLanes"
            inputMode="numeric"
            placeholder="2"
            {...register("exitLanes")}
          />
        </Field>
        <Field
          label="Volume Harian"
          htmlFor="dailyVolume"
          error={errors.dailyVolume?.message}
        >
          <Input
            id="dailyVolume"
            inputMode="numeric"
            placeholder="1500"
            {...register("dailyVolume")}
          />
        </Field>
      </div>

      <Field label="Sistem Saat Ini" htmlFor="currentSystem">
        <Select id="currentSystem" defaultValue="" {...register("currentSystem")}>
          <option value="">Pilih sistem</option>
          {CURRENT_SYSTEMS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Catatan" htmlFor="notes">
        <Textarea
          id="notes"
          placeholder="Kebutuhan khusus, pertanyaan, dll. (opsional)"
          {...register("notes")}
        />
      </Field>

      {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="mt-1">
        {isSubmitting ? "Mengirim…" : "Kirim Pendaftaran"}
        <ArrowRight size={18} />
      </Button>
    </form>
  );
}
