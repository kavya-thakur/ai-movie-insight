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
//       // requestAnimationFrame prevents "over-firing" the movement
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

//     // 1. IMMEDIATE RESET: Clear previous results and errors the moment the button is clicked
//     setError("");

//     // 2. VALIDATION: Check if empty
//     if (!cleanId) {
//       setData(null); // Clear the old movie so it doesn't stay on screen
//       setError("Entry Required");
//       return;
//     }

//     // 3. VALIDATION: Check IMDb format
//     if (!/^tt\d+/.test(cleanId)) {
//       setData(null); // Clear the old movie so it doesn't stay on screen
//       setError("Invalid ID (use tt0000000)");
//       return;
//     }

//     // --- Proceed only if validation passes ---
//     setLoading(true);
//     setData(null); // Ensure the stage is empty for the new movie

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
//   // Change this line in your Page function
//   const hasData = (!!data || loading) && !error;

//   return (
//     <main
//       className={`relative min-h-screen bg-background text-foreground selection:bg-foreground/10 overflow-x-hidden ${
//         !hasData ? "h-screen overflow-hidden" : "overflow-y-auto"
//       }`}
//     >
//       <Navbar />

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

//       <div className="mx-auto max-w-7xl px-8 relative overflow-x-hidden">
//         <div
//           className={`flex flex-col transition-all duration-[1200ms] ease-[0.16,1,0.3,1] ${
//             !hasData ? "pt-[14vh] md:pt-[24vh]" : "pt-20"
//           }`}
//         >
//           {/* HEADER & HERO SECTION */}
//           <motion.div
//             layout
//             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//             className={`flex flex-col w-full ${hasData ? "md:flex-row md:items-center md:justify-between gap-8" : "items-center"}`}
//           >
//             <AnimatePresence mode="popLayout">
//               {!hasData ? (
//                 <motion.div
//                   key="hero-text"
//                   className="text-center mb-4 pointer-events-none"
//                 >
//                   <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tightest leading-none">
//                     {/* Cinema - Slided up from mask */}
//                     <div className="inline-block overflow-hidden align-bottom py-1">
//                       <motion.span
//                         initial={{ y: "100%", filter: "blur(10px)" }}
//                         animate={{ y: 0, filter: "blur(0px)" }}
//                         transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
//                         className="inline-block"
//                       >
//                         Cinema
//                       </motion.span>
//                     </div>{" "}
//                     {/* Intel - Blurs in gracefully next to it */}
//                     <motion.span
//                       initial={{ opacity: 0, filter: "blur(20px)" }}
//                       animate={{ opacity: 0.4, filter: "blur(0px)" }}
//                       transition={{
//                         duration: 0.9,
//                         delay: 0.4,
//                         ease: "easeOut",
//                       }}
//                       className="font-serif italic inline-block"
//                     >
//                       Intel.
//                     </motion.span>
//                   </h1>

//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1, delay: 1 }}
//                     className="mt-8 flex flex-col items-center gap-6"
//                   >
//                     <div className="h-px w-16 bg-foreground/10" />
//                     <p className="text-[10px] uppercase tracking-[0.8em] font-medium opacity-70">
//                       Registry Access • AI Audience Synthesis
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="active-title"
//                   initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
//                   animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                   transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

//             <motion.div
//               layout
//               className={`w-full transition-all ease-[0.16,1,0.3,1] ${
//                 hasData ? "max-w-2xl md:max-w-xl" : "max-w-2xl"
//               }`}
//             >
//               <div className="w-full flex justify-end">
//                 {" "}
//                 <SearchBar
//                   movieId={movieId}
//                   setMovieId={setMovieId}
//                   onSearch={handleSearch}
//                   isLoading={loading}
//                   hasData={hasData}
//                   error={error}
//                   setError={setError}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* CONTENT STAGE */}
//           <div
//             className={`transition-all ${hasData ? "mt-10 opacity-100" : "mt-0 opacity-0 pointer-events-none"}`}
//           >
//             <AnimatePresence mode="wait">
//               {showSkeleton && (
//                 <motion.div
//                   key="skeleton"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <LoadingSkeleton />
//                 </motion.div>
//               )}

//               {error && !loading && (
//                 <ErrorState key="error" message={error} retry={handleSearch} />
//               )}

//               {data && !loading && (
//                 <motion.div
//                   key="results"
//                   initial={{ opacity: 0, filter: "blur(30px)", y: 60 }}
//                   animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                   transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//                   className="space-y-20 pb-20"
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

import { useState, useEffect } from "react";
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
import ErrorState from "./components/ErrorState";

export default function Page() {
  const [movieId, setMovieId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    let frameId;
    const handleMouseMove = (e) => {
      frameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  const handleSearch = async () => {
    const cleanId = movieId.trim();
    setError("");
    if (!cleanId) {
      setData(null);
      setError("Entry Required");
      return;
    }
    if (!/^tt\d+/.test(cleanId)) {
      setData(null);
      setError("Invalid ID (use tt0000000)");
      return;
    }

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
      setData(null);
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  const hasData = (!!data || loading) && !error;

  return (
    // FIX: Removed 'h-screen overflow-hidden' logic.
    // Allowing the body to be naturally scrollable prevents the "stuck" mobile bug.
    <main className="relative min-h-screen bg-background text-foreground selection:bg-foreground/10 overflow-x-hidden">
      <Navbar />

      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden h-screen w-screen">
        <motion.div
          style={{
            left: springX,
            top: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="hidden md:block absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-foreground/[0.03] blur-[120px] rounded-full will-change-transform"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full bg-gradient-to-b from-foreground/[0.02] to-transparent blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8 relative">
        {/* FIX: Reduced transition duration to 700ms. 1200ms causes "heavy" lag on mobile GPUs */}
        <div
          className={`flex flex-col transition-all duration-700 ease-[0.16,1,0.3,1] ${
            !hasData ? "pt-[20vh] md:pt-[24vh]" : "pt-20"
          }`}
        >
          {/* HEADER & HERO SECTION */}
          <motion.div
            layout="position"
            className={`flex flex-col w-full ${hasData ? "md:flex-row md:items-center md:justify-between gap-8" : "items-center"}`}
          >
            <AnimatePresence mode="popLayout">
              {!hasData ? (
                <motion.div
                  key="hero-text"
                  className="text-center mb-4 pointer-events-none"
                >
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tightest leading-none">
                    <div className="inline-block overflow-hidden align-bottom py-1">
                      <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        Cinema
                      </motion.span>
                    </div>{" "}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      className="font-serif italic inline-block"
                    >
                      Intel.
                    </motion.span>
                  </h1>
                </motion.div>
              ) : (
                <motion.div
                  key="active-title"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 md:mb-0"
                >
                  <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-10 mb-1">
                    Intelligence Result
                  </p>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tighter italic leading-none">
                    Archive.
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className={`w-full ${hasData ? "max-w-2xl md:max-w-xl" : "max-w-2xl"}`}
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
          </motion.div>

          <div
            className={`w-full relative ${
              hasData
                ? " mt-0 md:mt-10 opacity-100"
                : "mt-0 opacity-0 pointer-events-none"
            }`}
            style={{ minHeight: hasData ? "auto" : "0px" }}
          >
            <AnimatePresence mode="wait">
              {data && !loading && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="overflow-visible"
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
      </div>
    </main>
  );
}
