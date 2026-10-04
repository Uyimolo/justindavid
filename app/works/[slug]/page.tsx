// src/app/works/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyTemplate from "@/src/components/case-study/CaseStudyTemplate";
import { caseStudies, getCaseStudyBySlug, getNextCaseStudy } from "@/src/lib/case-studies";


type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: `${study.title} — Case Study | Justin David`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(slug);

  return <CaseStudyTemplate study={study} next={next} />;
}