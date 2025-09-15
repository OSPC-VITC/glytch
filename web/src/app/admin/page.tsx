"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) {
        const redirect = encodeURIComponent("/admin");
        router.replace(`/login?redirect=${redirect}`);
      }
    };
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Post announcements and manage content.
        </p>
      </header>

      <section className="rounded-md border border-gray-200 dark:border-white/10 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Admin tools coming soon.
        </p>
      </section>
    </main>
  );
}

