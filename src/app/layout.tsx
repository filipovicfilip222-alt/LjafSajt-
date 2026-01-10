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
  description: "Zvanična stranica Veljka Karanovića - Ljaf. Pratite moj sadržaj na društvenim mrežama i pridružite se zajednici! Gaming, live streaming, entertainment i zabava.",
  keywords: [
    "Ljaf",
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
  ],
  authors: [{ name: "Veljko Karanović Ljaf" }],
  creator: "Veljko Karanović",
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
        url: "https://ljaf.rs/ljaflogo.jpg",
        width: 1200,
        height: 630,
        alt: "Ljaf - Veljko Karanović",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ljaf - Veljko Karanović",
    description: "Content Creator & Streamer",
    images: ["https://ljaf.rs/ljaflogo.jpg"],
  },
  metadataBase: new URL("https://ljaf.rs"),
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Dodaj Google Search Console verification code ovde
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

  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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

