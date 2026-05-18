import Container from "../ui/Container";

import SeasonCard from "../anime/SeasonCard";

import Reveal from "@/components/ui/Reveal";

import { SEASONS } from "@/constants/seasons";

import Link from "next/link";

export default function SeasonsSection() {
  return (
    <section className="py-24">

      <Container>
        <Reveal>
          <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Temporadas Anime
          </h2>

          <Link href="/catalogo" className="text-zinc-400 hover:text-white transition">
            Ver todas
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {SEASONS.map((season) => (
            <SeasonCard
              key={season.title}
              title={season.title}
              image={season.image}
            />
          ))}

        </div>
        </Reveal>

      </Container>

    </section>
  );
}
