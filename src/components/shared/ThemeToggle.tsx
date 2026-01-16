"use client";

import { useEffect, useState } from "react";
import { FaMoon, } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { IoMdSunny } from "react-icons/io";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // hydrate theme from storage / system
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn("relative w-15 rounded-full border flex items-center p-1", theme === "dark" ? "bg-green-500" : "bg-green-500")}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "h-6 w-6 p-1 rounded-full transition-transform bg-white duration-200 flex items-center justify-center",
          theme === "dark" ? "translate-x-6 " : "translate-x-0"
        )}
      >
        {theme !== "dark" ? <IoMdSunny className="text-green-500" /> : <FaMoon className="text-green-500" />}
      </span>
    </button>
  );
}
