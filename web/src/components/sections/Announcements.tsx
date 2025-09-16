import React from "react";
import type { Announcement } from "@/types";

type AnnouncementsSectionProps = {
  items?: Announcement[];
};

export function AnnouncementsSection({ items }: AnnouncementsSectionProps) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <aside
      className="w-[1000px] min-h-[250px] flex flex-col gap-4 px-6 py-6
        bg-black/70 border border-white/10 rounded-2xl
        shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-8
        backdrop-blur-md"
      style={{ alignItems: "flex-start" }}
      aria-labelledby="announcements-heading"
    >
      <h1
        id="announcements-heading"
        className="text-xl font-bold text-cyan-400 mb-4 text-left"
      >
        Announcements
      </h1>
      {!hasItems ? (
        <p className="text-sm text-white/70 text-left">No announcements yet.</p>
      ) : (
        <ul className="divide-y divide-white/10 w-full">
          {items!.map((announcement) => (
            <li key={announcement.id} className="py-5">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-cyan-300 font-semibold text-left">{announcement.title}</h3>
                <time
                  dateTime={announcement.publishedAt}
                  className="text-xs text-white/70 ml-4"
                >
                  {new Date(announcement.publishedAt).toLocaleDateString()}
                </time>
              </div>
              {announcement.content ? (
                <p className="mt-2 text-base text-white/80 text-left break-words">
                  {announcement.content}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default AnnouncementsSection;
