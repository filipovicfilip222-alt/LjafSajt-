"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

// Server-side safe default
const getServerSnapshot = () => false;

// Cached media query result
let cachedIsMobile: boolean | null = null;
let mediaQuery: MediaQueryList | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  // Initialize on first subscription
  if (typeof window !== "undefined" && !mediaQuery) {
    mediaQuery = window.matchMedia("(max-width: 768px)");
    cachedIsMobile = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      cachedIsMobile = e.matches;
      listeners.forEach(listener => listener());
    };
    
    mediaQuery.addEventListener("change", handleChange);
  }
  
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  if (cachedIsMobile === null && typeof window !== "undefined") {
    mediaQuery = window.matchMedia("(max-width: 768px)");
    cachedIsMobile = mediaQuery.matches;
  }
  return cachedIsMobile ?? false;
}

/**
 * Optimized hook for mobile detection using useSyncExternalStore.
 * Shares a single MediaQueryList listener across all components.
 */
export function useMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Legacy hook for backwards compatibility (useState-based).
 * Use useMobile() for better performance.
 */
export function useMobileLegacy(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default useMobile;
