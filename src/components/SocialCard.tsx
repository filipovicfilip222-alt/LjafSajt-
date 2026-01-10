"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SocialCardProps {
  title: string;
  subtitle: string;
  logo: string;
  href: string;
  color: string;
  glowColor: string;
  featured?: boolean;
  large?: boolean;
  wide?: boolean;
}

export default function SocialCard({
  title,
  subtitle,
  logo,
  href,
  color,
  glowColor,
  featured = false,
  large = false,
  wide = false,
}: SocialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Detect mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Only apply 3D transforms on desktop
  const rotateX = useTransform(y, [-100, 100], isMobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(x, [-100, 100], isMobile ? [0, 0] : [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return; // Skip 3D hover on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobile) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative block h-full rounded-3xl overflow-hidden
        transition-all duration-500
        ${large ? 'min-h-[320px]' : wide ? 'min-h-[160px]' : 'min-h-[180px]'}
      `}
      style={!isMobile ? {
        perspective: 1000,
        transformStyle: "preserve-3d",
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={!isMobile ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } : {}}
        transition={!isMobile ? { type: "spring", stiffness: 300, damping: 30 } : { duration: 0 }}
      >
        {/* Glass Background with Border */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-xl'} border border-white/10 group-hover:border-white/20 transition-all duration-500`} />

        {/* Gradient Glow Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl`}
        />

        {/* Animated Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 60px 10px ${glowColor}, inset 0 0 60px 5px ${glowColor}`,
            filter: "blur(20px)",
          }}
        />

        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} ${isHovered ? '50%' : '0%'}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Featured Badge */}
        {featured && (
          <motion.div 
            className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border border-yellow-400/50 backdrop-blur-md shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 drop-shadow-lg" />
            <span className="text-xs font-bold text-yellow-100 drop-shadow-lg tracking-wide">FEATURED</span>
          </motion.div>
        )}

        {/* Content Container */}
        <div className={`relative h-full p-7 md:p-9 flex flex-col ${large ? 'justify-between' : 'justify-center'} z-10`}>
          {/* Logo */}
          <motion.div 
            className={`
              ${large ? 'mb-auto' : 'mb-4'}
              relative
            `}
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              {/* Glow behind logo */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: glowColor }}
              />
              <div className="relative w-full h-full p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className={large ? 'mt-auto' : ''}
            animate={{
              y: isHovered ? -3 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2 drop-shadow-lg tracking-tight">
              {title}
            </h3>
            <p className="text-base md:text-lg text-gray-300 font-medium drop-shadow-md">
              {subtitle}
            </p>
          </motion.div>

          {/* Arrow Icon */}
          <motion.div 
            className="absolute top-7 right-7 text-white/50"
            animate={{
              opacity: isHovered ? 1 : 0.5,
              x: isHovered ? 4 : 0,
              y: isHovered ? -4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Shine Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            }}
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* 3D Depth Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-all duration-500" 
             style={{ transform: "translateZ(1px)" }} />
      </motion.div>
    </motion.a>
  );
}

