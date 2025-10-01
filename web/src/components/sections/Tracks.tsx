"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Spec = { label: string; value: string };
type Track = {
  id: string;
  number: string;
  brand: string;
  name: string;
  subtitle: string;
  specs: Spec[];
  badges: string[];
  background: string;
  accent: string;
};

const DATA: Track[] = [
  {
    id: "fintech",
    number: "01",
    brand: "Fintech & Digital Payments",
    name: "Real‑time, Composable Payments",
    subtitle: "UPI, multi‑rail checkout, KYC/AML automation",
    specs: [
      { label: "Focus", value: "Real-time transactions & security" },
      { label: "Stack", value: "Payment gateways, APIs, blockchain" },
      { label: "Challenge", value: "Build a secure, instant payment solution" },
    ],
    badges: ["UPI Integration", "Secure", "Scalable"],
    background: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop')",
    accent: "#00ff88",
  },
  {
    id: "health-ed",
    number: "02",
    brand: "Healthtech & Edtech",
    name: "Assistive, Privacy‑first Tools",
    subtitle: "Care coordination, tele‑health, adaptive learning",
    specs: [
      { label: "Focus", value: "Patient care & learning outcomes" },
      { label: "Stack", value: "ML/AI, telehealth APIs, LLMs" },
      { label: "Challenge", value: "Create tools that improve healthcare/education" },
    ],
    badges: ["AI-Powered", "Privacy-First", "Accessible"],
    background: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop')",
    accent: "#00d4ff",
  },
  {
    id: "retail-saas-mobility",
    number: "03",
    brand: "Retailtech | SaaS | Smart Mobility",
    name: "Operational Intelligence",
    subtitle: "Inventory, routing, commerce automation",
    specs: [
      { label: "Focus", value: "Efficiency, automation, optimization" },
      { label: "Stack", value: "IoT, real-time analytics, mobile apps" },
      { label: "Challenge", value: "Build solutions for retail, SaaS or mobility" },
    ],
    badges: ["IoT-Ready", "Real-time", "Mobile-First"],
    background: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
    accent: "#ff6b00",
  },
  {
    id: "agri-sdg",
    number: "04",
    brand: "AgriTech & SDG",
    name: "Planet‑scale Resilience",
    subtitle: "Yield, climate risk, supply transparency",
    specs: [
      { label: "Focus", value: "Sustainable agriculture & climate action" },
      { label: "Stack", value: "Satellite imagery, IoT sensors, ML" },
      { label: "Challenge", value: "Create solutions for sustainable development" },
    ],
    badges: ["Sustainable", "Data-Driven", "Impact"],
    background: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop')",
    accent: "#7ed321",
  },
  {
    id: "open",
    number: "05",
    brand: "Open Innovation",
    name: "Wildcard & Frontier",
    subtitle: "If it inspires, build it.",
    specs: [
      { label: "Focus", value: "Innovation & creative problem-solving" },
      { label: "Stack", value: "Any tech stack of your choice" },
      { label: "Challenge", value: "Build something unique that doesn't fit other tracks" },
    ],
    badges: ["Innovative", "Disruptive", "Moonshot"],
    background: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')",
    accent: "#bd10e0",
  },
];

