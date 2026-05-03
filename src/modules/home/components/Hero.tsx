"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const SKILL_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22h6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI & MACHINE LEARNING",
    subtitle: "Modeling & Optimization",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M8 9h8M8 13h6M8 17h4M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "NATURAL LANGUAGE PROCESSING",
    subtitle: "Analysis & Generation",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="12" r="3"/>
        <path d="M2 12s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2s4 2 4 5-4 5-4 5-4-2-4-5 4-5 4-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7s4 2 4 5-4 5-4 5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "COMPUTER VISION",
    subtitle: "Processing & Understanding",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M2 10v4M6 7v10M10 4v16M14 8v8M18 5v14M22 9v6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AUDIO PROCESSING",
    subtitle: "Analysis & Synthesis",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M16 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "SOFTWARE DEVELOPMENT",
    subtitle: "Clean Code & Architecture",
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container size="xl">
        <div className="flex min-h-screen flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Left content */}
          <div className="flex flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0 lg:w-[55%]">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                New Ideas. Real Impact.
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter text-white">
              Weli
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-amber-400 sm:text-base">
              AI &amp; ML Engineer | Software Developer
            </p>

            {/* Description */}
            <div className="mt-8 max-w-md space-y-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              <p>
                Software engineering student. Advanced experience in AI, ML, NLP, computer vision, and audio processing.
              </p>
              <p>
                Building innovative solutions, pushing boundaries, and shaping the future with real projects.
              </p>
            </div>

            {/* Tagline */}
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              This is just the beginning. More is on the way.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#projects">
                <Button
                  size="lg"
                  className="bg-amber-500 text-black hover:bg-amber-400 font-semibold uppercase tracking-wider text-xs px-6"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12H3m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)"/>
                  </svg>
                  View Projects
                </Button>
              </Link>
              <Link href="#about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400 font-semibold uppercase tracking-wider text-xs px-6"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  About
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - W Logo */}
          <div className="relative flex items-center justify-center lg:w-[45%]">
            <div className="relative w-full max-w-[420px] aspect-[2/3]">
              <Image
                src="/hero-w-logo.jpg"
                alt="Weli Brand"
                fill
                className="object-contain"
                priority
              />
              {/* Glow effect behind the image */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-amber-500/5 blur-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Skill Cards */}
        <div className="mt-8 pb-12 lg:mt-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SKILL_CARDS.map((skill) => (
              <div
                key={skill.title}
                className="group flex flex-col items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-white/[0.06]"
              >
                <div className="text-amber-400 transition-transform group-hover:scale-110">
                  {skill.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                    {skill.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-500">
                    {skill.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
