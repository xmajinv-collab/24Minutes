"use client";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { HERO_CONTENT } from "@/constants/hero";
import SearchBar from "@/components/ui/SearchBar";
import  Overlay from "@/components/ui/Overlay";

import {motion} from "framer-motion";
import { fadeUp } from "@/animations/fade";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* CINEMATIC LIGHT */}
      <div className="absolute inset-0">

      {/* TOP LIGHT */}
      <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[180px] animate-pulse" />

      {/* RIGHT LIGHT */}
      <div className="absolute bottom-[-150px] right-[10%] w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[180px] animate-pulse" />

</div>

      {/* DARK OVERLAY */}
      <Overlay opacity="bg-black/30" />

      {/* GRADIENT */}
      <Overlay opacity="bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center h-full">

        <Container>

          <motion.div
            className="max-w-3xl pt-28 md:pt-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-sm text-zinc-200 mb-6 shadow-lg shadow-black/30">              
            {HERO_CONTENT.badge}
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
              {HERO_CONTENT.title}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              {HERO_CONTENT.description}
            </p>

            <div className="mt10">
              <SearchBar />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

             <Button>
              Explorar ahora
            </Button>

            <Button variant="secondary">
              Ver temporadas
            </Button>

            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 mt-12">

                {HERO_CONTENT.stats.map((stat) => (
                  <div key={stat.label}>

                    <h3 className="text-3xl font-bold">
                      {stat.value}
                    </h3>

                    <p className="text-zinc-400">
                      {stat.label}
                    </p>

                  </div>
                ))}


            </div>

          </motion.div>

        </Container>

      </div>

    </section>
  );
}
