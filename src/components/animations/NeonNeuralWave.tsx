"use client";

import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*  NEON NEURAL WAVE — Canvas 2D background animation                         */
/*  Theme: AI + Audio Processing                                              */
/*  - Floating particles (neural nodes)                                       */
/*  - Distance-based connections (synaptic edges)                               */
/*  - Horizontal sine waveforms (audio signal)                                */
/*  - Neon glow via shadowBlur + additive composition                         */
/* -------------------------------------------------------------------------- */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Wave {
  y: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  color: string;
  lineWidth: number;
}

const NEON_COLORS = [
  "0, 243, 255",   // Cyan
  "255, 0, 255",   // Magenta
  "140, 0, 255",   // Electric Purple
  "57, 255, 20",   // Neon Green
  "0, 150, 255",   // Deep Sky Blue
];

export function NeonNeuralWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    /* Mouse state */
    const mouse = { x: -1000, y: -1000, active: false };

    /* Particles */
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 70;
    const CONNECTION_DISTANCE = 180;
    const MOUSE_RADIUS = 250;

    /* Waves */
    const waves: Wave[] = [];

    /* Resize handler */
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* Initialize particles */
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const color =
          NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]!;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color,
          alpha: Math.random() * 0.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    /* Initialize waves */
    const initWaves = () => {
      waves.length = 0;
      const waveColors = [
        "0, 243, 255",
        "255, 0, 255",
        "140, 0, 255",
      ];
      for (let i = 0; i < 4; i++) {
        waves.push({
          y: height * (0.55 + i * 0.12),
          amplitude: 20 + Math.random() * 30,
          frequency: 0.003 + Math.random() * 0.005,
          speed: 0.015 + Math.random() * 0.025,
          phase: Math.random() * Math.PI * 2,
          color: waveColors[i % waveColors.length]!,
          lineWidth: 1.5 + Math.random() * 1.5,
        });
      }
    };

    /* Mouse handlers */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    /* Draw helpers */
    const drawGlowLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      alpha: number,
      width: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = width;
      ctx.shadowColor = `rgb(${color})`;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawGlowCircle = (
      x: number,
      y: number,
      r: number,
      color: string,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.shadowColor = `rgb(${color})`;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    /* Update & draw loop */
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      /* Dark base with very subtle radial gradient fallback */
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        width * 0.8
      );
      gradient.addColorStop(0, "rgba(10, 14, 30, 0.0)");
      gradient.addColorStop(1, "rgba(6, 8, 18, 0.35)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /* ── Draw Waves (Audio signal layer) ─────────────────────────────── */
      waves.forEach((wave) => {
        wave.phase += wave.speed;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.5 + wave.phase * 1.3) *
              (wave.amplitude * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(${wave.color}, 0.18)`;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowColor = `rgb(${wave.color})`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        /* Second pass: brighter core line */
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude * 0.6 +
            Math.sin(x * wave.frequency * 2.5 + wave.phase * 1.3) *
              (wave.amplitude * 0.2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wave.color}, 0.08)`;
        ctx.lineWidth = wave.lineWidth * 0.5;
        ctx.stroke();
      });

      /* ── Update & draw Particles (Neural nodes) ────────────────────── */
      particles.forEach((p, i) => {
        /* Pulse radius */
        p.pulsePhase += p.pulseSpeed;
        const currentRadius =
          p.radius + Math.sin(p.pulsePhase) * p.radius * 0.4;

        /* Mouse interaction — gentle repulsion */
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        /* Friction */
        p.vx *= 0.98;
        p.vy *= 0.98;

        /* Base drift */
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges */
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        /* Draw node */
        drawGlowCircle(p.x, p.y, currentRadius, p.color, p.alpha);

        /* Draw connections */
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2) continue;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            /* Mix colors */
            drawGlowLine(p.x, p.y, p2.x, p2.y, p.color, alpha, 0.8);
          }
        }
      });

      /* ── Floating energy orbs (rare, slow) ─────────────────────────── */
      const orbPhase = time * 0.0008;
      const orbX = width * 0.5 + Math.sin(orbPhase) * width * 0.25;
      const orbY = height * 0.35 + Math.cos(orbPhase * 0.6) * height * 0.15;
      const orbRadius = 80 + Math.sin(time * 0.001) * 20;

      const orbGradient = ctx.createRadialGradient(
        orbX,
        orbY,
        0,
        orbX,
        orbY,
        orbRadius
      );
      orbGradient.addColorStop(0, "rgba(0, 243, 255, 0.06)");
      orbGradient.addColorStop(0.5, "rgba(140, 0, 255, 0.03)");
      orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    /* Setup */
    resize();
    initParticles();
    initWaves();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
      initWaves();
    });
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
}
