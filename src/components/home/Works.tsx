import nexamart from "@/src/assets/images/nexamart.vercel.app_.png";
import jacinthforge from "@/src/assets/images/jacinthforge.webp";
import zuri from "@/src/assets/images/zuri-team-clone-one.vercel.app_.png";
import popcornphoria from "@/src/assets/images/popcornphoria.vercel.app.png";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { Heading2, Heading3, Paragraph } from "../shared/Text";
import { cn } from "@/lib/utils";

const Works = () => {
  const works = [
    {
      title: "Jacinth Forge",
      tagline: "Lead Frontend Developer • Production LMS",
      description:
        "Architected a comprehensive vocational LMS serving real-world students. Focused on high-performance course delivery and accessibility.",
      stack: ["Next.js", "TypeScript", "FastApi", "PostgreSQL", "Docker"],
      image: jacinthforge,
      link: "https://jacinthforge.com",
      featured: true,
    },
    {
      title: "Nexamart",
      tagline: "E-commerce platform",
      stack: ["Next.js", "Tailwind", "Firebase"],
      image: nexamart,
      link: "https://nexamart.vercel.app/",
      github: "https://github.com/uyimolo/nexamart",
    },
    {
      title: "Zuri Team Clone",
      tagline: "Vocational LMS",
      stack: ["Next.js", "Tailwind", "Firebase"],
      image: zuri,
      link: "https://zuri-team-clone-one.vercel.app/",
      github: "https://github.com/uyimolo/zuri-team-clone-one",
    },
    {
      title: "Popcornphoria",
      tagline: "Movie trailer app",
      stack: ["Next.js", "Tailwind", "TMDB API"],
      image: popcornphoria,
      link: "https://popcornphoria.vercel.app/",
      github: "https://github.com/uyimolo/popcornphoria",
    },
  ];

  return (
    <section id="portfolio" className="space-y-16 py-24">
      <div className="flex flex-col items-start gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          02. Selected Works
        </span>
        <Heading2>Portfolio Showcase</Heading2>
        <Paragraph className="max-w-2xl opacity-80">
          A curated selection of digital experiences, ranging from full-scale
          production systems to experimental web applications.
        </Paragraph>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
        {works.map((work) => (
          <div
            key={work.title}
            className={cn(
              "group border-border bg-card/30 relative flex flex-col overflow-hidden rounded-3xl border shadow-xl backdrop-blur-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
              // work.featured && "md:col-span-2 bg-linear-to-br from-primary/10 to-transparent"
            )}
          >
            {/* Project Image Area */}
            <div className="relative m-3 aspect-video overflow-hidden rounded-2xl md:aspect-auto">
              <Image
                src={work.image}
                alt={work.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
              />
              {/* Overlay on hover */}
              <div className="bg-primary/20 absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Link
                  href={work.link}
                  target="_blank"
                  className="rounded-full bg-white p-4 text-black transition-transform hover:scale-110"
                >
                  <LuExternalLink size={24} />
                </Link>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex grow flex-col p-8 pt-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Heading3 className="group-hover:text-primary text-2xl font-bold transition-colors">
                    {work.title}
                  </Heading3>
                  <p className="text-primary mt-1 text-sm font-medium tracking-tight">
                    {work.tagline}
                  </p>
                </div>

                <div className="flex gap-3">
                  {work.github && (
                    <Link
                      href={work.github}
                      target="_blank"
                      className="border-border hover:bg-foreground hover:text-background rounded-full border p-2 transition-all"
                    >
                      <BsGithub size={20} />
                    </Link>
                  )}
                </div>
              </div>

              {work.featured && (
                <Paragraph className="mb-6 line-clamp-2 max-w-3xl opacity-80">
                  {work.description}
                </Paragraph>
              )}

              {/* Tech Badges */}
              <div className="mt-auto flex flex-wrap gap-2">
                {work.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-primary/20 bg-primary/5 text-primary/80 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
