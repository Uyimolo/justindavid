import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/shared/Header";
import { cn } from "@/lib/utils";

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
      <body
        className={cn(
          "font-sans bg-grey-200 dark:bg-white min-h-screen px-5 py-10 md:px-10 lg:px-20",
          poppins.variable,
          firaCode.variable
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
