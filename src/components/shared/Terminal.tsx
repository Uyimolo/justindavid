"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type TerminalLine = {
  /** The literal text to type out. */
  text: string;
  /** Prefix with `visitor@justindavid.dev:~$` and render as a command. */
  prompt?: boolean;
  /** Tailwind classes for the line (color, weight, etc.). */
  className?: string;
  /** Skip character-by-character typing; render the line all at once. */
  instant?: boolean;
  /** ms to wait *after* this line finishes before starting the next. */
  delay?: number;
  /** ms per character. Defaults to 28. */
  speed?: number;
};

/* ------------------------------------------------------------------ */
/*  Hooks                                                             */
/* ------------------------------------------------------------------ */

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/* ------------------------------------------------------------------ */
/*  Atoms                                                             */
/* ------------------------------------------------------------------ */

function Prompt() {
  return (
    <span className="text-primary shrink-0 font-mono select-none">
      <span className="hidden md:inline">visitor@justindavid.dev</span>
      <span className="md:hidden">~</span>
      <span className="text-muted-foreground">:~$</span>
    </span>
  );
}

function Cursor({ animate }: { animate: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-primary ml-0.5 inline-block",
        animate && "animate-blink",
      )}
    >
      █
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Chrome — the framed window                                        */
/* ------------------------------------------------------------------ */

export function TerminalChrome({
  title = "visitor@justindavid.dev — zsh",
  badge,
  glow = "var(--primary)",
  children,
  className,
}: {
  title?: string;
  badge?: string;
  /** Any CSS color. Pass `var(--destructive)` for the error page. */
  glow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate w-full", className)}>
      {/* Ambient glow behind the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 65%)`,
        }}
      />

      <div className="border-border bg-card transform-gpu overflow-hidden rounded-2xl border shadow-2xl">
        {/* Title bar */}
        <div className="border-border/70 bg-card/80 flex items-center gap-3 border-b px-4 py-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <p className="text-muted-foreground flex-1 truncate text-center font-mono text-xs">
            {title}
          </p>

          {badge ? (
            <span className="border-border bg-background/60 text-muted-foreground hidden shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase sm:inline-block">
              {badge}
            </span>
          ) : (
            <span className="w-12 shrink-0" aria-hidden />
          )}
        </div>

        {/* Body */}
        <div className="overflow-x-auto">
          <div className="min-h-[260px] p-5 font-mono text-sm leading-relaxed sm:p-7 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Session — the typewriter                                          */
/* ------------------------------------------------------------------ */

export function TerminalSession({
  lines,
  onComplete,
  className,
}: {
  lines: TerminalLine[];
  onComplete?: () => void;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  /* Keep the callback fresh without touching it during render. */
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /*
   * `effectiveLineIndex` is what we render. Reduced-motion shows the
   * whole session instantly — derived, not stored.
   */
  const effectiveLineIndex = reduced ? lines.length : lineIndex;
  const done = effectiveLineIndex >= lines.length;

  /* Fire the completion callback exactly once. */
  useEffect(() => {
    if (done) onCompleteRef.current?.();
  }, [done]);

  /* Typing loop — bails out when motion is disabled or already done. */
  useEffect(() => {
    if (reduced || done) return;

    const line = lines[lineIndex];
    const speed = line.speed ?? 28;

    /* Instant lines: pause, then advance. */
    if (line.instant) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, line.delay ?? 120);
      return () => clearTimeout(t);
    }

    /* Still typing this line? Advance one character. */
    if (charIndex < line.text.length) {
      const jitter = Math.random() * 14; // human-ish rhythm
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed + jitter);
      return () => clearTimeout(t);
    }

    /* Line is done — pause, then advance. */
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, line.delay ?? 180);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, lines, reduced, done]);

  return (
    <div className={cn("space-y-0.5", className)}>
      {/* Completed lines */}
      {lines.slice(0, effectiveLineIndex).map((line, i) => (
        <LineRow key={i} line={line} text={line.text} />
      ))}

      {/* The line currently being typed */}
      {!done && !lines[effectiveLineIndex].instant && (
        <LineRow
          line={lines[effectiveLineIndex]}
          text={lines[effectiveLineIndex].text.slice(0, charIndex)}
          cursor
          animateCursor={!reduced}
        />
      )}

      {/* Trailing prompt once everything has finished */}
      {done && (
        <div className="flex gap-2 whitespace-pre sm:gap-3">
          <Prompt />
          <Cursor animate={!reduced} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  One line                                                          */
/* ------------------------------------------------------------------ */

function LineRow({
  line,
  text,
  cursor,
  animateCursor,
}: {
  line: TerminalLine;
  text: string;
  cursor?: boolean;
  animateCursor?: boolean;
}) {
  if (line.prompt) {
    return (
      <div className="flex gap-2 whitespace-pre sm:gap-3">
        <Prompt />
        <span className="min-w-0">
          <span className={cn("whitespace-pre", line.className)}>{text}</span>
          {cursor && <Cursor animate={!!animateCursor} />}
        </span>
      </div>
    );
  }

  return (
    <div className="whitespace-pre">
      <span className={cn(line.className)}>{text}</span>
      {cursor && <Cursor animate={!!animateCursor} />}
    </div>
  );
}