"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { motion } from "motion/react";

// const navItems = ["Home", "About me", "Portfolio", "Contact"];
export const navItems = [
  {
    name: "Home",
    href: "#home",
    description:
      "Navigate to homepage - Justin David, Frontend Developer specializing in React, Next.js, and TypeScript",
    ariaLabel: "Go to home section",
  },
  {
    name: "About",
    href: "#about",
    description:
      "Learn about Justin David's background, skills, and experience building high-performance web applications",
    ariaLabel:
      "Learn more about my background and experience as a Frontend Developer",
  },
  {
    name: "Portfolio",
    href: "#portfolio",
    description:
      "Explore portfolio projects including Jacinth Forge LMS, e-commerce platforms, and web applications built with React, Next.js, TypeScript, and Tailwind CSS",
    ariaLabel: "View my portfolio of React, Next.js, and fullstack projects",
  },
  {
    name: "Contact",
    href: "#contact",
    description:
      "Get in touch with Justin David for frontend development projects and collaborations",
    ariaLabel: "Contact me for project inquiries and collaborations",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  // 2. Track active item (defaults to the first one)
  const [activeTab, setActiveTab] = useState(navItems[0].name);

  return (
    <header className="fixed z-10 flex w-full items-center justify-between border-black px-5 py-5 md:px-10 lg:px-20">
      <Link
        href="/"
        className="text-md relative flex w-fit items-center space-x-px font-semibold text-black dark:text-white"
      >
        <Logo />
        <p>Justin</p>
        <div className="aspect-square w-1 rounded-full bg-black dark:bg-white" />
        <p>David</p>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        <ul className="flex items-center rounded-full bg-black/10 p-2 backdrop-blur-sm dark:bg-white/20">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <li key={item.name} className="relative flex h-10 items-center">
                <Link
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className={`relative z-10 px-6 transition-colors duration-300 ${
                    isActive
                      ? "text-white dark:text-black"
                      : "hover:text-black hover:underline dark:hover:text-white"
                  }`}
                  aria-label={item.ariaLabel}
                >
                  {item.name}
                </Link>

                {/* 3. The Animated Background */}
                {isActive && (
                  <motion.div
                    layoutId="nav-bubble" // This ID connects the items
                    className="absolute inset-0 z-0 rounded-full bg-black/50 backdrop-blur-sm dark:bg-white/90"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`border-border fixed top-0 right-0 bottom-0 z-50 h-full w-64 transform space-y-12 border-r bg-white/90 backdrop-blur-md transition-transform duration-300 lg:hidden dark:bg-black/80 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mr-0 ml-auto"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                  aria-label={item.ariaLabel}
                  // title={item.description}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="mailto:uyijustindavid@gmail.com">
            <button className="dark:bg-primary relative mt-12 w-full rounded-lg border bg-black px-4 py-3 text-white dark:text-black">
              Contact me
            </button>
          </Link>
        </nav>
      </aside>
    </header>
  );
};

export default Header;
