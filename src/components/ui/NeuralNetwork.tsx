"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const NEON_COLORS = [
  "rgba(0, 255, 255,",   // cyan
  "rgba(180, 0, 255,",   // purple
  "rgba(255, 165, 0,",   // amber
  "rgba(0, 255, 128,",   // green
  "rgba(255, 50, 150,",  // pink
];

function createNode(width: number, height: number): Node {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2.5 + 1.5,
    color: (NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)] || NEON_COLORS[0]) as string,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.02,
  };
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const MAX_DIST = 160;
    const NODE_COUNT = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, () =>
        createNode(canvas.width, canvas.height)
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;

        // Bounce off edges
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(canvas.width, n.x));
        n.y = Math.max(0, Math.min(canvas.height, n.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.35;
            // Blend colors from the two connected nodes
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `${a.color}${opacity})`);
            grad.addColorStop(1, `${b.color}${opacity})`);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);
        const glowRadius = n.radius * (2.5 + pulse * 2);
        const alpha = 0.55 + pulse * 0.45;

        // Outer glow
        const glow = ctx.createRadialGradient(
          n.x, n.y, 0,
          n.x, n.y, glowRadius
        );
        glow.addColorStop(0, `${n.color}${alpha})`);
        glow.addColorStop(1, `${n.color}0)`);

        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}1)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => {
      resize();
      // Redistribute nodes that are now off-screen
      for (const n of nodes) {
        n.x = Math.min(n.x, canvas.width);
        n.y = Math.min(n.y, canvas.height);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    />
  );
}
