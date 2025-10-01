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
    accent: "#ec4899",
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
    accent: "#a855f7",
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
    accent: "#ec4899",
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
    accent: "#a855f7",
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
    accent: "#ec4899",
  },
];

export default function Tracks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    <section id="tracks" className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bgOrb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          animation: pulse 8s ease-in-out infinite;
          pointer-events: none;
          will-change: opacity;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        .header {
          text-align: center;
          margin-bottom: 48px;
        }
        .title {
          font-size: 4rem;
          font-weight: 900;
          color: white;
          margin: 0;
          letter-spacing: -2px;
        }
        .mainContent {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          align-items: center;
          min-height: 500px;
        }
        .leftPanel {
          display: flex;
          flex-direction: column;
          gap: 28px;
          background: rgba(168, 85, 247, 0.03);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(168, 85, 247, 0.2);
          backdrop-filter: blur(10px);
          will-change: transform;
          transition: transform 0.3s ease-out;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .numberBadge {
          font-size: 7rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, ${currentTrack.accent} 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: fadeIn 0.4s ease-out;
          position: relative;
          filter: drop-shadow(0 0 30px ${currentTrack.accent}80);
        }
        .trackMeta {
          animation: slideInLeft 0.5s ease-out both;
        }
        .brand {
          font-size: 0.85rem;
          color: ${currentTrack.accent};
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 8px ${currentTrack.accent}60);
        }
        .trackName {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.1;
          margin: 0 0 12px 0;
          letter-spacing: -1px;
        }
        .trackSubtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }
        .navigation {
          display: flex;
          gap: 12px;
          animation: fadeIn 0.5s ease-out 0.1s both;
        }
        .navBtn {
          width: 56px;
          height: 56px;
          border: 2px solid ${currentTrack.accent}50;
          background: rgba(168, 85, 247, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          color: ${currentTrack.accent};
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navBtn:hover {
          background: ${currentTrack.accent}30;
          border-color: ${currentTrack.accent};
          transform: scale(1.08);
          box-shadow: 0 0 20px ${currentTrack.accent}60;
        }
        .navBtn:active {
          transform: scale(0.95);
        }
        .rightPanel {
          position: relative;
          height: 500px;
          animation: slideInRight 0.5s ease-out both;
        }
        .imageContainer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          background-image: ${currentTrack.background};
          background-size: cover;
          background-position: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${currentTrack.accent}40;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .imageContainer:hover {
          transform: scale(1.015);
          box-shadow: 0 25px 70px rgba(0,0,0,0.7), 0 0 0 1px ${currentTrack.accent}60;
        }
        .imageOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${currentTrack.accent}20 0%, transparent 50%, rgba(10,6,18,0.9) 100%);
        }
        .contentOverlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          background: linear-gradient(to top, rgba(10,6,18,0.98), transparent);
        }
        .specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .spec {
          background: rgba(168, 85, 247, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid ${currentTrack.accent}40;
          border-radius: 12px;
          padding: 14px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .spec:hover {
          background: rgba(168, 85, 247, 0.15);
          border-color: ${currentTrack.accent};
          transform: translateY(-3px);
          box-shadow: 0 8px 20px ${currentTrack.accent}30;
        }
        .specLabel {
          font-size: 0.7rem;
          color: ${currentTrack.accent};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
          font-weight: 700;
        }
        .specValue {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          line-height: 1.3;
        }
        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .badge {
          padding: 8px 16px;
          background: ${currentTrack.accent}25;
          border: 1px solid ${currentTrack.accent}70;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .badge:hover {
          background: ${currentTrack.accent}50;
          transform: scale(1.05);
          box-shadow: 0 4px 16px ${currentTrack.accent}60;
        }
        .dots {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 48px;
        }
        .dot {
          width: 40px;
          height: 3px;
          background: rgba(168, 85, 247, 0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px ${currentTrack.accent};
        }
        .dot.active::before {
          transform: scaleX(1);
        }
        .dot:hover {
          background: rgba(168, 85, 247, 0.4);
        }
        @media (max-width: 1024px) {
          .mainContent {
            grid-template-columns: 1fr;
            gap: 32px;
            min-height: auto;
          }
          .rightPanel {
            height: 450px;
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
            height: 380px;
          }
          .navBtn {
            width: 48px;
            height: 48px;
            font-size: 1.3rem;
          }
          .leftPanel {
            padding: 32px;
          }
        }
      `}</style>
      
      <div className="bgOrb" style={{ 
        width: '600px', 
        height: '600px', 
        background: 'radial-gradient(circle, #ec4899 0%, #a855f7 100%)', 
        top: '-300px', 
        right: '-200px',
        opacity: 0.15
      }} />
      <div className="bgOrb" style={{ 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, #a855f7 0%, #ec4899 100%)', 
        bottom: '-250px', 
        left: '-150px',
        opacity: 0.12,
        animationDelay: '4s'
      }} />

      <div className="container">
        <div className="header">
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