import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Ljaf - Veljko Karanović | Content Creator & Streamer",
  description: "Zvanična stranica Veljka Karanovića - Ljaf. Pratite moj sadržaj na društvenim mrežama i pridružite se zajednici!",
  keywords: ["Ljaf", "Veljko Karanović", "streamer", "content creator", "gaming", "betting"],
  authors: [{ name: "Veljko Karanović Ljaf" }],
  openGraph: {
    title: "Ljaf - Veljko Karanović",
    description: "Content Creator | Streamer",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

