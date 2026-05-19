"use client";

import { motion } from "framer-motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({
  children,
}: PageTransitionProps) {

  return (
    <motion.div

      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      exit={{
        opacity: 0,
        y: -20,
        scale: 0.98,
      }}

      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}