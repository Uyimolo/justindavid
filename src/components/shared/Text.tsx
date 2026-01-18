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
        "text-3xl font-bold tracking-tight md:text-4xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>

    {underline && <div className="bg-blue h-2 w-40 max-w-1/2 rounded" />}
  </div>
);

const Heading2 = ({ children, className, underline }: HeadingProps) => (
  <div className="">
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl",
        className,
      )}
    >
      {children}
    </h2>

    {underline && <div className="bg-blue h-2 w-40 max-w-1/2 rounded" />}
  </div>
);

const Heading3 = ({ children, className }: HeadingProps) => (
  <h3
    className={cn(
      "text-xl font-semibold tracking-tight md:text-2xl lg:text-3xl",
      className,
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
      "text-poppins text-lg leading-relaxed text-gray-700 dark:text-gray-400",
      className,
    )}
  >
    {children}
  </p>
);

export { Heading1, Heading2, Heading3, Paragraph };
