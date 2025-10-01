'use client';

import React, { useState, useEffect, memo } from 'react';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Sponsor = {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  description: string;
  website: string;
};

const SPONSORS_CONFIG: Sponsor[] = [
  // Platinum Sponsors
  {
    id: 'sponsor-1',
    name: 'TechCorp',
    logo: '💎',
    tier: 'platinum',
    description: 'Leading innovation partner',
    website: '#'
  },
  {
    id: 'sponsor-2',
    name: 'InnovateLabs',
    logo: '⚡',
    tier: 'platinum',
    description: 'Powering the future',
    website: '#'
  },
  // Gold Sponsors
  {
    id: 'sponsor-3',
    name: 'DevSolutions',
    logo: '🚀',
    tier: 'gold',
    description: 'Building tomorrow',
    website: '#'
  },
  {
    id: 'sponsor-4',
    name: 'CloudWave',
    logo: '☁️',
    tier: 'gold',
    description: 'Cloud infrastructure',
    website: '#'
  },
  {
    id: 'sponsor-5',
    name: 'DataStream',
    logo: '📊',
    tier: 'gold',
    description: 'Analytics platform',
    website: '#'
  },
  // Silver Sponsors
  {
    id: 'sponsor-6',
    name: 'CodeHub',
    logo: '💻',
    tier: 'silver',
    description: 'Developer tools',
    website: '#'
  },
  {
    id: 'sponsor-7',
    name: 'StartupX',
    logo: '🌟',
    tier: 'silver',
    description: 'Startup ecosystem',
    website: '#'
  },
  {
    id: 'sponsor-8',
    name: 'AICore',
    logo: '🤖',
    tier: 'silver',
    description: 'AI solutions',
    website: '#'
  },
  {
    id: 'sponsor-9',
    name: 'WebForge',
    logo: '🔥',
    tier: 'silver',
    description: 'Web development',
    website: '#'
  }
];

const TIER_CONFIG = {
  platinum: {
    title: 'Platinum Sponsors',
    colors: {
      primary: 'from-orange-500 via-pink-600 to-fuchsia-600',
      secondary: 'from-orange-500/20 via-pink-600/15 to-fuchsia-700/20',
      accent: '#ff4d8f',
      glow: 'rgba(255, 77, 143, 0.5)',
      border: 'border-orange-500/40'
    },
    size: 'large'
  },
  gold: {
    title: 'Gold Sponsors',
    colors: {
      primary: 'from-purple-500 via-blue-600 to-cyan-500',
      secondary: 'from-purple-500/20 via-blue-600/15 to-cyan-500/20',
      accent: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.5)',
      border: 'border-purple-500/40'
    },
    size: 'medium'
  },
  silver: {
    title: 'Silver Sponsors',
    colors: {
      primary: 'from-pink-500 via-fuchsia-600 to-purple-600',
      secondary: 'from-pink-500/20 via-fuchsia-600/15 to-purple-700/20',
      accent: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.5)',
      border: 'border-pink-500/40'
    },
    size: 'small'
  }
};

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

