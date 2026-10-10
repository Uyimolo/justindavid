"use client";

import { useEffect, useRef, useState } from "react";
import {
  VscAccount,
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscDebugAlt,
  VscEllipsis,
  VscExtensions,
  VscFiles,
  VscSearch,
  VscSettingsGear,
  VscSourceControl,
} from "react-icons/vsc";
import { SiReact, SiTypescript } from "react-icons/si";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/src/components/shared/Terminal";

/* ------------------------------------------------------------------ */
/*  Token types                                                       */
/* ------------------------------------------------------------------ */

type TokenType =
  | "keyword"
  | "identifier"
  | "property"
  | "string"
  | "boolean"
  | "punctuation"
  | "plain";

type Token = { type: TokenType; text: string };

const k = (text: string): Token => ({ type: "keyword", text });
const id = (text: string): Token => ({ type: "identifier", text });
const prop = (text: string): Token => ({ type: "property", text });
const str = (text: string): Token => ({ type: "string", text });
const bool = (text: string): Token => ({ type: "boolean", text });
const p = (text: string): Token => ({ type: "punctuation", text });
const plain = (text: string): Token => ({ type: "plain", text });

/* ------------------------------------------------------------------ */
/*  The code that types itself out                                    */
/* ------------------------------------------------------------------ */

const CODE: Token[][] = [
  [k("const "), id("justinDavid"), p(" = {")],

  [plain("  "), prop("role"), p(": "), str('"Frontend Engineer"'), p(",")],
  [plain("  "), prop("location"), p(": "), str('"Lagos, Nigeria"'), p(",")],
  [],

  [plain("  "), prop("specialties"), p(": [")],
  [plain("    "), str('"Frontend Architecture"'), p(",")],
  [plain("    "), str('"Performance Optimization"'), p(",")],
  [plain("    "), str('"Scalable Design Systems"'), p(",")],
  [plain("  "), p("],")],
  [],

  [plain("  "), prop("stack"), p(": {")],
  [
    plain("    "), prop("core"), p(": ["),
    str('"React"'), p(", "), str('"Next.js"'), p(", "), str('"TypeScript"'),
    p("],"),
  ],
  [
    plain("    "), prop("styling"), p(": ["),
    str('"Tailwind CSS"'), p(", "), str('"Framer Motion"'), p(", "),
    str('"Styled Components"'), p("],"),
  ],
  [
    plain("    "), prop("backend"), p(": ["),
    str('"Node.js"'), p(", "), str('"PostgreSQL"'), p(", "), str('"FastAPI"'),
    p(", "), str('"Firebase"'), p(", "), str('"Prisma"'), p("],"),
  ],
  [plain("  "), p("},")],
  [],

  [plain("  "), prop("traits"), p(": [")],
  [plain("    "), str('"Pixel Perfectionist"'), p(",")],
  [plain("    "), str('"Optimization Obsessed"'), p(",")],
  [plain("    "), str('"Startup Focused"'), p(",")],
  [plain("    "), str('"Full Stack Inclined"'), p(",")],
  [plain("  "), p("],")],
  [],

  [plain("  "), prop("isHirable"), p(": "), bool("true"), p(",")],
  [],

  [plain("  "), prop("execute"), p(": () => {")],
  [plain("    "), k("return "), str('"Transforming complex ideas"')],
  [plain("      "), p("+ "), str('"into polished digital experiences."'), p(";")],
  [plain("  "), p("},")],
  [p("};")],
  [],

  [k("export default "), id("justinDavid"), p(";")],
];

const LINE_LENGTHS = CODE.map((line) =>
  line.reduce((sum, t) => sum + t.text.length, 0),
);
const LINE_STARTS: number[] = [];
{
  let acc = 0;
  for (const len of LINE_LENGTHS) {
    LINE_STARTS.push(acc);
    acc += len + 1; // +1 for the newline that follows
  }
}
const FLAT = CODE.map((line) => line.map((t) => t.text).join("")).join("\n");
const TOTAL = FLAT.length;

