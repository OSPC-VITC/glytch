"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import DemoOne from "@/components/ui/demo-one";
import Loader from "@/components/ui/Loader";

const Resources = lazy(() => import("@/components/sections/Resources").then(m => ({ default: m.ResourcesSection })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.ContactSection })));
const Rules = lazy(() => import("@/components/sections/Rules").then(m => ({ default: m.RulesSection })));
const Timeline = lazy(() => import("@/components/sections/Timeline").then(m => ({ default: m.Timeline })));

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ⏱ Countdown logic
  useEffect(() => {
    const targetDate = new Date("2025-09-24T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const events = [
    { id: "1", title: "Check In", start: "08:00", end: "09:00" },
    { id: "2", title: "Welcome", start: "09:00", end: "09:30" },
    { id: "3", title: "Phase 1", start: "09:30", end: "13:20" },
    { id: "4", title: "Lunch", start: "13:20", end: "14:00" },
    { id: "5", title: "Phase 2", start: "14:00", end: "15:30" },
    { id: "6", title: "Evaluation & Submission", start: "15:30", end: "16:30" },
    { id: "7", title: "Winner Announcement & Closing", start: "16:30", end: "16:45" },
  ];

  return (
    <>
      <DemoOne />

      {/* Countdown */}
      <div
        className="absolute top-[65%] left-1/2 -translate-x-1/2 
           w-fit px-6 md:px-10 py-4 rounded-2xl
           bg-black/60 backdrop-blur-md backdrop-saturate-150 border-2 border-cyan-400/40
           shadow-[0_0_30px_#22d3ee] z-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.08) 35%, transparent 60%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        />

        <div className="relative z-10 flex items-center justify-center gap-6 md:gap-12 text-white whitespace-nowrap">
          <div className="text-xs md:text-sm lg:text-lg font-medium text-white/90 truncate max-w-[180px] md:max-w-none">
            Venue: <span className="text-cyan-400">Kamaraj Auditorium</span>
          </div>
          <div className="flex space-x-4 md:space-x-6 text-center font-mono shrink-0">
            <div>
              <p className="text-lg md:text-2xl font-bold text-cyan-400">{timeLeft.days}</p>
              <span className="text-[10px] md:text-xs text-gray-300">DAYS</span>
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-cyan-400">{timeLeft.hours}</p>
              <span className="text-[10px] md:text-xs text-gray-300">HRS</span>
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-cyan-400">{timeLeft.minutes}</p>
              <span className="text-[10px] md:text-xs text-gray-300">MIN</span>
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-cyan-400">{timeLeft.seconds}</p>
              <span className="text-[10px] md:text-xs text-gray-300">SEC</span>
            </div>
          </div>
          <div className="text-xs md:text-sm lg:text-lg font-medium text-white/90 shrink-0">
            Date: <span className="text-cyan-400">24 Sep 2025</span>
          </div>
        </div>
      </div>

      {/* Event Portal */}
      <main className="px-2 py-40 max-w-5xl mx-auto space-y-16 bg-transparent">
        <div id="timeline" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Timeline events={events} />
          </Suspense>
        </div>

        <div id="rules" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Rules />
          </Suspense>
        </div>

        <div id="resources" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Resources />
          </Suspense>
        </div>

        <div id="contact" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Contact />
          </Suspense>
        </div>
      </main>
    </>
  );
}
