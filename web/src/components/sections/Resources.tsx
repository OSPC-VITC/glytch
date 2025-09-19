import React from "react";
import type { ResourceLink } from "@/types";
import { CurvedPanel } from "@/components/ui/CurvedPanel";

type ResourcesSectionProps = {
  links?: ResourceLink[];
};

export function ResourcesSection({ links }: ResourcesSectionProps) {
  const hasLinks = Array.isArray(links) && links.length > 0;

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-[1000px] min-h-[250px] flex flex-col gap-4 px-6 py-6
        bg-black/70 border border-white/10 rounded-2xl
        shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-8
        backdrop-blur-md"
      style={{ alignItems: "flex-start" }}
      aria-labelledby="resources-heading"
    >
      <h1
        id="resources-heading"
        className="text-3xl font-bold text-cyan-400 mb-4 text-left"
      >
        Resources
      </h1>
      {!hasLinks ? (
        <p className="text-sm text-white/70 text-left">
          Links to guides, FAQs, and docs will appear here.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 w-full">
          {links!.map((link) => (
            <li
              key={link.id}
              className="rounded-xl border border-white/10 p-6 bg-black/30
                transition-all hover:shadow-lg"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-400 hover:no-underline transition"
              >
                {link.label}
              </a>
              {link.description ? (
                <p className="mt-2 text-base text-white/80 break-words">
                  {link.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </CurvedPanel>
  );
}

export default ResourcesSection;
