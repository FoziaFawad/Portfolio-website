import Image from "next/image";
import { aboutData } from "@/data/about";
import { personalData } from "@/data/personal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function About() {
  return (
    <section id="about" className="py-24 relative border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400">
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering with Purpose & Integrity
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            {aboutData.introduction}
          </p>
        </div>

        {/* Narrative & Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg font-light">
            {aboutData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {/* Spoken Languages from CV */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span>🌐</span> Spoken Languages:
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 text-zinc-200">
                  Urdu: <strong className="text-amber-400">Native</strong>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 text-zinc-200">
                  English: <strong className="text-amber-400">Advanced</strong>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 text-zinc-200">
                  Arabic: <strong className="text-zinc-400">Elementary</strong>
                </span>
              </div>
            </div>

            {/* Philosophy Quote */}
            <div className="p-6 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
              <p className="text-sm uppercase font-mono tracking-widest text-amber-400 mb-1 font-semibold">
                Guiding Principle
              </p>
              <p className="text-zinc-200 italic font-medium">
                &ldquo;{aboutData.philosophy}&rdquo;
              </p>
            </div>

            {/* Core Interests */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
                Technical Focus & Academic Pursuits
              </p>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="bg-zinc-900 border border-zinc-800 text-zinc-300 py-1 px-3 text-xs"
                  >
                    ✦ {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href={personalData.resumeUrl} external variant="primary" size="md">
                Download Resume (PDF)
              </Button>
              <Button href="#contact" variant="outline" size="md">
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Column: Profile Card & Key Highlights */}
          <div className="lg:col-span-5 space-y-4">
            {/* Real Avatar Card from CV */}
            <div className="p-6 rounded-2xl border border-amber-500/25 bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-950 shadow-xl flex items-center gap-5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-500/20 shrink-0">
                <Image
                  src={personalData.avatarUrl}
                  alt={personalData.name}
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white truncate">{personalData.name}</h3>
                <p className="text-xs text-amber-400/90 font-mono mt-0.5">Salim Habib University</p>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">Software Engineering Student</p>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <p className="text-2xl font-extrabold text-amber-400 group-hover:text-amber-300 transition-colors">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-zinc-200 mt-1.5">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Location & Quick Info Box */}
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Based in:</span>
                <span className="font-medium text-zinc-200">{personalData.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Availability:</span>
                <span className="font-medium text-emerald-400">Open for Internships & Entry-Level</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Primary Stack:</span>
                <span className="font-medium text-amber-300">Next.js, React, TypeScript, Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

