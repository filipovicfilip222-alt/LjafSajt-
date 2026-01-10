"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tajmer: 1.5 sekundi ukupno
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* POZADINA (Sada sa ZOOM efektom) */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}   // Počinje normalne veličine
            animate={{ opacity: 1, scale: 1.25 }} // Raste do 1.25x (Zoom In)
            exit={{ opacity: 0, scale: 1.35 }}    // Nastavlja da raste dok nestaje
            transition={{ 
              duration: 1.5, // Zoom traje koliko i loader (sinhronizovano)
              ease: "easeOut" 
            }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* 1. SITNI PLUSIĆI - GRID */}
                <pattern
                  id="small-cross-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <g opacity="0.15">
                    <line x1="20" y1="17" x2="20" y2="23" stroke="white" strokeWidth="1" />
                    <line x1="17" y1="20" x2="23" y2="20" stroke="white" strokeWidth="1" />
                  </g>
                </pattern>

                {/* 2. KRUPNI PLUSIĆI - HIGHLIGHTS */}
                <pattern
                  id="large-cross-pattern"
                  x="0"
                  y="0"
                  width="200"
                  height="200"
                  patternUnits="userSpaceOnUse"
                >
                  <g opacity="0.5"> 
                    <line x1="100" y1="92" x2="100" y2="108" stroke="white" strokeWidth="1.5" />
                    <line x1="92" y1="100" x2="108" y2="100" stroke="white" strokeWidth="1.5" />
                  </g>
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="#050505" />
              <rect width="100%" height="100%" fill="url(#small-cross-pattern)" />
              <rect width="100%" height="100%" fill="url(#large-cross-pattern)" />
            </svg>

            {/* LJUBIČASTI BOČNI SJAJ - POJAČAN */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(120, 40, 250, 0.65) 0%, transparent 20%, transparent 80%, rgba(120, 40, 250, 0.65) 100%)",
                mixBlendMode: "screen"
              }}
            />

            {/* Vinjeta za dubinu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)] opacity-80 pointer-events-none"></div>
          </motion.div>

          {/* LOGO */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <Image
              src="/ljafblanklogo2.png" 
              alt="Ljaf Loading"
              width={600}
              height={600}
              priority
              className="drop-shadow-2xl object-contain w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]" 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}