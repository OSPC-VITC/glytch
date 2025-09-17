"use client";

import { useEffect, useState } from "react";
import { ResourcesSection } from "@/components/sections/Resources";
import { ContactSection } from "@/components/sections/Contact";
import { RulesSection } from "@/components/sections/Rules";
import { Timeline } from "@/components/sections/Timeline";
import DemoOne from "@/components/ui/demo-one";

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

  // 🎯 Define your timeline events here
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
      {/* Hero Background */}
      <DemoOne />

      {/* Countdown floating inside hero */}
      <div
        className="absolute top-[65%] left-1/2 -translate-x-1/2 
           w-fit px-6 md:px-10 py-4 rounded-2xl
           bg-black/80 backdrop-blur-md border border-white/10
           shadow-[0_0_25px_#00f6ff] flex items-center justify-center gap-6 md:gap-12
           text-white z-20 whitespace-nowrap"
      >
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

      {/* Event Portal (comes after hero) */}
      <main className="px-2 py-40 max-w-5xl mx-auto space-y-16 bg-transparent">
        <div id="timeline" className="scroll-mt-24">
          <Timeline events={events} />
        </div>

        <div id="rules" className="scroll-mt-24">
          <RulesSection />
        </div>

        <div id="resources" className="scroll-mt-24">
          <ResourcesSection />
        </div>

        <div id="contact" className="scroll-mt-24">
          <ContactSection />
        </div>
      </main>
    </>
  );
}
