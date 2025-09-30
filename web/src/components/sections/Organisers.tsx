"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

type Organizer = {
  id: string;
  name: string;
  logo: string;
  description: string;
  links: { icon: React.ReactNode; url: string }[];
  colors: {
    glow: string;
    accent: string;
    border: string;
  };
};

const organizers: Organizer[] = [
  {
    id: "oscp",
    name: "OSPC",
    logo: "https://raw.githubusercontent.com/ospc-vitc/.github/main/profile/logo.png",
    description: "The Open Source Programming Club at VIT Chennai fosters innovation through open-source collaboration and builds a vibrant tech community.",
    links: [
      { icon: <FaGlobe />, url: "https://ospc.in" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/open-source-programming-club-vitc/" },
      { icon: <FaGithub />, url: "https://github.com/ospc-vitc" },
      { icon: <FaTwitter />, url: "https://twitter.com/ospc_vitc" },
    ],
    colors: {
      glow: 'rgba(255, 77, 143, 0.5)',
      accent: '#ff4d8f',
      border: 'border-orange-500/40'
    }
  },
  {
    id: "ieee-ras",
    name: "IEEE RAS VIT Chennai",
    logo: "https://ras.ieeevitc.org/assets/img/logo.png",
    description: "The IEEE Robotics and Automation Society at VIT Chennai promotes robotics, automation, and AI with hands-on projects.",
    links: [
      { icon: <FaGlobe />, url: "https://ras.ieeevitc.org" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/ieee-ras-vitc/" },
      { icon: <FaGithub />, url: "https://github.com/ieee-ras-vitc" },
      { icon: <FaTwitter />, url: "https://twitter.com/ieeevitc" },
    ],
    colors: {
      glow: 'rgba(139, 92, 246, 0.5)',
      accent: '#8b5cf6',
      border: 'border-purple-500/40'
    }
  },
  {
    id: "gdg",
    name: "GDG on Campus VIT Chennai",
    logo: "https://developers.google.com/community/gdg/images/gdg-logo.png",
    description: "GDG VIT Chennai is a student-led developer community that hosts meetups, hackathons, and workshops for Google technologies.",
    links: [
      { icon: <FaGlobe />, url: "https://gdg.community.dev/gdg-on-campus-vit-chennai/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/gdg-vitc/" },
      { icon: <FaGithub />, url: "https://github.com/google" },
      { icon: <FaTwitter />, url: "https://twitter.com/googledevs" },
    ],
    colors: {
      glow: 'rgba(236, 72, 153, 0.5)',
      accent: '#ec4899',
      border: 'border-pink-500/40'
    }
  }
];

const teamSections = [
  {
    title: "Faculty Coordinators",
    items: [
      "Dr. R. Kumar – Professor, School of CS",
      "Dr. A. Meena – Associate Professor, School of AI",
    ],
    colors: {
      glow: 'rgba(34, 211, 238, 0.5)',
      accent: '#22d3ee',
      border: 'border-cyan-500/40'
    }
  },
  {
    title: "Organising Team",
    items: [
      "Prannvakanth – Student Coordinator",
      "Priya Sharma – Event Manager",
      "Rohit Verma – Operations Lead",
    ],
    colors: {
      glow: 'rgba(249, 115, 22, 0.5)',
      accent: '#f97316',
      border: 'border-orange-500/40'
    }
  },
  {
    title: "Core Tech Team",
    items: [
      "Ananya Singh – Frontend Lead",
      "Ravi Kumar – Backend Lead",
      "Sneha Iyer – DevOps",
    ],
    colors: {
      glow: 'rgba(168, 85, 247, 0.5)',
      accent: '#a855f7',
      border: 'border-purple-500/40'
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

interface OrganizerCardProps {
  organizer: Organizer;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const OrganizerCard = memo(({ organizer, index, isHovered, onHover }: OrganizerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative transition-all duration-500 ease-out"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)'
      }}
    >
      <div
        className={cn(
          'relative h-[380px] rounded-xl overflow-hidden transition-all duration-500',
          'bg-gradient-to-b from-black via-slate-950 to-black',
          'border',
          organizer.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${organizer.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${organizer.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className={cn('absolute inset-0 opacity-0 transition-opacity duration-700')}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${organizer.colors.glow} 0%, transparent 60%)`,
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
            <FloatingOrb key={i} delay={i * 1.2} colors={organizer.colors.accent} index={i + index * 5} />
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
          {/* Logo */}
          <div
            className="mb-6 transition-all duration-400"
            style={{
              filter: isHovered ? `drop-shadow(0 0 25px ${organizer.colors.glow})` : `drop-shadow(0 0 10px ${organizer.colors.glow})`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <img
              src={organizer.logo}
              alt={organizer.name}
              className="h-24 w-24 object-contain"
            />
          </div>

          {/* Name */}
          <h3
            className="text-2xl md:text-3xl font-bold mb-4 tracking-tight transition-all duration-300 text-[#f2f2f2]"
            style={{
              filter: isHovered ? `drop-shadow(0 0 20px ${organizer.colors.glow})` : 'none'
            }}
          >
            {organizer.name}
          </h3>

          {/* Description */}
          <p className={cn(
            'text-slate-400 text-sm leading-relaxed mb-6 transition-colors duration-300',
            isHovered && 'text-slate-300'
          )}>
            {organizer.description}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 text-xl">
            {organizer.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                  'bg-white/5 backdrop-blur-xl border border-white/10'
                )}
                style={{
                  color: organizer.colors.accent,
                  boxShadow: isHovered ? `0 0 20px ${organizer.colors.glow}` : 'none'
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: organizer.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: organizer.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});
OrganizerCard.displayName = 'OrganizerCard';

interface TeamSectionProps {
  section: typeof teamSections[0];
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const TeamSection = memo(({ section, index, isHovered, onHover }: TeamSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
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
          section.colors.border,
          isHovered && 'border-white/30'
        )}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px ${section.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px ${section.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Background Gradient */}
        <div
          className={cn('absolute inset-0 opacity-0 transition-opacity duration-700')}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${section.colors.glow} 0%, transparent 60%)`,
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
            <FloatingOrb key={i} delay={i * 1.5} colors={section.colors.accent} index={i + index * 3} />
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
        <div className="relative z-10 p-8">
          {/* Title */}
          <h3
            className="text-2xl font-bold text-center mb-6 tracking-tight transition-all duration-300 text-[#f2f2f2]"
            style={{
              filter: isHovered ? `drop-shadow(0 0 20px ${section.colors.glow})` : 'none'
            }}
          >
            {section.title}
          </h3>

          {/* Team Members */}
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  'relative py-3 px-4 rounded-lg transition-all duration-300',
                  'bg-white/5 backdrop-blur-xl border border-white/10'
                )}
                style={{
                  boxShadow: isHovered ? `inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <p className="text-white/90 text-sm md:text-base">{item}</p>
                
                {/* Subtle accent line */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r opacity-50"
                  style={{ background: section.colors.accent }}
                />
              </motion.li>
            ))}
          </ul>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: section.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl opacity-30 transition-opacity duration-300"
            style={{ 
              borderColor: section.colors.accent,
              opacity: isHovered ? 0.6 : 0.3
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});
TeamSection.displayName = 'TeamSection';

export default function Organizers() {
  const [hoveredOrgIndex, setHoveredOrgIndex] = useState<number | null>(null);
  const [hoveredTeamIndex, setHoveredTeamIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 scroll-mt-32 overflow-hidden bg-black/70">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            VOID Organizers
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Powered by passionate communities and dedicated teams.{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              Building innovation together.
            </span>
          </p>
        </div>

        {/* Organizer Clubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {organizers.map((organizer, index) => (
            <OrganizerCard
              key={organizer.id}
              organizer={organizer}
              index={index}
              isHovered={hoveredOrgIndex === index}
              onHover={(hovered) => setHoveredOrgIndex(hovered ? index : null)}
            />
          ))}
        </div>

        {/* Team Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamSections.map((section, index) => (
            <TeamSection
              key={section.title}
              section={section}
              index={index}
              isHovered={hoveredTeamIndex === index}
              onHover={(hovered) => setHoveredTeamIndex(hovered ? index : null)}
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