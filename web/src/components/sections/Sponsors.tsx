import { memo, useState } from "react";
import SectionSubtitle from "../ui/SectionSubtitle";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const SPONSOR_LEVELS = ["Gold", "Silver", "Bronze"] as const;
type SponsorLevels = (typeof SPONSOR_LEVELS)[number];

type Sponsor = {
  name: string;
  alt: string;
  href: string;
  logoSrc: string;
};

type Sponsors = {
  [level in SponsorLevels]: Sponsor[];
};

const SPONSORS: Sponsors = {
  Gold: [
    {
      name: "Devfolio",
      alt: "DEVFOLIO LOGO",
      href: "https://devfolio.co",
      logoSrc: "/Devfolio.svg",
    },
  ],
  Silver: [
    {
      name: "ETHIndia",
      alt: "ETHINDIA LOGO",
      href: "https://ethindia.co/",
      logoSrc: "/EthIndia.svg",
    },
  ],
  Bronze: [],
} as const;

const FloatingOrb = memo(
  ({
    delay,
    colors,
    index,
  }: {
    delay: number;
    colors: string;
    index: number;
  }) => (
    <div
      className="absolute w-1 h-1 rounded-full opacity-30"
      style={{
        left: `${(index * 23 + 15) % 90}%`,
        top: `${(index * 37 + 10) % 80}%`,
        background: colors,
        animation: `float-orb ${4 + (index % 2)}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  ),
);

FloatingOrb.displayName = "FloatingOrb";

interface SponsorItemProps {
  index: number;
  level: SponsorLevels;
  name: string;
  alt: string;
  href: string;
  logoSrc: string;
}

const SponsorItem = memo(
  ({ index, level, alt, href, logoSrc }: SponsorItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    let colors;
    switch (level) {
      case "Gold":
        colors = {
          glow: "#fde047",
          accent: "#fde047",
          border: "border-yellow-400/40",
        };
        break;
      case "Silver":
        colors = {
          glow: "#9ca3af",
          accent: "#9ca3af",
          border: "border-gray-300/40",
        };
        break;
      case "Bronze":
        colors = {
          glow: "#92400e",
          accent: "#92400e",
          border: "border-amber-800/40",
        };
        break;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <a
          className="relative transition-all duration-500 ease-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={href}
        >
          <div
            className={cn(
              "relative rounded-xl overflow-hidden transition-all duration-500",
              "bg-gradient-to-b from-black via-slate-950 to-black",
              "border",
              colors.border,
              isHovered && "border-white/30",
            )}
            style={{
              boxShadow: isHovered
                ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Background Gradient */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-700",
              )}
              style={{
                background: `radial-gradient(circle at 50% 0%, ${colors.glow} 0%, transparent 60%)`,
                opacity: isHovered ? 0.3 : 0.15,
              }}
            />

            {/* Scan Line */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                animation: "scan-slow 8s ease-in-out infinite",
              }}
            />

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
              {[...Array(8)].map((_, i) => (
                <FloatingOrb
                  key={i}
                  delay={i * 1.5}
                  colors={colors.accent}
                  index={i}
                />
              ))}
            </div>

            {/* Shimmer Effect */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500",
                "bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12",
                isHovered && "opacity-100",
              )}
              style={{
                animation: isHovered
                  ? "shimmer 2s ease-in-out infinite"
                  : "none",
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-4 m-4 bg-white rounded-sm">
              <Image
                src={logoSrc}
                alt={alt}
                width={200}
                height={100}
                className="object-contain h-auto w-auto max-h-24"
              />
            </div>

            {/* Corner Accents */}
            <div
              className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
              style={{
                borderColor: colors.accent,
                opacity: isHovered ? 0.6 : 0.3,
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
              style={{
                borderColor: colors.accent,
                opacity: isHovered ? 0.6 : 0.3,
              }}
            />
          </div>
        </a>
      </motion.div>
    );
  },
);

SponsorItem.displayName = "SponsorItem";

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)",
            animation: "float-bg 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            animation: "float-bg 20s ease-in-out infinite",
            animationDelay: "10s",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-24">
          <SectionTitle>Sponsors</SectionTitle>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6">
            Powered by industry leaders and innovators who believe in{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              shaping the future together.
            </span>
          </p>
        </div>

        {SPONSOR_LEVELS.filter((level) => SPONSORS[level].length).map(
          (level, levelIndex) => {
            let levelBasedClassNames: string;
            switch (level) {
              case "Gold":
                levelBasedClassNames = "text-yellow-400";
                break;
              case "Silver":
                levelBasedClassNames = "text-gray-300";
                break;
              case "Bronze":
                levelBasedClassNames = "text-amber-800";
                break;
            }

            return (
              <div className="text-center mb-12" key={level}>
                <SectionSubtitle className={levelBasedClassNames}>
                  {level} Sponsor
                </SectionSubtitle>
                <div className="flex justify-center flex-row flex-wrap gap-8">
                  {SPONSORS[level].map(
                    ({ name, alt, href, logoSrc }, index) => {
                      return (
                        <SponsorItem
                          index={levelIndex + index}
                          level={level}
                          name={name}
                          alt={alt}
                          href={href}
                          logoSrc={logoSrc}
                          key={name}
                        />
                      );
                    },
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}

