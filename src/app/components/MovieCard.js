// "use client";

// import { motion } from "framer-motion";
// import { Star, Users, Clapperboard, Timer } from "lucide-react";

// export default function MovieCard({ movie }) {
//   const fadeInBlur = {
//     initial: { filter: "blur(20px)", opacity: 0, y: 30 },
//     animate: { filter: "blur(0px)", opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative w-full group flex flex-col lg:flex-row gap-16 items-start py-12"
//     >
//       <div className="absolute -left-20 top-0 w-[500px] h-[500px] bg-foreground/[0.03] blur-[150px] -z-10 rounded-full " />

//       {/* 2. THE POSTER: Cinematic Frame */}
//       <motion.div
//         initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
//         animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
//         transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//         className="relative shrink-0 w-full max-w-[340px] aspect-[2/3] rounded-[8px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)]"
//       >
//         <motion.img
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 1.5 }}
//           src={
//             movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/400/600"
//           }
//           alt={movie.Title}
//           className="w-full h-full object-cover"
//         />
//         {/* Subtle Scanline Overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
//       </motion.div>

//       {/* 3. THE CONTENT: High-End Typography */}
//       <div className="flex-1 space-y-10">
//         {/* HEADER AREA */}
//         <motion.div
//           variants={fadeInBlur}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.2, duration: 1 }}
//           className="space-y-4"
//         >
//           <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.5em] font-black text-foreground/30">
//             <span className="flex items-center gap-1.5">
//               <Clapperboard size={10} /> {movie.Type}
//             </span>
//             <span className="w-1 h-1 rounded-full bg-foreground/10" />
//             <span className="flex items-center gap-1.5">
//               <Star size={10} className="text-amber-500 fill-amber-500/20" />{" "}
//               {movie.imdbRating} INDEX
//             </span>
//           </div>

//           <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.85] italic">
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

//         {/* METRICS GRID: Floating Data Points */}
//         <motion.div
//           variants={fadeInBlur}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.4, duration: 1 }}
//           className="grid grid-cols-3 gap-1 border-y border-foreground/5"
//         >
//           {[
//             { label: "Released", val: movie.Year },
//             { label: "Runtime", val: movie.Runtime },
//             { label: "Rating", val: `${movie.imdbRating}/10` },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="py-6 group/item hover:bg-foreground/[0.01] transition-colors text-center border-r border-foreground/5 last:border-r-0"
//             >
//               <p className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
//                 {item.label}
//               </p>
//               <p className="text-sm font-mono tracking-tighter">{item.val}</p>
//             </div>
//           ))}
//         </motion.div>

//         {/* SYNOPSIS & ACTORS */}
//         <motion.div
//           variants={fadeInBlur}
//           initial="initial"
//           animate="animate"
//           transition={{ delay: 0.6, duration: 1 }}
//           className="grid md:grid-cols-5 gap-8"
//         >
//           <div className="md:col-span-3">
//             <p className="text-xl text-foreground/80 font-light leading-relaxed tracking-tight">
//               {movie.Plot}
//             </p>
//           </div>

//           <div className="md:col-span-2 space-y-4 pt-1 border-l border-foreground/5 pl-8">
//             <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-foreground/40">
//               <Users size={12} /> Personnel
//             </div>
//             <p className="text-xs text-muted-foreground leading-relaxed font-medium italic">
//               {movie.Actors}
//             </p>
//             <div className="pt-2 text-[8px] uppercase tracking-widest text-foreground/20">
//               Director: {movie.Director}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { Star, Users, Clapperboard } from "lucide-react";

export default function MovieCard({ movie }) {
  // Use simple opacity/transform. Blurs and Clip-paths flicker on mobile GPUs.
  const fadeInRise = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // added 'isolate' to create a new stacking context, preventing background bleed
      className="relative w-full group flex flex-col lg:flex-row gap-12 lg:gap-16 items-start py-8 md:py-12 isolate"
    >
      {/* Background Glow: Added transform-gpu to offload to the phone's graphics chip */}
      <div className="absolute -left-10 md:-left-20 top-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-foreground/[0.03] blur-[60px] md:blur-[120px] -z-10 rounded-full transform-gpu pointer-events-none" />

      {/* 1. THE POSTER: Swapped clipPath for Scale/Opacity to stop flickering */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative shrink-0 w-full max-w-[280px] md:max-w-[340px] aspect-[2/3] rounded-[4px] overflow-hidden shadow-2xl transform-gpu"
      >
        <motion.img
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/400/600"
          }
          alt={movie.Title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* 2. THE CONTENT */}
      <div className="flex-1 space-y-8 md:space-y-10 w-full">
        {/* HEADER AREA */}
        <motion.div
          variants={fadeInRise}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.5em] font-black text-foreground/30">
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

        {/* METRICS GRID: Flattened for mobile speed */}
        <motion.div
          variants={fadeInRise}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2, duration: 0.5 }}
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
              <p className="text-[8px] uppercase tracking-[0.3em] text-foreground/40 mb-1">
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
          variants={fadeInRise}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid md:grid-cols-5 gap-8"
        >
          <div className="md:col-span-3">
            <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed tracking-tight">
              {movie.Plot}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-foreground/5 md:pl-8">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-foreground/40">
              <Users size={12} /> Personnel
            </div>
            <p className="text-xs text-foreground/60 leading-relaxed font-medium italic">
              {movie.Actors}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
