import Container from "@/components/ui/Container";

import SectionHeader from "@/components/ui/SectionHeader";

import AnimeCard from "@/components/anime/AnimeCard";

import { getSeasonAnime } from "@/services/anime.service";

import { SEASONS } from "@/constants/seasons";

import Image from "next/image";

export default async function TemporadasPage() {

  const animeList = await getSeasonAnime();

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        <SectionHeader
          badge="Temporadas"
          title="Anime en emisión"
          description="Descubre los animes más populares de la temporada actual."
        />

        {/* SEASONS */}
        <div className="space-y-32">

          {SEASONS.map((season, index) => (

            <section
              key={season.title}
              className="space-y-10"
            >

              {/* BANNER */}
              <div className="relative overflow-hidden rounded-[40px] h-[400px]">

                <Image
                  src={season.image}
                  alt={season.title}
                  fill
                  className="object-cover"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-r ${season.color} via-black/60 to-transparent`}
                />

                <div className="relative z-10 h-full flex items-end p-10">

                  <div className="max-w-2xl">

                    <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-4">
                      Seasonal Anime
                    </p>

                    <h2 className="text-5xl md:text-7xl font-bold">
                      {season.title}
                    </h2>

                  </div>

                </div>

              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                {animeList
                  .slice(index * 5, index * 5 + 5)
                  .map((anime: any) => (

                    <AnimeCard
                      key={anime.mal_id}
                      id={anime.mal_id}
                      title={anime.title}
                      image={anime.images.jpg.image_url}
                      score={anime.score}
                    />

                  ))}

              </div>

            </section>

          ))}

        </div>

      </Container>

    </main>
  );
}