import React from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";

type Rule = {
  id: string;
  title: string;
  description?: string;
};

type RulesSectionProps = {
  rules?: Rule[];
};

export function RulesSection({ rules }: RulesSectionProps) {
  const hasRules = Array.isArray(rules) && rules.length > 0;

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-[1000px] min-h-[250px] flex flex-col gap-6 px-6 py-8
      bg-black/70 border border-white/10 rounded-2xl
      shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-8
      backdrop-blur-md"
      style={{ alignItems: "flex-start" }}
      aria-labelledby="rules-heading"
    >
      <h1
        id="rules-heading"
        className="text-xl font-bold text-cyan-400 mb-4"
        style={{ textAlign: "left" }}
      >
        Rules and Judging Criteria
      </h1>
      {!hasRules ? (
        <p className="text-sm text-white/70 text-left">
          Rules and judging criteria will be posted soon.
        </p>
      ) : (
        <ul className="divide-y divide-white/10 w-full">
          {rules.map((rule) => (
            <li key={rule.id} className="py-5">
              <h3 className="text-cyan-300 font-semibold text-left">{rule.title}</h3>
              {rule.description ? (
                <p className="mt-2 text-base text-white/80 text-left break-words">
                  {rule.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </CurvedPanel>
  );
}

export default RulesSection;
