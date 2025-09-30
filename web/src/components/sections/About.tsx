"use client";

import React, { useState, useEffect } from 'react';
import { CurvedPanel } from '@/components/ui/CurvedPanel';
import { motion } from 'framer-motion';

// Section title component matching vibrant style
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent text-center drop-shadow-[0_0_20px_#ff0080]">{children}</h1>
  </div>
);

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { k: "Duration", v: "24 Hours", glow: "#ff0080" },
    { k: "Team Size", v: "4 - 6", glow: "#ff4000" },
    { k: "Format", v: "In‑person", glow: "#ff8000" },
    { k: "Open to", v: "Everyone", glow: "#8000ff" },
    { k: "Judging", v: "Live demo", glow: "#ff0040" },
    { k: "Cost", v: "Free", glow: "#4000ff" },
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
    }
  ];

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden bg-black/70"
    >
      {/* Animated background elements - vibrant themed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-[2000ms] ease-out"
          style={{
            background: `radial-gradient(circle, #ff0080 0%, #ff4000 30%, #8000ff 70%, transparent 100%)`,
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-25 transition-all duration-[3000ms] ease-out"
          style={{
            background: `radial-gradient(circle, #ff8000 0%, #4000ff 50%, #ff0040 100%)`,
            left: `${100 - mousePosition.x * 0.7}%`,
            top: `${100 - mousePosition.y * 0.8}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full blur-2xl opacity-20 transition-all duration-[4000ms] ease-out"
          style={{
            background: `radial-gradient(circle, #ff1493 0%, #ff8c00 50%, transparent 70%)`,
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.9}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        {[...Array(20)].map((_, i) => {
          const colors = ['#ff0080', '#ff4000', '#ff8000', '#8000ff', '#4000ff', '#ff0040'];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                backgroundColor: color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${color}`,
                animation: `bounce ${3 + Math.random() * 3}s infinite ${Math.random() * 5}s`
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <CurvedPanel
          curvature={0.2}
          className="mb-12 bg-black/80 border border-pink-500/30 rounded-2xl shadow-[0_0_30px_rgba(255,0,128,0.4)] backdrop-blur-md p-8"
        >
          <SectionTitle>About VOID</SectionTitle>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
            <span className="font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">24-hour</span> in‑person hackathon where builders explore ideas at the edge —
            <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent font-semibold"> fast, focused, fearlessly.</span>
          </p>
        </CurvedPanel>

        {/* Rotating Stats Tape */}
        <div className="mb-16 relative overflow-hidden">
          <motion.div 
            className="flex"
            animate={{
              x: [0, -50 + "%"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...stats, ...stats].map((stat, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4"
              >
                <CurvedPanel
                  curvature={0.15}
                  className="bg-black/90 border rounded-2xl p-3 sm:p-4 md:p-5 w-28 sm:w-32 md:w-36 h-20 md:h-24 backdrop-blur-md transition-all duration-500"
                  style={{
                    borderColor: `${stat.glow}40`,
                    boxShadow: `0 0 20px ${stat.glow}60`,
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    <div 
                      className="text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1"
                      style={{ color: stat.glow }}
                    >
                      {stat.k}
                    </div>
                    <div className="font-black text-sm md:text-base text-white">
                      {stat.v}
                    </div>
                  </div>
                </CurvedPanel>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <CurvedPanel
                curvature={0.2}
                className={`relative overflow-hidden bg-black/80 border backdrop-blur-md min-h-[360px] sm:min-h-[400px] md:min-h-[450px] p-5 sm:p-6 md:p-7 transition-all duration-700 ease-out ${
                  hoveredCard === index 
                    ? 'border-pink-400 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 shadow-[0_0_30px_rgba(255,0,128,0.6)]' 
                    : 'border-white/20 bg-black/40 shadow-[0_0_20px_rgba(0,0,0,0.8)]'
                }`}
              >
                {/* Diagonal vibrant hover effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl transition-all duration-1000 ease-in-out ${
                    hoveredCard === index ? 'opacity-80' : 'opacity-0'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 0, 128, 0.3) 0%, 
                      rgba(255, 64, 0, 0.2) 30%, 
                      rgba(128, 0, 255, 0.3) 60%, 
                      transparent 100%)`,
                    transform: hoveredCard === index ? 'translate(0, 0)' : 'translate(-150%, -150%)'
                  }}
                />
                
                {/* Matrix grid overlay */}
                <div 
                  className="absolute inset-0 opacity-20 rounded-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 0, 128, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 64, 0, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px',
                    animation: hoveredCard === index ? 'gridMove 3s linear infinite' : 'none'
                  }}
                />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className={`rounded-xl flex items-center justify-center mr-3 w-12 h-12 border transition-all duration-500 ${
                      hoveredCard === index 
                        ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-pink-400 shadow-[0_0_20px_rgba(255,0,128,0.8)] rotate-12' 
                        : 'bg-black/80 border-white/20'
                    }`}>
                      <span className="text-xl">{card.icon}</span>
                    </div>
                    <h3 className={`font-black text-lg sm:text-xl transition-all duration-500 ${
                      hoveredCard === index 
                        ? 'bg-gradient-to-r from-pink-300 via-orange-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_#ff0080]' 
                        : 'text-white'
                    }`}>
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {card.items.map((item, itemIndex) => (
                      <motion.div 
                        key={itemIndex} 
                        className="flex items-start space-x-3"
                        initial={{ x: 0 }}
                        animate={{ 
                          x: hoveredCard === index ? 4 : 0 
                        }}
                        transition={{ 
                          duration: 0.3,
                          delay: hoveredCard === index ? itemIndex * 0.1 : 0
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 border transition-all duration-300 ${
                          hoveredCard === index 
                            ? 'bg-pink-400 border-orange-300 shadow-[0_0_15px_rgba(255,0,128,0.8)]' 
                            : 'bg-purple-400/60 border-pink-300/60'
                        }`} />
                        <p className={`text-sm sm:text-base leading-relaxed font-medium transition-colors duration-500 ${
                          hoveredCard === index ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-white/85'
                        }`}>
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Floating particles */}
                {hoveredCard === index && [...Array(12)].map((_, i) => {
                  const colors = ['#ff0080', '#ff4000', '#ff8000', '#8000ff'];
                  const color = colors[i % colors.length];
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                        left: `${15 + (i * 7)}%`,
                        top: `${20 + (i * 6)}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  );
                })}
              </CurvedPanel>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(15px, 15px); }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
      `}</style>
    </section>
  );
}