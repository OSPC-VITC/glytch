"use client";

import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const FloatingOrb = memo(({ delay, color, index }: { delay: number; color: string; index: number }) => (
  <div
    className="absolute w-1 h-1 rounded-full opacity-30"
    style={{
      left: `${(index * 23 + 15) % 90}%`,
      top: `${(index * 37 + 10) % 80}%`,
      background: color,
      animation: `float-orb ${4 + (index % 2)}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
));
FloatingOrb.displayName = 'FloatingOrb';

const stats = [
  { k: "Duration", v: "24 Hours", color: "#ff0080" },
  { k: "Team Size", v: "4 - 6", color: "#ff4000" },
  { k: "Format", v: "In‑person", color: "#ff8000" },
  { k: "Open to", v: "Everyone", color: "#8000ff" },
  { k: "Judging", v: "Live demo", color: "#ff0040" },
  { k: "Cost", v: "Free", color: "#4000ff" },
];

const cards = [
  {
    title: "What to expect",
    items: [
      "Kickoff with problem framing & team sync",
      "24 hours of focused building with mentors", 
      "Midnight energy: snacks, music, breaks",
      "Final live demos — no slides, just product"
    ],
    icon: "🚀",
    color: "#ff0080"
  },
  {
    title: "What we provide",
    items: [
      "High‑speed Wi‑Fi, power & workspaces",
      "Meals, snacks, coffee & hydration",
      "Swag, stickers & surprises",
      "Expert mentors across all disciplines"
    ],
    icon: "🎁",
    color: "#ff4000"
  },
  {
    title: "Judging criteria",
    items: [
      "Impact & real-world usefulness",
      "Technical execution & depth",
      "Design craft & user experience",
      "Innovation & creative approach"
    ],
    icon: "⚖️",
    color: "#8000ff"
  },
  {
    title: "Logistics",
    items: [
      "Bring your laptop, chargers & valid ID",
      "Teams can form on‑site (solo welcome)",
      "All code written during 24‑hour window",
      "Be kind: follow our code of conduct"
    ],
    icon: "📋",
    color: "#4000ff"
  }
];

interface InfoCardProps {
  card: typeof cards[0];
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const InfoCard = memo(({ card, index, isHovered, onHover }: InfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
      className="relative transition-all duration-500 ease-out cursor-pointer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        transform: isHovered ? 'scale(1.03) rotate(0.5deg)' : 'scale(1) rotate(0deg)'
      }}
    >
      <div
        className={cn(
          'relative min-h-[340px] rounded-2xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-br from-black via-slate-950 to-black',
          'border border-white/20',
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${card.color}80, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${card.color}40, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${card.color}40 0%, transparent 70%)`,
            opacity: isHovered ? 0.5 : 0.25
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
            <FloatingOrb key={i} delay={i * 1.2} color={card.color} index={i + index * 5} />
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6 md:p-7">
          {/* Header with Icon on Top */}
          <div className="flex flex-col items-center text-center mb-6">
            <div 
              className={cn(
                'rounded-2xl flex items-center justify-center mb-4 w-16 h-16 border-2 transition-all duration-500',
                'bg-black/80'
              )}
              style={{ 
                borderColor: isHovered ? card.color : 'rgba(255,255,255,0.2)',
                boxShadow: isHovered ? `0 0 25px ${card.color}80` : 'none',
                transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)'
              }}
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <h3
              className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 text-[#f2f2f2]"
              style={{
                filter: isHovered ? `drop-shadow(0 0 20px ${card.color}80)` : 'none'
              }}
            >
              {card.title}
            </h3>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-3.5">
            {card.items.map((item, itemIndex) => (
              <motion.div 
                key={itemIndex} 
                className="flex items-start space-x-3"
                initial={{ x: 0 }}
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: isHovered ? itemIndex * 0.05 : 0
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300"
                  style={{
                    background: isHovered ? card.color : 'rgba(168, 85, 247, 0.6)',
                    boxShadow: isHovered ? `0 0 15px ${card.color}` : 'none'
                  }}
                />
                <p className={cn(
                  'text-sm md:text-base leading-relaxed transition-colors duration-300',
                  isHovered ? 'text-white' : 'text-slate-400'
                )}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl transition-opacity duration-300"
            style={{ 
              borderColor: card.color,
              opacity: isHovered ? 0.7 : 0.35
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl transition-opacity duration-300"
            style={{ 
              borderColor: card.color,
              opacity: isHovered ? 0.7 : 0.35
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});
InfoCard.displayName = 'InfoCard';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section 
      id="about" 
      className="relative py-16 md:py-20 scroll-mt-32 overflow-hidden bg-black/70"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full opacity-15 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 128, 0.5) 0%, transparent 70%)',
            animation: 'float-bg 22s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-[700px] h-[700px] rounded-full opacity-15 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(128, 0, 255, 0.5) 0%, transparent 70%)',
            animation: 'float-bg 22s ease-in-out infinite',
            animationDelay: '11s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header - Centered */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              About GLYTCH
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              <span className="font-bold text-transparent bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text">24-hour</span> in‑person hackathon where builders explore ideas at the edge —
              <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold"> fast, focused, fearlessly.</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-b from-black via-slate-950 to-black border rounded-xl p-4 transition-all duration-500 hover:scale-105"
                style={{
                  borderColor: `${stat.color}40`,
                  boxShadow: `0 0 20px ${stat.color}40, inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <div className="text-center">
                  <div 
                    className="text-xs uppercase tracking-wider font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.k}
                  </div>
                  <div className="font-black text-base text-white">
                    {stat.v}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {cards.map((card, index) => (
            <InfoCard
              key={index}
              card={card}
              index={index}
              isHovered={hoveredCard === index}
              onHover={(hovered) => setHoveredCard(hovered ? index : null)}
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