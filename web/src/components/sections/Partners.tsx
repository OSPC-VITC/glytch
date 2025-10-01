"use client";

import React, { useState, memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Partner = {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    glow: string;
    accent: string;
    border: string;
  };
};

const partners: Partner[] = [
  {
    id: "perplexity",
    name: "Perplexity AI",
    description: "AI-powered answer engine combining LLMs with live search for fast, up-to-date answers.",
    colors: {
      primary: 'from-orange-500 via-pink-600 to-fuchsia-600',
      glow: 'rgba(255, 77, 143, 0.5)',
      accent: '#ff4d8f',
      border: 'border-orange-500/40'
    }
  },
  {
    id: "asg",
    name: "Asymmetric Club",
    description: "Tech community organizing hackathons, webinars, and projects to empower students.",
    colors: {
      primary: 'from-purple-500 via-blue-600 to-cyan-500',
      glow: 'rgba(139, 92, 246, 0.5)',
      accent: '#8b5cf6',
      border: 'border-purple-500/40'
    }
  },
  {
    id: "aidiotx",
    name: "AIDIOTX",
    description: "Community driving AI, robotics, and IoT innovation through workshops and projects.",
    colors: {
      primary: 'from-pink-500 via-fuchsia-600 to-purple-600',
      glow: 'rgba(236, 72, 153, 0.5)',
      accent: '#ec4899',
      border: 'border-pink-500/40'
    }
  },
  {
    id: "aurelian",
    name: "Aurelian Racing",
    description: "Student motorsport team building and racing engineering projects at scale.",
    colors: {
      primary: 'from-cyan-500 via-blue-600 to-purple-600',
      glow: 'rgba(34, 211, 238, 0.5)',
      accent: '#22d3ee',
      border: 'border-cyan-500/40'
    }
  },
  {
    id: "partner-5",
    name: "Tech Innovators",
    description: "Driving technological advancement through cutting-edge solutions and partnerships.",
    colors: {
      primary: 'from-orange-500 via-red-600 to-pink-600',
      glow: 'rgba(249, 115, 22, 0.5)',
      accent: '#f97316',
      border: 'border-orange-500/40'
    }
  }
];

const FloatingOrb = memo(({ delay, colors, index }: { delay: number; colors: string; index: number }) => {
  const style = useMemo(() => ({
    left: `${(index * 23 + 15) % 90}%`,
    top: `${(index * 37 + 10) % 80}%`,
    background: colors,
    animation: `float-orb ${4 + (index % 2)}s ease-in-out infinite`,
    animationDelay: `${delay}s`
  }), [delay, colors, index]);

  return (
    <div
      className="absolute w-1 h-1 rounded-full opacity-30"
      style={style}
    />
  );
});
FloatingOrb.displayName = 'FloatingOrb';

interface PartnerCardProps {
  partner: Partner;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const PartnerCard = memo(({ partner, index, isHovered, onHover }: PartnerCardProps) => {
  const handleMouseEnter = useCallback(() => onHover(true), [onHover]);
  const handleMouseLeave = useCallback(() => onHover(false), [onHover]);

  const boxShadow = useMemo(() => 
    isHovered
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${partner.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
      : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${partner.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
    [isHovered, partner.colors.glow]
  );

  const bgGradient = useMemo(() => ({
    background: `radial-gradient(circle at 50% 0%, ${partner.colors.glow} 0%, transparent 60%)`,
    opacity: isHovered ? 0.4 : 0.2
  }), [isHovered, partner.colors.glow]);

  const nameFilter = useMemo(() => 
    isHovered ? `drop-shadow(0 0 20px ${partner.colors.glow})` : 'none',
    [isHovered, partner.colors.glow]
  );

  const cornerStyle = useMemo(() => ({ 
    borderColor: partner.colors.accent,
    opacity: isHovered ? 0.6 : 0.3
  }), [isHovered, partner.colors.accent]);

  const orbKeys = useMemo(() => Array.from({ length: 5 }, (_, i) => `${partner.id}-orb-${i}`), [partner.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative transition-all duration-500 ease-out cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
        willChange: 'transform'
      }}
    >
      <div
        className={cn(
          'relative h-[320px] rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          partner.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{ boxShadow }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={bgGradient}
        />

        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            animation: 'scan-slow 8s ease-in-out infinite'
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {orbKeys.map((key, i) => (
            <FloatingOrb key={key} delay={i * 1.2} colors={partner.colors.accent} index={i + index * 5} />
          ))}
        </div>

        <div 
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-500',
            'bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12',
            isHovered && 'opacity-100'
          )}
          style={{ animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none' }}
        />

        <div className="relative z-10 h-full flex flex-col justify-center p-8 text-center">
          <h3
            className="text-2xl md:text-3xl font-bold mb-4 tracking-tight transition-all duration-300 text-[#f2f2f2]"
            style={{ filter: nameFilter }}
          >
            {partner.name}
          </h3>

          <p className={cn(
            'text-slate-400 text-sm leading-relaxed transition-colors duration-300',
            isHovered && 'text-slate-300'
          )}>
            {partner.description}
          </p>

          <div 
            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl transition-opacity duration-300"
            style={cornerStyle}
          />
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl transition-opacity duration-300"
            style={cornerStyle}
          />
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => 
  prevProps.partner.id === nextProps.partner.id &&
  prevProps.isHovered === nextProps.isHovered &&
  prevProps.index === nextProps.index
);
PartnerCard.displayName = 'PartnerCard';

export default function Partners() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = useCallback((index: number) => (hovered: boolean) => {
    setHoveredIndex(hovered ? index : null);
  }, []);

  return (
    <section className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Our Partners
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Collaborating with industry leaders and innovators.{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              Building the future together.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={handleHover(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }
        @keyframes scan-slow {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes float-bg {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}