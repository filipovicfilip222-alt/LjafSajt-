"use client";

import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

const amongusImages = [
  "/amonguscovek1.png",
  "/amonguscovek2.png",
];

export default function Snowflakes() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const snowflakes = useMemo(() => {
    // Ultra-reduce on mobile: 10 flakes instead of 20 (85% reduction from desktop)
    const totalFlakes = isMobile ? 10 : 70;
    // Reduce Among Us ratio on mobile: 1 out of 15 instead of 1 out of 7
    const flakes = Array.from({ length: totalFlakes }, (_, i) => {
      const duration = 10 + Math.random() * 10;
      // Adjust ratio based on device
      const isAmongus = isMobile ? i % 15 === 0 : i % 7 === 0;
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
  }, [isMobile]);

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
              willChange: "transform",
            }}
            initial={{
              left: "-10vw",
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              left: "110vw",
              opacity: [0, snowflake.opacity, snowflake.opacity, 0],
              y: Math.sin(snowflake.id) * 50,
              rotate: isMobile ? 0 : -720,
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
              willChange: "transform",
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