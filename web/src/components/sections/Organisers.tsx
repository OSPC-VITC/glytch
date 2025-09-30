"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

type Organizer = {
  id: string;
  name: string;
  logo: string;
  description: string;
  links: { icon: React.ReactNode; url: string }[];
};

const organizers: Organizer[] = [
  {
    id: "oscp",
    name: "OSPC (Open Source Programming Club)",
    logo: "https://raw.githubusercontent.com/ospc-vitc/.github/main/profile/logo.png",
    description:
      "The Open Source Programming Club at VIT Chennai fosters innovation through open-source collaboration and builds a vibrant tech community.",
    links: [
      { icon: <FaGlobe />, url: "https://ospc.in" },
      {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/company/open-source-programming-club-vitc/",
      },
      { icon: <FaGithub />, url: "https://github.com/ospc-vitc" },
      { icon: <FaTwitter />, url: "https://twitter.com/ospc_vitc" },
    ],
  },
  {
    id: "ieee-ras",
    name: "IEEE RAS VIT Chennai",
    logo: "https://ras.ieeevitc.org/assets/img/logo.png",
    description:
      "The IEEE Robotics and Automation Society at VIT Chennai promotes robotics, automation, and AI with hands-on projects and innovation challenges.",
    links: [
      { icon: <FaGlobe />, url: "https://ras.ieeevitc.org" },
      {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/company/ieee-ras-vitc/",
      },
      { icon: <FaGithub />, url: "https://github.com/ieee-ras-vitc" },
      { icon: <FaTwitter />, url: "https://twitter.com/ieeevitc" },
    ],
  },
  {
    id: "gdg",
    name: "GDG on Campus VIT Chennai",
    logo: "https://developers.google.com/community/gdg/images/gdg-logo.png",
    description:
      "GDG VIT Chennai is a student-led developer community that hosts meetups, hackathons, and workshops for Google technologies and beyond.",
    links: [
      {
        icon: <FaGlobe />,
        url: "https://gdg.community.dev/gdg-on-campus-vit-chennai/",
      },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/gdg-vitc/" },
      { icon: <FaGithub />, url: "https://github.com/google" },
      { icon: <FaTwitter />, url: "https://twitter.com/googledevs" },
    ],
  },
];

// Extra sections data
const facultyCoordinators = [
  "Dr. R. Kumar – Professor, School of CS",
  "Dr. A. Meena – Associate Professor, School of AI",
];

const organisingTeam = [
  "Prannvakanth – Student Coordinator",
  "Priya Sharma – Event Manager",
  "Rohit Verma – Operations Lead",
];

const coreTechTeam = [
  "Ananya Singh – Frontend Lead",
  "Ravi Kumar – Backend Lead",
  "Sneha Iyer – DevOps",
];

export default function Organizers() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent mb-10 drop-shadow-[0_0_25px_#ff0080]">
        VOID Organizers
      </h1>

      {/* Organizer Clubs */}
      <div className="grid gap-10 md:grid-cols-3 px-6 max-w-7xl mx-auto relative z-10 mb-16">
        {organizers.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border-2 border-pink-500/40 bg-black/80 p-6 text-center shadow-[0_0_40px_rgba(255,0,128,0.5)] backdrop-blur-md relative overflow-hidden"
          >
            <img
              src={org.logo}
              alt={org.name}
              className="h-24 w-24 mx-auto mb-4 object-contain"
            />
            <h2 className="text-2xl font-bold text-white mb-2">{org.name}</h2>
            <p className="text-sm text-white/80 mb-4">{org.description}</p>
            <div className="flex justify-center gap-5 text-xl text-white">
              {org.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  className="hover:text-pink-400 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Faculty Coordinators */}
      <Section title="Faculty Coordinators" items={facultyCoordinators} />

      {/* Organising Team */}
      <Section title="Organising Team" items={organisingTeam} />

      {/* Core Tech Team */}
      <Section title="Core Tech Team" items={coreTechTeam} />
    </div>
  );
}

// Reusable section component
function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="max-w-4xl mx-auto mb-12 px-6">
      <h2 className="text-2xl font-bold text-center text-pink-400 mb-6 drop-shadow-[0_0_15px_#ff0080]">
        {title}
      </h2>
      <ul className="space-y-3 text-center text-white/90">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-black/60 border border-pink-500/30 rounded-xl py-3 px-4 shadow-[0_0_20px_rgba(255,0,128,0.3)]"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