/* ------------------------------------------------------------------ */
/*  Syntax colors — VSCode Light+ / Dark+ flavors                     */
/* ------------------------------------------------------------------ */

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "text-blue-600 dark:text-[#569cd6]",
  identifier: "text-foreground dark:text-[#9cdcfe]",
  property: "text-sky-700 dark:text-[#9cdcfe]",
  string: "text-orange-600 dark:text-[#ce9178]",
  boolean: "text-blue-600 dark:text-[#569cd6]",
  punctuation: "text-muted-foreground dark:text-[#808080]",
  plain: "text-foreground dark:text-[#d4d4d4]",
};

/* ------------------------------------------------------------------ */
/*  Timing — a human-ish typing rhythm                                */
/* ------------------------------------------------------------------ */

function delayFor(char: string | undefined): number {
  if (!char) return 200;
  if (char === "\n") return 90 + Math.random() * 90;
  if (char === " ") return 12;
  if (/[{}()[\],;:]/.test(char)) return 40 + Math.random() * 40;
  return 22 + Math.random() * 26;
}

/* ------------------------------------------------------------------ */
/*  Render a single line of tokens up to `visible` characters         */
/* ------------------------------------------------------------------ */

function renderTokens(lineIndex: number, typed: number) {
  const line = CODE[lineIndex];
  const lineStart = LINE_STARTS[lineIndex];
  const lineLen = LINE_LENGTHS[lineIndex];
  const visible = Math.max(0, Math.min(lineLen, typed - lineStart));
  if (visible === 0) return null;

  let remaining = visible;
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < line.length; i++) {
    const token = line[i];
    const show = Math.max(0, Math.min(token.text.length, remaining));
    remaining -= token.text.length;
    if (show > 0) {
      nodes.push(
        <span key={i} className={TOKEN_CLASS[token.type]}>
          {token.text.slice(0, show)}
        </span>,
      );
    }
    if (remaining <= 0) break;
  }
  return nodes;
}

/* ------------------------------------------------------------------ */
/*  Small presentational bits                                         */
/* ------------------------------------------------------------------ */

function Tab({
  icon,
  name,
  active,
  marker,
}: {
  icon: React.ReactNode;
  name: string;
  active?: boolean;
  marker?: "M" | "U";
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 border-r border-border/60 px-3 py-1.5 font-mono text-[11px] whitespace-nowrap select-none sm:text-xs",
        active
          ? "bg-background text-foreground"
          : "text-muted-foreground hover:bg-accent/40",
      )}
    >
      {icon}
      <span>{name}</span>
      {marker && (
        <span
          className={cn(
            "text-[10px] font-semibold",
            marker === "M" ? "text-amber-500" : "text-emerald-500",
          )}
        >
          {marker}
        </span>
      )}
    </div>
  );
}