interface SponsorCardProps {
  sponsor: Sponsor;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const SponsorCard = memo(({ sponsor, isHovered, onHover }: SponsorCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tierConfig = TIER_CONFIG[sponsor.tier];
  const cardRef = React.useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const heightClass = tierConfig.size === 'large' 
    ? 'h-[320px]' 
    : tierConfig.size === 'medium' 
    ? 'h-[280px]' 
    : 'h-[240px]';

  return (
    <a
      ref={cardRef}
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'relative block transition-all duration-500 ease-out cursor-pointer group',
        heightClass
      )}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1200px) rotateX(${(mousePos.y - 0.5) * -6}deg) rotateY(${(mousePos.x - 0.5) * 6}deg) translateZ(15px)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
    >
      <div
        className={cn(
          'relative h-full rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          tierConfig.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -12px rgba(0, 0, 0, 0.8), 0 0 40px ${tierConfig.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px ${tierConfig.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-700',
            `bg-gradient-to-br ${tierConfig.colors.secondary}`
          )}
          style={{ opacity: isHovered ? 0.4 : 0.2 }}
        />

        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${isHovered ? `${mousePos.x * 100}% ${mousePos.y * 100}%` : '50% 0%'}, ${tierConfig.colors.glow} 0%, transparent 60%)`,
            transition: 'background 0.3s ease-out'
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <FloatingOrb key={i} delay={i * 1.2} colors={tierConfig.colors.accent} index={i} />
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Logo/Icon */}
          <div
            className={cn(
              'mb-6 transition-all duration-400',
              tierConfig.size === 'large' ? 'text-7xl' : tierConfig.size === 'medium' ? 'text-6xl' : 'text-5xl'
            )}
            style={{
              filter: isHovered ? `drop-shadow(0 0 25px ${tierConfig.colors.glow})` : `drop-shadow(0 0 10px ${tierConfig.colors.glow})`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.4s ease-out'
            }}
          >
            {sponsor.logo}
          </div>

          {/* Sponsor Name */}
          <h3
            className={cn(
              'font-bold mb-2 tracking-tight transition-all duration-300 text-[#f2f2f2]',
              tierConfig.size === 'large' ? 'text-2xl md:text-3xl' : tierConfig.size === 'medium' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
            )}
            style={{
              filter: isHovered ? `drop-shadow(0 0 15px ${tierConfig.colors.glow})` : 'none'
            }}
          >
            {sponsor.name}
          </h3>

          {/* Description */}
          <p className={cn(
            'text-slate-400 text-sm font-medium tracking-wide transition-colors duration-300',
            isHovered && 'text-slate-300'
          )}>
            {sponsor.description}
          </p>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: tierConfig.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: tierConfig.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
        </div>
      </div>
    </a>
  );
});
SponsorCard.displayName = 'SponsorCard';

interface TierSectionProps {
  tier: 'platinum' | 'gold' | 'silver';
  sponsors: Sponsor[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

const TierSection = memo(({ tier, sponsors, hoveredId, onHover }: TierSectionProps) => {
  const tierConfig = TIER_CONFIG[tier];
  
  const gridCols = tier === 'platinum' 
    ? 'grid-cols-1 md:grid-cols-2' 
    : tier === 'gold' 
    ? 'grid-cols-1 md:grid-cols-3' 
    : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="mb-20 last:mb-0">
      {/* Tier Title */}
      <div className="text-center mb-12">
        <h3 
          className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
          style={{
            filter: `drop-shadow(0 0 20px ${tierConfig.colors.glow})`
          }}
        >
          {tierConfig.title}
        </h3>
        <div 
          className="w-24 h-1 mx-auto rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tierConfig.colors.accent}, transparent)`,
            boxShadow: `0 0 15px ${tierConfig.colors.glow}`
          }}
        />
      </div>

      {/* Sponsors Grid */}
      <div className={cn('grid gap-6', gridCols)}>
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            isHovered={hoveredId === sponsor.id}
            onHover={(hovered) => onHover(hovered ? sponsor.id : null)}
          />
        ))}
      </div>
    </div>
  );
});
TierSection.displayName = 'TierSection';

export default function Sponsors() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('sponsors');
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

  const platinumSponsors = SPONSORS_CONFIG.filter(s => s.tier === 'platinum');
  const goldSponsors = SPONSORS_CONFIG.filter(s => s.tier === 'gold');
  const silverSponsors = SPONSORS_CONFIG.filter(s => s.tier === 'silver');

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
            background: 'radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
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
            Our Sponsors
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Powered by industry leaders and innovators who believe in{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              shaping the future together.
            </span>
          </p>
        </div>

        {/* Sponsor Tiers */}
        {platinumSponsors.length > 0 && (
          <TierSection
            tier="platinum"
            sponsors={platinumSponsors}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        )}
        
        {goldSponsors.length > 0 && (
          <TierSection
            tier="gold"
            sponsors={goldSponsors}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        )}
        
        {silverSponsors.length > 0 && (
          <TierSection
            tier="silver"
            sponsors={silverSponsors}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
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