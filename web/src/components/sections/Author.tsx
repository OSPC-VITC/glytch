import { User } from "lucide-react";

export function Author() {
  const authors = [
    {
      name: "Nandu Mahesh",
      linkedin: "https://www.linkedin.com/in/nandumahesh/",
    },
    {
      name: "Gaurav Agarwalla",
      linkedin: "https://www.linkedin.com/in/gauravag18/",
    },
  ];

  return (
    <aside
      className="w-full max-w-3xl mx-auto flex flex-col gap-3 px-6 py-6
      bg-black/70 border border-cyan-400/30 rounded-2xl
      shadow-[0_0_30px_rgba(0,255,255,0.2)]
      backdrop-blur-md"
      aria-labelledby="author-heading"
    >
      <h2
        id="author-heading"
        className="text-lg font-semibold text-cyan-400 text-center mb-6"
      >
        Website Authors
      </h2>

      <div className="flex flex-row gap-6 justify-center">
        {authors.map((a, idx) => (
          <a
            key={idx}
            href={a.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[180px] flex items-center gap-3
              bg-gradient-to-br from-black/40 to-cyan-500/10
              border border-white/10 rounded-xl px-6 py-4
              shadow-[0_0_15px_rgba(0,255,255,0.15)]
              hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
              hover:border-cyan-400/50
              hover:scale-105
              transition-all duration-300"
          >
            <User className="w-6 h-6 text-cyan-300 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cyan-300">{a.name}</span>
              <span className="text-xs text-cyan-400">LinkedIn</span>
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
}

export default Author;
