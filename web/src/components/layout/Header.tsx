"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export function Header() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setIsAuthenticated(Boolean(data.session));
        setIsLoading(false);
      }
    };
    loadSession();

    const supabase = getSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setIsAuthenticated(Boolean(session));
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav
        className="flex items-center gap-8 px-8 py-3 rounded-full
          bg-black/70 backdrop-blur-md border border-white/10
          shadow-[0_0_20px_rgba(0,0,0,0.6)]"
      >
        <Link
          href="/"
          className="text-cyan-400 font-semibold text-lg transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Event
        </Link>
        <Link
          href="/#timeline"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Timeline
        </Link>
        <Link
          href="/#rules"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Rules & Judging Criteria
        </Link>
        <Link
          href="/#announcements"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Announcements
        </Link>
        <Link
          href="/#resources"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Resources
        </Link>
        <Link
          href="/#contact"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Contact
        </Link>

        <button
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
          onClick={(e) => {
            e.preventDefault();
            if (!isAuthenticated) {
              router.push("/login?redirect=/admin");
              return;
            }
            router.push("/admin");
          }}
        >
          Admin
        </button>

        <div className="ml-2 pl-4 border-l border-white/10 flex items-center gap-3">
          {isLoading ? null : isAuthenticated ? (
            <button
              className="text-sm text-white/80 hover:text-red-300"
              onClick={async () => {
                const supabase = getSupabaseClient();
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm text-black bg-cyan-400 hover:bg-cyan-300 rounded-md px-3 py-1 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
