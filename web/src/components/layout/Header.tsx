import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav className="flex items-center gap-8 px-8 py-3 rounded-full 
        bg-black/70 backdrop-blur-md border border-white/10 
        shadow-[0_0_20px_rgba(0,0,0,0.6)]">
        
        <Link
          href="/"
          className="text-white/90 font-semibold text-lg transition-all hover:text-white"
        >
          Event Portal
        </Link>
        <Link
          href="/#announcements"
          className="text-white/70 hover:text-white transition-all"
        >
          Announcements
        </Link>
        <Link
          href="/#resources"
          className="text-white/70 hover:text-white transition-all"
        >
          Resources
        </Link>
        <Link
          href="/#contact"
          className="text-white/70 hover:text-white transition-all"
        >
          Contact
        </Link>
        <Link
          href="/admin"
          className="text-white/70 hover:text-white transition-all"
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}

export default Header;
