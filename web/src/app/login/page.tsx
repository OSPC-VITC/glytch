"use client";

import { Suspense, type FormEvent, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ElectricBorder from "@/components/ui/ElectricBorder";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = useMemo(() => searchParams.get("redirect") ?? "/profile", [searchParams]);

  const [teamName, setTeamName] = useState("");
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
        const res = await fetch("/api/team/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teamName: teamName.trim(), password }),
        });
        const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (!res.ok || !json.ok) {
          setError(json.error || "Login failed. Check team name and password.");
          return;
        }
        setMessage("Logged in successfully.");
        router.replace(redirectTo);
      } finally {
        setIsSubmitting(false);
      }
    },
    [teamName, password, router, redirectTo]
  );

  return (
    <main className="min-h-screen w-full px-6 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <ElectricBorder color="#22d3ee" thickness={2} className="rounded-2xl w-full">
        <div className="rounded-2xl bg-black/60 backdrop-blur-md p-6">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">Team Sign in</h1>
            <p className="text-sm text-gray-400 mt-1">Use your team name and password.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="team" className="text-sm text-gray-300">Team name</label>
              <input
                id="team"
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Your team name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        </ElectricBorder>
      </div>
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


