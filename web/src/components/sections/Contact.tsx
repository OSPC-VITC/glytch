import React from "react";
import { CurvedPanel } from "@/components/ui/CurvedPanel";

export function ContactSection() {
  const coordinator1 = "7806842994";
  const coordinator2 = "8610721331";
  const instagramId = "ospc_vitc";

  const callIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="inline mr-2" viewBox="0 0 16 16">
      <path d="M3.654 1.328a.678.678 0 0 1 1.015-.063l2.29 2.29c.329.329.445.817.3 1.254l-.517 1.55a.678.678 0 0 1-.746.478l-1.122-.187a11.292 11.292 0 0 0 5.516 5.516l-.187-1.122a.678.678 0 0 1 .478-.746l1.55-.517a.678.678 0 0 1 1.254.3l2.29 2.29a.678.678 0 0 1-.063 1.015l-2.424 1.924a1.745 1.745 0 0 1-1.95.175C6.062 13.21 2.79 9.938 1.601 6.449a1.745 1.745 0 0 1 .175-1.95L3.654 1.328z"/>
    </svg>
  );

  return (
    <CurvedPanel
      as="aside"
      curvature={0.2}
      className="w-[1000px] min-h-[250px] flex flex-col gap-6 px-6 py-6
      bg-black/70 border border-white/10 rounded-2xl
      shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-8
      backdrop-blur-md"
      aria-labelledby="contact-heading"
    >
      <h1
        id="contact-heading"
        className="text-xl font-bold text-cyan-400 mb-4 text-left"
      >
        Contact
      </h1>
      <div className="flex w-full gap-8">
        <div className="flex-1 bg-black/30 border border-white/10 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.4)] px-8 py-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-cyan-300 mb-2">SHOURYA</h2>
          <p className="text-xl text-white/80">{callIcon}{coordinator1}</p>
        </div>
        <div className="flex-1 bg-black/30 border border-white/10 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.4)] px-8 py-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-cyan-300 mb-2">ROHITH</h2>
          <p className="text-xl text-white/80">{callIcon}{coordinator2}</p>
        </div>
        <div className="flex-1 bg-black/30 border border-white/10 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.4)] px-8 py-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-cyan-300 mb-2">INSTAGRAM ID :</h2>
          <p className="text-xl text-white/80">@ {instagramId}</p>
        </div>
      </div>
    </CurvedPanel>
  );
}

export default ContactSection;
