"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Subtle follow-the-cursor motion for glass nav
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const max = 6;
      const tx = ((x - cx) / cx) * max;
      const ty = ((y - cy) / cy) * max;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    const handleLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const LinkRow = (
    <>
      <Link href="/#timeline" className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]">Timeline</Link>
      <Link href="/#rules" className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]">Rules & Judging Criteria</Link>
      <Link href="/#resources" className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]">Resources</Link>
      <Link href="/#contact" className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]">Contact</Link>
      <Link href="/profile" className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]">Team Profile</Link>
    </>
  );

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav
        ref={navRef}
        className="relative flex items-center gap-3 md:gap-8 px-4 md:px-8 py-3 rounded-full
          bg-[rgba(11,11,15,0.55)] backdrop-blur-md backdrop-saturate-150
          border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.38)] w-[calc(100%-1.5rem)] max-w-[1100px]"
      >
        {/* Glass overlays */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full opacity-40" style={{ background: "radial-gradient(120% 140% at 50% 0%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.08) 35%, transparent 60%)", maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)" }} />

        <Link href="/" className="text-cyan-400 font-semibold text-lg transition-all hover:drop-shadow-[0_0_8px_cyan]">Event</Link>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center overflow-x-auto">
          {LinkRow}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? null : isAuthenticated ? (
            <button
              className="text-sm text-black bg-cyan-400 hover:bg-cyan-300 rounded-md px-3 py-1 font-medium"
              onClick={async () => {
                const supabase = getSupabaseClient();
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="text-sm text-black bg-cyan-400 hover:bg-cyan-300 rounded-md px-3 py-1 font-medium">Login</Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden ml-auto text-white/80"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 p-4 md:hidden">
            <div className="flex flex-col gap-3">
              {LinkRow}
              <div className="pt-2 border-t border-white/10" />
              {isLoading ? null : isAuthenticated ? (
                <button
                  className="text-sm text-black bg-cyan-400 hover:bg-cyan-300 rounded-md px-3 py-2 font-medium"
                  onClick={async () => {
                    const supabase = getSupabaseClient();
                    await supabase.auth.signOut();
                    setMobileOpen(false);
                    router.refresh();
                  }}
                >
                  Sign out
                </button>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm text-black bg-cyan-400 hover:bg-cyan-300 rounded-md px-3 py-2 font-medium">Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
