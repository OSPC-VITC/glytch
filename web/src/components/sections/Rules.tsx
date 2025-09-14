import React from "react";

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
    <section aria-labelledby="rules-heading" className="space-y-4">
      <h2 id="rules-heading" className="text-2xl font-semibold">
        Rules and Judging Criteria
      </h2>
      {!hasRules ? (
        <p className="text-sm text-gray-500">Rules and judging criteria will be posted soon.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-white/10 rounded-md border border-gray-200 dark:border-white/10">
          {rules!.map((rule) => (
            <li key={rule.id} className="p-4">
              <h3 className="font-medium">{rule.title}</h3>
              {rule.description ? (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {rule.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RulesSection;
