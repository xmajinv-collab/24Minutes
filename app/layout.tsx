import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import SessionProvider from "@/components/providers/SessionProvider";

import TransitionProvider from "@/components/providers/TransitionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  metadataBase: new URL(
    "https://24-minutes.vercel.app"
  ),

  title: {
    default:
      "24 MINUTES - Descubre Anime",
    template:
      "%s | 24 MINUTES",
  },

  description:
    "Explora temporadas, descubre nuevos animes, guarda favoritos y encuentra recomendaciones personalizadas.",

  keywords: [
    "anime",
    "anime catalog",
    "anime finder",
    "anime tracker",
    "anime recommendations",
    "anime favorites",
    "top anime",
    "seasonal anime",
    "anime database",
    "otaku",
    "24 minutes",
  ],

  authors: [
    {
      name: "24 MINUTES",
    },
  ],

  creator:
    "24 MINUTES",

  publisher:
    "24 MINUTES",

  category:
    "entertainment",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {

    title:
      "24 MINUTES",

    description:
      "Explora temporadas, descubre nuevos animes y vive tu universo anime.",

    url:
      "https://24-minutes.vercel.app",

    siteName:
      "24 MINUTES",

    locale:
      "es_ES",

    type:
      "website",

    images: [
      {
        url:
          "/og-image.jpg",

        width: 1200,

        height: 630,

        alt:
          "24 MINUTES Anime Platform",
      },
    ],

  },

  twitter: {

    card:
      "summary_large_image",

    title:
      "24 MINUTES",

    description:
      "Explora temporadas, descubre nuevos animes y vive tu universo anime.",

    images: [
      "/og-image.jpg",
    ],

  },

  icons: {

    icon:
      "/favicon.ico",

    shortcut:
      "/favicon.ico",

    apple:
      "/favicon.ico",

  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-fuchsia-500/30 selection:text-white">

        <SessionProvider>

          <TransitionProvider>

            {/* GLOBAL BACKGROUND */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

              {/* TOP GLOW */}
              <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[180px]" />

              {/* RIGHT GLOW */}
              <div className="absolute top-[30%] right-[-150px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[180px]" />

              {/* BOTTOM GLOW */}
              <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[180px]" />

            </div>

            {/* NAVBAR */}
            <Navbar />

            {/* PAGE CONTENT */}
            <div className="relative">

              {children}

            </div>

            {/* FOOTER */}
            <Footer />

          </TransitionProvider>

        </SessionProvider>

      </body>

    </html>
  );
}