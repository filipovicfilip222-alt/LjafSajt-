"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, Sparkles } from "lucide-react";
import { memo, useMemo } from "react";

// Static animation configs
const footerTransition = { delay: 0.8, duration: 0.8 } as const;
const borderAnimation = { opacity: [0.3, 0.6, 0.3] };
const borderTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" } as const;
const contentTransition = { delay: 1, duration: 0.6 } as const;
const springTransition = { type: "spring", stiffness: 300 } as const;
const bgTransition = { duration: 0.6 } as const;
const glowTransition = { duration: 0.3 } as const;
const copyrightTransition = { delay: 1.2, duration: 0.6 } as const;

// Static structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "creator": {
    "@type": "Organization",
    "name": "AiSajt.com",
    "url": "https://aisajt.com",
    "description": "Profesionalna izrada web sajtova",
    "serviceType": "Web Development"
  },
  "about": {
    "@type": "Person",
    "name": "Veljko Karanović",
    "alternateName": "Ljaf"
  }
};

function Footer() {
  // Memoize year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const structuredDataString = useMemo(() => JSON.stringify(structuredData), []);

  return (
    <motion.footer 
      className="relative mt-16 md:mt-24 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={footerTransition}
    >
      {/* Decorative Top Border */}
      <div className="relative w-full h-px mb-12">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={borderAnimation}
          transition={borderTransition}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={contentTransition}
        >
          {/* Creator Credit with Backlink */}
          <motion.div
            className="inline-flex flex-col items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={springTransition}
          >
            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-xl">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white">Sajt izradio</span>
              <Sparkles className="w-3 h-3 text-pink-400" />
            </div>
            
            <motion.a
              href="https://aisajt.com"
              target="_blank"
              rel="noopener"
              title="Profesionalna izrada web sajtova - AiSajt.com"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 border border-white/20 backdrop-blur-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={bgTransition}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ boxShadow: "0 0 0px rgba(139, 92, 246, 0)" }}
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)" 
                }}
                transition={glowTransition}
              />

              <span className="relative text-lg md:text-xl font-bold text-white">
                AiSajt.com
              </span>
              
              <ExternalLink className="relative w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
            </motion.a>

            <p className="text-sm text-white max-w-md">
              Profesionalna izrada web sajtova sa AI tehnologijom
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="pt-6 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={copyrightTransition}
          >
            <p className="text-sm text-gray-600">
              © {currentYear} Veljko Karanović Ljaf. Sva prava zadržana.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Schema.org Structured Data for Creator Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
    </motion.footer>
  );
}

export default memo(Footer);
