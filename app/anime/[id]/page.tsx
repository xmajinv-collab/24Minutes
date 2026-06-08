import RecentlyViewedTracker from "@/components/anime/RecentlyViewedTracker";

import Image from "next/image";

import Container from "@/components/ui/Container";

import AnimeCard from "@/components/anime/AnimeCard";

import FavoriteButton from "@/components/anime/FavoriteButton";

import WatchProgress from "@/components/anime/WatchProgress";

import RatingSelector from "@/components/anime/RatingSelector";

import {
  getAnimeById,
  getAnimeRecommendations,
  getAnimeCharacters,
  getAnimePictures,
} from "@/services/anime.service";

type AnimePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimePage({
  params,
}: AnimePageProps) {

  const { id } =
    await params;

  const [
  anime,
  recommendations,
] = await Promise.all([

  getAnimeById(id),
  getAnimeRecommendations(id),

]);

let characters = [];
let pictures = [];

try {

  [characters, pictures] =
    await Promise.all([

      getAnimeCharacters(id),
      getAnimePictures(id),

    ]);

} catch {

  characters = [];
  pictures = [];

}

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[72vh] overflow-hidden">

        {/* TRACKER */}
        <RecentlyViewedTracker
          anime={{
            mal_id:
              anime.mal_id,

            title:
              anime.title,

            image:
              anime.images.jpg
                .large_image_url ||
              anime.images.jpg
                .image_url,

            score:
              anime.score,
          }}
        />

        {/* BACKDROP */}
        <Image
          src={
            anime.images.jpg
              .large_image_url ||
            anime.images.jpg
              .image_url
          }
          alt={anime.title}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover scale-110 blur-md opacity-30"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black" />

        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-cyan-500/10" />

        <Container>

          <div className="relative z-10 pt-36 pb-20 flex flex-col lg:flex-row gap-10 items-center lg:items-end">

            {/* POSTER */}
            <div className="relative w-[220px] h-[320px] md:w-[260px] md:h-[380px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 shrink-0">

              <Image
                src={
                  anime.images.jpg
                    .large_image_url ||
                  anime.images.jpg
                    .image_url
                }
                alt={anime.title}
                fill
                loading="eager"
                sizes="(max-width: 768px) 220px, 260px"
                className="object-cover"
              />

            </div>

            {/* CONTENT */}
            <div className="flex-1 max-w-4xl text-center lg:text-left">

              {/* GENRES */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">

                {anime.genres?.map(
                  (genre: any) => (

                    <span
                      key={genre.mal_id}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-sm text-zinc-200"
                    >

                      {genre.name}

                    </span>

                  )
                )}

              </div>

              {/* TITLE */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] max-w-4xl mx-auto lg:mx-0">

                {anime.title}

              </h1>

              {/* META */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    SCORE

                  </p>

                  <p className="font-bold text-lg">

                    ⭐ {anime.score}

                  </p>

                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    EPISODES

                  </p>

                  <p className="font-bold text-lg">

                    {anime.episodes || "?"}

                  </p>

                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    STATUS

                  </p>

                  <p className="font-bold text-lg">

                    {anime.status}

                  </p>

                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    YEAR

                  </p>

                  <p className="font-bold text-lg">

                    {anime.year || "?"}

                  </p>

                </div>

              </div>

              {/* STREAMING */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

                {[
                  "Crunchyroll",
                  "Netflix",
                  "Prime Video",
                  "Disney+",
                ].map((platform) => (

                  <div
                    key={platform}
                    className="px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-sm text-zinc-300 hover:bg-white/[0.08] transition"
                  >

                    {platform}

                  </div>

                ))}

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col lg:flex-row gap-6 mt-10 items-center lg:items-start">

                <FavoriteButton
                  anime={{
                    mal_id:
                      anime.mal_id,

                    title:
                      anime.title,

                    image:
                      anime.images.jpg
                        .image_url,

                    score:
                      anime.score,
                  }}
                />

                <div className="max-w-[320px] w-full">

                  <WatchProgress
                    animeId={
                      anime.mal_id
                    }
                    totalEpisodes={
                      anime.episodes || 0
                    }
                  />

                  <RatingSelector
                    animeId={
                      anime.mal_id
                    }
                  />

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* TRANSITION */}
      <div className="relative z-20 -mt-10 h-10 rounded-t-[40px] bg-black border-t border-white/10" />

      <Container>

        {/* SYNOPSIS + TRAILER */}
        <section className="mt-20 grid lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* SYNOPSIS */}
          <div className="max-w-2xl">

            <h2 className="text-4xl font-bold mb-6">

              Synopsis

            </h2>

            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">

              {anime.synopsis}

            </p>

          </div>

          {/* TRAILER */}
          {anime.trailer?.embed_url && (

            <div>

              <h2 className="text-3xl font-bold mb-6">

                Trailer

              </h2>

              <div className="relative aspect-video rounded-[28px] overflow-hidden border border-white/10 shadow-2xl shadow-black/40">

                <iframe
                  src={
                    anime.trailer
                      .embed_url
                  }
                  allowFullScreen
                  className="w-full h-full"
                />

              </div>

            </div>

          )}

        </section>

        {/* RECOMMENDATIONS */}
        <section className="mt-28">

          <div className="mb-8">

            <h2 className="text-4xl font-bold">

              Recommendations

            </h2>

            <p className="text-zinc-500 mt-2">

              Similar anime you may enjoy.

            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {recommendations
            ?.slice(0, 10)
            .map((rec: any) => (

              <AnimeCard
                key={rec.entry.mal_id}
                id={rec.entry.mal_id}
                title={rec.entry.title}
                image={
                  rec.entry.images.jpg.large_image_url ||
                  rec.entry.images.jpg.image_url
                }
                score={0}
              />

))}

          </div>

        </section>

        {/* SCREENSHOTS */}
        <section className="mt-28">

          <div className="mb-8">

            <h2 className="text-3xl font-bold">

              Screenshots

            </h2>

            <p className="text-zinc-500 mt-2">

              Cinematic moments from the anime.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {pictures
              ?.slice(0, 6)
              .map(
                (
                  picture: any,
                  index: number
                ) => (

                <div
                  key={index}
                  className="relative aspect-video rounded-[28px] overflow-hidden border border-white/10 group"
                >

                  <Image
                    src={
                      picture.jpg
                        .large_image_url ||

                      picture.jpg
                        .image_url
                    }
                    alt="Anime Screenshot"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                </div>

              ))}

          </div>

        </section>

        {/* CHARACTERS */}
        <section className="mt-28 pb-32">

          <div className="mb-8">

            <h2 className="text-3xl font-bold">

              Characters

            </h2>

            <p className="text-zinc-500 mt-2">

              Main cast and important roles.

            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

            {characters
              ?.slice(0, 12)
              .map((character: any) => (

              <div
                key={
                  character.character
                    .mal_id
                }
                className="group bg-white/[0.03] border border-white/10 rounded-[28px] overflow-hidden hover:bg-white/[0.05] transition duration-300"
              >

                <div className="relative h-[220px] overflow-hidden">

                  <Image
                    src={
                      character.character
                        .images.jpg
                        .image_url
                    }
                    alt={
                      character.character
                        .name
                    }
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                <div className="p-4">

                  <h3 className="font-semibold text-white line-clamp-1">

                    {
                      character.character
                        .name
                    }

                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">

                    {character.role}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

      </Container>

    </main>
  );
}