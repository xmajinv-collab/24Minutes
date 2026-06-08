"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { supabase } from "@/lib/supabase";

export default function ProfileStats() {

  const { data: session } =
    useSession();

  const [favorites, setFavorites] =
    useState(0);

  const [ratings, setRatings] =
    useState(0);

  const [episodes, setEpisodes] =
    useState(0);

  const [hours, setHours] =
    useState(0);

  useEffect(() => {

    const loadStats =
      async () => {

        if (
          !session?.user?.email
        ) return;

        const email =
          session.user.email;

        const [
          favoritesRes,
          ratingsRes,
          progressRes,
        ] = await Promise.all([

          supabase
            .from("favorites")
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq(
              "user_email",
              email
            ),

          supabase
            .from(
              "anime_ratings"
            )
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq(
              "user_email",
              email
            ),

          supabase
            .from(
              "watch_progress"
            )
            .select(
              "current_episode"
            )
            .eq(
              "user_email",
              email
            ),

        ]);

        const totalEpisodes =
          progressRes.data
            ?.reduce(
              (
                acc,
                item: any
              ) =>
                acc +
                (
                  item.current_episode ||
                  0
                ),
              0
            ) || 0;

        setFavorites(
          favoritesRes.count || 0
        );

        setRatings(
          ratingsRes.count || 0
        );

        setEpisodes(
          totalEpisodes
        );

        setHours(
          Math.floor(
            (totalEpisodes *
              24) /
              60
          )
        );

      };

    loadStats();

  }, [session]);

  return (

    <section>

      <div className="mb-8">

        <h2 className="text-4xl font-black">

          Estadísticas

        </h2>

        <p className="text-zinc-400 mt-2">

          Tu progreso dentro de 24 MINUTES.

        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10">

          <p className="text-zinc-500 text-sm">

            FAVORITOS

          </p>

          <h3 className="text-4xl font-black mt-3">

            ❤️ {favorites}

          </h3>

        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10">

          <p className="text-zinc-500 text-sm">

            VALORADOS

          </p>

          <h3 className="text-4xl font-black mt-3">

            🎯 {ratings}

          </h3>

        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10">

          <p className="text-zinc-500 text-sm">

            EPISODIOS

          </p>

          <h3 className="text-4xl font-black mt-3">

            📺 {episodes}

          </h3>

        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10">

          <p className="text-zinc-500 text-sm">

            HORAS VISTAS

          </p>

          <h3 className="text-4xl font-black mt-3">

            ⏱ {hours}h

          </h3>

        </div>

      </div>

    </section>

  );

}