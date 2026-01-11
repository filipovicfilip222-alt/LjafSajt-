# Ljaf Landing Page - AI Agent Instructions

## Overview
Personal landing page for Veljko Karanović (Ljaf) - a content creator/streamer. Next.js 14 (App Router) with TypeScript, Tailwind CSS, and Framer Motion animations.

**Commands**: `npm run dev` (port 3000) | `npm run build` | `npm run lint`

## Architecture
- [src/app/page.tsx](src/app/page.tsx) - Main page with hero section + bento grid of SocialCards + PartnersSection
- [src/components/SocialCard.tsx](src/components/SocialCard.tsx) - Reusable card with 3D hover, glassmorphism, glow effects
- [src/components/AnimatedBackground.tsx](src/components/AnimatedBackground.tsx) - Decorative animated gradient orbs (`pointer-events-none`)
- [src/components/PartnersSection.tsx](src/components/PartnersSection.tsx) - Partner cards using native `<img>` for external logos
- [src/hooks/useMobile.ts](src/hooks/useMobile.ts) - Shared mobile detection hook (uses `useSyncExternalStore`)

## Critical Pattern: Mobile Detection
Use the shared `useMobile` hook (optimized with single MediaQueryList listener):
```tsx
import { useMobile } from "@/hooks/useMobile";

function MyComponent() {
  const isMobile = useMobile();
  // Then: {!isMobile && <ExpensiveAnimation />} or style={{ filter: isMobile ? "blur(15px)" : "blur(30px)" }}
}
```

## Performance Patterns
- **Static animation configs**: Define transitions/variants outside components to prevent recreation
- **Memoization**: Use `useMemo` for computed values, `useCallback` for handlers, `memo()` for components
- **Example** (see [SocialCard.tsx](src/components/SocialCard.tsx)):
```tsx
// Outside component - static, never recreated
const springTransition = { type: "spring", stiffness: 300, damping: 30 } as const;

// Inside component - memoized when depends on state
const pulsingGlowAnimate = useMemo(() => ({
  scale: isMobile ? [1, 1.1, 1] : [1, 1.2, 1],
}), [isMobile]);

export default memo(MyComponent); // Wrap with memo for prop-based memoization
```

## Framer Motion Conventions
Always define variants at component top (outside or memoized):
```tsx
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
```
- Interactive elements: `type: "spring"` transitions
- Background animations: `ease: "easeInOut"`, `repeat: Infinity`
- 3D transforms require: `perspective: 1000`, `transformStyle: "preserve-3d"` on parent

## Adding Social Cards
In [page.tsx](src/app/page.tsx), add to `socialCards` array (rendered via `.map()`):
```tsx
{ title: "Platform", subtitle: "@handle", logo: "https://...", href: "https://...", 
  color: "from-[#HEX]/30 to-[#HEX]/10", glowColor: "rgba(R, G, B, 0.5)" }
```

## Styling Patterns
- **Glassmorphism**: `bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10`
- **Colors**: Purple `#8b5cf6`, Pink `#ec4899`, Cyan `#06b6d4`
- **Responsive**: Base=mobile, `md:` breakpoint for desktop. Container: `max-w-6xl mx-auto px-4`

## Key Constraints
1. **"use client"** required for all animation components (Framer Motion needs client-side)
2. **External images**: Use native `<img>` not Next Image (see PartnersSection comment)
3. **Language**: Serbian (`sr`) - UI text like "PARTNERI", "Pratite Me"
4. **No env vars** - static site with Vercel Analytics auto-enabled
2. **External images**: Use native `<img>` not Next Image (see PartnersSection comment)
3. **Language**: Serbian (`sr`) - UI text like "PARTNERI", "Pratite Me"
4. **No env vars** - static site with Vercel Analytics auto-enabled
