import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PageLoader from "@/components/PageLoader";
import Snowflakes from "@/components/Snowflakes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Ljaf - Veljko Karanović | Content Creator & Streamer",
  description: "Zvanična stranica Veljka Karanovića - Ljaf. Pratite moj sadržaj na društvenim mrežama i pridružite se zajednici! Gaming, live streaming, entertainment i zabava. Sajt izradio AiSajt.com - profesionalna izrada web sajtova.",
  keywords: [
    "Ljaf",
    "ljaf.rs",
    "ljaf sajt",
    "Veljko Karanović",
    "ljatif",
    "streamer",
    "content creator",
    "gaming",
    "live stream",
    "entertainment",
    "zabava",
    "Baka Prase",
    "srpski streamer",
    "srpski content creator",
    "twitch",
    "youtube",
    "gaming srpski",
    "online entertainment",
    "streaming platform",
    "AiSajt",
    "izrada web sajtova",
    "web development",
  ],
  authors: [
    { name: "Veljko Karanović Ljaf" },
    { name: "AiSajt.com", url: "https://aisajt.com" }
  ],
  creator: "AiSajt.com",
  publisher: "Veljko Karanović Ljaf",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://ljaf.rs",
  },
  openGraph: {
    title: "Ljaf - Veljko Karanović",
    description: "Content Creator | Streamer | Gaming & Entertainment",
    type: "website",
    locale: "sr_RS",
    url: "https://ljaf.rs",
    images: [
      {
        url: "https://ljaf.rs/icon-512.png",
        width: 512,
        height: 512,
        alt: "Ljaf - Veljko Karanović",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ljaf - Veljko Karanović",
    description: "Content Creator & Streamer",
    images: ["https://ljaf.rs/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/fallback-logo.svg",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://ljaf.rs"),
  verification: {
    google: "", // Vercel automatski upravlja verifikacijom
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Veljko Karanović",
    alternateName: "Ljaf",
    url: "https://ljaf.rs",
    image: "https://ljaf.rs/ljaflogo.jpg",
    description: "Content Creator & Streamer",
    jobTitle: "Content Creator",
    sameAs: [
      "https://twitch.tv",
      "https://youtube.com",
      "https://instagram.com",
      "https://tiktok.com",
    ],
    knowsAbout: [
      "Gaming",
      "Live Streaming",
      "Entertainment",
      "Content Creation",
    ],
  };

  const creatorData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ljaf - Veljko Karanović",
    url: "https://ljaf.rs",
    author: {
      "@type": "Organization",
      name: "AiSajt.com",
      url: "https://aisajt.com",
      description: "Profesionalna izrada web sajtova sa AI tehnologijom",
      sameAs: ["https://aisajt.com"]
    },
    creator: {
      "@type": "Organization",
      name: "AiSajt.com",
      url: "https://aisajt.com"
    }
  };

  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://aisajt.com" />
        <link rel="dns-prefetch" href="https://aisajt.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorData) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <Snowflakes />
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

