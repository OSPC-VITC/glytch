import React from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";
import { Phone, Instagram } from "lucide-react";

export function ContactSection() {
  const contacts = [
    {
      name: "SHOURYA",
      role: "Coordinator",
      info: "7806842994",
      href: "tel:7806842994",
      icon: <Phone className="w-6 h-6 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "ROHITH",
      role: "Coordinator",
      info: "8610721331",
      href: "tel:8610721331",
      icon: <Phone className="w-6 h-6 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "INSTAGRAM",
      role: "Follow us",
      info: "@ospc_vitc",
      href: "https://instagram.com/ospc_vitc",
      icon: <Instagram className="w-6 h-6 mr-2 text-cyan-400 group-hover:rotate-12 transition-transform" />,
    },
  ];

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-[1000px] min-h-[280px] flex flex-col gap-6 px-6 py-8
      bg-black/70 border border-cyan-400/20 rounded-2xl
      shadow-[0_0_30px_rgba(0,255,255,0.2)] mr-8
      backdrop-blur-md"
      aria-labelledby="contact-heading"
    >
      <h1
        id="contact-heading"
        className="text-3xl font-bold text-cyan-400 mb-6 text-left tracking-wide"
      >
        Contact
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((c, idx) => (
          <a
            key={idx}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-3 p-6 
            bg-gradient-to-br from-black/40 to-cyan-500/10 
            border border-white/10 rounded-xl 
            shadow-[0_0_15px_rgba(0,255,255,0.15)]
            hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] 
            hover:border-cyan-400/50
            transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-cyan-300">{c.name}</h2>
            <p className="text-sm text-white/60 italic">{c.role}</p>
            <p className="text-xl text-white/90 flex items-center">{c.icon}{c.info}</p>
          </a>
        ))}
      </div>
    </CurvedPanel>
  );
}

export default ContactSection;
