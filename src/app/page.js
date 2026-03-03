// "use client";

// import { useState, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useSpring,
//   useMotionValue,
// } from "framer-motion";
// import Navbar from "./components/Navbar";
// import SearchBar from "./components/SearchBar";
// import MovieCard from "./components/MovieCard";
// import Sentiment from "./components/Sentiment";
// import LoadingSkeleton from "./components/LoadingSkeleton";
// import ErrorState from "./components/ErrorState";

// export default function Page() {
//   const [movieId, setMovieId] = useState("");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showSkeleton, setShowSkeleton] = useState(false);

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
//   const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

//   useEffect(() => {
//     let frameId;
//     const handleMouseMove = (e) => {
//       frameId = requestAnimationFrame(() => {
//         mouseX.set(e.clientX);
//         mouseY.set(e.clientY);
//       });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       cancelAnimationFrame(frameId);
//     };
//   }, [mouseX, mouseY]);

//   const handleSearch = async () => {
//     const cleanId = movieId.trim();
//     setError("");
//     if (!cleanId) {
//       setData(null);
//       setError("Entry Required");
//       return;
//     }
//     if (!/^tt\d+/.test(cleanId)) {
//       setData(null);
//       setError("Invalid ID (use tt0000000)");
//       return;
//     }

//     setLoading(true);
//     setData(null);
//     const timer = setTimeout(() => setShowSkeleton(true), 120);

//     try {
//       const res = await fetch(`/api/movie?imdbId=${cleanId}`);
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || "Registry error");
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//       setData(null);
//     } finally {
//       clearTimeout(timer);
//       setLoading(false);
//       setShowSkeleton(false);
//     }
//   };

//   const hasData = (!!data || loading) && !error;

//   return (
//     // FIX: Removed 'h-screen overflow-hidden' logic.
//     // Allowing the body to be naturally scrollable prevents the "stuck" mobile bug.
//     <main className="relative min-h-screen bg-background text-foreground selection:bg-foreground/10 overflow-x-hidden">
//       <Navbar />

//       {/* Background Layer */}
//       <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden h-screen w-screen">
//         <motion.div
//           style={{
//             left: springX,
//             top: springY,
//             translateX: "-50%",
//             translateY: "-50%",
//           }}
//           className="hidden md:block absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-foreground/[0.03] blur-[120px] rounded-full will-change-transform"
//         />
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full bg-gradient-to-b from-foreground/[0.02] to-transparent blur-[120px]" />
//       </div>

//       <div className="mx-auto max-w-7xl px-8 relative">
//         {/* FIX: Reduced transition duration to 700ms. 1200ms causes "heavy" lag on mobile GPUs */}
//         <div
//           className={`flex flex-col transition-all duration-700 ease-[0.16,1,0.3,1] ${
//             !hasData ? "pt-[20vh] md:pt-[24vh]" : "pt-20"
//           }`}
//         >
//           {/* HEADER & HERO SECTION */}
//           <motion.div
//             layout="position"
//             className={`flex flex-col w-full ${hasData ? "md:flex-row md:items-center md:justify-between gap-8" : "items-center"}`}
//           >
//             <AnimatePresence mode="popLayout">
//               {!hasData ? (
//                 <motion.div
//                   key="hero-text"
//                   className="text-center mb-4 pointer-events-none"
//                 >
//                   <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tightest leading-none">
//                     <div className="inline-block overflow-hidden align-bottom py-1">
//                       <motion.span
//                         initial={{ y: "100%" }}
//                         animate={{ y: 0 }}
//                         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//                         className="inline-block"
//                       >
//                         Cinema
//                       </motion.span>
//                     </div>{" "}
//                     <motion.span
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 0.4 }}
//                       className="font-serif italic inline-block"
//                     >
//                       Intel.
//                     </motion.span>
//                   </h1>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="active-title"
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="mb-4 md:mb-0"
//                 >
//                   <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-10 mb-1">
//                     Intelligence Result
//                   </p>
//                   <h1 className="text-4xl md:text-5xl font-light tracking-tighter italic leading-none">
//                     Archive.
//                   </h1>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div
//               className={`w-full ${hasData ? "max-w-2xl md:max-w-xl" : "max-w-2xl"}`}
//             >
//               <SearchBar
//                 movieId={movieId}
//                 setMovieId={setMovieId}
//                 onSearch={handleSearch}
//                 isLoading={loading}
//                 hasData={hasData}
//                 error={error}
//                 setError={setError}
//               />
//             </div>
//           </motion.div>

