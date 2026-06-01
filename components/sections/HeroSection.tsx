"use client";

import Container from "@/components/ui/Container";

import Button from "@/components/ui/Button";

import { HERO_CONTENT } from "@/constants/hero";

import SearchBar from "@/components/ui/SearchBar";

import Overlay from "@/components/ui/Overlay";

import { motion } from "framer-motion";

import { fadeUp } from "@/animations/fade";

import DynamicHeroBackground from "@/components/home/DynamicHeroBackground";

export default function HeroSection() {

  return (
    <section className="relative min-h-[760px] md:min-h-screen overflow-hidden">

      {/* DYNAMIC HERO BACKGROUND */}
      <DynamicHeroBackground />

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 opacity-70"
      >

        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />

      </video>

      {/* CINEMATIC LIGHTS */}
      <div className="absolute inset-0 overflow-hidden">

        {/* TOP LIGHT */}
        <div className="absolute top-[-250px] left-[5%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-fuchsia-500/20 rounded-full blur-[180px] animate-pulse" />

        {/* RIGHT LIGHT */}
        <div className="absolute bottom-[-250px] right-[5%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-cyan-500/20 rounded-full blur-[180px] animate-pulse" />

      </div>

      {/* OVERLAYS */}
      <Overlay opacity="bg-black/60" />

      <Overlay opacity="bg-gradient-to-r from-black via-black/70 to-black/20" />

      <Overlay opacity="bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center min-h-[760px] md:min-h-screen">

        <Container>

          <motion.div
            className="max-w-4xl pt-24 md:pt-20"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm text-zinc-200 mb-6 shadow-xl shadow-black/20">

              {HERO_CONTENT.badge}

            </div>

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight max-w-5xl">

              {HERO_CONTENT.title}

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-zinc-300 text-base md:text-xl leading-relaxed max-w-2xl">

              {HERO_CONTENT.description}

            </p>

            {/* SEARCH */}
            <div className="mt-8 max-w-2xl">

              <SearchBar />

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Button href="/catalogo">
                Explorar ahora
              </Button>

              <Button variant="secondary"
              href="/temporadas">
                Ver temporadas
              </Button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:flex gap-4 md:gap-8 mt-12">

              {HERO_CONTENT.stats.map(
                (stat) => (

                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl px-5 py-4 min-w-[120px]"
                  >

                    <h3 className="text-2xl md:text-3xl font-black">

                      {stat.value}

                    </h3>

                    <p className="text-zinc-400 mt-1 text-sm">

                      {stat.label}

                    </p>

                  </div>

                )
              )}

            </div>

          </motion.div>

        </Container>

      </div>

    </section>
  );
}