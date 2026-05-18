"use client";

import { motion } from "framer-motion";

type StaggerItemProps = {
  children: React.ReactNode;
};

export default function StaggerItem({
  children,
}: StaggerItemProps) {

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
        },

        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}