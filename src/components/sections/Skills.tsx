"use client";

import * as React from "react";
import { orbitalSkills, SkillNode } from "@/data/skills";

export function Skills() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [selectedSkill, setSelectedSkill] = React.useState<SkillNode>(orbitalSkills[0]);

  const categories = [
    { label: "All Craft", value: "All" },
    { label: "Languages", value: "Languages" },
    { label: "Frontend UI", value: "Frontend" },
    { label: "Backend & Systems", value: "Backend" },
    { label: "Security & Concepts", value: "Security" },
    { label: "Tools & Platforms", value: "Tools" },
    { label: "Professional Craft", value: "Professional" },
  ];

  // Filter skills based on category
  const activeSkills = React.useMemo(() => {
    if (activeCategory === "All") {
      return orbitalSkills.slice(0, 6);
    }
    const filtered = orbitalSkills.filter((s) => s.category === activeCategory);
    return filtered.length >= 6 ? filtered.slice(0, 6) : [...filtered, ...orbitalSkills.filter(s => s.category !== activeCategory)].slice(0, 6);
  }, [activeCategory]);

  // Primary anchor is node 0, followed by nodes 1 to 5
  const anchorNode = activeSkills[0] || orbitalSkills[0];
  const trailingNodes = activeSkills.slice(1, 6);

  // Trajectory coordinates for trailing nodes
  const nodePositions = [
    { cx: 285, cy: 195, textX: 325, textY: 190 }, // Node 2
    { cx: 335, cy: 280, textX: 375, textY: 275 }, // Node 3
    { cx: 375, cy: 370, textX: 415, textY: 365 }, // Node 4
    { cx: 395, cy: 460, textX: 435, textY: 455 }, // Node 5
    { cx: 375, cy: 550, textX: 415, textY: 545 }, // Node 6
  ];

  return (
    <section id="skills" className="py-24 relative bg-[#09090e] border-t border-zinc-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            <span>✦</span> Orbital Competency Map
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Architectural Craft & Systems
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            An orbital constellation representing continuous mastery, execution depth, and core engineering pillars.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT: ORBITAL RADAR (LEFT) & FILTER + SPOTLIGHT (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: THE ORBITAL CONSTELLATION GRAPH */}
          <div className="lg:col-span-7 relative flex items-center justify-center select-none overflow-visible">
            <svg
              viewBox="0 0 680 640"
              className="w-full max-w-[680px] h-auto overflow-visible filter drop-shadow-2xl"
            >
              <defs>
                {/* Radiant Amber Glow for Star Node */}
                <filter id="anchorGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="blur1" />
                  <feGaussianBlur stdDeviation="24" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Soft Node Glow */}
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Star Outer Ring Gradient */}
                <linearGradient id="starRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>

                {/* Trajectory Arc Gradient */}
                <linearGradient id="orbitTrailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* CONCENTRIC CELESTIAL ORBITAL ARCS */}
              {/* Sweeping Arc 1 (Outer Deep) */}
              <path
                d="M -60 480 A 620 620 0 0 1 540 40"
                fill="none"
                stroke="rgba(245, 158, 11, 0.14)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Sweeping Arc 2 (Middle Primary) */}
              <path
                d="M -40 520 A 520 520 0 0 1 480 80"
                fill="none"
                stroke="rgba(245, 158, 11, 0.22)"
                strokeWidth="1.5"
              />
              {/* Sweeping Arc 3 (Inner Trajectory) */}
              <path
                d="M -20 560 A 420 420 0 0 1 420 140"
                fill="none"
                stroke="rgba(217, 119, 6, 0.18)"
                strokeWidth="1.2"
              />
              {/* Elliptical Echo Arc */}
              <path
                d="M 40 600 A 340 340 0 0 1 360 200"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />

              {/* TRAJECTORY LINK CURVE CONNECTING NODES */}
              <path
                d="M 160 140 Q 240 160 285 195 T 335 280 T 375 370 T 395 460 T 375 550"
                fill="none"
                stroke="url(#orbitTrailGradient)"
                strokeWidth="1.8"
                strokeDasharray="6 3"
              />

              {/* ANNOTATIONS FLOATING ALONG THE ORBIT PATH */}
              <text x="210" y="105" fill="#f59e0b" fontSize="10" fontFamily="monospace" opacity="0.7">
                code&gt;
              </text>
              <text x="210" y="120" fill="#a1a1aa" fontSize="9" fontFamily="monospace" opacity="0.6">
                5+ Years
              </text>
              <text x="260" y="85" fill="#71717a" fontSize="8" fontFamily="monospace" opacity="0.5" transform="rotate(22 260 85)">
                &lt;code &gt; &lt;dlovpnot.error /&gt;
              </text>
              <text x="140" y="325" fill="#71717a" fontSize="8" fontFamily="monospace" opacity="0.4">
                &lt;connect/static&gt; c/0&gt;
              </text>

              {/* SATELLITE ORBIT NODES (Decorative Sub-Pills from Image 2) */}
              {/* Satellite 1 */}
              <g transform="translate(100, 275)" opacity="0.75">
                <circle cx="0" cy="0" r="16" fill="#14141c" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
                <text x="0" y="-2" fill="#fef08a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  96%
                </text>
                <text x="0" y="7" fill="#71717a" fontSize="6" fontFamily="monospace" textAnchor="middle">
                  EXP
                </text>
              </g>

              {/* Satellite 2 */}
              <g transform="translate(85, 365)" opacity="0.65">
                <circle cx="0" cy="0" r="15" fill="#14141c" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                <text x="0" y="-1" fill="#e4e4e7" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  95%
                </text>
                <text x="0" y="7" fill="#71717a" fontSize="6" fontFamily="monospace" textAnchor="middle">
                  EXP
                </text>
              </g>

              {/* Satellite 3 */}
              <g transform="translate(230, 425)" opacity="0.75">
                <circle cx="0" cy="0" r="16" fill="#14141c" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1" />
                <text x="0" y="-2" fill="#fef08a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  95%
                </text>
                <text x="0" y="7" fill="#71717a" fontSize="6" fontFamily="monospace" textAnchor="middle">
                  EXP
                </text>
              </g>

              {/* Satellite 4 (Bottom) */}
              <g transform="translate(245, 550)" opacity="0.7">
                <circle cx="0" cy="0" r="18" fill="#14141c" stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1" />
                <text x="0" y="-2" fill="#fef08a" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  96%
                </text>
                <text x="0" y="8" fill="#71717a" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                  EXP
                </text>
              </g>

              {/* 1. MAIN STAR NODE (TOP LEFT, LARGEST) */}
              <g
                transform="translate(160, 140)"
                className="cursor-pointer group"
                onClick={() => setSelectedSkill(anchorNode)}
              >
                {/* Luminous Pulsing Outer Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r="56"
                  fill="rgba(245, 158, 11, 0.12)"
                  filter="url(#anchorGlow)"
                  className="animate-pulse"
                />
                {/* Outer Ring Arc */}
                <circle
                  cx="0"
                  cy="0"
                  r="48"
                  fill="#101016"
                  stroke="url(#starRingGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="280 20"
                />
                {/* Secondary Inset Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill="none"
                  stroke="rgba(254, 240, 138, 0.3)"
                  strokeWidth="1"
                />

                {/* Node Title */}
                <text
                  x="0"
                  y="-4"
                  fill="#ffffff"
                  fontSize="15"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="group-hover:fill-amber-300 transition-colors"
                >
                  {anchorNode.name}
                </text>

                {/* Subtext */}
                <text
                  x="0"
                  y="14"
                  fill="#f59e0b"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  {anchorNode.proficiency}% • {anchorNode.level.toUpperCase()}
                </text>
              </g>

              {/* 2. TRAILING NODES (NODES 2 TO 6) */}
              {trailingNodes.map((node, idx) => {
                const pos = nodePositions[idx];
                if (!pos) return null;
                const isSelected = selectedSkill.name === node.name;

                // Circular Progress calculations
                const radius = 18;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (node.proficiency / 100) * circumference;

                return (
                  <g
                    key={node.name}
                    className="cursor-pointer group"
                    onClick={() => setSelectedSkill(node)}
                  >
                    {/* Ring Node Center */}
                    <g transform={`translate(${pos.cx}, ${pos.cy})`}>
                      {/* Node Halo if Selected */}
                      {isSelected && (
                        <circle
                          cx="0"
                          cy="0"
                          r="28"
                          fill="rgba(245, 158, 11, 0.25)"
                          filter="url(#nodeGlow)"
                        />
                      )}

                      {/* Gauge Base Ring */}
                      <circle
                        cx="0"
                        cy="0"
                        r={radius}
                        fill="#121218"
                        stroke="#272732"
                        strokeWidth="3"
                      />

                      {/* Progress Arc */}
                      <circle
                        cx="0"
                        cy="0"
                        r={radius}
                        fill="none"
                        stroke={isSelected ? "#fef08a" : "#f59e0b"}
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90)"
                        className="transition-all duration-500"
                      />

                      {/* Percentage inside Node */}
                      <text
                        x="0"
                        y="4"
                        fill="#ffffff"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {node.proficiency}%
                      </text>
                    </g>

                    {/* Text Label on the Right */}
                    <g transform={`translate(${pos.textX}, ${pos.textY})`}>
                      {/* Title */}
                      <text
                        x="0"
                        y="0"
                        fill="#ffffff"
                        fontSize="14"
                        fontFamily="system-ui, sans-serif"
                        fontWeight="bold"
                        className="group-hover:fill-amber-300 transition-colors"
                      >
                        {node.name}
                      </text>

                      {/* Subtitle with Level */}
                      <text
                        x="0"
                        y="15"
                        fill="#a1a1aa"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        <tspan fill={node.level === "Expert" ? "#f59e0b" : "#22c55e"} fontWeight="bold">
                          {node.proficiency}% • {node.level.toUpperCase()}
                        </tspan>
                      </text>

                      {/* Experience Years */}
                      <text
                        x="0"
                        y="29"
                        fill="#71717a"
                        fontSize="9.5"
                        fontFamily="monospace"
                      >
                        {node.experience.toLowerCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT: CATEGORY FILTER PILLS & LIVE SPOTLIGHT INSPECTOR CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            {/* 1. CATEGORY FILTER PILLS (Matching Top-Right of Image 2) */}
            <div>
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                      activeCategory === cat.value
                        ? "bg-[#df984f] text-[#0d0d12] font-bold shadow-lg shadow-amber-900/40 scale-105"
                        : "bg-[#14141c]/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/[0.08]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. THE SKILL SPOTLIGHT CARD (Matching Bottom-Right of Image 2) */}
            <div className="rounded-2xl bg-gradient-to-b from-[#181824] via-[#121218] to-[#0e0e14] border border-amber-500/25 p-7 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle top amber glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

              {/* Faint Architectural Code Watermark Background */}
              <div className="absolute -right-6 -bottom-6 opacity-[0.04] pointer-events-none select-none font-mono text-xs leading-relaxed text-amber-200">
                <pre>{`{
  system: "orbital",
  runtime: "strict",
  integrity: 0.999,
  state: "active"
}`}</pre>
              </div>

              {/* Header: ✦ SKILL SPOTLIGHT on Left, Category on Right */}
              <div className="flex items-center justify-between text-xs font-mono tracking-[0.18em] text-zinc-400 mb-6 pb-2.5 border-b border-zinc-800/80">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span>✦</span> SKILL SPOTLIGHT
                </span>
                <span className="text-zinc-500 uppercase">{selectedSkill.category}</span>
              </div>

              {/* Skill Name & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedSkill.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
                    {selectedSkill.level}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-mono font-bold">
                    {selectedSkill.proficiency}%
                  </span>
                </div>
              </div>

              {/* Detail Item 1: Experience */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 mb-5">
                <span className="text-amber-400 text-sm">⏱</span>
                <span className="uppercase tracking-wider font-semibold text-zinc-300">
                  HANDS-ON INDUSTRY EXPERIENCE: {selectedSkill.experience}
                </span>
              </div>

              {/* Detail Capsule 2 */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] mb-3 flex items-center gap-3">
                <span className="text-purple-400 text-sm">🧬</span>
                <span className="text-xs font-mono tracking-wide text-zinc-200 font-medium uppercase">
                  {selectedSkill.badge1}
                </span>
              </div>

              {/* Detail Capsule 3 */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] mb-4 flex items-center gap-3">
                <span className="text-amber-400 text-sm">◯</span>
                <span className="text-xs font-mono tracking-wide text-zinc-200 font-medium uppercase">
                  {selectedSkill.badge2}
                </span>
              </div>

              {/* Code Snippet Preview if present */}
              {selectedSkill.codeSnippet && (
                <div className="mt-3 p-3 rounded-lg bg-black/60 border border-zinc-800/80 font-mono text-[11px] text-zinc-400 overflow-x-auto">
                  <span className="text-amber-400/80">// Production Signature:</span>
                  <div className="text-zinc-300 mt-1 whitespace-pre-wrap">{selectedSkill.codeSnippet}</div>
                </div>
              )}

              <p className="mt-6 text-[10px] text-zinc-500 font-mono text-center pt-2">
                Click any planetary node on the orbital map to inspect architectural depth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
