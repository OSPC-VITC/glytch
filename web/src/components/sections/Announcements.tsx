import React from "react";
import type { Announcement } from "@/types";

type AnnouncementsSectionProps = {
  items?: Announcement[];
};

export function AnnouncementsSection({ items }: AnnouncementsSectionProps) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section aria-labelledby="announcements-heading" className="space-y-4">
      <h2 id="announcements-heading" className="text-2xl font-semibold">
        Announcements
      </h2>
      {!hasItems ? (
        <p className="text-sm text-gray-500">No announcements yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-white/10 rounded-md border border-gray-200 dark:border-white/10">
          {items!.map((announcement) => (
            <li key={announcement.id} className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{announcement.title}</h3>
                <time
                  dateTime={announcement.publishedAt}
                  className="text-xs text-gray-500"
                >
                  {new Date(announcement.publishedAt).toLocaleDateString()}
                </time>
              </div>
              {announcement.content ? (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {announcement.content}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AnnouncementsSection;


