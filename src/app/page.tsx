"use client";

import { motion } from "framer-motion";
import { 
  Sparkles,
  Star
} from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import SocialCard from "@/components/SocialCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import { useMobile } from "@/hooks/useMobile";

// Static animation configs - prevents recreation on every render
const heroTransition = { duration: 0.7 } as const;
const avatarInitial = { scale: 0, rotate: -180 };
const avatarAnimate = { scale: 1, rotate: 0 };
const avatarTransition = { type: "spring", stiffness: 200, damping: 20, delay: 0.2 } as const;
const glowRingAnimate = { rotate: 360 };
const glowRingTransition = { duration: 8, repeat: Infinity, ease: "linear" } as const;
const titleTransition = { delay: 0.5, duration: 0.8 } as const;
const springTransition = { type: "spring", stiffness: 300 } as const;
const sectionTransition = { delay: 0.3 } as const;
const headerTransition = { delay: 0.4, duration: 0.6 } as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Social cards data
const socialCards = [
  { title: "Kick", subtitle: "Uživo Stream", logo: "https://cdn.brandfetch.io/id3gkQXO6j/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752548681236", href: "https://kick.com/ljaf", color: "from-[#53fc18]/30 to-[#53fc18]/10", glowColor: "rgba(83, 252, 24, 0.5)" },
  { title: "YouTube", subtitle: "Video Sadržaj", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", href: "https://www.youtube.com/@ljaaaf", color: "from-[#FF0000]/30 to-[#FF0000]/10", glowColor: "rgba(255, 0, 0, 0.5)" },
  { title: "Instagram", subtitle: "@ljaaaf", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", href: "https://www.instagram.com/ljaaaf/", color: "from-[#E4405F]/30 to-[#C13584]/10", glowColor: "rgba(228, 64, 95, 0.5)" },
  { title: "TikTok", subtitle: "@ljaaaf", logo: "https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg", href: "https://www.tiktok.com/@ljaaaf", color: "from-[#00f2ea]/30 to-[#ff0050]/20", glowColor: "rgba(0, 242, 234, 0.5)" },
  { title: "Discord", subtitle: "Pridruži se", logo: "https://static.vecteezy.com/system/resources/previews/023/741/147/non_2x/discord-logo-icon-social-media-icon-free-png.png", href: "https://discord.com/invite/S97MbdT2cN", color: "from-[#5865F2]/30 to-[#5865F2]/10", glowColor: "rgba(88, 101, 242, 0.5)" },
  { title: "X (Twitter)", subtitle: "@ljaaaf", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", href: "https://x.com/ljaaaf", color: "from-white/10 to-white/5", glowColor: "rgba(255, 255, 255, 0.3)" },
];

export default function Home() {
  const isMobile = useMobile();

  // Memoized pulsing glow animation based on mobile state
  const pulsingGlowAnimate = useMemo(() => ({
    scale: isMobile ? [1, 1.1, 1] : [1, 1.2, 1],
    opacity: isMobile ? [0.1, 0.2, 0.1] : [0.3, 0.6, 0.3],
  }), [isMobile]);

  const pulsingGlowTransition = useMemo(() => ({
    duration: isMobile ? 5 : 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  }), [isMobile]);

  // Memoized particle animations
  const particles = useMemo(() => 
    !isMobile ? [...Array(3)].map((_, i) => ({
      key: i,
      style: { top: `${20 + i * 25}%`, left: `${-10 + i * 10}%` },
      animate: { y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0, 1, 0], scale: [0, 1.5, 0] },
      transition: { duration: 3 + i, repeat: Infinity, delay: i * 0.5 },
    })) : [],
  [isMobile]);

  return (
    <main className="relative min-h-screen noise-bg">
      <AnimatedBackground />
      
      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
        >
          {/* Avatar */}
          <motion.div 
            className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-8"
            initial={avatarInitial}
            animate={avatarAnimate}
            transition={avatarTransition}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            {/* Animated Glow Rings */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
              }}
              animate={glowRingAnimate}
              transition={glowRingTransition}
            >
              <div className="absolute inset-[3px] rounded-full bg-black" />
            </motion.div>
            
            {/* Pulsing Glow - Highly optimized on mobile */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
              animate={pulsingGlowAnimate}
              transition={pulsingGlowTransition}
              style={{ filter: isMobile ? "blur(15px)" : "blur(30px)" }}
            />
            
            {/* Avatar Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 bg-black shadow-2xl">
              <Image
                src="/ljaflogo.jpg"
                alt="Ljaf Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Particles - Disable on mobile */}
            {particles.map((particle) => (
              <motion.div
                key={particle.key}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                style={particle.style}
                animate={particle.animate}
                transition={particle.transition}
              />
            ))}
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={titleTransition}
          >
            <h1 
              className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-white px-4 py-2"
            >
              Veljko Karanović Ljaf
            </h1>
            
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={springTransition}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-lg md:text-xl font-bold text-gray-200">
                Content Creator | Streamer
              </span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Partners Section */}
        <PartnersSection />

        {/* Social Media Section */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={sectionTransition}
        >
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={headerTransition}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-white/10 backdrop-blur-sm mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-bold text-gray-300 tracking-wider">DRUŠTVENE MREŽE</span>
              <Star className="w-4 h-4 text-orange-400" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent">
              Pratite Me
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialCards.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <SocialCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer with Backlink */}
        <Footer />
      </div>
    </main>
  );
}