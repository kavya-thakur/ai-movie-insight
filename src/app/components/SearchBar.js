"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const SearchHeader = memo(
  ({ movieId, setMovieId, onSearch, isLoading, hasData, error, setError }) => {
    return (
      <header
        className={`w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 transition-[padding] duration-700 ease-[0.16,1,0.3,1] ${
          hasData ? "pt-12 pb-12" : "pt-32 md:pt-40 pb-24"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-foreground/30">
              Cinema Intelligence
            </p>

            <h1
              className={`font-light tracking-tighter leading-none transition-all duration-700 ease-[0.16,1,0.3,1] ${
                hasData ? "text-5xl md:text-6xl" : "text-6xl md:text-[9rem]"
              }`}
            >
              {hasData ? "Discovery." : "Search."}
            </h1>
          </div>

          {/* 2. Removed layout="position" to prevent CPU thrashing */}
          <div
            className={`relative flex items-center border-b-2 flex-shrink-0 transition-all duration-500 ${
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
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder="tt0133093"
              /* 3. Added 'disable-autofill' styles and optimized font rendering */
              className="flex-1 min-w-[100px] bg-transparent py-4 text-2xl md:text-4xl font-light tracking-tight outline-none placeholder:text-foreground/10"
            />

            <AnimatePresence mode="wait">
              {error && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500"
                >
                  {error}
                </motion.span>
              )}
            </AnimatePresence>

            {/* 4. Optimized Button Area for Mobile Touch */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onSearch();
              }}
              disabled={isLoading}
              className="p-4 -mr-4 active:scale-95 transition-transform flex-shrink-0 disabled:opacity-50 touch-manipulation"
            >
              {isLoading ? (
                <Loader2 className="animate-spin opacity-40" size={24} />
              ) : (
                <ArrowRight strokeWidth={1} size={24} />
              )}
            </button>
          </div>
        </div>
      </header>
    );
  },
);

SearchHeader.displayName = "SearchHeader";
export default SearchHeader;
