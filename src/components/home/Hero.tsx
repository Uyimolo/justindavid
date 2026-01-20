import { Heading1, Paragraph } from "../shared/Text";
import Image from "next/image";
import codeEditor from "@/src/assets/images/code-editor.png";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiFastify,
  SiFigma,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DiFirebase } from "react-icons/di";

function TechIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors duration-200">
      <div className="text-2xl opacity-70 transition-opacity duration-200 group-hover:opacity-100">
        {icon}
      </div>
    </div>
  );
}

const TechStackRow = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mt-12 flex flex-col gap-4", className)}>
      <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
        Expertise in
      </p>
      <div className="md:justify-betwee flex flex-wrap items-center gap-4 gap-y-2">
        {/* Use your choice of icons (React, Next, TS, Tailwind, etc) */}
        <TechIcon icon={<RiReactjsLine title="React" />} />
        <TechIcon icon={<TbBrandNextjs title="Next.js" />} />
        <TechIcon icon={<SiTypescript title="TypeScript" />} />
        <TechIcon icon={<SiTailwindcss title="Tailwind" />} />
        <TechIcon icon={<SiFigma title="Figma" />} />
        <TechIcon icon={<SiFastify title="Fastify" />} />
        <TechIcon icon={<SiPrisma title="Prisma" />} />
        <TechIcon icon={<DiFirebase title="Firebase" />} />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-30 lg:min-h-150 lg:pt-40">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between lg:gap-20">
        <div className="max-w-m space-y-6 lg:max-w-1/2">
          <Heading1 className="font-mono">
            I design and{" "}
            <span className="from-primary bg-linear-to-r via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              build web interfaces
            </span>{" "}
            that feel effortless to use
          </Heading1>
          <div className="space-y-10">
            <Paragraph className="max-w-lg">
              I am a frontend developer helping businesses turn ideas into fast,
              reliable, and thoughtfully crafted websites.
            </Paragraph>

            <Link href="mailto:uyijustindavid@gmail.com">
              <button className="rounded border border-blue-600 px-6 py-2 transition-all duration-300 hover:scale-105 dark:border-blue-400">
                Start a project{" "}
              </button>
            </Link>
          </div>
          <TechStackRow className="hidden lg:flex" />
        </div>

        <div className="aspect-squar border-grey-700 relative w-full overflow-hidden rounded-xl border-2">
          <Image
            src={codeEditor}
            className="w-full rounded-xl border-5"
            alt="Code editor Mockup"
          />
        </div>
      </div>
      <TechStackRow className="flex gap-4 lg:hidden" />
    </section>
  );
};

export default Hero;
