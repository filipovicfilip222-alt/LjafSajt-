"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const amongusImages = [
  "/amonguscovek1.png",
  "/amonguscovek2.png",
];

export default function Snowflakes() {
  const snowflakes = useMemo(() => {
    // 60 običnih pahuljica, 10 amongus likova
    const flakes = Array.from({ length: 70 }, (_, i) => {
      const duration = 10 + Math.random() * 10;
      // Svaka 7. pahuljica je amongus lik
      const isAmongus = i % 7 === 0;
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: duration,
        size: isAmongus ? 32 + Math.random() * 24 : 4 + Math.random() * 8,
        opacity: isAmongus ? 1 : 0.4 + Math.random() * 0.6,
        amongus: isAmongus ? amongusImages[Math.floor(Math.random() * amongusImages.length)] : null,
      };
    });
    return flakes;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {snowflakes.map((snowflake) => (
        snowflake.amongus ? (
          <motion.img
            key={snowflake.id}
            src={snowflake.amongus}
            alt="amongus"
            className="absolute select-none"
            style={{
              top: `${snowflake.left}%`,
              width: `${snowflake.size}px`,
              height: `${snowflake.size}px`,
              pointerEvents: "none",
              userSelect: "none",
            }}
            initial={{
              left: "-10vw",
              opacity: 0,
              rotate: 0, // Početna rotacija
            }}
            animate={{
              left: "110vw",
              opacity: [0, snowflake.opacity, snowflake.opacity, 0],
              y: Math.sin(snowflake.id) * 50,
              rotate: -720, // <--- OVO DODAJE ROTACIJU SUPROTNO OD KAZALJKE
            }}
            transition={{
              duration: snowflake.duration,
              delay: snowflake.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            draggable={false}
          />
        ) : (
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
        )
      ))}
    </div>
  );
}