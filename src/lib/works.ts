// src/lib/works.ts
import type { StaticImageData } from "next/image";

import jacinthforge from "@/src/assets/images/jacinthforge.webp";
import osagiemedia from "@/src/assets/images/osagiemedia.webp";
import nexamart from "@/src/assets/images/nexamart.vercel.app_.webp";
import zuri from "@/src/assets/images/zuri-team-clone-one.vercel.app_.webp";
import justindavid from "@/src/assets/images/justindavid.webp";
import pastura from "@/src/assets/images/pastura.webp";

export type ProjectStatus = "live" | "delivered" | "ongoing" | "archived";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  image: StaticImageData;
  link: string;
  github?: string;
  /** Only true if a case study exists at /works/[slug]. */
  featured: boolean;
  status: ProjectStatus;
  role?: string;
  year?: string;
};

export const works: Project[] = [

  {
    slug: "osagiemedia",
    title: "Osagie Media",
    tagline: "Full-stack build • Delivered",
    description:
      "A public marketing site and single-admin panel for a UK-based wedding photographer. Live booking flow, deposit verification, and a hand-off that left the client able to edit everything without touching code.",
    stack: ["Next.js 16", "TypeScript", "Prisma 7", "TanStack Query", "R2", "Neon"],
    image: osagiemedia,
    link: "https://osagiemedia.com",
    featured: true,
    status: "delivered",
    role: "Sole Developer",
    year: "2026",
  },
    {
  slug: "pastura",
  title: "Pastura",
  tagline: "Church operations platform • In progress",
  description:
    "A multi-tenant SaaS for Nigerian Pentecostal churches. Members, giving, attendance, scheduling, tasks, and a content/LMS module — architected with the same rigor whether the codebase has one user or one hundred churches.",
  stack: [
    "Turborepo",
    "Fastify 5",
    "Next.js 16",
    "Prisma",
    "Neon",
    "R2",
    "Paystack",
    "TanStack Query",
  ],
  image: pastura,
  link: "https://pastura.xyz",
  featured: true,
  status: "ongoing",
  role: "Founder & Sole Developer",
  year: "2026",
},
  {
    slug: "jacinth-forge",
    title: "JacinthForge",
    tagline: "Frontend Engineer • Production LMS",
    description:
      "An e-learning platform connecting instructors with apprentices. I built the frontend end-to-end: multi-step course creation, media pipeline, quiz builder, and a client-side certificate generator.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form", "Zustand"],
    image: jacinthforge,
    link: "https://jacinthforge.com",
    featured: true,
    status: "live",
    role: "Frontend Engineer",
    year: "2025",
  },
{
  slug: "justindavid-dev",
  title: "justindavid.dev",
  tagline: "Design system • Case-study architecture",
  description:
    "The portfolio you're on right now. Server Components by default, a semantic design system in Tailwind v4, and scroll-driven navigation that doesn't flicker. Ships with a case-study template so future projects have somewhere to live.",
  stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Motion", "React Icons"],
  image: justindavid,
  link: "https://justindavid.dev",
  github: "https://github.com/uyimolo/justindavid",
  featured: true,
  status: "live",
  role: "Designer & Developer",
  year: "2026",
},

  {
    slug: "nexamart",
    title: "Nexamart",
    tagline: "E-commerce platform",
    description:
      "An e-commerce platform allowing users to browse and purchase mock products. Built with React, CSS, and the Dummy JSON API.",
    stack: ["React", "CSS", "Dummy JSON API"],
    image: nexamart,
    link: "https://nexamart.vercel.app/",
    github: "https://github.com/uyimolo/nexamart",
    featured: false,
    status: "live",
  },
  {
    slug: "zuri-team-clone",
    title: "Zuri Team Clone",
    tagline: "Pixel-Perfect Multi-Page Replication",
    description:
      "A high-fidelity replication of five core Zuri Team landing pages, demonstrating orchestrated reveal animations and responsive architecture.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    image: zuri,
    link: "https://zuri-team-clone-one.vercel.app/",
    github: "https://github.com/uyimolo/zuri-team-clone-one",
    featured: false,
    status: "archived",
  },
];

export const getProjectBySlug = (slug: string) =>
  works.find((w) => w.slug === slug);

export const getFeaturedProjects = () => works.filter((w) => w.featured);