"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[13px] font-black uppercase tracking-[0.6em] text-foreground">
            <Link href={"/"}>Insight</Link>
          </span>
        </div>

        <div className="flex items-center gap-12">
          <span className="hidden md:block text-[10px] uppercase tracking-[0.4em] opacity-20 font-bold">
            Archive Access
          </span>

          <div className="flex items-center gap-6">
            <div className="h-3 w-[1px] bg-foreground/10" />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
