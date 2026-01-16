"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const navItems = ["Home", "Services", "Portfolio", "Contact"];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="p-3 flex items-center justify-between  border-black w-full relative">
      {/* Logo */}
      <Link
        href="/"
        className="relative flex w-fit items-center space-x-px text-md text-black dark:text-white"
      >
        <Logo />
        <p>Justin</p>
        <div className="aspect-square w-1 rounded-full bg-black dark:bg-white" />
        <p>David</p>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item}>
              <Link href={`#${item}`} className="hover:underline">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop CTA */}
      {/* <button className="hidden md:inline-flex py-2 rounded-lg border px-4 bg-black text-white">
        Contact me
      </button> */}

      <div className="flex gap-6 items-center">
        
      <ThemeToggle />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
        aria-label="Open menu"
      >
        <FiMenu size={22} />
      </button>
      </div>


      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed md:hidden inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full space-y-12 w-64 md:hidden bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mr-0 ml-auto"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`#${item}`}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <button className="mt-12 w-full rounded-lg border px-4 py-3 bg-black text-white">
            Contact me
          </button>
        </nav>
      </aside>
    </header>
  );
};

export default Header;
