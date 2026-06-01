import SeasonCard from "../anime/SeasonCard";

import Reveal from "@/components/ui/Reveal";

import { SEASONS } from "@/constants/seasons";

import Link from "next/link";

export default function SeasonsSection() {

  return (
    <section className="py-8 md:py-12">

      <Reveal>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-black">

              Temporadas Anime

            </h2>

            <p className="text-zinc-500 mt-2">

              Explora las temporadas disponibles.

            </p>

          </div>

          <Link
            href="/catalogo"
            className="text-zinc-400 hover:text-white transition"
          >

            Ver catálogo →

          </Link>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {SEASONS.map(
            (season) => (

            <SeasonCard
              key={season.slug}
              title={season.title}
              image={season.image}
              slug={season.slug}
            />

          ))}

        </div>

      </Reveal>

    </section>
  );
}