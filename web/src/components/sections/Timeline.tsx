import React from "react";

type TimelineEvent = {
  id: string;
  title: string;
  date: string; // ISO string or formatted date
  description?: string;
};

type TimelineSectionProps = {
  events?: TimelineEvent[];
};

export function TimelineSection({ events }: TimelineSectionProps) {
  const hasEvents = Array.isArray(events) && events.length > 0;

  return (
    <section aria-labelledby="timeline-heading" className="space-y-4">
      <h2 id="timeline-heading" className="text-2xl font-semibold">
        Timeline
      </h2>
      {!hasEvents ? (
        <p className="text-sm text-gray-500">Timeline details will be added soon.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-white/10 rounded-md border border-gray-200 dark:border-white/10">
          {events!.map((event) => (
            <li key={event.id} className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <time
                  dateTime={event.date}
                  className="text-xs text-gray-500"
                >
                  {new Date(event.date).toLocaleDateString()}
                </time>
              </div>
              {event.description ? (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TimelineSection;
