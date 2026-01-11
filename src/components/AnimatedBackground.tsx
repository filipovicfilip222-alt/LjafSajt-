"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { useMobile } from "@/hooks/useMobile";

// Static animation configs - prevents recreation on every render
const orbTransitions = {
  purple: { duration: 20, repeat: Infinity, ease: "easeInOut" } as const,
  cyan: { duration: 25, repeat: Infinity, ease: "easeInOut" } as const,
  pink: { duration: 30, repeat: Infinity, ease: "easeInOut" } as const,
  yellow: { duration: 18, repeat: Infinity, ease: "easeInOut" } as const,
  green: { duration: 22, repeat: Infinity, ease: "easeInOut" } as const,
  spotlight: { duration: 8, repeat: Infinity, ease: "easeInOut" } as const,
  scanline: { duration: 8, repeat: Infinity, ease: "linear" } as const,
};

const orbAnimations = {
  purple: { x: [0, 150, 0], y: [0, 100, 0], scale: [1, 1.2, 1] },
  cyan: { x: [0, -120, 0], y: [0, 150, 0], scale: [1, 1.3, 1] },
  pink: { x: [-100, 100, -100], y: [0, -80, 0], scale: [1, 1.2, 1] },
  yellow: { x: [0, 80, 0], y: [0, -60, 0], opacity: [0.3, 0.6, 0.3] },
  green: { x: [0, -70, 0], y: [0, 90, 0], opacity: [0.4, 0.7, 0.4] },
  spotlight: { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] },
  scanline: { y: [0, 20, 0] },
};

// Static styles to avoid inline object recreation
const orbStyles = {
  purple: {
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
    filter: "blur(60px)",
    willChange: "transform",
  },
  cyan: {
    background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)",
    filter: "blur(60px)",
    willChange: "transform",
  },
  yellow: {
    background: "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)",
    filter: "blur(80px)",
    willChange: "transform",
  },
  green: {
    background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
    filter: "blur(70px)",
    willChange: "transform",
  },
  spotlight: {
    background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
    filter: "blur(40px)",
    willChange: "transform",
  },
};

const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px",
  maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
  contain: "layout style paint",
} as const;

const scanlineStyle = {
  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
};

function AnimatedBackground() {
  const isMobile = useMobile();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ contain: "strict" }}>
      {/* Primary Gradient Orbs - Completely disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full"
            style={orbStyles.purple}
            animate={orbAnimations.purple}
            transition={orbTransitions.purple}
          />
          
          <motion.div
            className="absolute top-40 -right-20 w-[500px] h-[500px] rounded-full"
            style={orbStyles.cyan}
            animate={orbAnimations.cyan}
            transition={orbTransitions.cyan}
          />
        </>
      )}
      
      <motion.div
        className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)",
          filter: isMobile ? "blur(25px)" : "blur(60px)",
          willChange: "transform",
          opacity: isMobile ? 0.3 : 1,
        }}
        animate={orbAnimations.pink}
        transition={orbTransitions.pink}
      />

      {/* Secondary Accent Orbs - Completely disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full"
            style={orbStyles.yellow}
            animate={orbAnimations.yellow}
            transition={orbTransitions.yellow}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full"
            style={orbStyles.green}
            animate={orbAnimations.green}
            transition={orbTransitions.green}
          />
        </>
      )}

      {/* Grid Pattern - Enhanced */}
      <div 
        className={`absolute inset-0 ${isMobile ? "opacity-0" : "opacity-20"}`}
        style={gridStyle}
      />

      {/* Spotlight Effect */}
      {!isMobile && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px]"
          style={orbStyles.spotlight}
          animate={orbAnimations.spotlight}
          transition={orbTransitions.spotlight}
        />
      )}
      
      {/* Vignette Overlay - Stronger */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.9)_100%)]" />

      {/* Subtle Scanline Effect - Disable on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={scanlineStyle}
          animate={orbAnimations.scanline}
          transition={orbTransitions.scanline}
        />
      )}
    </div>
  );
}

export default memo(AnimatedBackground);
