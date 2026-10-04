// src/lib/nav.ts

export type NavItem = {
  name: string;
  /** Anchor links use /#section; route links use /path. */
  href: string;
  /** Section id for anchor links, pathname for route links. */
  match: string;
  type: "anchor" | "route";
  description: string;
  ariaLabel: string;
};

export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/#home",
    match: "home",
    type: "anchor",
    description:
      "Navigate to homepage — Justin David, Frontend Developer specialising in React, Next.js, and TypeScript.",
    ariaLabel: "Go to home section",
  },
  {
    name: "About",
    href: "/#about",
    match: "about",
    type: "anchor",
    description:
      "Learn about Justin David's background, skills, and experience building high-performance web applications.",
    ariaLabel:
      "Learn more about my background and experience as a Frontend Developer",
  },
  {
    name: "Case Studies",
    href: "/#portfolio",
    match: "portfolio",
    type: "anchor",
    description:
      "Deep dives into featured projects — the constraints, the decisions, and what I'd do differently.",
    ariaLabel: "Read my featured project case studies",
  },
  {
    name: "All Projects",
    href: "/works",
    match: "/works",
    type: "route",
    description:
      "Browse every project I've built — production systems, client work, and experimental applications.",
    ariaLabel: "View all my projects",
  },
  {
    name: "Contact",
    href: "/#contact",
    match: "contact",
    type: "anchor",
    description:
      "Get in touch with Justin David for frontend development projects and collaborations.",
    ariaLabel: "Contact me for project inquiries and collaborations",
  },
];