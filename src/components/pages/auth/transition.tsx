"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Transition({ children }: { children: ReactNode }) {
  return <motion.div className="transition">{children}</motion.div>;
}
