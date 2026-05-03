import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/modules/contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Veli Parlak — software engineer and AI developer.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left — intro + alternative contact paths */}
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400 sm:text-lg">
              Whether it&apos;s a project, a question, or a quick hello —
              send a note and I&apos;ll get back to you within a day or two.
            </p>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-medium text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Elsewhere
                </dt>
                <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={SITE_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          {/* Right — the form */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
