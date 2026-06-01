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

export default function FavoritesPreview() {

  const { data: session } =
    useSession();

  const [favorites, setFavorites] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchFavorites =
      async () => {

        if (
          !session?.user?.email
        ) return;

        const { data } =
          await supabase
            .from("favorites")
            .select("*")
            .eq(
              "user_email",
              session.user.email
            )
            .limit(10);

        setFavorites(
          data || []
        );

      };

    fetchFavorites();

  }, [session]);

  if (
    favorites.length === 0
  ) {

    return null;

  }

  return (
    <section className="mt-32">

      <div className="mb-8">

        <h2 className="text-4xl font-black">

          Tus favoritos

        </h2>

        <p className="text-zinc-400 mt-2">

          Tus animes favoritos rápidamente.

        </p>

      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

        {favorites.map(
          (
            anime,
            index
          ) => (

          <Link
            key={`${anime.anime_id}-${index}`}
            href={`/anime/${anime.anime_id}`}
            className="min-w-[180px] group"
          >

            <div className="relative overflow-hidden rounded-[24px] border border-white/10">

              <Image
                src={anime.image}
                alt={anime.title}
                width={300}
                height={450}
                className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

              <div className="absolute bottom-0 p-4">

                <p className="font-semibold text-white line-clamp-2">

                  {anime.title}

                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}