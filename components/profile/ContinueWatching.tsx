"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  useSession,
} from "next-auth/react";

import { supabase } from "@/lib/supabase";

export default function ContinueWatching() {

  const { data: session } =
    useSession();

  const [animeList, setAnimeList] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchProgress =
      async () => {

        if (
          !session?.user?.email
        ) return;

        const { data } =
          await supabase
            .from(
              "watch_progress"
            )
            .select("*")
            .eq(
              "user_email",
              session.user.email
            )
            .gt(
              "current_episode",
              0
            );

        if (!data) return;

        const animeData =
          await Promise.all(

            data.map(
              async (
                item: any
              ) => {

                const response =
                  await fetch(
                    `https://api.jikan.moe/v4/anime/${item.anime_id}`
                  );

                const anime =
                  await response.json();

                return {
                  ...anime.data,

                  current_episode:
                    item.current_episode,
                };

              }
            )

          );

        setAnimeList(
          animeData
        );

      };

    fetchProgress();

  }, [session]);

  if (
    animeList.length === 0
  ) {

    return null;

  }

  return (
    <section className="mt-32">

      <div className="mb-10">

        <h2 className="text-4xl font-black">

          Continue Watching

        </h2>

        <p className="text-zinc-400 mt-2">

          Continúa donde lo dejaste.

        </p>

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
                src={
                  anime.images.jpg
                    .large_image_url ||
                  anime.images.jpg
                    .image_url
                }
                alt={anime.title}
                width={400}
                height={600}
                className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* EPISODE */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-sm font-medium">

                EP {anime.current_episode}

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