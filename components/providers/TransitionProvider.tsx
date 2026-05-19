"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  usePathname,
} from "next/navigation";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  return (
    <AnimatePresence
      mode="wait"
    >

      <motion.div
        key={pathname}

        initial={{
          opacity: 0,
          y: 24,
          scale: 0.985,
          filter: "blur(8px)",
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}

        exit={{
          opacity: 0,
          y: -24,
          scale: 0.985,
          filter: "blur(8px)",
        }}

        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}

        className="min-h-screen will-change-transform"
      >

        {children}

      </motion.div>

    </AnimatePresence>
  );
}