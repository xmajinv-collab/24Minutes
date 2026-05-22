import Image from "next/image";

import Container from "@/components/ui/Container";

import AnimeCard from "@/components/anime/AnimeCard";

import FavoriteButton from "@/components/anime/FavoriteButton";

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

  const anime =
    await getAnimeById(id);

  const recommendations =
    await getAnimeRecommendations(id);

  const characters =
    await getAnimeCharacters(id);

  const pictures =
    await getAnimePictures(id);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* BACKDROP */}
      <div className="relative h-[70vh] overflow-hidden">

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
          className="object-cover blur-sm scale-110 opacity-30"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <Container>

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-end h-[70vh] pb-16">

            {/* POSTER */}
            <div className="relative w-[280px] h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 shrink-0">

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
                className="object-cover"
                sizes="280px"
              />

            </div>

            {/* CONTENT */}
            <div className="max-w-4xl">

              {/* TITLE */}
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95]">

                {anime.title}

              </h1>

              {/* GENRES */}
              <div className="flex flex-wrap gap-3 mt-6">

                {anime.genres?.map(
                  (genre: any) => (

                    <span
                      key={genre.mal_id}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm backdrop-blur-xl"
                    >

                      {genre.name}

                    </span>

                  )
                )}

              </div>

              {/* INFO BAR */}
              <div className="flex flex-wrap gap-4 mt-10">

                {/* STREAMING */}
                <div className="mt-10">

                  <p className="text-sm text-zinc-500 mb-4">

                    AVAILABLE ON

                  </p>

                  <div className="flex flex-wrap gap-4">

                    {[
                      "Crunchyroll",
                      "Netflix",
                      "Prime Video",
                      "Disney+",
                    ].map((platform) => (

                      <div
                        key={platform}
                        className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-sm text-zinc-300 hover:bg-white/10 transition"
                      >

                        {platform}

                      </div>

                    ))}

                  </div>

                </div>

                {/* SCORE */}
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">
                    SCORE
                  </p>

                  <p className="font-bold text-lg">
                    ⭐ {anime.score}
                  </p>

                </div>

                {/* EPISODES */}
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">
                    EPISODES
                  </p>

                  <p className="font-bold text-lg">
                    {anime.episodes || "?"}
                  </p>

                </div>

                {/* STATUS */}
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">
                    STATUS
                  </p>

                  <p className="font-bold text-lg">
                    {anime.status}
                  </p>

                </div>

                {/* YEAR */}
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">
                    YEAR
                  </p>

                  <p className="font-bold text-lg">
                    {anime.year || "?"}
                  </p>

                </div>

                {/* RANK */}
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">
                    RANK
                  </p>

                  <p className="font-bold text-lg">
                    #{anime.rank || "?"}
                  </p>

                </div>

              </div>

              {/* FAVORITE BUTTON */}
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

            </div>

          </div>

          {/* SCREENSHOTS */}
<section className="mt-32">

  <div className="flex items-center justify-between mb-10">

    <h2 className="text-4xl font-bold">

      Screenshots

    </h2>

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
          className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group"
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
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

        </div>

      ))}

  </div>

</section>

        </Container>

      </div>

      {/* CONTENT */}
      <Container>

        {/* SYNOPSIS */}
        <section className="mt-20 max-w-4xl">

          <h2 className="text-4xl font-bold mb-8">

            Synopsis

          </h2>

          <p className="text-zinc-300 leading-relaxed text-lg">

            {anime.synopsis}

          </p>

        </section>

        {/* TRAILER */}
        {anime.trailer?.embed_url && (

          <section className="mt-24">

            <h2 className="text-4xl font-bold mb-10">

              Trailer

            </h2>

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">

              <iframe
                src={
                  anime.trailer
                    .embed_url
                }
                allowFullScreen
                className="w-full h-full"
              />

            </div>

          </section>

        )}

        {/* RECOMMENDATIONS */}
        <section className="mt-32">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl font-bold">

              Recommendations

            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {recommendations
              ?.slice(0, 10)
              .map((rec: any) => (

              <AnimeCard
                key={
                  rec.entry.mal_id
                }
                id={
                  rec.entry.mal_id
                }
                title={
                  rec.entry.title
                }
                image={
                  rec.entry.images.jpg
                    .image_url
                }
                score={0}
              />

            ))}

          </div>

        </section>

        {/* CHARACTERS */}
        <section className="mt-32">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl font-bold">

              Characters

            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {characters
              ?.slice(0, 12)
              .map((character: any) => (

              <div
                key={
                  character.character
                    .mal_id
                }
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition duration-300"
              >

                <div className="relative h-[260px] overflow-hidden">

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
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    fill
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

                  <p className="text-zinc-400 text-sm mt-2">

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