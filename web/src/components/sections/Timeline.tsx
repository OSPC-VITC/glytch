"use client";

import React, { useEffect, useRef, useState } from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

type TimelineEvent = {
  id: string;
  title: string;
  start: string; // format: "HH:MM"
  end: string;   // format: "HH:MM"
};

type TimelineProps = {
  events?: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  const list = Array.isArray(events) ? events : [];
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Measure content height and individual item offsets for activation
  useEffect(() => {
    const compute = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setHeight(rect.height);
      const offsets = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - rect.top; // offset from content top in px
      });
      setItemOffsets(offsets);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Update active index when the progress line grows
  useMotionValueEvent(heightTransform, "change", (h) => {
    if (!itemOffsets.length) return;
    let idx = -1;
    for (let i = 0; i < itemOffsets.length; i++) {
      if (h >= itemOffsets[i] - 24) idx = i; // small lead for nicer feel
    }
    setActiveIndex(idx);
  });

  const data = list.map((e) => ({
    title: e.title,
    time: `${e.start} → ${e.end}`,
  }));

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="section-card w-full lg:w-[1000px] min-h-[200px] px-4 py-8 bg-black/70 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      <div ref={containerRef} className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 text-center">Timeline</h1>
          <p className="text-xs md:text-sm text-white/70 text-center">Event schedule at a glance</p>
        </div>

        <div ref={contentRef} className="relative w-full pb-10">
          {data.map((item, index) => {
            const isActive = index <= activeIndex;
            return (
              <div key={index} className="flex justify-start pt-10 md:pt-16 md:gap-10">
                {/* Left: sticky dot and title (on md+) */}
                <div className="sticky z-10 top-40 self-start max-w-xs lg:max-w-sm md:w-full flex items-start">
                  <div className={`tl-dot h-10 w-10 aspect-square shrink-0 rounded-full border flex items-center justify-center ${
                    isActive
                      ? "bg-cyan-400/20 border-cyan-300/60 shadow-[0_0_18px_#22d3ee]"
                      : "bg-black/80 border-white/10"
                  }`}>
                    <div className={`h-3 w-3 rounded-full border ${
                      isActive
                        ? "bg-cyan-300 border-cyan-200 shadow-[0_0_10px_#22d3ee]"
                        : "bg-cyan-400/60 border-cyan-300/60"
                    }`} />
                  </div>
                  <h3 className={`tl-title hidden md:block text-2xl md:text-3xl font-bold md:pl-6 ${
                    isActive ? "text-cyan-200 drop-shadow-[0_0_8px_#22d3ee]" : "text-white/60"
                  }`}>
                    {item.title}
                  </h3>
                </div>

                {/* Right: content */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative pl-16 pr-2 md:pl-2 w-full"
                >
                  <h3 className={`md:hidden block text-xl mb-2 text-left font-bold ${
                    isActive ? "text-cyan-200 drop-shadow-[0_0_8px_#22d3ee]" : "text-white/60"
                  }`}>
                    {item.title}
                  </h3>
                  <div
                    className={`rounded-lg border p-4 transition-colors ${
                      isActive
                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_16px_#22d3ee]"
                        : "border-white/10 bg-black/30"
                    }`}
                  >
                    <p className={`text-sm mb-1 ${isActive ? "text-cyan-200" : "text-cyan-300"}`}>{data[index].time}</p>
                    <p className={`text-sm ${isActive ? "text-white" : "text-white/85"}`}>{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Progress line */}
          <div
            style={{ height: height + "px" }}
            className="tl-line absolute left-5 md:left-5 top-0 w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-white/70 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-cyan-200 via-cyan-100 to-transparent rounded-full shadow-[0_0_26px_#22d3ee]"
            />
          </div>
        </div>
      </div>
    </CurvedPanel>
  );
}

export default Timeline;
