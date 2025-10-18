"use client";

import React, {memo } from 'react';
import { motion } from 'framer-motion';


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
  { k: "Format", v: "In-person", color: "#ff8000" },
  { k: "Open to", v: "Everyone", color: "#8000ff" },
  { k: "Judging", v: "Live demo", color: "#ff0040" },
  { k: "Cost", v: "Free", color: "#4000ff" },
];







export default function About() {

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