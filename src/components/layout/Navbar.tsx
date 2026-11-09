"use client";

import * as React from "react";
import Link from "next/link";
import { personalData } from "@/data/personal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-6 py-3.5 flex items-center justify-between shadow-2xl shadow-black/60">
          {/* Brand Name */}
          <Link
            href="/"
            className="text-base sm:text-lg font-medium text-white tracking-tight hover:text-amber-200 transition-colors"
          >
            {personalData.name}
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="#projects"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              {/* GitHub SVG Logo */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 space-y-3">
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-amber-300"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-amber-300"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-amber-300"
            >
              Contact
            </Link>
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-300 hover:text-amber-300"
            >
              GitHub ↗
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
