"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink } from "lucide-react";
// using native <img> for external partner logos to avoid Next image optimization issues

interface Partner {
  name: string;
  logo: string;
  url: string;
  gradient: string;
  glowColor: string;
}

export default function PartnersSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const partners: Partner[] = [
    {
      name: "BetBuff",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      url: "https://t.me/thebetbuff",
      gradient: "from-[#0088cc]/30 via-[#0088cc]/20 to-[#0088cc]/10",
      glowColor: "rgba(0, 136, 204, 0.6)",
    },
    {
      name: "CSGO-SKINS",
      logo: "https://pbs.twimg.com/profile_images/1822763818952376320/m13mrczG_400x400.png",
      url: "https://csgo-skins.com/?ref=LJAF",
      gradient: "from-blue-500/30 via-blue-500/20 to-cyan-500/10",
      glowColor: "rgba(59, 130, 246, 0.6)",
    },
    {
      name: "PIRATE SWAP",
      logo: "https://static.totalcsgo.com/small_logo_f9dc26c029.png",
      url: "https://pirateswap.com/?ref=ljaf",
      gradient: "from-purple-500/30 via-pink-500/20 to-purple-500/10",
      glowColor: "rgba(168, 85, 247, 0.6)",
    },
  ];

  return (
    <motion.section 
      className="mb-16 md:mb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-14">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-sm mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-bold text-gray-300 tracking-wider">PARTNERI</span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Naši Partneri
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Ponosno sarađujemo sa vodećim brendovima u industriji
        </p>
      </div>

      {/* Partners Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {partners.map((partner, index) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-3xl overflow-hidden min-h-[240px] cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.15 }
              },
            }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Glow Effect on Hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              style={{
                background: `radial-gradient(circle at center, ${partner.glowColor}, transparent 70%)`,
              }}
            />

            {/* Glass Background */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${partner.gradient} backdrop-blur-xl border border-white/10 shadow-2xl`} />
            
            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${partner.glowColor} 50%, transparent 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
              {/* Logo Container */}
              <motion.div
                className="relative w-32 h-32 mb-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                <div className="relative w-24 h-24">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/fallback-logo.svg'; }}
                  />
                </div>
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              
              {/* Partner Name */}
              <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                {partner.name}
              </h3>

              {/* Visit Button */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-200 text-sm font-semibold group-hover:bg-white/20 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <span>Posetite sajt</span>
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
          </motion.a>
        ))}
      </motion.div>

      {/* Decorative Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
    </motion.section>
  );
}

