// src/components/home/Works.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Heading2, Heading3, Paragraph } from "../shared/Text";
import { getFeaturedProjects, type Project } from "@/src/lib/works";
import { cn } from "@/lib/utils";

const Works = () => {
  const featured = getFeaturedProjects();

  return (
    <section id="portfolio" className="space-y-16 py-24">
      <div className="flex flex-col items-start gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          02. Selected Work
        </span>
        <Heading2>Case Studies</Heading2>
        <Paragraph className="max-w-2xl">
          Deep dives into the projects I&apos;ve built — the constraints, the
          decisions, and what I&apos;d do differently.
        </Paragraph>
      </div>

      <div className="space-y-6 md:space-y-10">
        {featured.map((work, i) => (
          <FeaturedWorkCard
            key={work.slug}
            work={work}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href="/works"
          className="group border-border hover:border-primary/40 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all"
        >
          View all projects
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
};

function FeaturedWorkCard({
  work,
  reverse,
}: {
  work: Project;
  reverse: boolean;
}) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group border-border bg-card/30 hover:border-primary/30 grid grid-cols-1 gap-3 overflow-hidden rounded-3xl border p-3 shadow-xl backdrop-blur-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-2 lg:gap-5 lg:p-5"
    >
      {/* Image — inset by the card's padding, so the whole card reads as a frame */}
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[420px]",
          reverse && "lg:order-2",
        )}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Info */}
      <div
        className={cn(
          "flex flex-col justify-center px-3 pb-2 lg:px-6 lg:py-8",
          reverse && "lg:order-1",
        )}
      >
        {/* Meta badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2 lg:mb-5 lg:gap-3">
          <span className="border-primary/30 bg-primary/5 text-primary rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest uppercase">
            Case Study
          </span>
          <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {work.year}
            {work.role && (
              <span className="hidden lg:inline"> · {work.role}</span>
            )}
          </span>
        </div>

        <Heading3 className="group-hover:text-primary mb-2 text-2xl font-bold tracking-tight transition-colors lg:mb-3 lg:text-4xl">
          {work.title}
        </Heading3>

        <p className="text-primary text-sm font-medium tracking-tight lg:mb-5">
          {work.tagline}
        </p>

        {/* Description + stack: hidden on mobile to keep the card compact */}
        <Paragraph className="mt-5 mb-0 line-clamp-4 text-sm leading-relaxed lg:mb-8 lg:max-w-xl">
          {work.description}
        </Paragraph>

        <div className="mt-5 mb-0 hidden  flex-wrap gap-2 lg:mb-8 lg:flex">
          {work.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="border-primary/20 bg-primary/5 text-primary rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA — the only thing at the bottom on mobile */}
        <div className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-medium lg:mt-auto">
          Read case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}

export default Works;