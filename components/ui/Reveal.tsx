"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/animations/fade";

type RevealProps = {
  children: React.ReactNode;
};

export default function Reveal({
  children,
}: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}