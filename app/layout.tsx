import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/shared/Header";
import { cn } from "@/lib/utils";
// import FixedStarsBackground from "@/src/components/animations/FixedStarsBackground";
import Footer from "@/src/components/shared/Footer";

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
  title: "Justindavid Web Services",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
