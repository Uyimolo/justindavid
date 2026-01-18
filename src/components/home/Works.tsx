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
      description: "Architected a comprehensive vocational LMS serving real-world students. Focused on high-performance course delivery and accessibility.",
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
    <section className="py-24 space-y-16">
      <div className="flex flex-col items-start gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">02. Selected Works</span>
        <Heading2>Portfolio Showcase</Heading2>
        <Paragraph className="max-w-2xl opacity-80">
          A curated selection of digital experiences, ranging from full-scale production systems to experimental web applications.
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {works.map((work) => (
          <div
            key={work.title}
            className={cn(
              "group relative flex flex-col rounded-3xl overflow-hidden border border-border shadow-xl bg-card/30 backdrop-blur-[1px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
              work.featured && "md:col-span-2 bg-linear-to-br from-primary/10 to-transparent"
            )}
          >
            {/* Project Image Area */}
            <div className="relative aspect-video md:aspect-auto  overflow-hidden m-3 rounded-2xl">
              <Image
                src={work.image}
                alt={work.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                 <Link href={work.link} target="_blank" className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform">
                    <LuExternalLink size={24} />
                 </Link>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-8 pt-4 flex flex-col grow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Heading3 className="text-2xl font-bold group-hover:text-primary transition-colors">{work.title}</Heading3>
                  <p className="text-sm text-primary font-medium tracking-tight mt-1">{work.tagline}</p>
                </div>
                
                <div className="flex gap-3">
                  {work.github && (
                    <Link href={work.github} target="_blank" className="p-2 rounded-full border border-border hover:bg-foreground hover:text-background transition-all">
                      <BsGithub size={20} />
                    </Link>
                  )}
                </div>
              </div>

              {work.featured && (
                <Paragraph className="mb-6 line-clamp-2 opacity-80 max-w-3xl">
                  {work.description}
                </Paragraph>
              )}

              {/* Tech Badges */}
              <div className="mt-auto flex flex-wrap gap-2">
                {work.stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full border border-primary/20 bg-primary/5 text-primary/80"
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