"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { navItems } from "@/src/lib/nav";

/** How long to suppress observer updates after a nav click, in ms.
 *  Must outlast the browser's smooth-scroll animation. */
const CLICK_SCROLL_LOCK_MS = 900;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("home");
  const pathname = usePathname();

  /** Set to true while a click-driven smooth scroll is in flight,
   *  so the observer doesn't flicker through sections on the way. */
  const lockRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHome = pathname === "/";

  /** ───────────────────────────────────────────────
   *  Scroll-driven active section detection
   *  Only runs on the homepage, where sections exist.
   *  ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!isHome) {
      // Reset to home when leaving the homepage so returning feels natural.
      setActiveAnchor("home");
      return;
    }

    const anchorItems = navItems.filter((i) => i.type === "anchor");
    const sections = anchorItems
      .map((i) => document.getElementById(i.match))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        // Keep an up-to-date set of currently-visible sections
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        });

        // Pick the topmost visible section in nav order.
        // If nothing is in the band (rare — deep scroll past the last section),
        // keep the current state instead of flickering to null.
        const firstVisible = anchorItems
          .map((i) => i.match)
          .find((id) => visibleRef.current.has(id));

        if (firstVisible) setActiveAnchor(firstVisible);
      },
      {
        // A section is "active" when its content crosses the band between
        // 25% and 45% of the viewport. That's high enough to feel
        // responsive (heading is close to the top) and wide enough to
        // avoid gaps between sections.
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      visibleRef.current.clear();
    };
  }, [isHome]);

  /** Tracks which sections are currently in the viewport band. */
  const visibleRef = useRef<Set<string>>(new Set());

  /** Handle nav click — lock the observer while the smooth scroll runs. */
  const handleNavClick = (item: (typeof navItems)[number]) => {
    if (item.type !== "anchor") return;

    // Optimistic: immediately highlight the clicked section.
    setActiveAnchor(item.match);

    // Suppress the observer until the scroll settles.
    lockRef.current = true;
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      lockRef.current = false;
    }, CLICK_SCROLL_LOCK_MS);
  };

  /** Cleanup the lock timeout on unmount. */
  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, []);

  /** True when this nav item should show as active. */
  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.type === "route") {
      // /works and /works/[slug] both keep "All Projects" active.
      return pathname.startsWith(item.match);
    }
    return isHome && activeAnchor === item.match;
  };

  return (
    <header className="fixed z-50 flex w-full items-center justify-between border-black px-5 py-5 md:px-10 lg:px-20">
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
            const isActive = isItemActive(item);
            return (
              <li key={item.name} className="relative flex h-10 items-center">
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`relative z-10 px-6 text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-white dark:text-black"
                      : "hover:text-black hover:underline dark:hover:text-white"
                  }`}
                  aria-label={item.ariaLabel}
                >
                  {item.name}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="nav-bubble"
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
          onClick={() => setOpen(!open)}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-black dark:bg-white"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-black dark:bg-white"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-black dark:bg-white"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-border bg-background/95 absolute top-20 right-4 left-4 z-40 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <nav>
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="hover:bg-accent block rounded-xl px-4 py-3 text-lg font-medium transition-colors"
                      aria-label={item.ariaLabel}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="mailto:uyijustindavid@gmail.com">
                <button className="dark:bg-primary mt-6 w-full rounded-xl border bg-black px-4 py-3 text-white transition-transform active:scale-95 dark:text-black">
                  Contact me
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;