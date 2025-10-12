"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);

  // Load Devfolio script (desktop only)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Detect which section is visible
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section:first-of-type, div:first-of-type');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const isInHero = rect.top <= 100 && rect.bottom >= 0;
      setIsHeroSection(isInHero);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Dynamic colors based on section
  const navColors = isHeroSection
    ? {
        bg: 'bg-[rgba(20,0,0,0.5)]',
        border: 'border-red-900/40',
        shadow: 'shadow-[0_8px_30px_rgba(139,0,0,0.6)]',
        innerBorder: 'rgba(255,0,51,0.15)',
        innerBorder2: 'rgba(255,0,51,0.08)',
        gradient: 'rgba(255,0,51,0.22)',
        gradient2: 'rgba(255,0,51,0.08)',
        linkHover: 'hover:text-red-400',
        linkGlow: 'hover:drop-shadow-[0_0_8px_#ff0033]',
        logo: 'text-red-400',
        logoGlow: 'hover:drop-shadow-[0_0_8px_#ff0033]'
      }
    : {
        bg: 'bg-[rgba(20,10,35,0.5)]',
        border: 'border-purple-500/30',
        shadow: 'shadow-[0_8px_30px_rgba(0,0,0,0.6)]',
        innerBorder: 'rgba(168,85,247,0.15)',
        innerBorder2: 'rgba(168,85,247,0.08)',
        gradient: 'rgba(236,72,153,0.22)',
        gradient2: 'rgba(236,72,153,0.08)',
        linkHover: 'hover:text-pink-400',
        linkGlow: 'hover:drop-shadow-[0_0_8px_#ec4899]',
        logo: 'text-pink-400',
        logoGlow: 'hover:drop-shadow-[0_0_8px_#ec4899]'
      };

  const LinkRow = ({ closeMenu }: { closeMenu?: () => void }) => (
    <>
      <Link href="/#about" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>About</Link>
      <Link href="/#tracks" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Tracks</Link>
      <Link href="/#prizes" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Prizes</Link>
      <Link href="/#judges" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Judges</Link>
      <Link href="/#organisers" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Organisers</Link>
      <Link href="/#partners" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Partners</Link>
      <Link href="/#sponsors" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>Sponsors</Link>
      <Link href="/#faq" onClick={closeMenu} className={`text-white/70 text-base md:text-lg font-semibold ${navColors.linkHover} transition-all ${navColors.linkGlow}`}>FAQ</Link>
    </>
  );

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav
        ref={navRef}
        className={`relative flex items-center gap-3 md:gap-6 px-4 md:px-8 py-3 rounded-full
          ${navColors.bg} backdrop-blur-lg backdrop-saturate-150
          border ${navColors.border} ${navColors.shadow} w-[calc(100%-1.5rem)] max-w-[1200px] transition-all duration-500`}
      >
        {/* Glass overlays */}
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-0 rounded-full transition-all duration-500" 
          style={{ boxShadow: `inset 0 0 0 1px ${navColors.innerBorder}, 0 0 0 1px ${navColors.innerBorder2}` }} 
        />
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-0 rounded-full opacity-40 transition-all duration-500" 
          style={{ 
            background: `radial-gradient(120% 140% at 50% 0%, ${navColors.gradient} 0%, ${navColors.gradient2} 35%, transparent 60%)`, 
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)" 
          }} 
        />

        {/* Logo */}
        <Link href="/" className={`${navColors.logo} font-semibold text-lg transition-all ${navColors.logoGlow} whitespace-nowrap`}>GLYTCH</Link>

        {/* Center nav links (desktop only) */}
        <div className="hidden md:flex items-center gap-5 flex-1 justify-center">
          <LinkRow />
        </div>

        {/* Desktop Devfolio Apply Button */}
        <div
          className="hidden md:block apply-button"
          data-hackathon-slug="glytch"
          data-button-theme="light"
          style={{ height: "44px", width: "312px" }}
        ></div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden ml-auto text-white/80"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Fixed mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-[80px] z-[9999] rounded-xl bg-black/70 backdrop-blur-md border border-white/15 p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <LinkRow closeMenu={() => setMobileOpen(false)} />
            {/* Mobile Apply Button */}
            <a
              href="https://devfolio.co"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 mt-2 rounded-lg bg-pink-500 text-white text-center font-medium hover:bg-pink-400 transition"
            >
              Apply with Devfolio
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;