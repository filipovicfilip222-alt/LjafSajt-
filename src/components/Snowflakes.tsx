"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Snowflakes() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => {
      const duration = 10 + Math.random() * 10;
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: duration,
        size: 4 + Math.random() * 8,
        opacity: 0.4 + Math.random() * 0.6,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          className="absolute rounded-full"
          style={{
            top: `${snowflake.left}%`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            background: "rgba(255, 255, 255, 1)",
            boxShadow: `0 0 ${snowflake.size * 1.5}px rgba(255, 255, 255, ${snowflake.opacity})`,
            filter: "blur(0.5px)",
          }}
          initial={{
            left: "-10vw",
            opacity: 0,
          }}
          animate={{
            left: "110vw",
            opacity: [0, snowflake.opacity, snowflake.opacity, 0],
            y: Math.sin(snowflake.id) * 50,
          }}
          transition={{
            duration: snowflake.duration,
            delay: snowflake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
