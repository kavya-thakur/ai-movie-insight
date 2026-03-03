"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ErrorState({ message, retry }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center"
    >
      <div className="space-y-8 max-w-xl">
        {/* 1. THE CODE: High-end metadata look */}
        <div className="inline-flex items-center gap-4 px-3 py-1 border border-foreground/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            Error Protocol 404
          </span>
        </div>

        {/* 2. THE TYPOGRAPHY: Hero Error Message */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-light tracking-tightest leading-none italic">
            Registry{" "}
            <span className="font-serif opacity-20 not-italic">Error.</span>
          </h2>
          <p className="text-lg md:text-xl font-light opacity-40 tracking-tight leading-relaxed">
            {message ||
              "The requested film identifier could not be retrieved from the global archive."}
          </p>
        </div>

        {/* 3. THE ACTION: Editorial Link Style */}
        <div className="pt-8">
          <button
            onClick={retry}
            className="group flex items-center gap-4 mx-auto text-[11px] font-bold uppercase tracking-[0.4em] transition-opacity hover:opacity-60"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform group-hover:-translate-x-2"
              strokeWidth={1.5}
            />
            Return to Discovery
          </button>
        </div>
      </div>

      {/* 4. FOOTER CONTEXT */}
      <div className="absolute bottom-12 text-[9px] uppercase tracking-[0.3em] font-medium opacity-10">
        System Node: Archive-LHR-01
      </div>
    </motion.div>
  );
}
