import React from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";
import { Palette, MousePointerClick, Navigation, Gauge, Sparkles } from "lucide-react";

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

  const defaultCriteria: Rule[] = [
    {
      id: "visual",
      title: "Visual Appeal & Aesthetics",
      description:
        "Overall polish, typographic harmony, composition, color usage and adherence to the theme.",
    },
    {
      id: "interactivity",
      title: "Interactivity & Engagement",
      description:
        "How well the experience responds to user input and keeps users engaged through meaningful interactions.",
    },
    {
      id: "ui",
      title: "UI & Navigation",
      description:
        "Clarity and consistency of the interface, intuitive navigation, information hierarchy and accessibility.",
    },
    {
      id: "performance",
      title: "Performance & Responsiveness",
      description:
        "Perceived speed, responsiveness across devices, smooth animations and efficient asset usage.",
    },
    {
      id: "creativity",
      title: "Creativity & Originality",
      description:
        "Novel ideas, inventive problem-solving and unique presentation that stands out.",
    },
  ];

  const items = hasRules ? rules : defaultCriteria;

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-full lg:w-[1000px] min-h-[250px] flex flex-col gap-6 px-6 py-8
      bg-black/70 border border-white/10 rounded-2xl
      shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-0 lg:mr-8
      backdrop-blur-md"
      style={{ alignItems: "flex-start" }}
      aria-labelledby="rules-heading"
    >
      <h1
        id="rules-heading"
        className="text-3xl font-bold text-cyan-400 mb-2 text-center w-full"
      >
        Rules and Judging Criteria
      </h1>
      <p className="text-sm text-white/70 mb-4 text-center w-full">Each criterion is scored out of 10.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {items.map((rule) => {
          const icon = (() => {
            switch (rule.id) {
              case "visual":
                return <Palette className="w-5 h-5" />;
              case "interactivity":
                return <MousePointerClick className="w-5 h-5" />;
              case "ui":
                return <Navigation className="w-5 h-5" />;
              case "performance":
                return <Gauge className="w-5 h-5" />;
              case "creativity":
                return <Sparkles className="w-5 h-5" />;
              default:
                return <Sparkles className="w-5 h-5" />;
            }
          })();
          return (
            <div
              key={rule.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-5
              transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_24px_#22d3ee]"
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(34,211,238,0.25),transparent_60%)]" />

              <div className="flex items-start gap-4 relative">
                <div className="shrink-0 w-10 h-10 rounded-full border border-cyan-300/40 bg-cyan-400/15 text-cyan-300 flex items-center justify-center shadow-[0_0_14px_#22d3ee]">
                  {icon}
                </div>
                <div>
                  <h3 className="text-cyan-300 font-semibold text-base">{rule.title}</h3>
                  {rule.description ? (
                    <p className="mt-1 text-sm text-white/80 leading-relaxed">
                      {rule.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CurvedPanel>
  );
}

export default RulesSection;
