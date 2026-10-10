"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  TerminalChrome,
  TerminalSession,
  type TerminalLine,
} from "@/src/components/shared/Terminal";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "home/", desc: "start over" },
  { href: "/#portfolio", label: "case studies/", desc: "case studies" },
  { href: "/works", label: "all projects/", desc: "all projects" },
  { href: "/#about", label: "about/", desc: "who I am" },
  { href: "/#contact", label: "contact/", desc: "say hello" },
];

const PAD = Math.max(...routes.map((r) => r.label.length)) + 2;

export default function NotFound() {
  const pathname = usePathname() || "/";
  const [ready, setReady] = useState(false);

  const displayPath =
    pathname.length > 32 ? `${pathname.slice(0, 29)}...` : pathname;

  const lines: TerminalLine[] = [
    /* 1. The failed request */
    { text: `curl -sI ${displayPath}`, prompt: true, speed: 32, delay: 300 },
    {
      text: "HTTP/2 404",
      className: "text-destructive font-semibold",
      instant: true,
      delay: 260,
    },
    {
      text: "x-matched-path: /404",
      className: "text-muted-foreground",
      instant: true,
      delay: 60,
    },

    /* Beat */
    { text: "", instant: true, delay: 340 },

    /* 2. A comment diagnosis (terminal style) */
    {
      text: `# "${displayPath}" isn't in the route table.`,
      className: "text-amber-500/90",
      speed: 18,
      delay: 180,
    },

    /* Beat */
    { text: "", instant: true, delay: 380 },

    /* 3. The route listing */
    { text: "ls routes/", prompt: true, speed: 40, delay: 240 },
    ...routes.map((r, i) => ({
      text: `  ${r.label.padEnd(PAD)}${r.desc}`,
      className: "text-muted-foreground",
      instant: true,
      delay: i === routes.length - 1 ? 320 : 70,
    })),
  ];

  return (
    <main className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl space-y-8">
        <TerminalChrome badge="404">
          <TerminalSession lines={lines} onComplete={() => setReady(true)} />
        </TerminalChrome>

        {/* Navigation — revealed once typing completes */}
        <div
          className={cn(
            "grid grid-cols-2 gap-3 transition-all duration-700 ease-out sm:grid-cols-4",
            ready
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group border-border bg-card/30 hover:border-primary/40 hover:bg-card/60 focus-visible:border-primary flex items-center justify-between gap-2 rounded-xl border px-4 py-3 transition-all focus-visible:outline-none"
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-foreground truncate font-mono text-sm font-medium">
                  {r.label.replace(/\/$/, "")}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {r.desc}
                </span>
              </span>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}