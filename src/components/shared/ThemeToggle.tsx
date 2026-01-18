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
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
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
  if (!mounted) return <div className="w-15 h-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-15 h-8 rounded-full border flex items-center p-1 bg-green-500 cursor-pointer"
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "h-6 w-6 rounded-full transition-all duration-300 bg-white flex items-center justify-center shadow-sm",
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        )}
      >
        {theme === "light" ? (
          <IoMdSunny className="text-green-500 size-4" />
        ) : (
          <FaMoon className="text-green-500 size-4" />
        )}
      </span>
    </button>
  );
}