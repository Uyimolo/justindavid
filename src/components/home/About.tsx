"use client";
import { FaRocket, FaLightbulb } from "react-icons/fa";
import uyi from "@/src/assets/images/Uyi.webp";
import Image from "next/image";
import { Heading2 } from "../shared/Text";

const About = () => {
  const cardHoverBase =
    "transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30";

  return (
    <section id="about">
      {/* Header */}
      <div className="mb-16 flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            01. Background
          </span>
          <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
        <Heading2 className="">A little about me</Heading2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:auto-rows-[120px] md:grid-cols-12">
        {/* 1. PORTRAIT */}
        <div
          className={`group relative row-span-4 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-blue-500/10 to-purple-500/10 shadow-xl md:col-span-4 md:row-span-4 ${cardHoverBase}`}
        >
          <Image
            src={uyi}
            alt="Portrait of Uyi Justin Uyioghosa, a frontend developer"
            fill
            className="hidden object-cover transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 md:block"
            // sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <Image
            src={uyi}
            alt="Portrait of Uyi Justin Uyioghosa, a frontend developer"
            // fill
            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 md:hidden"
            // sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        {/* 2. CORE STACK */}
        <div
          className={`border-border bg-accent relative row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border p-6 backdrop-blur-md md:col-span-8 md:row-span-2 xl:p-8 ${cardHoverBase}`}
        >
          <div className="pointer-events-none absolute -top-10 -right-10 text-4xl font-bold text-blue-500/5 select-none md:text-9xl">
            STACK
          </div>
          <div className="z-10">
            <div className="text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 transition-transform group-hover:rotate-12">
              <FaRocket />
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight italic md:text-2xl">
              Building high-performance digital products.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed lg:text-base">
              I specialize in the{" "}
              <span className="text-primary font-semibold">
                React ecosystem
              </span>
              . My focus is on writing clean, scalable code and creating user
              interfaces that don&apos;t just look good, but perform flawlessly.
            </p>
          </div>
        </div>

        {/* 3. QUOTE */}
        <div
          className={`group border-border flex items-center rounded-3xl border bg-transparent p-6 shadow-sm md:col-span-4 md:row-span-1 xl:p-8 ${cardHoverBase}`}
        >
          <p className="text-lg leading-relaxed font-medium lg:text-xl">
            &apos;I enjoy making{" "}
            <span className="text-primary transition-colors group-hover:text-blue-400">
              complex things feel simple
            </span>
            .&apos;
          </p>
        </div>

        {/* 4. PERSONAL DRIVE */}
        <div
          className={`relative row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 text-black shadow-xl md:col-span-4 xl:p-8 ${cardHoverBase}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_60%)]" />
          <div className="z-10">
            <span className="mb-3 block font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 lg:mb-4">
              Personal Drive
            </span>
            <h4 className="mb-2 text-xl leading-tight font-bold md:text-lg lg:text-xl">
              Curiosity over <br /> complacency.
            </h4>
          </div>
          <div className="z-10 space-y-1 lg:space-y-2">
            <p className="text-sm leading-relaxed opacity-85 md:text-xs lg:text-sm">
              When I&apos;m not debugging, I&apos;m likely exploring new design
              trends or automating workflows. I never stop asking "why?"
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Design", "Music", "Arts"].map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-full border border-black/20 px-2 py-0.5 font-mono text-[9px] opacity-60 transition-colors hover:bg-black hover:text-white"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 5. STARTUP COLLABORATION */}
        <div
          className={`group flex cursor-default items-center gap-5 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 md:col-span-4 md:row-span-1 xl:p-8 ${cardHoverBase}`}
        >
          <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110 lg:h-12 lg:w-12">
            <FaLightbulb />
          </div>
          <p className="text-sm leading-tight font-medium">
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
