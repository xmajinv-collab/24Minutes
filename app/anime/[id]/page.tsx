import Image from "next/image";

import Link from "next/link";

import Container from "@/components/ui/Container";

import FavoriteButton from "@/components/anime/FavoriteButton";

import AnimeSynopsis from "@/components/anime/AnimeSynopsis";
import { Metadata } from "next";

import {
  getAnimeById,
  getAnimeRecommendations,
} from "@/services/anime.service";

type AnimePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: AnimePageProps): Promise<Metadata> {

  const { id } = await params;

  const anime =
    await getAnimeById(id);

  return {

    title: `${anime.title} | 24 MINUTES`,

    description:
      anime.synopsis?.slice(
        0,
        160
      ) ||
      "Descubre anime en 24 MINUTES.",

    openGraph: {

      title: anime.title,

      description:
        anime.synopsis?.slice(
          0,
          160
        ),

      images: [
        {
          url:
            anime.images.jpg
              .large_image_url ||
            anime.images.jpg
              .image_url,
        },
      ],

    },

  };
}

export default async function AnimePage({
  params,
}: AnimePageProps) {

  const { id } = await params;

  const anime =
    await getAnimeById(id);

  const recommendations =
    await getAnimeRecommendations(id);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKDROP */}
      <div className="relative h-[75vh] w-full overflow-hidden">

        <Image
          src={
            anime.images.jpg.large_image_url ||
            anime.images.jpg.image_url
          }
          alt={anime.title}
          fill
          priority
          className="object-cover opacity-30 scale-110"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      </div>

      {/* CONTENT */}
      <Container>

        <div className="relative -mt-72 z-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-14">

          {/* LEFT SIDE */}
          <div>

            {/* POSTER */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-2xl shadow-black/50">

              <Image
                src={
                  anime.images.jpg.large_image_url ||
                  anime.images.jpg.image_url
                }
                alt={anime.title}
                width={500}
                height={750}
                className="w-full object-cover"
              />

            </div>

            {/* FAVORITE */}
            <div className="mt-8">

             <FavoriteButton
              anime={{
                mal_id: anime.mal_id,
                title: anime.title,
                image:
                  anime.images.jpg
                    .large_image_url ||
                  anime.images.jpg
                    .image_url,
                score: anime.score,
              }}
            />

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 mt-8 w-full">

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">

                <p className="text-zinc-400 text-sm">
                  Episodios
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {anime.episodes || "?"}
                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">

                <p className="text-zinc-400 text-sm">
                  Estado
                </p>

                <h3 className="text-lg font-semibold mt-1">
                  {anime.status}
                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">

                <p className="text-zinc-400 text-sm">
                  Ranking
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  #{anime.rank}
                </h3>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="pb-24">

            {/* TITLE */}
            <div className="flex flex-wrap items-center gap-4">

              <h1 className="text-5xl md:text-7xl font-black leading-tight">

                {anime.title}

              </h1>

              <div className="px-5 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/20 text-yellow-300 text-lg font-semibold backdrop-blur-xl">

                ⭐ {anime.score || "N/A"}

              </div>

            </div>

            {/* META */}
            <div className="flex flex-wrap gap-3 mt-8">

              {anime.genres?.map(
                (genre: any) => (

                  <span
                    key={genre.mal_id}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 backdrop-blur-xl"
                  >
                    {genre.name}
                  </span>

                )
              )}

            </div>

            {/* SYNOPSIS */}
            <div className="mt-12">

              <AnimeSynopsis
                synopsis={
                  anime.synopsis
                }
              />

            </div>

            {/* TRAILER */}
            {anime.trailer?.embed_url && (

              <div className="mt-16">

                <h2 className="text-3xl font-bold mb-6">
                  Trailer
                </h2>

                <div className="overflow-hidden rounded-[32px] border border-white/10 shadow-2xl shadow-black/40">

                  <iframe
                    src={
                      anime.trailer
                        .embed_url
                    }
                    title="Trailer"
                    allowFullScreen
                    className="w-full aspect-video"
                  />

                </div>

              </div>

            )}

            {/* RECOMMENDATIONS */}
            {recommendations?.length > 0 && (

              <div className="mt-20">

                <h2 className="text-3xl font-bold mb-8">
                  Recomendados
                </h2>

                <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">

                  {recommendations
                    .slice(0, 10)
                    .map((item: any) => (

                      <Link
                        key={
                          item.entry.mal_id
                        }
                        href={`/anime/${item.entry.mal_id}`}
                        className="group min-w-[220px] max-w-[220px] flex-shrink-0 snap-start transition duration-500 hover:-translate-y-2"
                      >

                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-xl shadow-black/40">

                          <Image
                            src={
                              item.entry
                                .images.jpg
                                .large_image_url ||
                              item.entry
                                .images.jpg
                                .image_url
                            }
                            alt={
                              item.entry.title
                            }
                            width={220}
                            height={330}
                            className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                          <div className="absolute bottom-0 p-4">

                            <h3 className="font-semibold text-white line-clamp-2">

                              {
                                item.entry
                                  .title
                              }

                            </h3>

                          </div>

                        </div>

                      </Link>

                    ))}

                </div>

              </div>

            )}

          </div>

        </div>

      </Container>

    </main>
  );
}