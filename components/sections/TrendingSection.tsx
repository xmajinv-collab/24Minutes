import Link from "next/link";

import Container from "@/components/ui/Container";

import SectionHeader from "@/components/ui/SectionHeader";

import AnimeCard from "@/components/anime/AnimeCard";

import {
  getTopAnime,
} from "@/services/anime.service";

export default async function TrendingSection() {

  const animeList =
    await getTopAnime();

  return (
    <section className="relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden -z-10">

        <div className="absolute top-0 left-[10%] w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[160px]" />

      </div>

      <Container>

        {/* HEADER */}
        <div className="flex items-end justify-between gap-8 mb-14">

          <SectionHeader
            badge="Trending"
            title="Top Anime"
            description="Los animes más populares del momento."
          />

          <Link
            href="/catalogo"
            className="hidden md:flex px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-xl"
          >
            Ver más
          </Link>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {animeList
            .slice(0, 10)
            .map((anime) => (

              <AnimeCard
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title}
                image={
                  anime.images?.jpg?.image_url 
                }
                score={anime.score}
              />

            ))}

        </div>

      </Container>

    </section>
  );
}