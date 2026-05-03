import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

import { SKILL_CATEGORIES, type SkillCategory } from "../data/skills";

interface SkillsGridProps {
  /** Override the data source — defaults to SKILL_CATEGORIES. */
  categories?: readonly SkillCategory[];
  className?: string;
}

/**
 * Reusable categorised skills grid. Pure presentation — receives data, never
 * fetches. Wrap in a Section for headings, or use bare for embedding elsewhere.
 */
export function SkillsGrid({
  categories = SKILL_CATEGORIES,
  className,
}: SkillsGridProps) {
  return (
    <Section
      eyebrow="Skills"
      title="What I work with"
      description="The tools and technologies I reach for most often."
      className={className}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {categories.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <article
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm",
        "transition-all duration-200 hover:border-amber-500/25 hover:bg-white/[0.05]",
      )}
    >
      <h3 className="text-base font-semibold text-white">
        {category.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {category.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="tech-badge"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </article>
  );
}
