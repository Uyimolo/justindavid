"use client";
import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import { FaRocket, FaLightbulb } from "react-icons/fa";
import uyi from "@/src/assets/images/Uyi.webp";
import Image from "next/image";

// Smooth reveal animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth reveal
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const cardHoverBase =
    "transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30";

  return (
    <section ref={ref} id="about-me">
      {/* Header with separate animation */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-16 flex flex-col"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-blue-500 uppercase">
            01. Background
          </span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
        <h2 className="text-4xl font-bold md:text-5xl">A little about me</h2>
      </motion.div>

      {/* Grid with staggered card animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid auto-rows-[120px] grid-cols-1 gap-4 md:grid-cols-12"
      >
        {/* 1. PORTRAIT */}
        <motion.div
          variants={itemVariants}
          className={`group relative row-span-4 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-blue-500/10 to-purple-500/10 shadow-xl md:col-span-4 md:row-span-4 ${cardHoverBase}`}
        >
          <Image
            src={uyi}
            alt="Portrait of Uyi Justin Uyioghosa, a frontend developer"
            fill
            className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        {/* 2. CORE STACK */}
        <motion.div
          variants={itemVariants}
          className={`relative row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/40 p-4 backdrop-blur-md md:col-span-8 md:row-span-2 md:p-8 ${cardHoverBase}`}
        >
          <div className="pointer-events-none absolute -top-10 -right-10 text-4xl font-bold text-blue-500/5 select-none md:text-9xl">
            STACK
          </div>
          <div className="z-10">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-transform group-hover:rotate-12">
              <FaRocket />
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight italic md:text-2xl">
              Building high-performance digital products.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
              I specialize in the{" "}
              <span className="font-semibold text-white">React ecosystem</span>.
              My focus is on writing clean, scalable code and creating user
              interfaces that don't just look good, but perform flawlessly.
            </p>
          </div>
        </motion.div>

        {/* 3. QUOTE */}
        <motion.div
          variants={itemVariants}
          className={`group flex items-center rounded-3xl border border-gray-800 bg-transparent p-6 shadow-sm md:col-span-4 md:row-span-1 ${cardHoverBase}`}
        >
          <p className="text-lg leading-relaxed font-medium md:text-xl">
            "I enjoy making{" "}
            <span className="text-blue-500 transition-colors group-hover:text-blue-400">
              complex things feel simple
            </span>
            ."
          </p>
        </motion.div>

        {/* 4. PERSONAL DRIVE */}
        <motion.div
          variants={itemVariants}
          className={`relative row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 text-black shadow-xl md:col-span-4 ${cardHoverBase}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_60%)]" />
          <div className="z-10">
            <span className="mb-4 block font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">
              Personal Drive
            </span>
            <h4 className="text-xl leading-tight font-bold">
              Curiosity over <br /> complacency.
            </h4>
          </div>
          <div className="z-10 space-y-2">
            <p className="text-xs leading-relaxed opacity-85 lg:text-sm">
              When I'm not debugging, I'm likely exploring new design trends or
              automating workflows. I never stop asking "why?"
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Design", "Music", "Fine arts"].map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-full border border-black/20 px-2 py-0.5 font-mono text-[9px] opacity-60 transition-colors hover:bg-black hover:text-white"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 5. STARTUP COLLABORATION */}
        <motion.div
          variants={itemVariants}
          className={`group flex cursor-default items-center gap-5 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 md:col-span-4 md:row-span-1 ${cardHoverBase}`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
            <FaLightbulb />
          </div>
          <p className="text-sm leading-tight font-medium">
            Partnering with startups to bridge the gap between{" "}
            <span className="italic">vision</span> and{" "}
            <span className="italic">reality</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
