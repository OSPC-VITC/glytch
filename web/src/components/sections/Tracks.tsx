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
    background:
      "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop')",
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
    background:
      "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop')",
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
    background:
      "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
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
    background:
      "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop')",
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
    background:
      "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')",
  },
];

export default function Tracks() {
  const [active, setActive] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const setActiveSlide = useCallback((index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setActive((curr) => (curr === index ? -1 : index));
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (e.key === "ArrowLeft") {
          setActive((curr) => (curr === -1 ? DATA.length - 1 : (curr - 1 + DATA.length) % DATA.length));
        }
        if (e.key === "ArrowRight") {
          setActive((curr) => (curr === -1 ? 0 : (curr + 1) % DATA.length));
        }
      });
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="tracks" style={{ minHeight: "100vh", background: "#000", padding: "48px 16px" }}>
      <style jsx>{`
        .sliderContainer {
          position: relative;
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .accordionSlider {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: auto;
        }
        @media (min-width: 768px) {
          .accordionSlider {
            flex-direction: row;
            height: 650px;
            gap: 8px;
          }
        }
        .slide {
          position: relative;
          flex: 0.7;
          height: 140px;
          background-size: cover;
          background-position: center;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
          border: 2px solid rgba(255, 0, 128, 0.5);
          box-shadow: 0 0 40px rgba(255, 0, 128, 0.3);
        }
        @media (min-width: 768px) {
          .slide {
            height: 100%;
          }
        }
        .slide.active {
          flex: 4.5;
          height: 650px;
        }
        .mobileSlide {
          height: 160px;
        }
        .mobileSlide.active {
          height: 600px;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9));
          transition: opacity 0.5s ease;
        }
        .slide.active .overlay {
          opacity: 0.85;
        }
        .slideContent {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .slideContent {
            padding: 32px;
          }
        }
        .slideNumber {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 80px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.05);
          pointer-events: none;
          transition: all 0.5s ease;
        }
        @media (min-width: 768px) {
          .slideNumber {
            font-size: 100px;
          }
        }
        .active .slideNumber {
          top: 24px;
          right: 24px;
          font-size: 150px;
        }
        @media (min-width: 768px) {
          .active .slideNumber {
            font-size: 200px;
          }
        }
        .carBrand {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          transition: font-size 0.5s ease;
        }
        @media (min-width: 768px) {
          .carBrand {
            font-size: 24px;
          }
        }
        .active .carBrand,
        .mobileSlide .carBrand {
          font-size: 24px;
        }
        @media (min-width: 768px) {
          .active .carBrand {
            font-size: 36px;
          }
        }
        .carName {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(to right, #ff4081, #ff9100, #e040fb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .active .carName,
        .mobileSlide .carName {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .carName {
            font-size: 28px;
          }
          .active .carName {
            font-size: 32px;
          }
        }
        .carSubtitle {
          font-size: 14px;
          color: #ff80ab;
          font-weight: 500;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .active .carSubtitle,
        .mobileSlide .carSubtitle {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .carSubtitle {
            font-size: 16px;
          }
        }
        .carSpecs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .active .carSpecs,
        .mobileSlide .carSpecs {
          opacity: 1;
          transform: translateY(0);
        }
        .specRow {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 0, 128, 0.4);
          border-radius: 8px;
          padding: 12px 16px;
          box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
        }
        .specLabel {
          font-size: 12px;
          font-weight: 700;
          color: #ff80ab;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .specValue {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          margin-left: 12px;
        }
        .performanceBadges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s;
        }
        .active .performanceBadges,
        .mobileSlide .performanceBadges {
          opacity: 1;
          transform: translateY(0);
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(to right, rgba(255, 0, 128, 0.6), rgba(224, 64, 251, 0.6));
          border: 1px solid rgba(255, 0, 128, 0.5);
          border-radius: 9999px;
          color: #ffccbc;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 0 15px rgba(255, 0, 128, 0.4);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .badgeIcon {
          width: 10px;
          height: 10px;
          background: #ff4081;
          border-radius: 50%;
        }
        .addButton {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(255, 0, 128, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
        }
        .addButton::before {
          content: "";
          width: 12px;
          height: 12px;
          background: linear-gradient(to right, #ff4081, #e040fb);
          border-radius: 50%;
        }
        .active .addButton,
        .mobileSlide .addButton {
          transform: scale(1.1);
          border-color: #ff4081;
          box-shadow: 0 0 20px rgba(255, 0, 128, 0.6);
        }
        .instructions {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin-top: 24px;
          font-weight: 500;
        }
      `}</style>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          textAlign: "center",
          background: "linear-gradient(to right, #ff4081, #ff9100, #e040fb)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          marginBottom: "3rem",
          textShadow: "0 0 30px rgba(255, 0, 128, 0.7)",
        }}
      >
        Tracks
      </h1>
      <div className="sliderContainer" onMouseLeave={() => !isMobile && setActive(-1)}>
        <div className="accordionSlider">
          {DATA.map((t, i) => {
            const slideClass = `slide ${active === i ? "active" : ""} ${isMobile ? "mobileSlide" : ""}`;

            return (
              <div
                key={t.id}
                className={slideClass}
                style={{ backgroundImage: t.background }}
                onMouseEnter={() => !isMobile && setActiveSlide(i)}
                onClick={() => setActiveSlide(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveSlide(i)}
                aria-pressed={active === i}
              >
                <div className="overlay" />
                <div className="slideContent">
                  <div className="slideNumber">{t.number}</div>
                  <div className={`carBrand ${isMobile ? "mobileCarBrand" : ""}`}>{t.brand}</div>
                  <div className={`carName ${isMobile ? "mobileCarName" : ""}`}>{t.name}</div>
                  <div className="carSubtitle">{t.subtitle}</div>
                  <div className="carSpecs">
                    {t.specs.map((s) => (
                      <div key={s.label} className="specRow">
                        <span className="specLabel">{s.label}:</span>
                        <span className="specValue">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="performanceBadges">
                    {t.badges.map((b, idx) => (
                      <div
                        key={b}
                        className="badge"
                        style={{ transitionDelay: active === i ? `${0.9 + idx * 0.1}s` : undefined }}
                      >
                        <div className="badgeIcon" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="addButton" aria-hidden />
                </div>
              </div>
            );
          })}
        </div>
        <div className="instructions">
          {isMobile ? "Tap a track to view details" : "Hover over tracks to explore • Use arrow keys to navigate"}
        </div>
      </div>
    </section>
  );
}