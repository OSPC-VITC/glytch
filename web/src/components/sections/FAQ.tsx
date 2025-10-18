'use client';

import React, { useState, useEffect, memo } from 'react';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const QA = [
  {
    q: "Who can participate?",
    a: "Anyone who loves to build — students, professionals, beginners. Teams of 4-6 are welcome.",
    colors: {
      text: '#f2f2f2',
      glow: 'rgba(255, 77, 143, 0.5)',
      accent: '#ff4d8f',
      border: 'border-orange-500/40'
    }
  },
  {
    q: "What should I bring?",
    a: "Laptop, chargers, valid ID, and your creative energy.",
    colors: {
      text: '#f2f2f2',
      glow: 'rgba(139, 92, 246, 0.5)',
      accent: '#8b5cf6',
      border: 'border-purple-500/40'
    }
  },
  {
    q: "What are the judging criteria?",
    a: "Impact, technical depth, design craft, and innovation. Live demos only — no slide decks.",
    colors: {
      text: '#f2f2f2',
      glow: 'rgba(236, 72, 153, 0.5)',
      accent: '#ec4899',
      border: 'border-pink-500/40'
    }
  },
  {
    q: "Is there a fee?",
    a: "No registration fee required. Just your skills and passion.",
    colors: {
      text: '#f2f2f2',
      glow: 'rgba(34, 211, 238, 0.5)',
      accent: '#22d3ee',
      border: 'border-cyan-500/40'
    }
  },
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

interface FAQItemProps {
  item: typeof QA[0];
  index: number;
  isOpen: boolean;
  isHovered: boolean;
  onToggle: () => void;
  onHover: (hovered: boolean) => void;
}

const FAQItem = memo(({ item, index, isOpen, isHovered, onToggle, onHover }: FAQItemProps) => {
  return (
    <article
      className="relative transition-all duration-500 ease-out"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0px)'
      }}
    >
      <div
        className={cn(
          'relative rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          item.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${item.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${item.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className={cn('absolute inset-0 opacity-0 transition-opacity duration-700')}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${item.colors.glow} 0%, transparent 60%)`,
            opacity: isHovered ? 0.3 : 0.15
          }}
        />

        {/* Scan Line */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            animation: 'scan-slow 8s ease-in-out infinite'
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <FloatingOrb key={i} delay={i * 1.5} colors={item.colors.accent} index={i + index * 3} />
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
        <div className="relative z-10">
          {/* Question Button */}
          <button
            onClick={onToggle}
            className="w-full text-left p-6 flex items-center justify-between gap-4 group"
          >
            <h3
  className={cn(
    'text-lg md:text-xl font-semibold tracking-tight transition-all duration-300'
  )}
  style={{
    color: item.colors.text,
    filter: isHovered ? `drop-shadow(0 0 15px ${item.colors.glow})` : 'none'
  }}
>
  {item.q}
</h3>

            
            <div
              className={cn(
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                'transition-all duration-300',
                'bg-white/5 backdrop-blur-xl border border-white/10'
              )}
              style={{
                color: item.colors.accent,
                boxShadow: isHovered ? `0 0 20px ${item.colors.glow}` : 'none',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <span className="text-xl font-light">
                {isOpen ? '−' : '+'}
              </span>
            </div>
          </button>

          {/* Answer */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: isOpen ? '300px' : '0px',
              opacity: isOpen ? 1 : 0
            }}
          >
            <div className="px-6 pb-6 pt-0">
              <div
                className={cn(
                  'relative p-5 rounded-lg',
                  'bg-white/5 backdrop-blur-xl border border-white/10'
                )}
                style={{
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`
                }}
              >
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {item.a}
                </p>
                
                {/* Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-30"
                  style={{ borderColor: item.colors.accent }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div 
          className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
          style={{ 
            borderColor: item.colors.accent,
            opacity: isHovered ? 0.6 : 0.3
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
          style={{ 
            borderColor: item.colors.accent,
            opacity: isHovered ? 0.6 : 0.3
          }}
        />
      </div>
    </article>
  );
});
FAQItem.displayName = 'FAQItem';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('faq');
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
      id="faq"
      className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div
          className="text-center mb-16"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about participating.{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              Still have questions?
            </span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {QA.map((item, index) => (
            <FAQItem
              key={item.q}
              item={item}
              index={index}
              isOpen={openIndex === index}
              isHovered={hoveredIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
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
        @keyframes float-bg {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
