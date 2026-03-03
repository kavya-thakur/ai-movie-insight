"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function SearchHeader({
  movieId,
  setMovieId,
  onSearch,
  isLoading,
  hasData,
  error,
  setError,
}) {
  return (
    <motion.header
      layout
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-7xl mx-auto px-12 relative z-10 ${
        hasData ? "pt-12 pb-12" : "pt-40 pb-24"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-foreground/30">
            Cinema Intelligence
          </p>

          <motion.h1
            layout="position"
            className={`font-light tracking-tighter leading-none ${
              hasData ? "text-5xl md:text-6xl" : "text-7xl md:text-[9rem]"
            }`}
          >
            {hasData ? "Discovery." : "Search."}
          </motion.h1>
        </div>

        <motion.div
          layout="position"
          className={`relative flex items-center border-b-2 transition-all duration-700 flex-shrink-0 ${
            error
              ? "border-red-500/50"
              : hasData
                ? "w-full md:w-1/2 border-foreground/10"
                : "w-full md:w-1/2 border-foreground/5"
          }`}
        >
          <input
            value={movieId}
            onChange={(e) => {
              setMovieId(e.target.value);
              if (error) setError(""); // Clears error as you type
            }}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="tt0133093"
            className="flex-1 min-w-[100px] bg-transparent py-4 text-2xl md:text-4xl font-light tracking-tight outline-none placeholder:text-foreground/[0.03]"
          />

          {/* Validation Message: Absolute positioning ensures it doesn't break layout */}
          <AnimatePresence>
            {error && (
              <motion.span
                initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500"
              >
                {error}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={onSearch}
            className="p-2 transition-transform hover:translate-x-1 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="animate-spin opacity-20" />
            ) : (
              <ArrowRight strokeWidth={1} />
            )}
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
}
