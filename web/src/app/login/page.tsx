"use client";

import { Suspense, type FormEvent, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ElectricBorder from "@/components/ui/ElectricBorder";

type AuthMode = "sign-in" | "sign-up";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = useMemo(() => searchParams.get("redirect") ?? "/", [searchParams]);

  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setMessage(null);
      setError(null);
      setIsSubmitting(true);

      try {
        const supabase = getSupabaseClient();
        const normalizedEmail = email.trim().toLowerCase();
        if (mode === "sign-in") {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });
          if (signInError) {
            setError(signInError.message);
          } else {
            setMessage("Successfully signed in.");
            router.replace(redirectTo);
          }
        } else {
          const supabase = getSupabaseClient();
          const { error: signUpError } = await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: {
              emailRedirectTo:
                typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
            },
          });
          if (signUpError) {
            setError(signUpError.message);
          } else {
            // Create a starter team profile row for the new team leader
            const { data: user } = await supabase.auth.getUser();
            if (user.user) {
              await fetch("/api/team-profile/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.user.id, email: normalizedEmail }),
              }).catch(() => undefined);
            }
            setMessage("Successfully created account. Please sign in.");
            setMode("sign-in");
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, mode, router, redirectTo]
  );

  return (
    <main className="min-h-screen px-6 py-24 max-w-md mx-auto">
      <ElectricBorder color="#22d3ee" thickness={2} className="rounded-2xl">
      <div className="rounded-2xl bg-black/60 backdrop-blur-md p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">
            {mode === "sign-in" ? "Sign in" : "Create an account"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {mode === "sign-in"
              ? "Use your email and password to continue."
              : "Sign up with email and password."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="text-sm text-red-400">{error}</div>
          ) : null}
          {message ? (
            <div className="text-sm text-green-400">{message}</div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-black font-medium py-2 transition-colors"
          >
            {isSubmitting
              ? mode === "sign-in"
                ? "Signing in..."
                : "Creating account..."
              : mode === "sign-in"
              ? "Sign in"
              : "Sign up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMessage(null);
                  setMode("sign-up");
                }}
                className="text-cyan-400 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMessage(null);
                  setMode("sign-in");
                }}
                className="text-cyan-400 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
      </ElectricBorder>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}


