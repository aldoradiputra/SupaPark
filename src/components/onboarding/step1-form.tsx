"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { Field } from "@/components/onboarding/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOnboardingLead } from "@/lib/queries/leads";
import { createClient } from "@/lib/supabase/client";
import { onboardingStorageKey } from "./storage";

const schema = z.object({
  name: z.string().trim().min(1, "Nama lengkap wajib diisi"),
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  phone: z
    .string()
    .trim()
    .min(1, "No. handphone wajib diisi")
    .regex(/^(\+62|08)\d{6,13}$/, "Nomor harus diawali 08 atau +62"),
  facilityName: z.string().trim().min(1, "Nama fasilitas wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

export function Step1Form() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const supabase = createClient();
      const id = await createOnboardingLead(supabase, values);
      // Persist step-1 data so step 2 can prefill without reading leads (RLS).
      sessionStorage.setItem(
        onboardingStorageKey(id),
        JSON.stringify({ facilityName: values.facilityName }),
      );
      router.push(`/onboarding/${id}`);
    } catch {
      setSubmitError("Gagal menyimpan data. Silakan coba lagi.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field label="Nama Lengkap" htmlFor="name" error={errors.name?.message}>
        <Input id="name" placeholder="Budi Santoso" {...register("name")} />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="budi@email.com"
          {...register("email")}
        />
      </Field>

      <Field
        label="No. Handphone"
        htmlFor="phone"
        error={errors.phone?.message}
        hint="Contoh: 081234567890 atau +6281234567890"
      >
        <Input
          id="phone"
          inputMode="tel"
          placeholder="08xxxxxxxxxx"
          {...register("phone")}
        />
      </Field>

      <Field
        label="Nama Fasilitas"
        htmlFor="facilityName"
        error={errors.facilityName?.message}
      >
        <Input
          id="facilityName"
          placeholder="Mall / Ruko / Kampus Anda"
          {...register("facilityName")}
        />
      </Field>

      {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="mt-1">
        {isSubmitting ? "Menyimpan…" : "Lanjut"}
        <ArrowRight size={18} />
      </Button>
    </form>
  );
}
