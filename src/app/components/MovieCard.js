// "use client";

// import { motion } from "framer-motion";
// import { Star, Users, Clapperboard } from "lucide-react";

// export default function MovieCard({ movie }) {
//   const fadeInRise = {
//     initial: { opacity: 0, y: 15 },
//     animate: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative w-full group flex flex-col lg:flex-row gap-12 lg:gap-16 items-start py-2 isolate"
//     >
//       <div className="absolute -left-10 md:-left-20 top-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-foreground/[0.03] blur-[60px] md:blur-[120px] -z-10 rounded-full transform-gpu pointer-events-none" />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         className="relative shrink-0 w-full max-w-[280px] md:max-w-[340px] aspect-[2/3] rounded-[4px] overflow-hidden shadow-2xl transform-gpu"
//       >
//         <motion.img
//           src={
//             movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/400/600"
//           }
//           alt={movie.Title}
//           className="w-full h-full object-cover"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
//       </motion.div>

//       {/* 2. THE CONTENT */}
//       <div className="flex-1 space-y-8 md:space-y-10 w-full">
//         {/* HEADER AREA */}
//         <motion.div
//           variants={fadeInRise}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="space-y-4"
//         >
//           <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.5em] font-black text-foreground/30">
//             <span className="flex items-center gap-1.5">
//               <Clapperboard size={10} /> {movie.Type}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Star size={10} className="text-amber-500 fill-amber-500/20" />{" "}
//               {movie.imdbRating} INDEX
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] italic">
//             {movie.Title.split(" ").map((word, i) => (
//               <span
//                 key={i}
//                 className={
//                   i % 2 === 0
//                     ? "text-foreground"
//                     : "text-foreground/20 font-serif"
//                 }
//               >
//                 {word}{" "}
//               </span>
//             ))}
//           </h2>
//         </motion.div>

//         <motion.div
//           variants={fadeInRise}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="grid grid-cols-3 border-y border-foreground/5"
//         >
//           {[
//             { label: "Released", val: movie.Year },
//             { label: "Runtime", val: movie.Runtime },
//             { label: "Rating", val: `${movie.imdbRating}/10` },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="py-6 text-center border-r border-foreground/5 last:border-r-0"
//             >
//               <p className="text-[8px] uppercase tracking-[0.3em] text-foreground/40 mb-1">
//                 {item.label}
//               </p>
//               <p className="text-xs md:text-sm font-mono tracking-tighter">
//                 {item.val}
//               </p>
//             </div>
//           ))}
//         </motion.div>

//         {/* SYNOPSIS */}
//         <motion.div
//           variants={fadeInRise}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="grid md:grid-cols-5 gap-8"
//         >
//           <div className="md:col-span-3">
//             <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed tracking-tight">
//               {movie.Plot}
//             </p>
//           </div>

//           <div className="md:col-span-2 space-y-4 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-foreground/5 md:pl-8">
//             <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-foreground/40">
//               <Users size={12} /> Personnel
//             </div>
//             <p className="text-xs text-foreground/60 leading-relaxed font-medium italic">
//               {movie.Actors}
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { Star, Users, Clapperboard } from "lucide-react";
import { memo } from "react";

// Memoize to prevent re-renders on every scroll/typing event
const MovieCard = memo(({ movie }) => {
  // Simplified animation: removed Y-axis movement for less layout calculation
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start py-4 isolate">
      {/* 1. LIGHTER BACKGROUND AURA */}
      {/* Reduced blur and size for mobile performance. Added transform-gpu. */}
      <div className="absolute -left-10 top-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-foreground/[0.02] blur-[40px] md:blur-[100px] -z-10 rounded-full transform-gpu pointer-events-none" />

      {/* 2. THE POSTER: Removed scale animation which is heavy on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative shrink-0 w-full max-w-[240px] md:max-w-[340px] aspect-[2/3] rounded-[2px] overflow-hidden bg-foreground/5 shadow-xl transform-gpu"
      >
        <img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/400/600"
          }
          alt={movie.Title}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="eager" // Changed to eager to show up faster on results
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* 3. THE CONTENT */}
      <div className="flex-1 space-y-8 w-full">
        {/* HEADER AREA */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-black text-foreground/30">
            <span className="flex items-center gap-1.5">
              <Clapperboard size={10} /> {movie.Type}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={10} className="text-amber-500 fill-amber-500/20" />{" "}
              {movie.imdbRating} INDEX
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] italic">
            {movie.Title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i % 2 === 0
                    ? "text-foreground"
                    : "text-foreground/20 font-serif"
                }
              >
                {word}{" "}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* STATS GRID: Removed nested motion.div for each item */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 border-y border-foreground/5"
        >
          {[
            { label: "Released", val: movie.Year },
            { label: "Runtime", val: movie.Runtime },
            { label: "Rating", val: `${movie.imdbRating}/10` },
          ].map((item, idx) => (
            <div
              key={idx}
              className="py-6 text-center border-r border-foreground/5 last:border-r-0"
            >
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/40 mb-1">
                {item.label}
              </p>
              <p className="text-xs md:text-sm font-mono tracking-tighter">
                {item.val}
              </p>
            </div>
          ))}
        </motion.div>

        {/* SYNOPSIS */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-5 gap-8"
        >
          <div className="md:col-span-3">
            <p className="text-base md:text-xl text-foreground/80 font-light leading-relaxed tracking-tight">
              {movie.Plot}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-foreground/5 md:pl-8">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-black text-foreground/40">
              <Users size={12} /> Personnel
            </div>
            <p className="text-[11px] text-foreground/60 leading-relaxed font-medium italic">
              {movie.Actors}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

MovieCard.displayName = "MovieCard";
export default MovieCard;
