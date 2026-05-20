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

  title: {
    default: "24 MINUTES",
    template: "%s | 24 MINUTES",
  },

  description:
    "Explora temporadas, descubre nuevos animes y vive tu universo anime.",

  keywords: [
    "anime",
    "anime streaming",
    "anime catalog",
    "anime recommendations",
    "24 minutes",
    "otaku",
    "anime platform",
  ],

  metadataBase: new URL(
    "https://24-minutes.vercel.app"
  ),

  openGraph: {

    title: "24 MINUTES",

    description:
      "Explora temporadas, descubre nuevos animes y vive tu universo anime.",

    url:
      "https://24-minutes.vercel.app",

    siteName: "24 MINUTES",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],

    locale: "es_ES",

    type: "website",

  },

  twitter: {

    card: "summary_large_image",

    title: "24 MINUTES",

    description:
      "Explora temporadas, descubre nuevos animes y vive tu universo anime.",

    images: ["/og-image.jpg"],

  },

  icons: {

    icon: "/favicon.ico",

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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="bg-black text-white overflow-x-hidden selection:bg-fuchsia-500/30 selection:text-white">

        <SessionProvider>

          <TransitionProvider>

            {/* GLOBAL BACKGROUND */}
            <div className="fixed inset-0 -z-10 overflow-hidden">

              {/* TOP GLOW */}
              <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[180px]" />

              {/* RIGHT GLOW */}
              <div className="absolute top-[30%] right-[-150px] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[180px]" />

              {/* BOTTOM GLOW */}
              <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[180px]" />

            </div>

            {/* NAVBAR */}
            <Navbar />

            {/* PAGE CONTENT */}
            {children}

            {/* FOOTER */}
            <Footer />

          </TransitionProvider>

        </SessionProvider>

      </body>

    </html>
  );
}