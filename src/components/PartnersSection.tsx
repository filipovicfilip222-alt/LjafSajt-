"use client";

import { motion } from "framer-motion";
import { Sparkles, Package } from "lucide-react";

export default function PartnersSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section 
      className="mt-20 md:mt-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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

      {/* Partners Grid - Empty State */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {/* Empty State Cards */}
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="relative group rounded-3xl overflow-hidden min-h-[200px]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              },
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Glass Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 border-dashed" />
            
            {/* Content */}
            <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Package className="w-8 h-8 text-gray-500" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-500 mb-1">
                Uskoro
              </h3>
              <p className="text-sm text-gray-600">
                Partner #{index}
              </p>
            </div>

            {/* Animated Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
    </motion.section>
  );
}

