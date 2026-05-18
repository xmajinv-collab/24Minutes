import {
  getAnimeById,
  getAnimeRecommendations,
} from "@/services/anime.service";

import Link from "next/link";

import Image from "next/image";

import SectionHeader from "@/components/ui/SectionHeader";

import AnimeSynopsis from "@/components/anime/AnimeSynopsis";

import FavoriteButton from "@/components/anime/FavoriteButton";

type AnimePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimePage({
  params,
}: AnimePageProps) {

  const { id } = await params;

  const anime = await getAnimeById(id);

  const recommendations =
    await getAnimeRecommendations(id);

  if (!anime) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Anime no encontrado
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen">

        {/* BACKGROUND */}
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          fill
          priority
          className="object-cover scale-110 blur-[3px]"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/60" />

        {/* GLOW */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[180px]" />

          <div className="absolute bottom-[0%] right-[-150px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[180px]" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 items-start">

            {/* COVER */}
            <div className="relative">

              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                width={400}
                height={620}
                priority
                className="w-full max-w-[400px] rounded-3xl border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] hover:-translate-y-2 transition duration-700"
              />

            </div>

            {/* INFO */}
            <div className="max-w-5xl">

              {/* TOP */}
              <div>

                <p className="uppercase tracking-[0.35em] text-zinc-400 text-sm mb-4">
                  Anime
                </p>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  {anime.title}
                </h1>

              </div>

              {/* SYNOPSIS + SCORE */}
              <div className="grid md:grid-cols-[1fr_200px] gap-8 mt-10">

                {/* SYNOPSIS */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                  <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-5">
                    Synopsis
                  </p>

                  <AnimeSynopsis
                    synopsis={anime.synopsis}
                  />

                </div>

                {/* SCORE */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center">

                  <div className="w-32 h-32 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shadow-2xl">

                    <div className="text-center">

                      <h3 className="text-5xl font-bold">
                        {anime.score || "?"}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        Score
                      </p>

                    </div>

                  </div>

                  <div className="mt-8 space-y-4 text-center text-zinc-300">

                    <p className="text-lg">
                      🎬 {anime.episodes || "?"} episodios
                    </p>

                    <p className="text-lg">
                      📺 {anime.status}
                    </p>

                    <p className="text-lg">
                      🏆 Rank #{anime.rank}
                    </p>

                  </div>

                </div>

                <FavoriteButton
                  anime={{
                    mal_id: anime.mal_id,
                    title: anime.title,
                    image: anime.images.jpg.large_image_url,
                    score: anime.score,
                  }}
                />

              </div>

              {/* TRAILER + DETAILS */}
              <div className="grid lg:grid-cols-2 gap-8 mt-10">

                {/* TRAILER */}
                {anime.trailer?.embed_url && (

                  <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                    <iframe
                      src={anime.trailer.embed_url}
                      title={anime.title}
                      allowFullScreen
                      className="w-full aspect-video"
                    />

                  </div>

                )}

                {/* DETAILS */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                  <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-8">
                    Details
                  </p>

                  <div className="space-y-6">

                    <div className="flex justify-between border-b border-white/10 pb-4">

                      <span className="text-zinc-400">
                        Source
                      </span>

                      <span>
                        {anime.source || "Unknown"}
                      </span>

                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-4">

                      <span className="text-zinc-400">
                        Season
                      </span>

                      <span className="capitalize">
                        {anime.season || "Unknown"}
                      </span>

                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-4">

                      <span className="text-zinc-400">
                        Year
                      </span>

                      <span>
                        {anime.year || "?"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-zinc-400">
                        Rating
                      </span>

                      <span>
                        {anime.rating || "N/A"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* GENRES */}
              <div className="mt-10 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-5">
                  Genres
                </p>

                <div className="flex flex-wrap gap-3">

                  {anime.genres.map((genre: any) => (

                    <div
                      key={genre.mal_id}
                      className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-white/20 transition"
                    >
                      {genre.name}
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-6 py-32">

        <SectionHeader
          badge="Recomendaciones"
          title="Más como esto"
        />

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

          {recommendations
            .slice(0, 10)
            .map((item: any) => (

              <Link
                key={item.entry.mal_id}
                href={`/anime/${item.entry.mal_id}`}
                className="group min-w-[220px] max-w-[220px] flex-shrink-0"
              >

                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                  <Image
                    src={
                      item.entry.images.jpg
                        .large_image_url
                    }
                    alt={item.entry.title}
                    width={300}
                    height={420}
                    className="w-full h-[320px] object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                </div>

                <h3 className="mt-4 font-semibold text-lg text-white group-hover:text-zinc-300 transition line-clamp-2">
                  {item.entry.title}
                </h3>

              </Link>

            ))}

        </div>

      </section>

    </main>
  );
}