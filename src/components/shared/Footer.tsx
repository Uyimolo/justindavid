"use client";

import Link from "next/link";
import Logo from "./Logo";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { LuArrowUpRight, LuMail } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 mx-5 mb-5 px-5 shadow-xl lg:px-10 border rounded-4xl border-border bg-card/20 backdrop-blur-[1px]">
      {/* 1. FINAL CTA SECTION */}
      <div className="container mx-auto md:px-4 py-6 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#222222] dark:bg-primary px-8 py-16 text-center md:px-16">
          {/* Decorative Background Circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30  blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/20 dark:bg-white/30 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Ready to build something <br className="hidden md:block" />{" "}
              amazing together?
            </h2>
            <p className="mb-10 max-w-lg text-primary-foreground/80 md:text-lg">
              Currently accepting new projects and collaborations. Let&Apos;s
              turn your vision into a high-performance web reality.
            </p>
            <Link
              href="mailto:uyijustindavid@gmail.com"
              className="group flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 font-bold text-primary transition-all hover:scale-105"
            >
              Get in Touch{" "}
              <LuMail className="transition-transform group-hover:-rotate-12" />
            </Link>
          </div>
        </div>

        {/* 2. MAIN FOOTER CONTENT */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="flex items-center space-x-px text-xl font-semibold"
            >
              <Logo />
              <p className="ml-2">Justin</p>
              <div className="aspect-square w-1 rounded-full bg-black dark:bg-white mx-1" />
              <p>David</p>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building high-performance, accessible, and beautiful web
              interfaces for forward-thinking brands and startups.
            </p>
            <div className="mt-8 flex gap-5">
              <Link
                href="https://github.com/uyimolo"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BsGithub size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/uyijustindavid/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BsLinkedin size={20} />
              </Link>
              <Link
                href="https://twitter.com/codefrontline"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <BsTwitterX size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {["Home", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item}`}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    {item}{" "}
                    <LuArrowUpRight className="opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Contact
            </h4>
            <div className="space-y-4 text-sm font-medium">
              <p className="text-muted-foreground">
                Benin City, Nigeria — Available Worldwide
              </p>
              <Link
                href="mailto:hello@justindavid.dev"
                className="block text-lg font-bold hover:text-primary w-fit transition-colors underline decoration-primary/30 underline-offset-8"
              >
                hello@justindavid.dev
              </Link>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT BAR */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Justin David. All rights reserved.
          </p>
          <p className="mt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 md:mt-0">
            Designed & Built with{" "}
            <span className="text-primary font-bold">Next.js 15</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
