"use client";

import { useEffect, useState, useRef, memo } from "react";
import { useMobile } from "@/hooks/useMobile";

// Putanje do slika
const AMONGUS_IMAGES = ["/amonguscovek1.png", "/amonguscovek2.png"] as const;

// Konfiguracija animacije
const CONFIG = {
  // Trajanje leta preko ekrana (u ms) - 8-12 sekundi
  minDuration: 8000,
  maxDuration: 12000,
  // Interval između pojava (u ms)
  minInterval: 15000,
  maxInterval: 25000,
  // Inicijalno kašnjenje pre prvog pojavljivanja (u ms)
  initialDelay: 3000,
  // Veličina Among Us-a (u px) - veće da se jasno vidi
  minSize: 60,
  maxSize: 90,
} as const;

// Preload slike jednom globalno
if (typeof window !== "undefined") {
  AMONGUS_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

interface FlyingAmongusData {
  id: string;
  imageSrc: string;
  y: number;
  size: number;
  duration: number;
  startTime: number;
}

// Komponenta koja koristi requestAnimationFrame umesto CSS animacije
function FlyingAmongusImage({ data, onComplete }: { data: FlyingAmongusData; onComplete: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    const startTime = performance.now();
    const duration = data.duration;
    const screenWidth = window.innerWidth;
    const startX = -80;
    const endX = screenWidth + 80;
    const totalDistance = endX - startX;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linearno pomeranje od leva na desno
      const currentX = startX + (totalDistance * progress);
      
      // Opacity: fade in prvih 10%, fade out poslednjih 10%
      let opacity = 1;
      if (progress < 0.1) {
        opacity = progress / 0.1;
      } else if (progress > 0.9) {
        opacity = (1 - progress) / 0.1;
      }
      
      // Rotacija 720 stepeni ulevo (negativno = ulevo)
      const rotation = -720 * progress;
      
      if (imgRef.current) {
        imgRef.current.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        imgRef.current.style.opacity = String(opacity);
      }
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [data, onComplete]);
  
  return (
    <img
      ref={imgRef}
      src={data.imageSrc}
      alt=""
      draggable={false}
      style={{
        position: 'absolute',
        top: `${data.y}%`,
        left: 0,
        width: `${data.size}px`,
        height: 'auto',
        objectFit: 'contain',
        imageRendering: 'auto',
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
    />
  );
}

function FlyingAmongus() {
  const isMobile = useMobile();
  const [current, setCurrent] = useState<FlyingAmongusData | null>(null);
  const mountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    
    // Samo na mobilnom
    if (!isMobile) {
      setCurrent(null);
      return;
    }

    const createAmongus = (): FlyingAmongusData => {
      const duration = CONFIG.minDuration + Math.random() * (CONFIG.maxDuration - CONFIG.minDuration);
      return {
        id: `amongus-${Date.now()}`,
        imageSrc: AMONGUS_IMAGES[Math.floor(Math.random() * AMONGUS_IMAGES.length)],
        y: 15 + Math.random() * 60,
        size: CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
        duration: Math.round(duration),
        startTime: Date.now(),
      };
    };

    const showAmongus = () => {
      if (!mountedRef.current) return;
      setCurrent(createAmongus());
    };

    const scheduleNext = () => {
      const interval = CONFIG.minInterval + Math.random() * (CONFIG.maxInterval - CONFIG.minInterval);
      timeoutRef.current = setTimeout(() => {
        showAmongus();
        scheduleNext();
      }, interval);
    };

    // Pokreni prvu animaciju
    const initialTimeout = setTimeout(() => {
      showAmongus();
      scheduleNext();
    }, CONFIG.initialDelay);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMobile]);

  const handleComplete = () => {
    setCurrent(null);
  };

  if (!isMobile || !current) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50" aria-hidden="true">
      <FlyingAmongusImage key={current.id} data={current} onComplete={handleComplete} />
    </div>
  );
}

export default memo(FlyingAmongus);
