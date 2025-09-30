"use client";

import React from "react";
import { motion } from "framer-motion";

type Partner = {
  id: string;
  name: string;
  logo: string;
  description: string;
  url: string;
};

const partners: Partner[] = [
  {
    id: "perplexity",
    name: "Perplexity AI",
    logo: "/logos/perplexity.png",
    description:
      "AI-powered answer engine combining LLMs with live search for fast, up-to-date answers.",
    url: "https://perplexity.ai",
  },
  {
    id: "asg",
    name: "Asymmetric Club",
    logo: "/logos/asymmetric.png",
    description:
      "Tech community organizing hackathons, webinars, and projects to empower students.",
    url: "https://linkedin.com",
  },
  {
    id: "aidiotx",
    name: "AIDIOTX",
    logo: "/logos/aidiotx.png",
    description:
      "Community driving AI, robotics, and IoT innovation through workshops and projects.",
    url: "https://linkedin.com",
  },
  {
    id: "aurelian",
    name: "Aurelian Racing",
    logo: "/logos/aurelian.png",
    description:
      "Student motorsport team building and racing engineering projects at scale.",
    url: "https://instagram.com",
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    logo: "/logos/perplexity.png",
    description:
      "AI-powered answer engine combining LLMs with live search for fast, up-to-date answers.",
    url: "https://perplexity.ai",
  },
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent mb-10 drop-shadow-[0_0_25px_#ff0080]">
        Our Partners
      </h1>

      {/* Partner Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-7xl mx-auto relative z-10">
        {partners.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border-2 border-pink-500/40 bg-black/80 p-6 shadow-[0_0_40px_rgba(255,0,128,0.5)] backdrop-blur-md relative overflow-hidden"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-16 w-16 mb-4 object-contain"
            />
            <h2 className="text-xl font-bold text-white mb-2">{p.name}</h2>
            <p className="text-sm text-white/80">{p.description}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
