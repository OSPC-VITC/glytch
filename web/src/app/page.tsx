"use client";

import { Suspense, lazy, useEffect, useState, useCallback, useMemo } from "react";
import DemoOne from "@/components/ui/demo-one";
import Loader from "@/components/ui/Loader";

const About = lazy(() => import("@/components/sections/About"));
const Prizes = lazy(() => import("@/components/sections/Prizes"));
const FAQ = lazy(() => import("@/components/sections/FAQ"));
const Sponsors = lazy(() => import("@/components/sections/Sponsors"));
const Tracks = lazy(() => import("@/components/sections/Tracks"));
const Judges = lazy(() => import("@/components/sections/Judges"));
const Partners = lazy(() => import("@/components/sections/Partners"));
const Organizers = lazy(() => import("@/components/sections/Organisers"));

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Memoize target date to prevent recalculation
  const targetDate = useMemo(() => new Date("2025-11-03T00:00:00").getTime(), []);

  // Optimized countdown calculation
  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference % 86400000) / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  // Countdown logic with optimized updates
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  // Memoize countdown items to prevent recreation
  const countdownItems = useMemo(() => [
    { value: timeLeft.days, label: "DAYS", color: "from-pink-500 to-rose-500" },
    { value: timeLeft.hours, label: "HRS", color: "from-purple-500 to-violet-500" },
    { value: timeLeft.minutes, label: "MIN", color: "from-blue-500 to-cyan-500" },
    { value: timeLeft.seconds, label: "SEC", color: "from-cyan-500 to-teal-500" },
  ], [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]);

  return (
    <>
      <DemoOne />

      {/* Countdown */}
      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-auto">
        <div className="bg-black/30 rounded-2xl border border-white/10 p-6">
          {/* Info Row - Compact */}
          <div className="flex items-center justify-center gap-8 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
              <span className="text-white/70">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-semibold text-white">
                  MG Auditorium
                </span>
              </span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <span className="text-white/70">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold text-white">
                  3 Nov 2025
                </span>
              </span>
            </div>
          </div>

          {/* Countdown Grid - Clean */}
          <div className="grid grid-cols-4 gap-3">
            {countdownItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white font-mono mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className={`text-xs font-bold text-transparent bg-clip-text text-white`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Portal */}
      <main className="px-2 py-40 max-w-5xl mx-auto space-y-16 bg-transparent">
        <div id="about" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <About />
          </Suspense>
        </div>

        <div id="tracks" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Tracks />
          </Suspense>
        </div>

        <div id="prizes" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Prizes />
          </Suspense>
        </div>

        <div id="judges" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Judges />
          </Suspense>
        </div>

        <div id="organisers" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Organizers />
          </Suspense>
        </div>

        <div id="partners" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Partners />
          </Suspense>
        </div>

        <div id="sponsors" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Sponsors />
          </Suspense>
        </div>

        <div id="faq" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <FAQ />
          </Suspense>
        </div>
      </main>
    </>
  );
}