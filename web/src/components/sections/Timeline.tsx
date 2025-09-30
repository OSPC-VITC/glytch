"use client";

import React, { useEffect, useRef, useState } from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

type TimelineEvent = {
  id: string;
  title: string;
  start: string; // format: "HH:MM"
  end: string;   // format: "HH:MM"
};

type TimelineProps = {
  events?: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  const list = Array.isArray(events) ? events : [
    { id: "1", title: "Registration & Welcome", start: "09:00", end: "10:00" },
    { id: "2", title: "Opening Ceremony", start: "10:00", end: "11:00" },
    { id: "3", title: "Team Formation", start: "11:00", end: "12:00" },
    { id: "4", title: "Hacking Begins!", start: "12:00", end: "12:00+1" },
    { id: "5", title: "Lunch Break", start: "13:00", end: "14:00" },
    { id: "6", title: "Mentor Sessions", start: "16:00", end: "18:00" },
    { id: "7", title: "Midnight Fuel", start: "00:00", end: "01:00" },
    { id: "8", title: "Final Presentations", start: "11:00", end: "12:00" },
  ];
  
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Mouse tracking for dynamic effects
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

  // Measure content height and individual item offsets for activation
  useEffect(() => {
    const compute = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setHeight(rect.height);
      const offsets = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - rect.top; // offset from content top in px
      });
      setItemOffsets(offsets);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Update active index when the progress line grows
  useMotionValueEvent(heightTransform, "change", (h) => {
    if (!itemOffsets.length) return;
    let idx = -1;
    for (let i = 0; i < itemOffsets.length; i++) {
      if (h >= itemOffsets[i] - 24) idx = i; // small lead for nicer feel
    }
    setActiveIndex(idx);
  });

  const data = list.map((e) => ({
    title: e.title,
    time: `${e.start} → ${e.end}`,
  }));

  const vibrantColors = ['#ff0080', '#ff4000', '#ff8000', '#8000ff', '#4000ff', '#ff0040'];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements - Spider-Verse style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-40 transition-all duration-[2000ms] ease-out"
          style={{
            background: `radial-gradient(circle, #ff0080 0%, #ff4000 25%, #8000ff 50%, #4000ff 75%, transparent 100%)`,
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 transition-all duration-[3000ms] ease-out"
          style={{
            background: `radial-gradient(circle, #ff8000 0%, #ff0040 40%, #8000ff 80%, transparent 100%)`,
            left: `${100 - mousePosition.x * 0.7}%`,
            top: `${100 - mousePosition.y * 0.8}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 6s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-2xl opacity-25 transition-all duration-[4000ms] ease-out"
          style={{
            background: `conic-gradient(from 0deg, #ff0080, #ff4000, #ff8000, #8000ff, #4000ff, #ff0080)`,
            left: `${mousePosition.x * 0.3 + 30}%`,
            top: `${mousePosition.y * 0.4 + 30}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'spin 20s linear infinite'
          }}
        />

        {/* Electric particles */}
        {[...Array(25)].map((_, i) => {
          const color = vibrantColors[i % vibrantColors.length];
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                backgroundColor: color,
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${color}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Geometric lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              width: '2px',
              height: `${Math.random() * 300 + 100}px`,
              background: `linear-gradient(to bottom, transparent, ${vibrantColors[i % vibrantColors.length]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <CurvedPanel
        as="aside"
        curvature={0.2}
        className="section-card w-full lg:w-[1000px] min-h-[200px] px-4 py-8 bg-black/80 border border-pink-500/40 rounded-2xl shadow-[0_0_40px_rgba(255,0,128,0.5)] backdrop-blur-md relative z-10 mx-auto"
      >
        <div ref={containerRef} className="w-full">
          <div className="mb-6 relative">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent text-center drop-shadow-[0_0_20px_#ff0080]">
              Timeline
            </h1>
            <p className="text-sm md:text-base text-white/80 text-center mt-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Event schedule at a glance
            </p>
            
            {/* Animated underline */}
            <motion.div 
              className="mx-auto mt-4 h-1 rounded-full"
              style={{
                width: '200px',
                background: 'linear-gradient(90deg, #ff0080, #ff4000, #ff8000, #8000ff)',
                boxShadow: '0 0 20px rgba(255,0,128,0.8)'
              }}
              animate={{
                background: [
                  'linear-gradient(90deg, #ff0080, #ff4000, #ff8000, #8000ff)',
                  'linear-gradient(90deg, #8000ff, #ff0080, #ff4000, #ff8000)',
                  'linear-gradient(90deg, #ff8000, #8000ff, #ff0080, #ff4000)',
                  'linear-gradient(90deg, #ff0080, #ff4000, #ff8000, #8000ff)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <div ref={contentRef} className="relative w-full pb-10">
            {data.map((item, index) => {
              const isActive = index <= activeIndex;
              const itemColor = vibrantColors[index % vibrantColors.length];
              
              return (
                <motion.div 
                  key={index} 
                  className="flex justify-start pt-10 md:pt-16 md:gap-10"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Left: sticky dot and title (on md+) */}
                  <div className="sticky z-10 top-40 self-start max-w-xs lg:max-w-sm md:w-full flex items-start">
                    <motion.div 
                      className={`tl-dot h-12 w-12 aspect-square shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "border-pink-400 shadow-[0_0_30px_#ff0080]"
                          : "border-white/30"
                      }`}
                      style={{
                        background: isActive 
                          ? `radial-gradient(circle, ${itemColor}40, ${itemColor}20, transparent)`
                          : 'rgba(0,0,0,0.8)',
                      }}
                      animate={isActive ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <div 
                        className={`h-4 w-4 rounded-full transition-all duration-300`}
                        style={{
                          backgroundColor: isActive ? itemColor : '#666',
                          boxShadow: isActive ? `0 0 15px ${itemColor}` : 'none'
                        }}
                      />
                      
                      {/* Pulsing ring effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: itemColor }}
                          animate={{
                            scale: [1, 2, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      )}
                    </motion.div>
                    
                    <h3 className={`tl-title hidden md:block text-2xl md:text-3xl font-bold md:pl-6 transition-all duration-500 ${
                      isActive 
                        ? `drop-shadow-[0_0_15px_${itemColor}]`
                        : "text-white/60"
                    }`}
                    style={{
                      color: isActive ? itemColor : undefined,
                      textShadow: isActive ? `0 0 20px ${itemColor}` : undefined
                    }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Right: content */}
                  <div
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[index] = el;
                    }}
                    className="relative pl-16 pr-2 md:pl-2 w-full"
                  >
                    <h3 className={`md:hidden block text-xl mb-2 text-left font-bold transition-all duration-500 ${
                      isActive 
                        ? `drop-shadow-[0_0_15px_${itemColor}]`
                        : "text-white/60"
                    }`}
                    style={{
                      color: isActive ? itemColor : undefined
                    }}>
                      {item.title}
                    </h3>
                    
                    <motion.div
                      className={`rounded-lg border-2 p-4 transition-all duration-500 relative overflow-hidden ${
                        isActive
                          ? "shadow-[0_0_25px_rgba(255,0,128,0.6)]"
                          : "border-white/20 bg-black/40"
                      }`}
                      style={{
                        borderColor: isActive ? itemColor : undefined,
                        background: isActive 
                          ? `linear-gradient(135deg, ${itemColor}20, ${itemColor}10, rgba(0,0,0,0.8))`
                          : undefined
                      }}
                      whileHover={isActive ? { scale: 1.02 } : {}}
                    >
                      {/* Animated background pattern */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, ${itemColor}30 25%, transparent 25%),
                              linear-gradient(-45deg, ${itemColor}30 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, ${itemColor}30 75%),
                              linear-gradient(-45deg, transparent 75%, ${itemColor}30 75%)
                            `,
                            backgroundSize: '10px 10px',
                            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                            animation: 'backgroundShift 4s linear infinite'
                          }}
                        />
                      )}
                      
                      <div className="relative z-10">
                        <p className={`text-sm mb-1 font-semibold transition-colors duration-500 ${
                          isActive 
                            ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                            : "text-white/70"
                        }`}>
                          {data[index].time}
                        </p>
                        <p className={`text-sm transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/85"
                        }`}>
                          {item.title}
                        </p>
                      </div>
                      
                      {/* Floating micro-particles */}
                      {isActive && [...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: itemColor,
                            boxShadow: `0 0 6px ${itemColor}`,
                            right: `${10 + i * 12}%`,
                            top: `${20 + i * 10}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            y: [0, -20, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Enhanced Progress line */}
            <div
              style={{ height: height + "px" }}
              className="tl-line absolute left-6 md:left-6 top-0 w-[6px] rounded-full bg-gradient-to-b from-transparent via-white/30 to-transparent overflow-hidden"
            >
              <motion.div
                style={{ height: heightTransform, opacity: opacityTransform }}
                className="absolute inset-x-0 top-0 w-[6px] rounded-full overflow-hidden"
              >
                <motion.div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, #ff0080, #ff4000, #ff8000, #8000ff, #4000ff)',
                    boxShadow: '0 0 30px rgba(255,0,128,0.8), inset 0 0 20px rgba(255,255,255,0.3)'
                  }}
                  animate={{
                    background: [
                      'linear-gradient(to bottom, #ff0080, #ff4000, #ff8000, #8000ff, #4000ff)',
                      'linear-gradient(to bottom, #4000ff, #ff0080, #ff4000, #ff8000, #8000ff)',
                      'linear-gradient(to bottom, #8000ff, #4000ff, #ff0080, #ff4000, #ff8000)',
                      'linear-gradient(to bottom, #ff0080, #ff4000, #ff8000, #8000ff, #4000ff)',
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              {/* Glowing orb at the tip */}
              <motion.div
                style={{ 
                  top: heightTransform,
                  opacity: opacityTransform 
                }}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              >
                <motion.div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #ff0080, #ff4000)',
                    boxShadow: '0 0 20px #ff0080, 0 0 40px #ff0080'
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 20px #ff0080, 0 0 40px #ff0080',
                      '0 0 30px #ff4000, 0 0 60px #ff4000',
                      '0 0 20px #ff0080, 0 0 40px #ff0080'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </CurvedPanel>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes backgroundShift {
          0% { background-position: 0 0, 0 5px, 5px -5px, -5px 0px; }
          100% { background-position: 10px 10px, 10px 15px, 15px 5px, 5px 10px; }
        }
      `}</style>
    </div>
  );
}

export default Timeline;