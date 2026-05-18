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

  title: "24 MINUTES",

  description:
    "Descubre anime, crea tu watchlist y explora nuevos mundos.",

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="bg-black text-white overflow-x-hidden">

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