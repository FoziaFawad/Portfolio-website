import Link from "next/link";
import { personalData } from "@/data/personal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-14 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{personalData.name}</span>
            </Link>
            <p className="text-sm text-zinc-400 mt-1 max-w-sm">
              {personalData.title} • {personalData.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <Link href="#about" className="hover:text-amber-300 transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-amber-300 transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="hover:text-amber-300 transition-colors">
              Skills
            </Link>
            <Link href="#experience" className="hover:text-amber-300 transition-colors">
              Experience
            </Link>
            <Link href="#education" className="hover:text-amber-300 transition-colors">
              Education
            </Link>
            <Link href="#contact" className="hover:text-amber-300 transition-colors">
              Contact
            </Link>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              LinkedIn
            </a>
            {personalData.socials.twitter && (
              <a
                href={personalData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors"
              >
                X (Twitter)
              </a>
            )}
            <a
              href={personalData.socials.email}
              className="hover:text-amber-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {currentYear} {personalData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, TypeScript & Tailwind CSS • Powered by precision engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
