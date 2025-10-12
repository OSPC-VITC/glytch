import SectionSubtitle from "../ui/SectionSubtitle";
import SectionTitle from "../ui/SectionTitle";
import { SponsorCard } from "../ui/SponsorCard";

type Sponsor = {
  name: string;
  href: string;
  logoSrc: string;
};

type Sponsors = {
  Gold: Sponsor[];
  Silver: Sponsor[];
  Bronze: Sponsor[];
};

const SPONSORS: Sponsors = {
  Gold: [
    {
      name: "Devfolio",
      href: "https://devfolio.co",
      logoSrc: "/Devfolio.svg",
    },
  ],
  Silver: [
    {
      name: "ETHIndia",
      href: "https://ethindia.co/",
      logoSrc: "/ethindia.svg",
    },
  ],
  Bronze: [],
} as const;

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative py-10 scroll-mt-32 overflow-hidden bg-black/70"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 77, 143, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float-bg 20s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-24">
          <SectionTitle>Sponsors</SectionTitle>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6">
            Powered by industry leaders and innovators who believe in{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-semibold">
              shaping the future together.
            </span>
          </p>
        </div>

        {(["Gold", "Silver", "Bronze"] as const).map((level) => {
        let levelBasedClassNames: string;
        switch (level) {
          case "Gold":
            levelBasedClassNames = "text-yellow-400";
            break;
          case "Silver":
            levelBasedClassNames = "text-gray-300";
            break;
          case "Bronze":
            levelBasedClassNames = "text-amber-800";
            break;
        }
        return (
          <div className="text-center mb-12" key={level}>
            <SectionSubtitle className={levelBasedClassNames}>
              {level} Sponsor
            </SectionSubtitle>
            <div className="flex justify-center flex-row flex-wrap gap-8">
              {SPONSORS[level].map(({ name, href, logoSrc }) => {
                return (
                  <SponsorCard
                    level={level}
                    name={name}
                    href={href}
                    logoSrc={logoSrc}
                    key={name}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}