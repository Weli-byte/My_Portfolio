/**
 * Source of truth for the About page's skills section.
 * Update this file to change what the SkillsGrid renders — no component edits.
 */

export interface Skill {
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: readonly Skill[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Building fast, accessible interfaces.",
    skills: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js (App Router)" },
      { name: "Tailwind CSS" },
      { name: "Radix / Headless UI" },
      { name: "Framer Motion" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "API design, data modelling, and reliable systems.",
    skills: [
      { name: "Node.js" },
      { name: "tRPC" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Redis" },
      { name: "REST & GraphQL" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    description: "Applied ML — embeddings, RAG, and LLM-backed products.",
    skills: [
      { name: "Python" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "OpenAI / Anthropic APIs" },
      { name: "LangChain" },
      { name: "Vector databases" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platform",
    description: "How I ship, test, and operate what I build.",
    skills: [
      { name: "Git / GitHub" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "AWS" },
      { name: "Vitest / Playwright" },
      { name: "GitHub Actions" },
    ],
  },
] as const;
