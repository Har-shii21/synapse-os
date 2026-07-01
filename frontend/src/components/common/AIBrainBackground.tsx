"use client";

import { motion } from "framer-motion";

const nodes = [
  { top: "10%", left: "20%" },
  { top: "25%", left: "70%" },
  { top: "45%", left: "35%" },
  { top: "60%", left: "80%" },
  { top: "75%", left: "15%" },
  { top: "85%", left: "55%" },
  { top: "35%", left: "90%" },
  { top: "15%", left: "50%" },
];

export default function AIBrainBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute h-3 w-3 rounded-full bg-violet-400/70"
          style={{
            top: node.top,
            left: node.left,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-blue-900/20" />
    </div>
  );
}