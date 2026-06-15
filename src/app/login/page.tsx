import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2.5">
          <Logo size={30} />
          <span className="text-xl font-bold tracking-[0.01em] text-foreground">
            SupaPark
          </span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Operator dashboard</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
