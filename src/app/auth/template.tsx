"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Transition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="fixed top-0 left-1/2 w-full h-full bg-zinc-900 z-50"
        animate={{ left: ["100%", "50%", "100%"] }}
        transition={{ ease: "backOut", duration: 1 }}
      ></motion.div>
    </AnimatePresence>
  );
}
