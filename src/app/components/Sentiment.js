"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const sentimentStyles = {
  Positive:
    "text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
  Mixed:
    "text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
  Negative:
    "text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
};

export default function Sentiment({ summary, sentiment = "Mixed" }) {
  const activeStyle = sentimentStyles[sentiment] || sentimentStyles.Mixed;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="w-full py-16 px-4 md:px-0"
    >
      <div className="w-full mx-auto space-y-10">
        {/* HEADER: Clean Labeling */}
        <div className="flex items-center gap-4">
          <div
            className={`h-2 w-2 rounded-full bg-current ${activeStyle.split(" ")[0]}`}
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
            Consensus Analysis
          </span>
          <div className="flex-1 h-[1px] bg-zinc-100 dark:bg-zinc-800" />
        </div>

        {/* MAIN CONTENT: High-Contrast Typography */}
        <div className="relative group">
          <Quote
            className="absolute -left-8 -top-4 opacity-[0.05] dark:opacity-[0.08] text-zinc-900 dark:text-white"
            size={80}
            strokeWidth={1}
          />

          <h3 className="text-3xl md:text-5xl font-medium leading-[1.2] tracking-tighter text-zinc-900 dark:text-zinc-400">
            {summary}
          </h3>
        </div>

        {/* FOOTER: Subdued Metadata */}
        <div className="flex flex-wrap items-center gap-8 pt-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">
              Reception
            </span>
            <span
              className={`text-sm font-semibold ${activeStyle.split(" ")[0]}`}
            >
              {sentiment}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-zinc-100 dark:bg-zinc-800 hidden sm:block" />

          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">
              Source
            </span>
            <span className="text-sm font-medium text-zinc-500">
              Global Review Aggregate
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
