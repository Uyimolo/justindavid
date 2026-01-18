import uyi from "@/src/assets/images/Uyi.webp";
import { Heading2, Paragraph } from "../shared/Text";
import { FaRocket, FaLightbulb } from "react-icons/fa";
import Image from "next/image";
import { BiSolidZap } from "react-icons/bi";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className=" py-20">
      <div className="flex flex-col mb-16">
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2">
          01. Background
        </span>
        <Heading2>A little about me</Heading2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[120px]">
        {/* 1. THE PORTRAIT - Integrated Glass Frame */}
        <div className="row-span-4 md:col-span-4 md:row-span-4 relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image
            src={uyi}
            alt="Uyi Portrait"
            fill
            className="object-cover transition-all duration-700 grayscal group-hover:grayscale-0 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* 2. CORE STACK - Big Bold Typography */}
        <div className="row-span-2 md:col-span-8 md:row-span-2 p-4 md:p-8 bg-card/40 backdrop-blur-md rounded-3xl border shadow border-border flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-primary/5 text-4xl md:text-9xl font-bold select-none">
            STACK
          </div>
          <div className="z-10">
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary mb-4">
              <FaRocket className="animate-pulse" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 italic">
              Building high-performance digital products.
            </h3>
            <Paragraph className="max-w-xl text-sm md:text-base">
              I specialize in the{" "}
              <span className="text-foreground font-semibold">
                React ecosystem
              </span>
              . My focus is on writing clean, scalable code and creating user
              interfaces that don&apos;t just look good, but perform flawlessly.
            </Paragraph>
          </div>
        </div>

        {/* 3. QUOTE - Minimalist & Airy */}
        <div className="md:col-span-4 md:row-span-1 p-6 flex items-center bg-transparent rounded-3xl border border-border shadow group">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            &ldquo;I enjoy making{" "}
            <span className="text-primary transition-colors group-hover:text-blue-400">
              complex things feel simple
            </span>
            .&rdquo;
          </p>
        </div>

        {/* 4. THE DRIVE/PERSONAL CARD - High Contrast but Personal */}
        <div className="md:col-span-4 row-span-2 bg-foreground text-background rounded-3xl p-6 flex flex-col justify-between shadow relative overflow-hidden group">
          {/* Subtle subtle texture/gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

          <div className="z-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 block mb-4">
              Personal Drive
            </span>
            <h4 className="text font-bold leading-tight">
              Curiosity over <br /> complacency.
            </h4>
          </div>

          <div className="z-10 space-y-2">
            <p className="text-sm leading-relaxed opacity-85">
              When I&apos;m not debugging, I&apos;m likely exploring new design
              trends or finding ways to automate my workflow. I believe great
              software is built by those who never stop asking &quot;why?&quot;
            </p>

            {/* Small Hobbies/Interests Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Design", "Music", "Fitness"].map((hobby) => (
                <span
                  key={hobby}
                  className="text-[9px] border border-background/20 px-2 py-0.5 rounded-full opacity-60 font-mono"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 5. STARTUP COLLABORATION - Badge Style */}
        <div className="md:col-span-4 md:row-span-1 p-6 bg-primary/5 rounded-3xl border border-primary/20 flex items-center gap-5 hover:bg-primary/10 transition-colors cursor-default">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <FaLightbulb />
          </div>
          <p className="text-sm font-medium leading-tight">
            Partnering with startups to bridge the gap between{" "}
            <span className="italic">vision</span> and{" "}
            <span className="italic">reality</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
