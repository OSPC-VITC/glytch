import React from "react";
import type { ResourceLink } from "@/types";

type ResourcesSectionProps = {
  links?: ResourceLink[];
};

export function ResourcesSection({ links }: ResourcesSectionProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;

  return (
    <section aria-labelledby="resources-heading" className="space-y-4">
      <h2 id="resources-heading" className="text-2xl font-semibold">
        Resources
      </h2>
      {!hasLinks ? (
        <p className="text-sm text-gray-500">
          Links to guides, FAQs, and docs will appear here.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {links!.map((link) => (
            <li
              key={link.id}
              className="rounded-md border border-gray-200 dark:border-white/10 p-4"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:no-underline"
              >
                {link.label}
              </a>
              {link.description ? (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {link.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResourcesSection;


