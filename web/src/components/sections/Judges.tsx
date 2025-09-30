"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Judge = {
  id: string;
  name: string;
  title: string;
  organization: string;
  description: string;
  colors: {
    glow: string;
    accent: string;
    border: string;
  };
};

const judges: Judge[] = [
  {
    id: "judge-1",
    name: "Coming Soon",
    title: "Industry Expert",
    organization: "To Be Announced",
    description: "Distinguished professional with extensive experience in technology and innovation.",
    colors: {
      glow: 'rgba(255, 77, 143, 0.5)',
      accent: '#ff4d8f',
      border: 'border-orange-500/40'
    }
  },
  {
    id: "judge-2",
    name: "Coming Soon",
    title: "Academic Leader",
    organization: "To Be Announced",
    description: "Renowned educator and researcher driving innovation in computer science education.",
    colors: {
      glow: 'rgba(139, 92, 246, 0.5)',
      accent: '#8b5cf6',
      border: 'border-purple-500/40'
    }
  },
  {
    id: "judge-3",
    name: "Coming Soon",
    title: "Tech Innovator",
    organization: "To Be Announced",
    description: "Visionary leader pioneering breakthrough solutions in emerging technologies.",
    colors: {
      glow: 'rgba(236, 72, 153, 0.5)',
      accent: '#ec4899',
      border: 'border-pink-500/40'
    }
  },
  {
    id: "judge-4",
    name: "Coming Soon",
    title: "Open Source Advocate",
    organization: "To Be Announced",
    description: "Passionate contributor shaping the future of collaborative software development.",
    colors: {
      glow: 'rgba(34, 211, 238, 0.5)',
      accent: '#22d3ee',
      border: 'border-cyan-500/40'
    }
  }
];

const FloatingOrb = memo(({ delay, colors, index }: { delay: number; colors: string; index: number }) => (
  <div
    className="absolute w-1 h-1 rounded-full opacity-30"
    style={{
      left: `${(index * 23 + 15) % 90}%`,
      top: `${(index * 37 + 10) % 80}%`,
      background: colors,
      animation: `float-orb ${4 + (index % 2)}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
));
FloatingOrb.displayName = 'FloatingOrb';

interface JudgeCardProps {
  judge: Judge;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const JudgeCard = memo(({ judge, index, isHovered, onHover }: JudgeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative transition-all duration-500 ease-out"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)'
      }}
    >
      <div
        className={cn(
          'relative h-[420px] rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          judge.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${judge.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${judge.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className={cn('absolute inset-0 opacity-0 transition-opacity duration-700')}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${judge.colors.glow} 0%, transparent 60%)`,
            opacity: isHovered ? 0.4 : 0.2
          }}
        />

        {/* Scan Line */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            animation: 'scan-slow 8s ease-in-out infinite'
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FloatingOrb key={i} delay={i * 1.2} colors={judge.colors.accent} index={i + index * 5} />
          ))}
        </div>

        {/* Shimmer Effect */}
        <div 
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-500',
            'bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12',
            isHovered && 'opacity-100'
          )}
          style={{ animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none' }}
        />

        {/* "Coming Soon" Badge Overlay */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all duration-300',
              'bg-white/10 backdrop-blur-xl border border-white/20',
              'flex items-center gap-2'
            )}
            style={{
              boxShadow: isHovered ? `0 0 20px ${judge.colors.glow}` : 'none'
            }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: judge.colors.accent,
                    animation: `pulse-dot 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
            <span className="text-white text-xs font-semibold">TBA</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center p-8 text-center">
          {/* Name */}
          <h3
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight transition-all duration-300"
            style={{
              color: judge.colors.accent,
              filter: isHovered ? `drop-shadow(0 0 20px ${judge.colors.glow})` : 'none'
            }}
          >
            {judge.name}
          </h3>

          {/* Title & Organization */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-1 text-white/70">
              {judge.title}
            </p>
            <p className="text-xs text-slate-400">{judge.organization}</p>
          </div>

          {/* Description */}
          <p className={cn(
            'text-slate-400 text-sm leading-relaxed transition-colors duration-300',
            isHovered && 'text-slate-300'
          )}>
            {judge.description}
          </p>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: judge.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: judge.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});
JudgeCard.displayName = 'JudgeCard';

export default function Judges() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 scroll-mt-32 overflow-hidden bg-black/70">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            VOID Judges
          </h1>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 via-orange-500/20 to-purple-500/20 border border-pink-500/30 backdrop-blur-xl">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-pink-300 via-orange-300 to-purple-300 bg-clip-text text-transparent">
                Panel Announcement Coming Soon
              </span>
            </div>
          </motion.div>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Our distinguished panel of industry experts and thought leaders will be revealed shortly.{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              Stay tuned!
            </span>
          </p>
        </div>

        {/* Judges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {judges.map((judge, index) => (
            <JudgeCard
              key={judge.id}
              judge={judge}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-slate-400">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <span className="text-sm">Watch this space for updates</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>
        </motion.div>
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
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}