export default function Tracks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToSlide((currentIndex - 1 + DATA.length) % DATA.length);
      if (e.key === 'ArrowRight') goToSlide((currentIndex + 1) % DATA.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToSlide]);

  const nextSlide = () => goToSlide((currentIndex + 1) % DATA.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + DATA.length) % DATA.length);

  const currentTrack = DATA[currentIndex];

  return (
    <section id="tracks" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bgOrb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: pulse 4s ease-in-out infinite;
          pointer-events: none;
          will-change: opacity;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
        }
        .subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
          letter-spacing: -2px;
        }
        .mainContent {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: center;
          min-height: 600px;
        }
        .leftPanel {
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: rgba(255, 255, 255, 0.02);
          padding: 48px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          will-change: transform, opacity;
        }
        .numberBadge {
          font-size: 8rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, ${currentTrack.accent} 0%, rgba(255,255,255,0.3) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 80px ${currentTrack.accent}80;
          animation: fadeIn 0.6s ease-out;
          position: relative;
        }
        .numberBadge::before {
          content: '${currentTrack.number}';
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          filter: blur(20px);
          opacity: 0.5;
        }
        .trackMeta {
          animation: slideInLeft 0.6s ease-out 0.1s both;
        }
        .brand {
          font-size: 0.85rem;
          color: ${currentTrack.accent};
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .trackName {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin: 0 0 16px 0;
          letter-spacing: -1px;
        }
        .trackSubtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }
        .navigation {
          display: flex;
          gap: 16px;
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        .navBtn {
          width: 60px;
          height: 60px;
          border: 2px solid ${currentTrack.accent}40;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          color: ${currentTrack.accent};
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navBtn:hover {
          background: ${currentTrack.accent}20;
          border-color: ${currentTrack.accent};
          transform: scale(1.1);
        }
        .rightPanel {
          position: relative;
          height: 600px;
          animation: slideInRight 0.6s ease-out 0.2s both;
        }
        .imageContainer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 32px;
          overflow: hidden;
          background-image: ${currentTrack.background};
          background-size: cover;
          background-position: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px ${currentTrack.accent}30;
          transition: transform 0.4s ease-out;
          will-change: transform;
        }
        .imageContainer:hover {
          transform: scale(1.02);
        }
        .imageOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${currentTrack.accent}20 0%, transparent 50%, rgba(0,0,0,0.8) 100%);
        }
        .contentOverlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
          background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
        }
        .specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .spec {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid ${currentTrack.accent}30;
          border-radius: 16px;
          padding: 16px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .spec:hover {
          background: rgba(0, 0, 0, 0.8);
          border-color: ${currentTrack.accent};
          transform: translateY(-4px);
        }
        .specLabel {
          font-size: 0.75rem;
          color: ${currentTrack.accent};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .specValue {
          font-size: 0.9rem;
          color: white;
          font-weight: 500;
          line-height: 1.4;
        }
        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .badge {
          padding: 10px 20px;
          background: ${currentTrack.accent}20;
          border: 1px solid ${currentTrack.accent}60;
          border-radius: 24px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .badge:hover {
          background: ${currentTrack.accent}40;
          transform: scale(1.05);
          box-shadow: 0 4px 12px ${currentTrack.accent}40;
        }
        .dots {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 60px;
        }
        .dot {
          width: 48px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .dot::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${currentTrack.accent};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .dot.active::before {
          transform: scaleX(1);
        }
        .dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        @media (max-width: 1024px) {
          .mainContent {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .rightPanel {
            height: 500px;
          }
          .specs {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .title {
            font-size: 2.5rem;
          }
          .numberBadge {
            font-size: 5rem;
          }
          .trackName {
            font-size: 2rem;
          }
          .rightPanel {
            height: 400px;
          }
          .navBtn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }
        }
      `}</style>
      
      <div className="bgOrb" style={{ 
        width: '600px', 
        height: '600px', 
        background: currentTrack.accent, 
        top: '-300px', 
        right: '-200px',
        opacity: 0.15
      }} />
      <div className="bgOrb" style={{ 
        width: '400px', 
        height: '400px', 
        background: currentTrack.accent, 
        bottom: '-200px', 
        left: '-100px',
        opacity: 0.1,
        animationDelay: '2s'
      }} />

      <div className="container">
        <div className="header">
          <div className="subtitle">Explore Challenge Domains</div>
          <h1 className="title">Tracks</h1>
        </div>

        <div className="mainContent">
          <div className="leftPanel">
            <div className="numberBadge">{currentTrack.number}</div>
            <div className="trackMeta">
              <div className="brand">{currentTrack.brand}</div>
              <h2 className="trackName">{currentTrack.name}</h2>
              <p className="trackSubtitle">{currentTrack.subtitle}</p>
            </div>
            <div className="navigation">
              <button className="navBtn" onClick={prevSlide} aria-label="Previous track">‹</button>
              <button className="navBtn" onClick={nextSlide} aria-label="Next track">›</button>
            </div>
          </div>

          <div className="rightPanel">
            <div className="imageContainer">
              <div className="imageOverlay" />
              <div className="contentOverlay">
                <div className="specs">
                  {currentTrack.specs.map((spec) => (
                    <div key={spec.label} className="spec">
                      <div className="specLabel">{spec.label}</div>
                      <div className="specValue">{spec.value}</div>
                    </div>
                  ))}
                </div>
                <div className="badges">
                  {currentTrack.badges.map((badge) => (
                    <div key={badge} className="badge">{badge}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dots">
          {DATA.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to track ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}