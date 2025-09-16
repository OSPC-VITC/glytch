import React from "react";
import { appConfig } from "@/lib/config";

export function ContactSection() {
  const { discordUrl, whatsappUrl, email } = appConfig.contact;
  const hasAny = Boolean(discordUrl || whatsappUrl || email);

  return (
    <aside
      className="w-[1000px] min-h-[250px] flex flex-col gap-4 px-6 py-6
      bg-black/70 border border-white/10 rounded-2xl
      shadow-[0_0_20px_rgba(0,0,0,0.6)] mr-8
      backdrop-blur-md"
      style={{ alignItems: "flex-start" }}
      aria-labelledby="contact-heading"
    >
      <h1
        id="contact-heading"
        className="text-xl font-bold text-cyan-400 mb-4 text-left"
      >
        Contact
      </h1>
      {!hasAny ? (
        <p className="text-sm text-white/70 text-left">
          Contact channels will be added soon.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-6">
          {discordUrl ? (
            <li>
              <a
                className="inline-flex items-center rounded-md border border-white/10 px-4 py-3 text-cyan-300 bg-black/30 hover:bg-cyan-700 hover:text-white transition"
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </li>
          ) : null}
          {whatsappUrl ? (
            <li>
              <a
                className="inline-flex items-center rounded-md border border-white/10 px-4 py-3 text-cyan-300 bg-black/30 hover:bg-cyan-700 hover:text-white transition"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          ) : null}
          {email ? (
            <li>
              <a
                className="inline-flex items-center rounded-md border border-white/10 px-4 py-3 text-cyan-300 bg-black/30 hover:bg-cyan-700 hover:text-white transition"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
          ) : null}
        </ul>
      )}
    </aside>
  );
}

export default ContactSection;
