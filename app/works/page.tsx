// src/app/works/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { Heading1, Heading3, Paragraph } from "@/src/components/shared/Text";
import { works, type Project } from "@/src/lib/works";

export const metadata: Metadata = {
  title: "All Projects | Justin David",
  description:
    "A collection of production systems, client work, and experimental web applications — including full case studies for JacinthForge and Osagie Media.",
};

const statusBadge: Record<
  NonNullable<Project["status"]>,
  { label: string; className: string } | null
> = {
  delivered: {
    label: "Delivered",
    className:
      "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  live: null,
  ongoing: {
    label: "In Progress",
    className:
      "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  archived: {
    label: "Archived",
    className: "border-border bg-muted/40 text-muted-foreground",
  },
};

export default function WorksPage() {
  return (
    <main className="mx-auto max-w-[1700px] px-5 pt-32 pb-24 md:px-10 lg:px-20">
      <div className="mb-16 flex flex-col gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          All Projects
        </span>
        <Heading1>Portfolio</Heading1>
        <Paragraph className="max-w-2xl">
          Production systems, client work, and experimental web applications.
          Two have full case studies — the rest link straight to the live
          sites.
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </main>
  );
}

function WorkCard({ work }: { work: Project }) {
  const isCaseStudy = work.featured;
  const href = isCaseStudy ? `/works/${work.slug}` : work.link;
  const external = !isCaseStudy;
  const badge = statusBadge[work.status];

  return (
    <div className="group border-border bg-card/30 relative flex flex-col overflow-hidden rounded-3xl border shadow-xl backdrop-blur-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={
          isCaseStudy
            ? `Read the ${work.title} case study`
            : `View ${work.title} live`
        }
        className="relative m-3 block aspect-video overflow-hidden rounded-2xl transition-transform duration-200 active:scale-[0.98] md:aspect-auto md:active:scale-100"
      >
        <Image
          src={work.image}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Mobile: always-visible corner icon */}
        <div className="absolute top-3 right-3 rounded-full bg-black/70 p-2 text-white shadow-lg backdrop-blur-sm md:hidden">
          <LuExternalLink size={14} />
        </div>

        {/* Desktop: hover overlay with tint */}
        <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:flex">
          <div className="bg-primary/20 absolute inset-0" />
          <div className="relative rounded-full bg-white p-4 text-black">
            <LuExternalLink size={24} />
          </div>
        </div>
      </Link>

      <div className="flex grow flex-col p-8 pt-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isCaseStudy && (
                <span className="border-primary/30 bg-primary/5 text-primary rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-widest uppercase">
                  Case Study
                </span>
              )}
              {badge && (
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-widest uppercase ${badge.className}`}
                >
                  {badge.label}
                </span>
              )}
            </div>

            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="w-fit"
            >
              <Heading3 className="group-hover:text-primary text-2xl font-bold transition-colors">
                {work.title}
              </Heading3>
            </Link>

            <p className="text-primary mt-1 text-sm font-medium tracking-tight">
              {work.tagline}
            </p>
          </div>

          {work.github && (
            <Link
              href={work.github}
              aria-label={`GitHub repository for ${work.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-foreground hover:text-background shrink-0 rounded-full border p-2 transition-all"
            >
              <BsGithub size={18} />
            </Link>
          )}
        </div>

        <Paragraph className="mb-6 line-clamp-3 max-w-3xl text-sm">
          {work.description}
        </Paragraph>

        <div className="mt-auto flex flex-wrap gap-2">
          {work.stack.map((tech) => (
            <span
              key={tech}
              className="border-primary/20 bg-primary/5 text-primary rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}