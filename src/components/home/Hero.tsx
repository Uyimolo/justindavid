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
    <div className="group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors duration-200">
      <div className="text-2xl opacity-70 transition-opacity duration-200 group-hover:opacity-100">
        {icon}
      </div>

      <span className="-translate-x-1 text-sm font-medium opacity-0 transition-[opacity,transform] duration-200 ease-out will-change-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

const TechStackRow = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mt-12 flex flex-col gap-4", className)}>
      <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
        Expertise in
      </p>
      <div className="md:justify-betwee flex flex-wrap items-center gap-y-2 md:gap-3">
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
    <section id="home" className="pt-30 lg:min-h-150 lg:pt-40">
      <div className="flex flex-col items-start gap-10 md:flex-row lg:justify-between lg:gap-20">
        <div className="max-w-md space-y-6 lg:max-w-1/2">
          <Heading1 className="font-mono">
            I design and{" "}
            <span className="from-primary bg-linear-to-r via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              build web interfaces
            </span>{" "}
            that feel effortless to use
          </Heading1>
          <Paragraph className="max-w-lg">
            I am a frontend developer helping businesses turn ideas into fast,
            reliable, and thoughtfully crafted websites.
          </Paragraph>

          <button className="mt-6 rounded border border-blue-600 px-6 py-2 dark:border-blue-400">
            Start a project
          </button>
          <TechStackRow className="hidden lg:flex" />
        </div>

        <div className="aspect-squar border-grey-700 relative w-full overflow-hidden rounded-xl border-2">
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
