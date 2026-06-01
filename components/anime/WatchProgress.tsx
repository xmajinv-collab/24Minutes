"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

import { supabase } from "@/lib/supabase";

type Props = {
  animeId: number;

  totalEpisodes: number;
};

export default function WatchProgress({
  animeId,
  totalEpisodes,
}: Props) {

  const { data: session } =
    useSession();

  const [episode, setEpisode] =
    useState(0);

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
              "anime_id",
              animeId
            )
            .eq(
              "user_email",
              session.user.email
            )
            .single();

        if (data) {

          setEpisode(
            data.current_episode
          );

        }

      };

    fetchProgress();

  }, [
    animeId,
    session,
  ]);

  const updateEpisode =
    async (
      value: number
    ) => {

      if (
        !session?.user?.email
      ) return;

      const newEpisode =
        Math.max(
          0,
          Math.min(
            totalEpisodes,
            value
          )
        );

      setEpisode(
        newEpisode
      );

      await supabase
        .from(
          "watch_progress"
        )
        .upsert({
          anime_id: animeId,

          user_email:
            session.user.email,

          current_episode:
            newEpisode,
        });

    };

  return (
    <div className="mt-10 p-6 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl">

      <p className="text-zinc-400 mb-5">

        Watch Progress

      </p>

      <div className="flex items-center gap-6">

        <button
          onClick={() =>
            updateEpisode(
              episode - 1
            )
          }
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >

          −

        </button>

        <div>

          <p className="text-3xl font-black">

            {episode}

            <span className="text-zinc-500">

              {" "}
              /{" "}

              {
                totalEpisodes ||
                "?"
              }

            </span>

          </p>

        </div>

        <button
          onClick={() =>
            updateEpisode(
              episode + 1
            )
          }
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >

          +

        </button>

      </div>

    </div>
  );
}