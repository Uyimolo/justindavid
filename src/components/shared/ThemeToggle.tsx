"use client";

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // 1. Initial Sync
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = stored || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    // Use the force boolean (true adds, false removes)
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    // CRITICAL FIX: Explicitly tell the DOM what the state is
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  // Avoid "Hydration Mismatch" (button showing sun while page is dark)
  if (!mounted) return <div className="h-8 w-15" />;

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-15 cursor-pointer items-center rounded-full border bg-green-500 p-1"
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300",
          theme === "dark" ? "translate-x-7" : "translate-x-0",
        )}
      >
        {theme === "light" ? (
          <IoMdSunny className="size-4 text-green-500" />
        ) : (
          <FaMoon className="size-4 text-green-500" />
        )}
      </span>
    </button>
  );
}