function ActivityBarIcon({
  icon,
  active,
}: {
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The main event                                                    */
/* ------------------------------------------------------------------ */

export default function CodeEditor({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  /*
   * `effectiveTyped` is what we actually render.
   * When reduced-motion is on, we show the whole file instantly —
   * derived, not stored, so we never call setState inside an effect.
   */
  const effectiveTyped = reduced ? TOTAL : typed;
  const done = effectiveTyped >= TOTAL;

  /* Typing loop — does nothing when motion is disabled or already done. */
  useEffect(() => {
    if (reduced || done) return;

    const char = FLAT[typed];
    const t = setTimeout(() => setTyped((n) => n + 1), delayFor(char));
    return () => clearTimeout(t);
  }, [typed, done, reduced]);

  /* Auto-scroll so the caret stays visible. */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [effectiveTyped]);

  /* Live cursor position for the status bar — plain derivation. */
  let cursorLine = CODE.length;
  let cursorCol = LINE_LENGTHS[LINE_LENGTHS.length - 1] + 1;
  for (let i = 0; i < LINE_STARTS.length; i++) {
    const start = LINE_STARTS[i];
    const len = LINE_LENGTHS[i];
    if (effectiveTyped <= start + len) {
      cursorLine = i + 1;
      cursorCol = effectiveTyped - start + 1;
      break;
    }
  }

  const visibleLines = reduced ? CODE.length : cursorLine;

  return (
    <div
      className={cn(
        "isolate w-full max-w-full transform-gpu overflow-hidden rounded-xl border border-border bg-card font-mono shadow-2xl",
        className,
      )}
    >
      {/* ---------------- Title bar ---------------- */}
      <div className="flex items-center gap-3 border-b border-border bg-card/60 px-3 py-2 select-none">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <div className="ml-2 hidden items-center gap-4 text-[11px] text-muted-foreground md:flex">
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <VscEllipsis className="h-3 w-3" />
        </div>

        <div className="mx-auto hidden items-center gap-2 rounded-md border border-border bg-background/70 px-3 py-1 text-[11px] text-muted-foreground md:flex md:min-w-[180px]">
          <VscSearch className="h-3 w-3" />
          <span>my-portfolio</span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 text-muted-foreground">
          <VscChromeMinimize className="h-3 w-3" />
          <VscChromeMaximize className="h-3 w-3" />
          <VscChromeClose className="h-3 w-3" />
        </div>
      </div>

      {/* ---------------- Tab bar ---------------- */}
      <div className="flex items-center overflow-x-auto border-b border-border bg-muted/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Tab icon={<SiReact className="h-3.5 w-3.5 text-[#61dafb]" />} name="Hero.tsx" />
        <Tab icon={<SiReact className="h-3.5 w-3.5 text-[#61dafb]" />} name="Footer.tsx" />
        <Tab icon={<SiReact className="h-3.5 w-3.5 text-[#61dafb]" />} name="Works.tsx" marker="M" />
        <Tab
          icon={<SiTypescript className="h-3.5 w-3.5 text-[#3178c6]" />}
          name="justindavid.ts"
          active
          marker="U"
        />
        <Tab icon={<SiReact className="h-3.5 w-3.5 text-[#61dafb]" />} name="Text.tsx" />
      </div>

      {/* ---------------- Main: activity bar + editor ---------------- */}
      <div className="flex h-[380px] sm:h-[440px]">
        {/* Activity bar */}
        <div className="flex w-11 shrink-0 flex-col items-center gap-1 border-r border-border bg-card/40 py-2">
          <ActivityBarIcon icon={<VscFiles className="h-4 w-4" />} active />
          <ActivityBarIcon icon={<VscSearch className="h-4 w-4" />} />
          <ActivityBarIcon icon={<VscSourceControl className="h-4 w-4" />} />
          <ActivityBarIcon icon={<VscDebugAlt className="h-4 w-4" />} />
          <ActivityBarIcon icon={<VscExtensions className="h-4 w-4" />} />
          <div className="mt-auto flex flex-col items-center gap-1">
            <ActivityBarIcon icon={<VscAccount className="h-4 w-4" />} />
            <ActivityBarIcon icon={<VscSettingsGear className="h-4 w-4" />} />
          </div>
        </div>

        {/* Editor */}
        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-x-auto overflow-y-auto py-3 pr-6 text-[12px] leading-[1.65] sm:text-[13px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CODE.slice(0, visibleLines).map((_, i) => {
            const isCurrentLine = cursorLine === i + 1;
            const showCaret = isCurrentLine && !reduced && !done;
            return (
              <div key={i} className="flex">
                <span className="w-9 shrink-0 pr-3 text-right text-muted-foreground/50 tabular-nums select-none">
                  {i + 1}
                </span>
                <span className="min-w-0 whitespace-pre">
                  {renderTokens(i, effectiveTyped)}
                  {showCaret && (
                    <span
                      aria-hidden
                      className="animate-blink ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-foreground align-middle"
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- Status bar ---------------- */}
      <div className="flex items-center gap-3 border-t border-border bg-muted/30 px-3 py-1 font-mono text-[10px] text-muted-foreground select-none">
        <span className="flex items-center gap-1">
          <VscSourceControl className="h-3 w-3" />
          main*
        </span>
        <span className="hidden sm:inline">✓ 0</span>
        <span className="hidden sm:inline">⚠ 0</span>
        <span className="ml-auto flex items-center gap-3">
          <span>
            Ln {cursorLine}, Col {cursorCol}
          </span>
          <span className="hidden md:inline">Spaces: 4</span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="hidden lg:inline">CRLF</span>
          <span className="hidden sm:inline">{"{ }"} TypeScript</span>
          <span className={cn(done ? "text-emerald-500" : "text-primary")}>
            {done ? "✓ Ready" : "⋯ Typing"}
          </span>
        </span>
      </div>
    </div>
  );
}