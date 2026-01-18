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

function TechIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="group flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-primary">
      <div className="text-2xl opacity-70 transition-opacity duration-200 group-hover:opacity-100">
        {icon}
      </div>

      <span
        className="
          text-sm font-medium
          -translate-x-1 opacity-0
          transition-[opacity,transform] duration-200 ease-out
          group-hover:translate-x-0 group-hover:opacity-100
          will-change-[opacity,transform]
        "
      >
        {label}
      </span>
    </div>
  );
}

const TechStackRow = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mt-12 flex flex-col gap-4", className)}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Expertise in
      </p>
      <div className="flex flex-wrap items-center gap-y-2 md:gap-3 md:justify-betwee">
        {/* Use your choice of icons (React, Next, TS, Tailwind, etc) */}
        <TechIcon icon={<RiReactjsLine />} label="React" />
        <TechIcon icon={<TbBrandNextjs />} label="Next.js" />
        <TechIcon icon={<SiTypescript />} label="TypeScript" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind" />
        <TechIcon icon={<SiFigma />} label="Figma" />
        <TechIcon icon={<SiFastify />} label="Fastify" />
        <TechIcon icon={<SiPrisma />} label="Prisma" />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="pt-30 lg:min-h-150 lg:pt-40">
      <div className="flex flex-col md:flex-row items-start lg:justify-between gap-10 lg:gap-20 ">
        <div className="space-y-6 max-w-md lg:max-w-1/2">
          <Heading1 className="font-mono">
            I design and{" "}
            <span className="bg-linear-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              build web interfaces
            </span>{" "}
            that feel effortless to use
          </Heading1>
          <Paragraph className="max-w-lg">
            I am a frontend developer helping businesses turn ideas into fast,
            reliable, and thoughtfully crafted websites.
          </Paragraph>

          <button className="py-2 mt-6 border border-blue-600 dark:border-blue-400 rounded px-6">
            Start a project
          </button>
          <TechStackRow className="hidden lg:flex" />
        </div>

        <div className="aspect-squar relative overflow-hidden w-full border-2 border-grey-700 rounded-xl">
          <Image
            src={codeEditor}
            className="w-full rounded-xl border-5"
            alt="me"
          />
        </div>
      </div>
      <TechStackRow className="flex lg:hidden" />
    </section>
  );
};

export default Hero;
