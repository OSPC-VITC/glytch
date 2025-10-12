'use client';

import React, { useState, useEffect, useRef, memo } from 'react';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Prize = {
  id: string;
  rank: number;
  title: string;
  icon: string;
  value: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    border: string;
  };
};

const PRIZES_CONFIG: Prize[] = [
  {
    id: 'first-place',
    rank: 1,
    title: 'First Place',
    icon: '🏆',
    value: 'Coming Soon',
    description: 'Ultimate Champion Reward',
    colors: {
      primary: 'from-orange-500 via-pink-600 to-fuchsia-600',
      secondary: 'from-orange-500/20 via-pink-600/15 to-fuchsia-700/20',
      accent: '#ff4d8f',
      glow: 'rgba(255, 77, 143, 0.5)',
      border: 'border-orange-500/40'
    }
  },
  {
    id: 'second-place',
    rank: 2,
    title: 'Second Place',
    icon: '🥈',
    value: 'Coming Soon',
    description: 'Elite Performance Recognition',
    colors: {
      primary: 'from-purple-500 via-blue-600 to-cyan-500',
      secondary: 'from-purple-500/20 via-blue-600/15 to-cyan-500/20',
      accent: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.5)',
      border: 'border-purple-500/40'
    }
  },
  {
    id: 'third-place',
    rank: 3,
    title: 'Third Place',
    icon: '🥉',
    value: 'Coming Soon',
    description: 'Outstanding Achievement Award',
    colors: {
      primary: 'from-pink-500 via-fuchsia-600 to-purple-600',
      secondary: 'from-pink-500/20 via-fuchsia-600/15 to-purple-700/20',
      accent: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.5)',
      border: 'border-pink-500/40'
    }
  }
];

const FloatingOrb = memo(({ delay, colors, index }: { delay: number; colors: string; index: number }) => (
  <div
    className={cn('absolute w-1 h-1 rounded-full opacity-30')}
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

interface PrizeCardProps {
  prize: Prize;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const PrizeCard = memo(({ prize, isHovered, onHover }: PrizeCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <article
      ref={cardRef}
      className="relative transition-all duration-500 ease-out cursor-pointer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1200px) rotateX(${(mousePos.y - 0.5) * -8}deg) rotateY(${(mousePos.x - 0.5) * 8}deg) translateZ(20px)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
    >
      <div
        className={cn(
          'relative h-[440px] rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          prize.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${prize.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${prize.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Subtle Background Gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-700',
            `bg-gradient-to-br ${prize.colors.secondary}`
          )}
          style={{ opacity: isHovered ? 0.4 : 0.2 }}
        />

        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${isHovered ? `${mousePos.x * 100}% ${mousePos.y * 100}%` : '50% 0%'}, ${prize.colors.glow} 0%, transparent 60%)`,
            transition: 'background 0.3s ease-out'
          }}
        />

        {/* Subtle Scan Line */}
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
            <FloatingOrb key={i} delay={i * 1.2} colors={prize.colors.accent} index={i} />
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 text-center">
          {/* Rank Badge */}
          <div
            className={cn(
              'absolute top-6 right-6 w-10 h-10 rounded-lg flex items-center justify-center',
              'text-sm font-bold backdrop-blur-xl transition-all duration-300',
              'bg-white/5 border border-white/10'
            )}
            style={{
              color: prize.colors.accent,
              boxShadow: isHovered ? `0 0 20px ${prize.colors.glow}` : 'none',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {prize.rank}
          </div>

          {/* Icon */}
          <div
            className="relative mb-8"
            style={{
              filter: isHovered ? `drop-shadow(0 0 25px ${prize.colors.glow})` : `drop-shadow(0 0 10px ${prize.colors.glow})`,
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 0.4s ease-out'
            }}
          >
            <div className="text-8xl">
              {prize.icon}
            </div>
          </div>

          {/* Title */}
          <h3
  className={cn(
    'text-3xl md:text-4xl font-bold mb-3 tracking-tight transition-all duration-300 text-[#f2f2f2]'
  )}
  style={{
    filter: isHovered ? `drop-shadow(0 0 20px ${prize.colors.glow})` : 'none'
  }}
>
  {prize.title}
</h3>


          {/* Description */}
          <p className={cn(
            'text-slate-400 text-sm mb-8 font-medium tracking-wide transition-colors duration-300',
            isHovered && 'text-slate-300'
          )}>
            {prize.description}
          </p>

          {/* Value */}
          <div
            className={cn(
              'relative px-8 py-3.5 rounded-lg transition-all duration-300',
              'bg-white/5 backdrop-blur-xl border border-white/10',
              'overflow-hidden group'
            )}
            style={{
              boxShadow: isHovered ? `0 0 30px ${prize.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.05)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${prize.colors.glow}, transparent)`,
                animation: isHovered ? 'shimmer-value 2s ease-in-out infinite' : 'none'
              }}
            />
            <span className="relative z-10 text-white font-semibold text-lg tracking-wide">
              {prize.value}
            </span>
          </div>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: prize.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: prize.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
        </div>
      </div>
    </article>
  );
});
PrizeCard.displayName = 'PrizeCard';

export default function Prizes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('prizes');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top - windowHeight * 0.3) / (windowHeight * 0.4)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="prizes"
      className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div
          className="text-center mb-24"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Prizes & Recognition
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Compete with the best and earn recognition for innovation.{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              Exceptional rewards await.
            </span>
          </p>
        </div>

        {/* Prizes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRIZES_CONFIG.map((prize, index) => (
            <PrizeCard
              key={prize.id}
              prize={prize}
              isHovered={hoveredIndex === index}
              onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
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
        @keyframes shimmer-value {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float-bg {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}