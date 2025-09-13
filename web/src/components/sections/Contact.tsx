import React from "react";
import { appConfig } from "@/lib/config";

export function ContactSection() {
  const { discordUrl, whatsappUrl, email } = appConfig.contact;
  const hasAny = Boolean(discordUrl || whatsappUrl || email);

  return (
    <section aria-labelledby="contact-heading" className="space-y-4">
      <h2 id="contact-heading" className="text-2xl font-semibold">
        Contact
      </h2>
      {!hasAny ? (
        <p className="text-sm text-gray-500">Contact channels will be added soon.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {discordUrl ? (
            <li>
              <a
                className="inline-flex items-center rounded-md border border-gray-200 dark:border-white/10 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition"
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
                className="inline-flex items-center rounded-md border border-gray-200 dark:border-white/10 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition"
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
                className="inline-flex items-center rounded-md border border-gray-200 dark:border-white/10 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
          ) : null}
        </ul>
      )}
    </section>
  );
}

export default ContactSection;


