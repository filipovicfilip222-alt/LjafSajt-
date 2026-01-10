# Ljaf Landing Page - AI Agent Instructions

## Project Overview
**Ljaf** is a personal landing page for content creator Veljko Karanović. It's a Next.js 14 application featuring a modern dark theme with premium animations, glassmorphism effects, and social link management.

### Tech Stack & Build
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion (heavy use of motion values, spring physics, stagger effects)
- **Build**: `npm run build` → `npm start` | Dev: `npm run dev` (port 3000)

## Architecture & Key Patterns

### Page Structure
- **[src/app/layout.tsx](src/app/layout.tsx)**: Root layout with Space Grotesk font, Vercel Analytics, and global providers
- **[src/app/page.tsx](src/app/page.tsx)**: Main page using `"use client"` with hero section (animated avatar), bento grid of social cards, and partners section
- **[src/app/globals.css](src/app/globals.css)**: Global styles, noise texture, Tailwind directives

### Component Architecture
1. **[SocialCard.tsx](src/components/SocialCard.tsx)** - Core reusable component
   - Props interface: `title, subtitle, logo, href, color, glowColor, featured, large, wide`
   - 3D hover effect via Framer Motion's `rotateX`/`rotateY` transforms based on mouse position
   - Glassmorphism: `backdrop-blur-xl`, gradient borders, glow effects on hover
   - Supports variable grid sizes (normal/large/wide) for bento layout

2. **[AnimatedBackground.tsx](src/components/AnimatedBackground.tsx)** - Fixed overlay
   - Multiple animated orbs using `motion.div` with different durations/colors
   - Uses `radial-gradient` with blur for depth, positioned absolutely
   - No interactivity, purely decorative, `pointer-events-none`

3. **[PageLoader.tsx](src/components/PageLoader.tsx)** - Entry animation
   - Fixed overlay that exits after 1.5s with zoom effect
   - SVG-based grid pattern background with animated elements

4. **[Snowflakes.tsx](src/components/Snowflakes.tsx)** - Falling particles
   - Mixes snowflake icons with Among Us character images (1:7 ratio)
   - Uses `useMemo` to generate array of snowflakes (70 total)
   - Falling animation with rotation, exits off-screen

5. **[PartnersSection.tsx](src/components/PartnersSection.tsx)** - External partner display
   - Uses native `<img>` tags (not Next Image) for external partner logos to avoid optimization issues
   - Gradient backgrounds with unique colors per partner
   - Stagger animation on mount

## Animation Patterns & Conventions

### Framer Motion Usage
- **Variants system**: Define `containerVariants` and `itemVariants` for staggered animations
- **Motion values**: `useMotionValue()` → `useTransform()` for responsive 3D effects (see SocialCard mouse tracking)
- **Transitions**: Spring physics preferred for interactive elements, easeInOut for background elements
- **Infinite loops**: `repeat: Infinity` for continuous animations (orbs, pulsing glows)

### Naming & Structure
```tsx
// Always define animation variants at component top
const containerVariants = { hidden: {...}, visible: {...} };
const itemVariants = { hidden: {...}, visible: {...} };

// Apply with motion.div/motion.a with initial/animate/variants props
<motion.div variants={itemVariants} initial="hidden" animate="visible" />

// Stagger children automatically via parent variants
transition: { staggerChildren: 0.1, delayChildren: 0.2 }
```

### Color Palette
- Primary gradients: Purple (`#8b5cf6`), Pink (`#ec4899`), Cyan (`#06b6d4`)
- Glassmorphism: `from-white/[0.07] to-white/[0.02]`, `border border-white/10`
- Hover states: Increase opacity, add glow effects, scale transforms

## Responsive Design & Mobile Optimization
- **Mobile-first Tailwind**: Base classes for mobile, `md:` breakpoint for 768px+ screens
- **Grid Layout**: Mobile = vertical stack, Desktop = 3-column bento (varies with card sizes)
- **Avatar**: `w-36 h-36` mobile → `md:w-48 md:h-48` desktop
- **Container**: `max-w-6xl mx-auto px-4` for safe padding on all sizes
- **Runtime detection**: All animation-heavy components use `window.matchMedia("(max-width: 768px)")` to disable expensive effects (3D transforms, multiple orbs, particle count)
- **Tailwind config**: Check responsive breakpoints in [tailwind.config.ts](tailwind.config.ts)

