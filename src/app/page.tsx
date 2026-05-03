import {
  AboutPreview,
  ContactCTA,
  Hero,
  ProjectsPreview,
} from "@/modules/home";

/**
 * Homepage — purely a composition root. Each section is owned by its module,
 * which keeps this file stable as content evolves.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProjectsPreview />
      <ContactCTA />
    </>
  );
}
