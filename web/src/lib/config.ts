export const appConfig = {
  contact: {
    discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL ?? "",
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  },
};

export type AppConfig = typeof appConfig;


