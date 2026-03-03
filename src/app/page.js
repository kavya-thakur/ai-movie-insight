"use client";

import { useState, useEffect, memo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Sentiment from "./components/Sentiment";
import LoadingSkeleton from "./components/LoadingSkeleton";

const BackgroundEffect = memo(({ springX, springY }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
    <motion.div
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      className="absolute w-[80vw] h-[80vw] 
                 bg-blue-400/[0.12] dark:bg-foreground/[0.06] 
                 blur-[120px] rounded-full will-change-transform transform-gpu"
    />

    <div
      className="absolute inset-0 
                    /* LIGHT MODE: Darker, defined lines (Slate-900 at 10% opacity) */
                    bg-[linear-gradient(to_right,#0f172a1a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a1a_1px,transparent_1px)] 
                    /* DARK MODE: Softer, glowing lines (White at 8% opacity) */
                    dark:bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)]
                    bg-[size:4rem_4rem] 
                    [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"
    />

    <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background/50 opacity-40 dark:opacity-20" />
  </div>
));
BackgroundEffect.displayName = "BackgroundEffect";

export default function Page() {
  const [movieId, setMovieId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSearch = useCallback(async () => {
    const cleanId = movieId.trim();
    if (!cleanId) {
      setError("Entry Required");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);
    const timer = setTimeout(() => setShowSkeleton(true), 50);

    try {
      const res = await fetch(`/api/movie?imdbId=${cleanId}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registry error");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setShowSkeleton(false);
    }
  }, [movieId]);

  const hasData = (!!data || loading) && !error;

  return (
    <main
      className={`relative transition-colors duration-200 ease-out ${
        // FAST COLOR SWITCH
        !hasData ? "h-screen overflow-hidden" : "min-h-screen overflow-y-auto"
      } bg-background text-foreground`}
    >
      <BackgroundEffect springX={springX} springY={springY} />
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 relative z-10 h-full flex flex-col">
        <div
          className={`flex flex-col transition-[padding,margin] duration-500 ease-[0.16,1,0.3,1] ${
            !hasData
              ? "flex-1 justify-center items-center pt-32"
              : "pt-24 mb-12"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {!hasData ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="text-center mb-12 pointer-events-none"
              >
                <h1 className="text-[12vw] lg:text-[11rem] font-light tracking-tightest leading-[0.8]">
                  Cinema
                  <span className="block font-serif italic text-foreground/20 -mt-2 ml-4">
                    Intel.
                  </span>
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="header-compact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full mb-6"
              >
                <h2 className="text-4xl md:text-5xl font-light italic tracking-tighter opacity-80">
                  Archive.
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`w-full transition-all duration-500 ${hasData ? "max-w-xl self-end" : "max-w-2xl"}`}
          >
            <SearchBar
              movieId={movieId}
              setMovieId={setMovieId}
              onSearch={handleSearch}
              isLoading={loading}
              hasData={hasData}
              error={error}
              setError={setError}
            />
          </div>
        </div>

        {/* RESULTS CONTENT */}
        <div
          className={`w-full transition-opacity duration-500 ${hasData ? "opacity-100 pb-4" : "opacity-0 pointer-events-none"}`}
        >
          <AnimatePresence mode="wait">
            {showSkeleton && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {data && !loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <MovieCard movie={data.movie} />
                <Sentiment
                  summary={data.aiSummary}
                  sentiment={data.sentiment}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
