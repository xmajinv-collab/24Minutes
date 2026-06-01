"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

export default function RecentlyViewed() {

  const [animeList, setAnimeList] =
    useState<any[]>([]);

    const averageScore =
  animeList.length > 0
    ? (
        animeList.reduce(
          (
            acc,
            anime
          ) =>
            acc +
            (anime.score || 0),
          0
        ) /
        animeList.length
      ).toFixed(1)
    : "0";

  useEffect(() => {

    const stored =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        ) || "[]"
      );

    setAnimeList(stored);

  }, []);

  if (
    animeList.length === 0
  ) {

    return null;

  }

  return (
    <section className="mt-32">

      <div className="mb-10">

        <h2 className="text-4xl font-black">

          Vistos recientemente

        </h2>

        <p className="text-zinc-400 mt-2">

          Continúa explorando anime.

        </p>

      </div>

            {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

        <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

            <p className="text-zinc-500 text-sm mb-2">

            RECENTLY VIEWED

            </p>

            <p className="text-3xl font-black">

            {animeList.length}

            </p>

        </div>

        <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

            <p className="text-zinc-500 text-sm mb-2">

            AVG SCORE

            </p>

            <p className="text-3xl font-black">

            ⭐ {averageScore}

            </p>

        </div>

        <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

            <p className="text-zinc-500 text-sm mb-2">

            STATUS

            </p>

            <p className="text-3xl font-black">

            OTAKU

            </p>

        </div>

        <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

            <p className="text-zinc-500 text-sm mb-2">

            PLATFORM

            </p>

            <p className="text-3xl font-black">

            24M

            </p>

        </div>

        </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {animeList.map(
          (
            anime,
            index
          ) => (

          <Link
            key={`${anime.mal_id}-${index}`}
            href={`/anime/${anime.mal_id}`}
            className="group block"
          >

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 transition-all duration-700 group-hover:-translate-y-3 group-hover:border-white/20">

              <Image
                src={anime.image}
                alt={anime.title}
                width={400}
                height={600}
                className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* SCORE */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-sm font-medium">

                ⭐ {anime.score}

              </div>

              {/* TITLE */}
              <div className="absolute bottom-0 p-5 w-full">

                <h3 className="font-semibold text-lg text-white line-clamp-2">

                  {anime.title}

                </h3>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}