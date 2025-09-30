"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

type Judge = {
  id: string;
  name: string;
  title: string;
  organization: string;
  image: string;
  description: string;
  links: { icon: React.ReactNode; url: string }[];
};

const judges: Judge[] = [
  {
    id: "judge-1",
    name: "Dr. Sarah Chen",
    title: "AI Researcher",
    organization: "Tech Corp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    description:
      "Leading AI researcher specializing in machine learning and neural networks with 15+ years of experience in cutting-edge technology.",
    links: [
      { icon: <FaLinkedin />, url: "#" },
    ],
  },
  {
    id: "judge-2",
    name: "Prof. Rajesh Kumar",
    title: "Professor",
    organization: "VIT Chennai",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    description:
      "Distinguished professor in Computer Science with expertise in algorithms, data structures, and software engineering education.",
    links: [
      { icon: <FaLinkedin />, url: "#" },
    ],
  },
  {
    id: "judge-3",
    name: "Michael Rodriguez",
    title: "CTO",
    organization: "StartupX",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    description:
      "Chief Technology Officer driving innovation in cloud computing and scalable architectures for next-generation applications.",
    links: [
      { icon: <FaLinkedin />, url: "#" },
    ],
  },
  {
    id: "judge-4",
    name: "Aisha Patel",
    title: "Open Source Contributor",
    organization: "Linux Foundation",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    description:
      "Core contributor to major open-source projects with a passion for community-driven development and collaborative innovation.",
    links: [
      { icon: <FaLinkedin />, url: "#" },
    ],
  },
];

export default function Judges() {
  return (
    <div className="min-h-screen bg-black/70 relative overflow-hidden py-16">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_25px_#ff0080]"
      >
        VOID Judges
      </motion.h1>

      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-3">
          Coming Soon
        </p>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-3 mb-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <p className="text-sm text-white/70 max-w-2xl mx-auto">
          Our distinguished panel of judges will be revealed shortly. Stay tuned for updates!
        </p>
      </motion.div>

      {/* Judges Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 px-6 max-w-7xl mx-auto relative z-10">
        {judges.map((judge, i) => (
          <motion.div
            key={judge.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border-2 border-pink-500/40 bg-black/80 p-6 text-center shadow-[0_0_40px_rgba(255,0,128,0.5)] backdrop-blur-md relative overflow-hidden"
          >

            <h2 className="text-2xl font-bold text-white mb-1">{judge.name}</h2>
            <p className="text-sm text-pink-400 font-semibold mb-1">
              {judge.title}
            </p>
            <p className="text-xs text-white/60 mb-4">{judge.organization}</p>
            <p className="text-sm text-white/80 mb-4">{judge.description}</p>
            <div className="flex justify-center gap-5 text-xl text-white">
              {judge.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}