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
          y: 40,
          scale: 0.98,
          filter: "blur(12px)",
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}

        exit={{
          opacity: 0,
          y: -40,
          scale: 0.98,
          filter: "blur(12px)",
        }}

        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}

        className="min-h-screen will-change-transform"
      >

        {/* CINEMATIC OVERLAY */}
        <motion.div
          initial={{
            opacity: 0.15,
          }}

          animate={{
            opacity: 0,
          }}

          transition={{
            duration: 1,
          }}

          className="fixed inset-0 pointer-events-none bg-black z-[999]"
        />

        {children}

      </motion.div>

    </AnimatePresence>
  );
}