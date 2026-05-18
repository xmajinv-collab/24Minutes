"use client";

import { motion } from "framer-motion";

type StaggerProps = {
  children: React.ReactNode;
};

export default function Stagger({
  children,
}: StaggerProps) {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {children}
    </motion.div>
  );
}