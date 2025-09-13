import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Event Portal
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/#announcements" className="hover:underline">
            Announcements
          </Link>
          <Link href="/#resources" className="hover:underline">
            Resources
          </Link>
          <Link href="/#contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;


