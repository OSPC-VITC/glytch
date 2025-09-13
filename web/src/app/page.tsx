import { AnnouncementsSection } from "@/components/sections/Announcements";
import { ResourcesSection } from "@/components/sections/Resources";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto space-y-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Event Portal</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Announcements, resources, and contact information for participants.
        </p>
      </header>

      <div id="announcements">
        <AnnouncementsSection />
      </div>
      <div id="resources">
        <ResourcesSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}
