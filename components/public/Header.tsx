import Link from "next/link";
import { Sparkles } from "lucide-react";

const navLinks = [
  { href: "/jeux", label: "Nos jeux" },
  { href: "/devis", label: "Demander un devis" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-accent/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-heading text-2xl font-bold text-primary-800"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-600 shadow-md transition group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          Jegonflable Aube
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-gray-700 transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/devis"
          className="rounded-full bg-accent px-5 py-2 font-heading font-bold text-primary-900 shadow-md transition hover:scale-105 hover:shadow-lg"
        >
          Devis gratuit
        </Link>
      </div>
    </header>
  );
}
