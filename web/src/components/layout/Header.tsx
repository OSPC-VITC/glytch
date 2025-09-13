import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-10 inset-x-0 w-full z-20 bg-transparent border-0">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-white/90 text-xl md:text-2xl lg:text-3xl transition-all duration-200 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.75)] hover:-translate-y-0.5 hover:scale-[1.03]"
        >
          Event Portal
        </Link>
        <nav className="flex gap-6 text-base md:text-lg lg:text-xl">
          <Link
            href="/#announcements"
            className="text-white/80 transition-all duration-200 ease-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 hover:scale-[1.05]"
          >
            Announcements
          </Link>
          <Link
            href="/#resources"
            className="text-white/80 transition-all duration-200 ease-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 hover:scale-[1.05]"
          >
            Resources
          </Link>
          <Link
            href="/#contact"
            className="text-white/80 transition-all duration-200 ease-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 hover:scale-[1.05]"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="text-white/80 transition-all duration-200 ease-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 hover:scale-[1.05]"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;


