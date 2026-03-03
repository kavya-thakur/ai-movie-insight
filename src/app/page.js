// "use client";

// import { useState, useEffect, memo } from "react";
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

// const BackgroundEffect = memo(({ springX, springY }) => (
//   <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//     <motion.div
//       style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
//       className="absolute w-[80vw] h-[80vw] bg-foreground/[0.03] blur-[150px] rounded-full will-change-transform"
//     />
//     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_90%,transparent_100%)]" />
//   </div>
// ));
// BackgroundEffect.displayName = "BackgroundEffect";

// export default function Page() {
//   const [movieId, setMovieId] = useState("");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showSkeleton, setShowSkeleton] = useState(false);

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
//   const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove, { passive: true });
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [mouseX, mouseY]);

//   const handleSearch = async () => {
//     const cleanId = movieId.trim();
//     if (!cleanId) {
//       setError("Entry Required");
//       return;
//     }

//     setError("");
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
//     } finally {
//       clearTimeout(timer);
//       setLoading(false);
//       setShowSkeleton(false);
//     }
//   };

//   const hasData = (!!data || loading) && !error;

//   return (
//     <main
//       className={`relative ${
//         !hasData
//           ? "h-screen overflow-hidden"
//           : "min-h-screen overflow-y-auto overflow-x-hidden"
//       } bg-background text-foreground`}
//     >
//       <BackgroundEffect springX={springX} springY={springY} />
//       <Navbar />

//       <div className="mx-auto max-w-7xl px-8 relative z-10 h-full flex flex-col">
//         {/* HERO & SEARCH BLOCK */}
//         <div
//           className={`flex flex-col  ease-[0.16,1,0.3,1] ${
//             !hasData
//               ? "flex-1 justify-center items-center pt-24"
//               : "pt-32 mb-20"
//           }`}
//         >
//           <AnimatePresence mode="popLayout">
//             {!hasData ? (
//               <motion.div
//                 key="hero"
//                 initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
//                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
//                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//                 className="text-center mb-12 pointer-events-none"
//               >
//                 <h1 className="text-[12vw] lg:text-[11rem] font-light tracking-tightest leading-[0.8] mix-blend-difference">
//                   Cinema
//                   <span className="block font-serif italic text-foreground/20 -mt-2 lg:-mt-4 ml-4">
//                     Intel.
//                   </span>
//                 </h1>
//                 <p className="mt-8 text-[9px] uppercase tracking-[1em] opacity-30 font-bold">
//                   Scanning Registry...
//                 </p>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="header-compact"
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="w-full flex items-end justify-between mb-8 border-b border-foreground/5 pb-8"
//               >
//                 <div className="space-y-1">
//                   <span className="text-[9px] font-mono tracking-[0.5em] opacity-20 uppercase">
//                     Auth_Session: 01
//                   </span>
//                   <h2 className="text-5xl font-light italic tracking-tighter">
//                     Archive.
//                   </h2>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* SearchBar Stays Focused */}
//           <div
//             className={`w-full transition-all duration-300 ${hasData ? "max-w-xl self-end" : "max-w-2xl"}`}
//           >
//             <SearchBar
//               movieId={movieId}
//               setMovieId={setMovieId}
//               onSearch={handleSearch}
//               isLoading={loading}
//               hasData={hasData}
//               error={error}
//               setError={setError}
//             />
//           </div>
//         </div>

//         {/* 2. SLIDING RESULTS CONTENT */}
//         <div
//           className={`w-full transition-all duration-1000 ${hasData ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         >
//           <AnimatePresence mode="wait">
//             {showSkeleton && (
//               <motion.div
//                 key="skeleton"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="pt-20"
//               >
//                 <LoadingSkeleton />
//               </motion.div>
//             )}

//             {data && !loading && (
//               <motion.div
//                 key="results"
//                 initial={{ opacity: 0, y: 100 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.1,
//                   ease: [0.16, 1, 0.3, 1],
//                 }}
//                 className="space-y-32"
//               >
//                 <div className="relative group">
//                   <MovieCard movie={data.movie} />
//                   {/* Cinematic Viewfinder Corner */}
//                   <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-foreground/10 pointer-events-none" />
//                 </div>

//                 <div className="pt-20 border-t border-foreground/5">
//                   <Sentiment
//                     summary={data.aiSummary}
//                     sentiment={data.sentiment}
//                   />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Edge Decor (Fixed) */}
//       <div className="fixed top-1/2 -right-4 -rotate-90 origin-center pointer-events-none hidden lg:block">
//         <p className="text-[8px] font-mono uppercase tracking-[1em] opacity-10 whitespace-nowrap">
//           Intelligence Synthesis Program // 2026
//         </p>
//       </div>
//     </main>
//   );
// }

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

// MEMOIZED BACKGROUND: Prevents re-renders during typing
const BackgroundEffect = memo(({ springX, springY }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      className="absolute w-[80vw] h-[80vw] bg-foreground/[0.03] blur-[120px] rounded-full will-change-transform"
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
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 }); // Snappier spring
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // UseCallback to prevent function recreation
  const handleSearch = useCallback(async () => {
    const cleanId = movieId.trim();
    if (!cleanId) {
      setError("Entry Required");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);
    const timer = setTimeout(() => setShowSkeleton(true), 50); // Immediate feedback

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
        {/* HERO & SEARCH BLOCK */}
        <div
          className={`flex flex-col transition-[padding,margin] duration-500 ease-[0.16,1,0.3,1] ${
            !hasData
              ? "flex-1 justify-center items-center pt-24"
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
                transition={{ duration: 0.4 }} // Faster exit
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
          className={`w-full transition-opacity duration-500 ${hasData ? "opacity-100 pb-32" : "opacity-0 pointer-events-none"}`}
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
                className="space-y-24"
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
