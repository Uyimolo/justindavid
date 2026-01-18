import React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
};

const Heading1 = ({ children, className, underline }: HeadingProps) => (
  <div className="">
    <h1
      className={cn(
        "text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h1>

    {underline && <div className="w-40 max-w-1/2 h-2 rounded bg-blue" />}
  </div>
);

const Heading2 = ({ children, className, underline }: HeadingProps) => (
  <div className="">
    <h2
      className={cn(
        "lg:text-4xl text-2xl md:text-3xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h2>

    {underline && <div className="w-40 max-w-1/2 h-2 rounded bg-blue" />}
  </div>
);

const Heading3 = ({ children, className }: HeadingProps) => (
  <h3
    className={cn(
      "lg:text-3xl text-xl md:text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph = ({ children, className }: ParagraphProps) => (
  <p
    className={cn(
      "text-lg leading-relaxed text-poppins text-gray-700 dark:text-gray-400",
      className
    )}
  >
    {children}
  </p>
);

export { Heading1, Heading2, Heading3, Paragraph };
