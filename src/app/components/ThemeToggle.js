// "use client";

// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);

//   if (!mounted) return <div className="w-5 h-5" />;

//   return (
//     <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="relative flex items-center justify-center w-5 h-5 focus:outline-none group"
//       aria-label="Toggle Theme"
//     >
//       <AnimatePresence mode="wait" initial={false}>
//         <motion.div
//           key={theme}
//           // Absolute zero movement. Only opacity and a microscopic scale change.
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.1 }}
//           transition={{
//             duration: 0.3,
//             ease: [0.4, 0, 0.2, 1], // Standard Material-style ease for subtle transitions
//           }}
//           className="text-foreground/40 group-hover:text-foreground transition-colors"
//         >
//           {theme === "dark" ? (
//             <Sun size={15} strokeWidth={1.2} />
//           ) : (
//             <Moon size={15} strokeWidth={1.2} />
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </button>
//   );
// }

"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Mismatch (Stops initial flicker)
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // 2. Fixed dimensions prevent the button from "collapsing" during animation
      className="relative w-8 h-8 flex items-center justify-center focus:outline-none group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          // 3. The key is what Framer Motion uses to track the change
          key={theme}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.5, rotate: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1], // Consistent with your "Cinema" easing
          }}
          // 4. ABSOLUTE is vital. It stops the icons from "pushing" each other.
          className="absolute inset-0 flex items-center justify-center text-foreground/40 group-hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun size={16} strokeWidth={1.2} />
          ) : (
            <Moon size={16} strokeWidth={1.2} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
