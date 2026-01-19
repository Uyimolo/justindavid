import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/shared/Header";
import { cn } from "@/lib/utils";
// import FixedStarsBackground from "@/src/components/animations/FixedStarsBackground";
import Footer from "@/src/components/shared/Footer";
import StructuredData from "./components/StructuredData";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Justin David | Frontend Developer",
  description:
    "Frontend developer specializing in React, Next.js, and TypeScript. Building high-performance, accessible web applications for startups and businesses.",
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "web development",
    "Benin City",
    "Lagos",
    "Nigeria",
  ],
  authors: [
    {
      name: "Urhoghide Justin Uyioghosa",
      url: "https://justindavid.vercel.app",
    },
  ],
  creator: "Justin David",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://justindavid.vercel.app",
    title: "Justin David | Frontend Developer",
    description:
      "I design and build web interfaces that feel effortless to use",
    siteName: "Justin David Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "Justin David - Frontend Developer",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Justin David | Frontend Developer",
    description:
      "Building high-performance web interfaces with React & Next.js",
    creator: "@codefrontline",
    images: ["/twitter-image.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans",
          poppins.variable,
          firaCode.variable,
        )}
      >
        {/* <FixedStarsBackground /> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
