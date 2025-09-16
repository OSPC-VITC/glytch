import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav
        className="flex items-center gap-8 px-8 py-3 rounded-full
          bg-black/70 backdrop-blur-md border border-white/10
          shadow-[0_0_20px_rgba(0,0,0,0.6)]"
      >
        <Link
          href="/"
          className="text-cyan-400 font-semibold text-lg transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Event
        </Link>
        <Link
          href="/#timeline"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Timeline
        </Link>
        <Link
          href="/#rules"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Rules & Judging Criteria
        </Link>
        <Link
          href="/#announcements"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Announcements
        </Link>
        <Link
          href="/#resources"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Resources
        </Link>
        <Link
          href="/#contact"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Contact
        </Link>
        <Link
          href="/admin"
          className="text-white/70 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_8px_cyan]"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}

export default Header;
