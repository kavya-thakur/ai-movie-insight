"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  const breathe = {
    animate: { opacity: [0.04, 0.1, 0.04] },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        {/* 1. THE VISUAL ANCHOR */}
        <div className="lg:col-span-5">
          <motion.div
            {...breathe}
            className="aspect-[2/3] w-full bg-foreground/10 rounded-none border border-foreground/5"
          />
        </div>

        {/* 2. THE TYPOGRAPHIC STRUCTURE */}
        <div className="lg:col-span-7 flex flex-col justify-between py-2">
          <div className="space-y-20">
            {/* Title: Using thin lines to represent high-end light typography */}
            <div className="space-y-8">
              <div className="space-y-3">
                <motion.div
                  {...breathe}
                  className="h-[2px] w-full bg-foreground"
                />
                <motion.div
                  {...breathe}
                  className="h-[2px] w-4/5 bg-foreground"
                />
              </div>

              <div className="flex gap-10">
                <motion.div
                  {...breathe}
                  className="h-2 w-12 bg-foreground/20"
                />
                <motion.div
                  {...breathe}
                  className="h-2 w-12 bg-foreground/20"
                />
                <motion.div
                  {...breathe}
                  className="h-2 w-12 bg-foreground/20"
                />
              </div>
            </div>

            {/* AI Insight: Editorial Block */}
            <div className="pt-16 border-t border-foreground/5 space-y-10">
              <motion.div {...breathe} className="h-3 w-32 bg-foreground/10" />
              <div className="space-y-5">
                <motion.div
                  {...breathe}
                  className="h-[1px] w-full bg-foreground/40"
                />
                <motion.div
                  {...breathe}
                  className="h-[1px] w-full bg-foreground/40"
                />
                <motion.div
                  {...breathe}
                  className="h-[1px] w-2/3 bg-foreground/40"
                />
              </div>
            </div>
          </div>

          {/* Personnel Footer */}
          <div className="mt-24 grid grid-cols-2 gap-12 pt-12 border-t border-foreground/5">
            <div className="space-y-4">
              <motion.div
                {...breathe}
                className="h-[1px] w-8 bg-foreground/20"
              />
              <motion.div {...breathe} className="h-3 w-24 bg-foreground/10" />
            </div>
            <div className="space-y-4">
              <motion.div
                {...breathe}
                className="h-[1px] w-8 bg-foreground/20"
              />
              <motion.div {...breathe} className="h-3 w-32 bg-foreground/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
