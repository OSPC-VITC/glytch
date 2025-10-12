import Image from "next/image";

export type SponsorCardProps = {
  level: "Gold" | "Silver" | "Bronze";
  name: string;
  href: string;
  logoSrc: string;
};

export function SponsorCard({ level, name, href, logoSrc }: SponsorCardProps) {
  let levelBasedClassNames;
  switch (level) {
    case "Gold":
      levelBasedClassNames =
        "from-yellow-400/20 to-yellow-600/20 border-yellow-400/30";
      break;
    case "Silver":
      levelBasedClassNames =
        "from-gray-400/20 to-gray-600/20 border-gray-400/30";
      break;
    case "Bronze":
      levelBasedClassNames =
        "from-amber-200/15 to-amber-400/15 border-amber-300/20";
  }
  
  return (
    <div
      className={`p-6 bg-gradient-to-br rounded-xl border backdrop-blur-sm ${levelBasedClassNames}`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="rounded-lg shadow-lg bg-white p-4 flex justify-center items-center">
  <Image
    src={logoSrc}
    alt={`${name} logo`}
    width={200}
    height={100}
    className="object-contain h-auto w-auto max-h-24"
  />
</div>

      </a>
    </div>
  );
}