// src/components/case-study/CaseStudyTemplate.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { CaseStudy } from "@/src/lib/case-studies";
import { Heading2, Heading3, Paragraph } from "../shared/Text";

type Props = {
  study: CaseStudy;
  next: CaseStudy | null;
};

const statusLabel: Record<CaseStudy["status"], string> = {
  live: "Live",
  delivered: "Delivered",
  ongoing: "In progress",
};

export default function CaseStudyTemplate({ study, next }: Props) {
  return (
    <article className="mx-auto max-w-425 px-5 pt-32 pb-24 md:px-10 lg:px-20">
      {/* Back link */}
      <Link
        href="/#portfolio"
        className="text-muted-foreground hover:text-primary mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All work
      </Link>

      {/* Hero */}
      <header className="mb-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest uppercase">
          <span className="border-primary/30 bg-primary/5 text-primary rounded-full border px-3 py-1 font-semibold">
            {statusLabel[study.status]}
          </span>
          <span className="text-muted-foreground">{study.year}</span>
          <span className="text-muted-foreground/50">·</span>
          <span className="text-muted-foreground">{study.duration}</span>
        </div>

        <Heading2 className="mb-6 text-4xl text-balance md:text-5xl lg:text-6xl">
          {study.title}
        </Heading2>

        <Paragraph className="text-lg text-pretty md:text-xl">
          {study.summary}
        </Paragraph>

        <div className="mt-8 flex flex-wrap gap-4">
          {study.liveUrl && (
            <Link
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Visit live site
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          {study.repoUrl && (
            <Link
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-foreground hover:text-background inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View source
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero image */}
      <div className="border-border max-w-7xl relative mb-20 aspect-video w-full overflow-hidden rounded-3xl border shadow-xl">
        <Image
          src={study.heroImage}
          alt={`${study.title} screenshot`}
          fill
          priority
          className="object-cover "
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
      </div>

      {/* Meta row */}
      <section className="border-border mb-24 grid grid-cols-1 gap-8 border-y py-10 md:grid-cols-3">
        <MetaBlock label="Role" value={study.role} />
        <MetaBlock label="Duration" value={study.duration} />
        <MetaBlock
          label="Core stack"
          value={study.stack[0].items.slice(0, 3).join(" · ")}
        />
      </section>

      {/* Context: Overview + Brief + Constraints */}
      <EditorialRow label="Context">
        <div className="space-y-14 mb-20">
          <div>
            <Heading3 className="mb-4 text-xl">Overview</Heading3>
            <Paragraph className="text-pretty">{study.overview}</Paragraph>
          </div>

          <div>
            <Heading3 className="mb-4 text-xl">The Brief</Heading3>
            <Paragraph className="text-pretty">{study.brief}</Paragraph>
          </div>

          <div>
            <Heading3 className="mb-4 text-xl">Constraints</Heading3>
            <ul className="space-y-3">
              {study.constraints.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="text-primary mt-1 h-4 w-4 shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </EditorialRow>

      {/* Deep-dive sections */}
      <div className="space-y-24">
        {study.sections.map((section, i) => (
          <EditorialRow
            key={section.id}
            id={section.id}
            label={String(i + 1).padStart(2, "0")}
            heading={section.heading}
          >
            <div className="space-y-6">
              {section.body.map((p, j) => (
                <Paragraph key={j} className="text-pretty">
                  {p}
                </Paragraph>
              ))}

              {section.code && (
                <div className="max-w-3xl pt-2">
                  <CodeBlock {...section.code} />
                </div>
              )}

              {section.list && (
                <ul className="space-y-3 pt-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="bg-primary mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span className="text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </EditorialRow>
        ))}
      </div>

      {/* Progress (ongoing projects only) */}
{study.progress && (
  <section className="mt-24 mb-20">
    <SectionLabel>Progress</SectionLabel>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <p className="text-muted-foreground mb-4 font-mono text-[10px] tracking-widest uppercase">
          Shipped
        </p>
        <ul className="space-y-2">
          {study.progress.shipped.map((item, i) => (
            <li key={i} className="flex gap-3">
              <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-muted-foreground leading-relaxed text-sm">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-muted-foreground mb-4 font-mono text-[10px] tracking-widest uppercase">
          Next
        </p>
        <ul className="space-y-2">
          {study.progress.next.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="border-primary/40 mt-1.5 h-2 w-2 shrink-0 rounded-full border-2" />
              <span className="text-muted-foreground leading-relaxed text-sm">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)}

      {/* Impact */}
      <section className="mt-24 mb-24">
        <SectionLabel>Impact</SectionLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {study.impact.map((m) => (
            <div
              key={m.label}
              className="border-border bg-card/30 rounded-2xl border p-6"
            >
              <p className="text-muted-foreground mb-2 font-mono text-[10px] tracking-widest uppercase">
                {m.label}
              </p>
              <p className="text-primary mb-1 text-2xl font-bold tracking-tight">
                {m.value}
              </p>
              {m.note && (
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {m.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-24">
        <SectionLabel>Stack</SectionLabel>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {study.stack.map((group) => (
            <div key={group.group}>
              <p className="text-muted-foreground mb-3 font-mono text-[10px] tracking-widest uppercase">
                {group.group}
              </p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="border-primary/20 bg-primary/5 mb-20 rounded-3xl border p-8 md:p-12">
        <SectionLabel>What I&apos;d do differently</SectionLabel>
        <Paragraph className="text-lg leading-relaxed text-pretty">
          {study.reflection}
        </Paragraph>
      </section>

      {/* Next project */}
      {next && (
        <Link
          href={`/works/${next.slug}`}
          className="group border-border hover:border-primary/40 flex items-center justify-between rounded-3xl border p-8 transition-all hover:-translate-y-0.5 md:p-10"
        >
          <div>
            <p className="text-muted-foreground mb-2 font-mono text-[10px] tracking-widest uppercase">
              Next case study
            </p>
            <p className="group-hover:text-primary text-2xl font-bold tracking-tight transition-colors md:text-3xl">
              {next.title}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">{next.tagline}</p>
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────
// Editorial layout primitives
// ─────────────────────────────────────────────

/**
 * Two-column editorial row: a fixed-width label column on the left,
 * and a wide content column on the right.
 *
 * On mobile the columns collapse and the label stacks above the content.
 * `heading` is optional — when present, it replaces the plain label with
 * a proper section heading in the label column (used by deep-dive sections).
 */
function EditorialRow({
  id,
  label,
  heading,
  children,
}: {
  id?: string;
  label: string;
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-32 grid-cols-1 gap-6 lg:grid-cols-[minmax(180px,240px)_1fr] lg:gap-16"
    >
      <div>
        <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
          {label}
        </p>
        {heading && (
          <Heading3 className="text-2xl md:text-[1.75rem]">{heading}</Heading3>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground mb-2 font-mono text-[10px] tracking-widest uppercase">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
      {children}
    </p>
  );
}

function CodeBlock({
  language,
  content,
  caption,
}: {
  language: string;
  content: string;
  caption?: string;
}) {
  return (
    <figure className="my-0">
      <div className="border-border bg-card/50 overflow-hidden rounded-2xl border">
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            {language}
          </span>
        </div>
        <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
          <code className="font-mono">{content}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-3 text-xs italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}