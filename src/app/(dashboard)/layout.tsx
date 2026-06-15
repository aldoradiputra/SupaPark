import { redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";

/** Auth guard: every (dashboard) route requires a Supabase session. */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-8 py-7">
        {children}
      </main>
    </div>
  );
}
