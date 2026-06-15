"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { supabase } from "@/lib/supabase";

type Achievement = {
  title: string;
  description: string;
  icon: string;
};

export default function ProfileAchievements() {

  const { data: session } =
    useSession();

  const [achievements,
    setAchievements] =
    useState<
      Achievement[]
    >([]);

  useEffect(() => {

    const loadAchievements =
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
            .select("*")
            .eq(
              "user_email",
              email
            ),

          supabase
            .from(
              "anime_ratings"
            )
            .select("*")
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

        const favorites =
          favoritesRes.data
            ?.length || 0;

        const ratings =
          ratingsRes.data
            ?.length || 0;

        const episodes =
          progressRes.data
            ?.reduce(
              (
                acc,
                anime
              ) =>
                acc +
                (
                  anime.current_episode ||
                  0
                ),
              0
            ) || 0;

        const hours =
          Math.floor(
            (episodes *
              24) /
              60
          );

        const unlocked:
          Achievement[] =
          [];

        // FAVORITOS
        if (
          favorites >= 1
        ) {

          unlocked.push({
            title:
              "Anime Collector",

            description:
              "Añadiste tu primer favorito.",

            icon:
              "🏆",
          });

        }

        if (
          favorites >= 10
        ) {

          unlocked.push({
            title:
              "Coleccionista",

            description:
              "Tienes 10 favoritos.",

            icon:
              "❤️",
          });

        }

        // EPISODIOS
        if (
          episodes >= 50
        ) {

          unlocked.push({
            title:
              "Maratón Inicial",

            description:
              "Viste 50 episodios.",

            icon:
              "🍿",
          });

        }

        if (
          episodes >= 200
        ) {

          unlocked.push({
            title:
              "Otaku Veterano",

            description:
              "Viste 200 episodios.",

            icon:
              "📺",
          });

        }

        // HORAS
        if (
          hours >= 50
        ) {

          unlocked.push({
            title:
              "Night Watcher",

            description:
              "Superaste las 50 horas de anime.",

            icon:
              "🌙",
          });

        }

        if (
          hours >= 200
        ) {

          unlocked.push({
            title:
              "Rey Otaku",

            description:
              "Superaste las 200 horas vistas.",

            icon:
              "👑",
          });

        }

        // RATINGS
        if (
          ratings >= 10
        ) {

          unlocked.push({
            title:
              "Crítico Novato",

            description:
              "Valoraste 10 animes.",

            icon:
              "⭐",
          });

        }

        // MEMBRO
        unlocked.push({
          title:
            "24 MINUTES Member",

          description:
            "Formas parte de la plataforma.",

          icon:
            "🔥",
        });

        setAchievements(
          unlocked
        );

      };

    loadAchievements();

  }, [session]);

  return (
    <section className="mt-32">

      <div className="mb-10">

        <h2 className="text-4xl font-black">

          Logros

        </h2>

        <p className="text-zinc-400 mt-2">

          Tu progreso dentro de 24 MINUTES.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {achievements.map(
          (
            achievement,
            index
          ) => (

            <div
              key={index}
              className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
            >

              <div className="text-5xl mb-5">

                {
                  achievement.icon
                }

              </div>

              <h3 className="text-2xl font-bold text-white">

                {
                  achievement.title
                }

              </h3>

              <p className="text-zinc-400 mt-3 leading-relaxed">

                {
                  achievement.description
                }

              </p>

            </div>

          )
        )}

      </div>

    </section>
  );
}