//           <div
//             className={`w-full relative ${
//               hasData
//                 ? " mt-0 md:mt-10 opacity-100"
//                 : "mt-0 opacity-0 pointer-events-none"
//             }`}
//             style={{ minHeight: hasData ? "auto" : "0px" }}
//           >
//             <AnimatePresence mode="wait">
//               {data && !loading && (
//                 <motion.div
//                   key="results"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, ease: "easeOut" }}
//                   className="overflow-visible"
//                 >
//                   <MovieCard movie={data.movie} />
//                   <Sentiment
//                     summary={data.aiSummary}
//                     sentiment={data.sentiment}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect, memo } from "react";
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
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      className="absolute w-[80vw] h-[80vw] bg-foreground/[0.03] blur-[150px] rounded-full will-change-transform"
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_90%,transparent_100%)]" />
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
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSearch = async () => {
    const cleanId = movieId.trim();
    if (!cleanId) {
      setError("Entry Required");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);
    const timer = setTimeout(() => setShowSkeleton(true), 120);

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
  };

  const hasData = (!!data || loading) && !error;

  return (
    <main
      className={`relative ${
        !hasData
          ? "h-screen overflow-hidden"
          : "min-h-screen overflow-y-auto overflow-x-hidden"
      } bg-background text-foreground`}
    >
      <BackgroundEffect springX={springX} springY={springY} />
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 relative z-10 h-full flex flex-col">
        {/* HERO & SEARCH BLOCK */}
        <div
          className={`flex flex-col transition-all duration-[1000ms] ease-[0.16,1,0.3,1] ${
            !hasData
              ? "flex-1 justify-center items-center pt-24"
              : "pt-32 mb-20"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {!hasData ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12 pointer-events-none"
              >
                <h1 className="text-[12vw] lg:text-[11rem] font-light tracking-tightest leading-[0.8] mix-blend-difference">
                  Cinema
                  <span className="block font-serif italic text-foreground/20 -mt-2 lg:-mt-4 ml-4">
                    Intel.
                  </span>
                </h1>
                <p className="mt-8 text-[9px] uppercase tracking-[1em] opacity-30 font-bold">
                  Scanning Registry...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="header-compact"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full flex items-end justify-between mb-8 border-b border-foreground/5 pb-8"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-[0.5em] opacity-20 uppercase">
                    Auth_Session: 01
                  </span>
                  <h2 className="text-5xl font-light italic tracking-tighter">
                    Archive.
                  </h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SearchBar Stays Focused */}
          <div
            className={`w-full transition-all duration-300 ${hasData ? "max-w-xl self-end" : "max-w-2xl"}`}
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

        {/* 2. SLIDING RESULTS CONTENT */}
        <div
          className={`w-full transition-all duration-1000 ${hasData ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <AnimatePresence mode="wait">
            {showSkeleton && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-20"
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {data && !loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-32"
              >
                <div className="relative group">
                  <MovieCard movie={data.movie} />
                  {/* Cinematic Viewfinder Corner */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-foreground/10 pointer-events-none" />
                </div>

                <div className="pt-20 border-t border-foreground/5">
                  <Sentiment
                    summary={data.aiSummary}
                    sentiment={data.sentiment}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Edge Decor (Fixed) */}
      <div className="fixed top-1/2 -right-4 -rotate-90 origin-center pointer-events-none hidden lg:block">
        <p className="text-[8px] font-mono uppercase tracking-[1em] opacity-10 whitespace-nowrap">
          Intelligence Synthesis Program // 2026
        </p>
      </div>
    </main>
  );
}
