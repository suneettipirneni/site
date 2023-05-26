"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Client wraps any client/rsc components with AnimatePresence
export default function Client({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 100, scaleX: 0.9 }}
        animate={{ opacity: 1, y: 0, scaleX: 1 }}
        exit={{ opacity: 0, y: 100, scaleX: 0.9 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
