"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import DemoOne from "@/components/ui/demo-one";
import Loader from "@/components/ui/Loader";
import Organizers from "@/components/sections/Organisers";
import Partners from "@/components/sections/Partners";
import Judges from "@/components/sections/Judges";
import Tracks from "@/components/sections/Tracks";

const Timeline = lazy(() => import("@/components/sections/Timeline").then(m => ({ default: m.Timeline })));
const About = lazy(() => import("@/components/sections/About"));
const Prizes = lazy(() => import("@/components/sections/Prizes"));
const Resources = lazy(() => import("@/components/sections/Resources").then(m => ({ default: m.ResourcesSection })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.ContactSection })));
const Rules = lazy(() => import("@/components/sections/Rules").then(m => ({ default: m.RulesSection })));
const Author = lazy(() => import("@/components/sections/Author").then(m => ({ default: m.Author })));
const FAQ = lazy(() => import("@/components/sections/FAQ"));

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
    { id: "1", title: "Check In", start: "08:00", end: "10:00" },
    { id: "2", title: "Welcome", start: "10:00", end: "10:30" },
    { id: "3", title: "Phase 1", start: "10:30", end: "13:20" },
    { id: "4", title: "Lunch", start: "13:20", end: "14:00" },
    { id: "5", title: "Phase 2", start: "14:00", end: "15:30" },
    { id: "6", title: "Review 1", start: "15:30", end: "16:30" },
    { id: "7", title: "Phase 3 and Submission", start: "16:30", end: "11:59" },
  ];

  return (
    <>
      <DemoOne />

      {/* Countdown */}
      <div
            className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-auto"
          >
            <div className=" bg-black/30 rounded-2xl border border-white/10 p-6">
              
              {/* Info Row - Compact */}
              <div className="flex items-center justify-center gap-8 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                  <span className="text-white/70">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-semibold text-white">Kamaraj Auditorium</span>
                  </span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <span className="text-white/70">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold text-white">24 Sep 2025</span>
                  </span>
                </div>
              </div>

              {/* Countdown Grid - Clean */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: timeLeft.days, label: "DAYS", color: "from-pink-500 to-rose-500" },
                  { value: timeLeft.hours, label: "HRS", color: "from-purple-500 to-violet-500" },
                  { value: timeLeft.minutes, label: "MIN", color: "from-blue-500 to-cyan-500" },
                  { value: timeLeft.seconds, label: "SEC", color: "from-cyan-500 to-teal-500" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div
                      className="text-4xl md:text-5xl font-black text-white font-mono mb-1"
                    >
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
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
            <Tracks/>
          </Suspense>
        </div>

        <div id="prizes" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Prizes />
          </Suspense>
        </div>

        <div id="judges" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Judges/>
          </Suspense>
        </div>

        <div id="organisers" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Organizers/>
          </Suspense>
        </div>

        <div id="partners" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Partners/>
          </Suspense>
        </div>

        <div id="sponsors" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">Sponsors</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Thank you to our sponsors!
              </p>
            </div>
          </Suspense>
        </div>

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

        <div id="faq" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <FAQ />
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

        <div id="authors" className="scroll-mt-24">
          <Suspense fallback={<Loader size={24} />}>
            <Author />
          </Suspense>
        </div>

      </main>
    </>
  );
}