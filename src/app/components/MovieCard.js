"use client";

import { motion } from "framer-motion";
import { Star, Users, Clapperboard, Timer } from "lucide-react";

export default function MovieCard({ movie }) {
  const fadeInBlur = {
    initial: { filter: "blur(20px)", opacity: 0, y: 30 },
    animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full group flex flex-col lg:flex-row gap-16 items-start py-12"
    >
      {/* 1. AMBIENT BACKGROUND GLOW (The "Pro" Secret) */}
      <div className="absolute -left-20 top-0 w-[500px] h-[500px] bg-foreground/[0.03] blur-[150px] -z-10 rounded-full transition-colors duration-1000" />

      {/* 2. THE POSTER: Cinematic Frame */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative shrink-0 w-full max-w-[340px] aspect-[2/3] rounded-[8px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)]"
      >
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.5 }}
          src={
            movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/400/600"
          }
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      </motion.div>

      {/* 3. THE CONTENT: High-End Typography */}
      <div className="flex-1 space-y-10">
        {/* HEADER AREA */}
        <motion.div
          variants={fadeInBlur}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2, duration: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.5em] font-black text-foreground/30">
            <span className="flex items-center gap-1.5">
              <Clapperboard size={10} /> {movie.Type}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/10" />
            <span className="flex items-center gap-1.5">
              <Star size={10} className="text-amber-500 fill-amber-500/20" />{" "}
              {movie.imdbRating} INDEX
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.85] italic">
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

        {/* METRICS GRID: Floating Data Points */}
        <motion.div
          variants={fadeInBlur}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4, duration: 1 }}
          className="grid grid-cols-3 gap-1 border-y border-foreground/5"
        >
          {[
            { label: "Released", val: movie.Year },
            { label: "Runtime", val: movie.Runtime },
            { label: "Rating", val: `${movie.imdbRating}/10` },
          ].map((item, idx) => (
            <div
              key={idx}
              className="py-6 group/item hover:bg-foreground/[0.01] transition-colors text-center border-r border-foreground/5 last:border-r-0"
            >
              <p className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                {item.label}
              </p>
              <p className="text-sm font-mono tracking-tighter">{item.val}</p>
            </div>
          ))}
        </motion.div>

        {/* SYNOPSIS & ACTORS */}
        <motion.div
          variants={fadeInBlur}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6, duration: 1 }}
          className="grid md:grid-cols-5 gap-8"
        >
          <div className="md:col-span-3">
            <p className="text-xl text-foreground/80 font-light leading-relaxed tracking-tight">
              {movie.Plot}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 pt-1 border-l border-foreground/5 pl-8">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-foreground/40">
              <Users size={12} /> Personnel
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium italic">
              {movie.Actors}
            </p>
            <div className="pt-2 text-[8px] uppercase tracking-widest text-foreground/20">
              Director: {movie.Director}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
