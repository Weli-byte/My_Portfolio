import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section id="contact" className="border-t border-white/10 py-20 sm:py-28">
      <Container size="lg">
        <div className="flex flex-col items-start gap-8 rounded-xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-base text-gray-400">
              I&apos;m open to interesting work and collaborations. Drop a
              line — I usually reply within a day or two.
            </p>
          </div>
          <Link href={`mailto:${SITE_CONFIG.email}`}>
            <span className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors">
              Email me
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
