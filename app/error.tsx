"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  TerminalChrome,
  TerminalSession,
  type TerminalLine,
} from "@/src/components/shared/Terminal";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [ready, setReady] = useState(false);

  /* Pipe to your telemetry here (Sentry, Axiom, whatever). */
  useEffect(() => {
    console.error(error);
  }, [error]);

  const raw = error.message || "Unexpected runtime error";
  const message = raw.length > 120 ? `${raw.slice(0, 117)}...` : raw;
  const digest = error.digest;

  const lines: TerminalLine[] = [
    /* 1. Tailing the log */
    { text: "tail -n 20 /var/log/app.log", prompt: true, speed: 34, delay: 320 },
    {
      text: "[info]  request  GET /",
      className: "text-muted-foreground",
      instant: true,
      delay: 200,
    },
    {
      text: "[info]  render   <Page />",
      className: "text-muted-foreground",
      instant: true,
      delay: 80,
    },

    /* Beat */
    { text: "", instant: true, delay: 220 },

    /* 2. The crash */
    {
      text: "[error] Uncaught RuntimeError",
      className: "text-destructive font-semibold",
      instant: true,
      delay: 200,
    },
    {
      text: `[error] ${message}`,
      className: "text-destructive/90",
      instant: true,
      delay: 80,
    },
    ...(digest
      ? [
          {
            text: `[error] digest: ${digest}`,
            className: "text-muted-foreground",
            instant: true,
            delay: 80,
          } satisfies TerminalLine,
        ]
      : []),

    /* Beat */
    { text: "", instant: true, delay: 420 },

    /* 3. Human reassurance */
    {
      text: "# this one's on me, not you.",
      className: "text-primary",
      speed: 20,
      delay: 220,
    },
  ];

  return (
    <main className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl space-y-8">
        <TerminalChrome badge="500" glow="var(--destructive)">
          <TerminalSession lines={lines} onComplete={() => setReady(true)} />
        </TerminalChrome>

        {/* Actions — revealed once typing completes */}
        <div
          className={cn(
            "flex flex-col gap-3 transition-all duration-700 ease-out sm:flex-row sm:justify-center",
            ready
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <button
            type="button"
            onClick={reset}
            className="group bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
            Try again
          </button>

          <Link
            href="/"
            className="group border-border hover:border-primary/40 hover:bg-card/60 focus-visible:border-primary inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all focus-visible:outline-none"
          >
            Go home
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}