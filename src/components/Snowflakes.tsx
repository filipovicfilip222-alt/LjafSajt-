"use client";

import { useMemo, useEffect, useState, useCallback } from "react";
import { useMobile } from "@/hooks/useMobile";

const amongusImages = [
  "/amonguscovek1.png",
  "/amonguscovek2.png",
];

// Preload slike na početku - one se keširaju u memoriji
const preloadImages = () => {
  amongusImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export default function Snowflakes() {
  const isMobile = useMobile();
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  const [amongusVisible, setAmongusVisible] = useState<{
    id: number;
    image: string;
    y: number;
    size: number;
    animationDuration: number;
  } | null>(null);

  // Preload slike na startup
  useEffect(() => {
    preloadImages();
    const images = amongusImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    setPreloadedImages(images);
  }, []);

  // Among Us pojavljuje se svakih 7 sekundi i leti preko ekrana
  const showAmongus = useCallback(() => {
    const randomImage = amongusImages[Math.floor(Math.random() * amongusImages.length)];
    const randomY = 10 + Math.random() * 70; // 10-80% vertikalno
    const size = 40 + Math.random() * 30; // 40-70px
    // Na mobilnom traje MNOGO duže (12s) da bude sporije, na desktopu 5s
    const animationDuration = isMobile ? 12000 : 5000;

    setAmongusVisible({
      id: Date.now(),
      image: randomImage,
      y: randomY,
      size: size,
      animationDuration: animationDuration,
    });

    // Sakrij nakon što animacija završi
    setTimeout(() => {
      setAmongusVisible(null);
    }, animationDuration);
  }, [isMobile]);

  useEffect(() => {
    // Čekaj 2 sekunde pre prve animacije da se useMobile stabilizuje
    const initialDelay = setTimeout(() => {
      showAmongus();
    }, 2000);
    
    // Among Us se pojavljuje svakih 10 sekundi (duži interval)
    const interval = setInterval(showAmongus, 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showAmongus]);

  // Statičke pahuljice - generišu se jednom i ne pomeraju se
  const staticSnowflakes = useMemo(() => {
    const totalFlakes = isMobile ? 25 : 60;
    return Array.from({ length: totalFlakes }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {/* Statičke pahuljice - bez animacija */}
      {staticSnowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            top: `${flake.top}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: `rgba(255, 255, 255, ${flake.opacity})`,
            boxShadow: `0 0 ${flake.size * 2}px rgba(255, 255, 255, ${flake.opacity * 0.5})`,
          }}
        />
      ))}

      {/* Among Us koji leti sa leva na desno - CSS animacija (GPU accelerated) */}
      {amongusVisible && (
        <img
          key={amongusVisible.id}
          src={amongusVisible.image}
          alt=""
          className="absolute select-none"
          style={{
            top: `${amongusVisible.y}%`,
            width: `${amongusVisible.size}px`,
            height: `${amongusVisible.size}px`,
            pointerEvents: "none",
            userSelect: "none",
            animation: `fly-across ${amongusVisible.animationDuration / 1000}s linear forwards`,
          }}
          draggable={false}
        />
      )}
    </div>
  );
}