## Data Structures

### SocialCard Props Pattern
```tsx
interface SocialCardProps {
  title: string;           // Display name
  subtitle: string;        // Secondary text
  logo: string;           // Image path/URL
  href: string;           // External link
  color: string;          // Tailwind gradient class (e.g., "from-purple-600 to-pink-600")
  glowColor: string;      // CSS color for box-shadow glow
  featured?: boolean;     // Visual prominence
  large?: boolean;        // Height class: min-h-[320px]
  wide?: boolean;         // Height class: min-h-[160px]
}
```

### Partner Data Structure
```tsx
interface Partner {
  name: string;
  logo: string;           // External URL for partner logos
  url: string;
  gradient: string;       // Tailwind from-/via-/to- classes
  glowColor: string;      // rgba format for consistency
}
```

## Critical Developer Workflows

### Development
- `npm run dev`: Starts dev server on `http://localhost:3000` with hot-reload
- Changes trigger fast refresh automatically (no full page reload needed)
- Check TypeScript errors: `npm run lint`
- Test responsiveness: Check both `md:` breakpoint behavior (tablet/desktop)

### Building & Deployment
- `npm run build`: Produces optimized Next.js build (checks for TS errors)
- `npm start`: Runs production server locally (verify animations/perf before deploy)
- Vercel Analytics enabled automatically via `@vercel/analytics` import
- No environment variables required

### Adding New Social Cards
1. Import `SocialCard` in [page.tsx](src/app/page.tsx)
2. Create card data object matching `SocialCardProps` interface
3. Render as `<motion.div variants={itemVariants}>` child inside containerVariants parent
4. **Color**: Must be valid Tailwind gradient class like `"from-purple-600 to-pink-600"`
5. **GlowColor**: Use `rgba()` format (e.g., `"rgba(139, 92, 246, 0.6)"` for purple)
6. Omit `featured`, `large`, `wide` props for normal grid size (defaults to `false`)

### Mobile Testing Critical
- Components detect viewport with `window.matchMedia("(max-width: 768px)")`
- AnimatedBackground: Disables expensive secondary orbs on mobile
- Snowflakes: Reduces from 70 to 20 flakes, Among Us ratio 1:10 instead of 1:7
- SocialCard: Disables 3D `rotateX`/`rotateY` transforms on mobile

## Important Implementation Details

### Performance Considerations
- **Fixed position backgrounds** ([AnimatedBackground.tsx](src/components/AnimatedBackground.tsx)): Uses `pointer-events-none` to avoid blocking interactions
- **Snowflakes**: Pre-calculated via `useMemo` on component mount (avoid recreating on every render)
- **Image optimization**: SocialCard uses Next Image where possible; PartnersSection uses native `<img>` for external sources
- **CSS Grid**: Bento layout uses CSS classes, not inline styles, for better performance

### "use client" Requirement
- All animation components require `"use client"` (Framer Motion, useState hooks)
- Root layout is Server Component, uses Server Components where possible
- Only use client directive on components that truly need it

### SEO & Meta (Server-side)
- [layout.tsx](src/app/layout.tsx) handles metadata (title, description, Open Graph)
- Language: `sr` (Serbian)
- Includes [sitemap.ts](src/app/sitemap.ts) and [robots.ts](src/app/robots.ts) for search engines

### External Assets
- Avatar: `/ljaflogo.jpg` in public folder
- Snowflake images: `/amonguscovek1.png`, `/amonguscovek2.png`
- Partner logos: External URLs (no local storage)

## Common Pitfalls & Solutions
1. **3D transforms not working**: Ensure `perspective: 1000` is set and parent has `transformStyle: "preserve-3d"`
2. **Animations stuttering**: Use `type: "spring"` for interactive elements, `ease: "easeInOut"` for continuous
3. **Images not loading**: For external URLs, use `<img>` (PartnersSection) or configure Image remotePatterns in [next.config.mjs](next.config.mjs)
4. **Stagger not working**: Parent must use `variants` prop with defined `containerVariants`, children use `itemVariants`
