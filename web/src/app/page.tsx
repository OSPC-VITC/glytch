"use client";

import { Suspense, lazy, useEffect, useState, useCallback, useMemo } from "react";
import DemoOne from "@/components/ui/demo-one";
import Loader from "@/components/ui/Loader";
import { GlytchCountdown } from "@/components/ui/demo-one";

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

  return (
    <>
      <DemoOne />

      {/* Countdown */}
      <GlytchCountdown />

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