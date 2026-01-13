"use client";

import { useEffect, useState, useCallback, useRef, memo } from "react";
import { useMobile } from "@/hooks/useMobile";

// Putanje do slika
const AMONGUS_IMAGES = ["/amonguscovek1.png", "/amonguscovek2.png"] as const;

// Konfiguracija animacije - razumna trajanja da ne bude previše brzo ili sporo
const CONFIG = {
  // Trajanje leta preko ekrana (u ms) - 8-12 sekundi je optimalno za mobilni
  minDuration: 8000,
  maxDuration: 12000,
  // Interval između pojava (u ms) - 15-25 sekundi da ne bude previše često
  minInterval: 15000,
  maxInterval: 25000,
  // Inicijalno kašnjenje pre prvog pojavljivanja (u ms)
  initialDelay: 3000,
  // Veličina Among Us-a (u px)
  minSize: 35,
  maxSize: 55,
} as const;

// Globalni keš za preload-ovane slike - čuva se između renderovanja
const imageCache = new Map<string, HTMLImageElement>();
let imagesPreloaded = false;

// Preload funkcija - izvršava se jednom i kešira slike u memoriji
function preloadImages(): Promise<void> {
  if (imagesPreloaded) return Promise.resolve();
  
  const promises = AMONGUS_IMAGES.map((src) => {
    return new Promise<void>((resolve) => {
      if (imageCache.has(src)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        imageCache.set(src, img);
        resolve();
      };
      img.onerror = () => resolve(); // Ne blokiraj ako slika ne uspe
      img.src = src;
    });
  });
  
  return Promise.all(promises).then(() => {
    imagesPreloaded = true;
  });
}

interface FlyingAmongusData {
  id: number;
  imageSrc: string;
  y: number; // vertikalna pozicija (%)
  size: number; // veličina (px)
  duration: number; // trajanje animacije (ms)
}

function FlyingAmongus() {
  const isMobile = useMobile();
  const [current, setCurrent] = useState<FlyingAmongusData | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pomocna funkcija za random broj u opsegu
  const randomBetween = useCallback((min: number, max: number) => {
    return min + Math.random() * (max - min);
  }, []);

  // Generiše podatke za novu animaciju
  const generateAmongusData = useCallback((): FlyingAmongusData => {
    const randomImageIndex = Math.floor(Math.random() * AMONGUS_IMAGES.length);
    return {
      id: Date.now() + Math.random(), // Jedinstveni ID
      imageSrc: AMONGUS_IMAGES[randomImageIndex],
      y: randomBetween(15, 75), // 15-75% od vrha ekrana
      size: Math.floor(randomBetween(CONFIG.minSize, CONFIG.maxSize)),
      duration: Math.floor(randomBetween(CONFIG.minDuration, CONFIG.maxDuration)),
    };
  }, [randomBetween]);

  // Pokreće animaciju
  const triggerAnimation = useCallback(() => {
    const data = generateAmongusData();
    setCurrent(data);

    // Očisti prethodni timeout ako postoji
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Sakrij nakon završetka animacije
    animationTimeoutRef.current = setTimeout(() => {
      setCurrent(null);
    }, data.duration + 500); // Mali buffer za sigurnost
  }, [generateAmongusData]);

  // Zakazuje sledeću animaciju
  const scheduleNext = useCallback(() => {
    const interval = randomBetween(CONFIG.minInterval, CONFIG.maxInterval);
    timeoutRef.current = setTimeout(() => {
      triggerAnimation();
      scheduleNext(); // Rekurzivno zakazuj sledeću
    }, interval);
  }, [triggerAnimation, randomBetween]);

  useEffect(() => {
    // Ova komponenta radi SAMO na mobilnim uređajima
    if (!isMobile) {
      setCurrent(null);
      return;
    }

    // Preload slike pre početka animacija
    preloadImages().then(() => {
      // Pokreni prvu animaciju nakon inicijalnog kašnjenja
      timeoutRef.current = setTimeout(() => {
        triggerAnimation();
        scheduleNext();
      }, CONFIG.initialDelay);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isMobile, triggerAnimation, scheduleNext]);

  // Ne renderuj ništa na desktopu ili ako nema aktivne animacije
  if (!isMobile || !current) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-50"
      aria-hidden="true"
    >
      <img
        key={current.id}
        src={current.imageSrc}
        alt=""
        draggable={false}
        className="absolute select-none amongus-fly-mobile"
        style={{
          top: `${current.y}%`,
          width: `${current.size}px`,
          height: `${current.size}px`,
          animationDuration: `${current.duration / 1000}s`,
        }}
      />
    </div>
  );
}

export default memo(FlyingAmongus);
