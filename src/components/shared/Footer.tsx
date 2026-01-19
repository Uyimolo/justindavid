"use client";

import Link from "next/link";
import Logo from "./Logo";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { LuArrowUpRight, LuMail } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card/20 mx-5 mt-20 mb-5 rounded-4xl border px-5 shadow-xl backdrop-blur-[1px] lg:px-10">
      {/* 1. FINAL CTA SECTION */}
      <div id="contact" className="container mx-auto py-6 md:px-4 md:py-20">
        <div className="dark:bg-primar relative overflow-hidden rounded-3xl bg-[#222222] px-8 py-16 text-center md:px-16 dark:bg-[#f5f5f5]">
          {/* Decorative Background Circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-white/30" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Ready to build something <br className="hidden md:block" />{" "}
              amazing together?
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-lg md:text-lg">
              Currently accepting new projects and collaborations. Let&apos;s
              turn your vision into a high-performance web reality.
            </p>
            <Link
              href="mailto:uyijustindavid@gmail.com"
              className="bg-primary-foreground group text-primary flex items-center gap-2 rounded-full px-8 py-4 font-bold transition-all duration-300 ease-in-out group-hover:scale-105 hover:scale-110"
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
              className="text-md relative flex w-fit items-center space-x-px font-semibold text-black dark:text-white"
            >
              <Logo />
              <p>Justin</p>
              <div className="aspect-square w-1 rounded-full bg-black dark:bg-white" />
              <p>David</p>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
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
            <h3 className="text-primary mb-6 font-mono text-xs font-bold tracking-widest uppercase">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {["Home", "About me", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item}`}
                    className="hover:text-foreground group flex w-fit items-center gap-1 transition-colors"
                  >
                    {item}{" "}
                    <LuArrowUpRight className="-translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h3 className="text-primary mb-6 font-mono text-xs font-bold tracking-widest uppercase">
              Contact
            </h3>
            <div className="space-y-4 text-sm font-medium">
              <p className="">Benin City, Nigeria — Available Worldwide</p>
              <Link
                href="mailto:uyijustindavid@gmail.com"
                className="hover:text-primary decoration-primary/30 block w-fit font-bold underline underline-offset-8 transition-colors"
              >
                uyijustindavid@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT BAR */}
        <div className="border-border mt-20 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-xs">
            © {currentYear} Justin David. All rights reserved.
          </p>
          <p className="text-muted-foreground/80 mt-4 font-mono text-[10px] tracking-widest uppercase md:mt-0">
            Designed & Built with{" "}
            <span className="text-primary font-bold">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
