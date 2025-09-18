"use client";

import React from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";

type TimelineEvent = {
  id: string;
  title: string;
  start: string; // format: "HH:MM"
  end: string;   // format: "HH:MM"
};

type TimelineProps = {
  events: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  const now = new Date();

  // Parse HH:MM to Date (same day)
  const parseTime = (time: string) => new Date(`2025-09-24T${time}:00`);

  // Get earliest start & latest end
  const startTime = parseTime(events[0].start);
  const endTime = parseTime(events[events.length - 1].end);

  // Total event duration
  const totalDuration = endTime.getTime() - startTime.getTime();

  // Current progress
  let progress = 0;
  if (now >= endTime) {
    progress = 100;
  } else if (now > startTime) {
    progress =
      ((now.getTime() - startTime.getTime()) / totalDuration) * 100;
  }

  // Get event status
  const getEventStatus = (event: TimelineEvent) => {
    const start = parseTime(event.start);
    const end = parseTime(event.end);

    if (now > end) return "past";
    if (now >= start && now <= end) return "current";
    return "upcoming";
  };

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-full min-h-[200px] flex flex-col gap-6 px-6 py-6
                 bg-black/70 border border-white/10 rounded-2xl
                 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      <h1 className="text-xl font-bold text-cyan-400">Timeline</h1>

      {/* Timeline bar */}
      <div className="relative w-full h-2 bg-gray-700 rounded">
        <div
          className="absolute top-0 left-0 h-2 bg-cyan-400 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Steps (time + title) */}
      <div className="flex justify-between items-start relative z-10">
        {events.map((event) => {
          const status = getEventStatus(event);

          return (
            <div
              key={event.id}
              className="flex flex-col items-center text-center w-28"
            >
              {/* Time */}
              <p
                className={`text-xs md:text-sm font-medium mb-3
                  ${
                    status === "past"
                      ? "text-cyan-200 opacity-50"
                      : "text-cyan-300"
                  }`}
              >
                {event.start} → {event.end}
              </p>

              {/* Title */}
              <h3
                className={`text-sm md:text-base font-semibold leading-tight
                  ${
                    status === "current"
                      ? "text-cyan-200"
                      : status === "past"
                      ? "text-white opacity-50"
                      : "text-white"
                  }`}
              >
                {event.title}
              </h3>
            </div>
          );
        })}
      </div>
    </CurvedPanel>
  );
}

export default Timeline;
