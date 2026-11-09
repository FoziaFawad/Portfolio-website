"use client";

import * as React from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { Button } from "@/components/ui/Button";

interface SparkMote {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
}

export function Hero() {
  const [isLampOn, setIsLampOn] = React.useState(true);
  const [motes, setMotes] = React.useState<SparkMote[]>([]);

  // Subtle floating ambient dust motes catching the lamp's light
  React.useEffect(() => {
    const generated: SparkMote[] = [];
    for (let i = 0; i < 32; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.55 + 0.15,
        speedY: Math.random() * 0.12 + 0.04,
      });
    }
    setMotes(generated);
  }, []);

  // Realistic tactile lamp switch click sound
  const playSwitchSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isLampOn ? 420 : 750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio fails gracefully
    }
  };

  const toggleLamp = () => {
    playSwitchSound();
    setIsLampOn((prev) => !prev);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden bg-[#0d0d12]"
    >
      {/* VOLUMETRIC ATMOSPHERIC LIGHTING LAYERS BEHIND LAMP */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
        {/* Main Incandescent Warm Shade Bloom */}
        <div
          className={`absolute top-10 left-1/2 -translate-x-1/2 w-[480px] sm:w-[620px] h-[380px] sm:h-[480px] rounded-full blur-[100px] transition-opacity duration-1000 ${
            isLampOn ? "opacity-90" : "opacity-20"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(235, 155, 60, 0.35) 0%, rgba(200, 115, 30, 0.16) 45%, rgba(16, 185, 129, 0.06) 70%, transparent 85%)",
          }}
        />

        {/* Upward Conical Light Ray towards Ceiling */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] h-[220px] blur-[50px] transition-opacity duration-1000 ${
            isLampOn ? "opacity-70" : "opacity-0"
          }`}
          style={{
            background:
              "conic-gradient(from 0deg at 50% 100%, transparent 70deg, rgba(254, 240, 138, 0.22) 85deg, rgba(251, 191, 36, 0.28) 90deg, rgba(254, 240, 138, 0.22) 95deg, transparent 110deg)",
          }}
        />

        {/* Downward Warm Pool over the Quote Card */}
        <div
          className={`absolute top-44 left-1/2 -translate-x-1/2 w-[580px] sm:w-[740px] h-[340px] blur-[75px] transition-opacity duration-1000 ${
            isLampOn ? "opacity-80" : "opacity-15"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(251, 191, 36, 0.26) 0%, rgba(217, 119, 6, 0.10) 50%, transparent 80%)",
          }}
        />

        {/* Floating illuminated dust motes */}
        {motes.map((mote) => (
          <div
            key={mote.id}
            className="absolute rounded-full bg-amber-200 pointer-events-none"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              opacity: isLampOn ? mote.opacity : mote.opacity * 0.3,
              boxShadow: isLampOn ? "0 0 6px rgba(251, 191, 36, 0.7)" : "none",
              transition: "opacity 1s ease",
            }}
          />
        ))}
      </div>

      {/* THE ARTISANAL DESIGNER LAMP CENTERPIECE */}
      <div className="relative z-20 flex flex-col items-center mb-6 select-none">
        {/* Soft Ambient Contact Shadow Under Lamp Base */}
        <div className="absolute bottom-2 w-48 h-8 rounded-full bg-black/90 blur-lg -z-10" />

        {/* Lamp Container with Realistic Radial Feathering */}
        <div
          onClick={toggleLamp}
          className="relative cursor-pointer group flex flex-col items-center"
          title="Click to toggle lamp illumination"
        >
          {/* Subtle Warm Light Bloom Behind Lampshade */}
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 w-52 sm:w-64 h-44 sm:h-52 rounded-full blur-[35px] pointer-events-none transition-all duration-700 ${
              isLampOn
                ? "bg-amber-300/35 scale-110 opacity-100"
                : "bg-amber-500/10 scale-90 opacity-40"
            }`}
          />

          {/* Lower Caged Urn Glow */}
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-[22px] pointer-events-none transition-all duration-700 ${
              isLampOn
                ? "bg-amber-400/40 opacity-100"
                : "bg-amber-600/10 opacity-30"
            }`}
          />

          {/* Real Lamp Image Seamlessly Floating in Ambient Dark Room */}
          <div
            style={{ position: "relative" }}
            className="relative w-[300px] sm:w-[380px] h-[230px] sm:h-[285px] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]"
          >
            <Image
              src="/images/artisanal-lamp.png"
              alt="Artisanal Handcrafted Table Lamp with Nightlight Urn"
              width={391}
              height={297}
              priority
              className={`w-full h-full object-contain transition-all duration-700 ${
                isLampOn
                  ? "brightness-110 drop-shadow-[0_15px_35px_rgba(245,158,11,0.35)]"
                  : "brightness-75 opacity-70 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
              }`}
            />
          </div>

          {/* Interactive Lamp Toggle Switch Bead */}
          <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-zinc-950/70 border border-white/10 hover:border-amber-400/40 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-amber-300 transition-all cursor-pointer backdrop-blur-md">
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                isLampOn ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-zinc-600"
              }`}
            />
            <span>{isLampOn ? "LAMP: ON" : "LAMP: DIMMED"}</span>
            <span className="text-zinc-600">• click to switch</span>
          </div>
        </div>
      </div>

      {/* THE QUOTE CARD LOCKUP */}
      <div className="relative z-20 w-full max-w-2xl sm:max-w-3xl mx-auto">
        <div className="rounded-2xl bg-[#14141a]/65 backdrop-blur-2xl border border-white/[0.09] p-8 sm:p-12 text-center shadow-2xl shadow-black/85 relative overflow-hidden">
          {/* Subtle top inner border highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Main Quote Text */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-zinc-100 font-serif leading-relaxed sm:leading-snug tracking-normal mb-6">
            &ldquo;Education is the progressive unfolding of our own beauty with the{" "}
            <span className="text-[#e59b4c] font-medium">light of knowledge</span> like the blooming of a flower.&rdquo;
          </blockquote>

          {/* Author Attribution */}
          <p className="text-xs sm:text-sm font-sans tracking-wide text-zinc-400 font-normal">
            — Debasish Mridha
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS DIRECTLY BELOW CARD */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 mt-8">
        {/* Explore Projects Button: Warm Golden-Amber Solid */}
        <Button
          href="#projects"
          size="lg"
          className="bg-[#df984f] hover:bg-[#cf883f] text-[#121216] font-medium px-7 py-3 rounded-xl shadow-lg shadow-amber-900/20 active:scale-95 transition-all"
        >
          Explore Projects
        </Button>

        {/* View Resume Button: Dark Glass with Border */}
        <Button
          href={personalData.resumeUrl}
          external
          size="lg"
          variant="outline"
          className="bg-[#15151c]/80 hover:bg-[#20202a] text-zinc-200 border-zinc-700/60 hover:border-zinc-500 px-7 py-3 rounded-xl active:scale-95 transition-all"
        >
          View Resume
        </Button>
      </div>
    </section>
  );
}
