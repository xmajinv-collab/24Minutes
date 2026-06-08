"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { supabase } from "@/lib/supabase";

type Props = {
  animeId: number;
};

export default function RatingSelector({
  animeId,
}: Props) {

  const { data: session } =
    useSession();

  const [rating, setRating] =
    useState<number | null>(null);

  useEffect(() => {

    const loadRating =
      async () => {

        if (!session?.user?.email)
          return;

        const { data } =
          await supabase
            .from("anime_ratings")
            .select("*")
            .eq(
              "user_email",
              session.user.email
            )
            .eq(
              "anime_id",
              animeId
            )
            .single();

        if (data) {

          setRating(
            data.rating
          );

        }

      };

    loadRating();

  }, [
    animeId,
    session,
  ]);

  const saveRating =
    async (
      value: number
    ) => {

      if (
        !session?.user?.email
      ) return;

      setRating(value);

      await supabase
        .from(
          "anime_ratings"
        )
        .upsert({
          user_email:
            session.user.email,

          anime_id:
            animeId,

          rating:
            value,
        });

    };

  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">

      <h3 className="text-xl font-bold mb-4">

        🎯 Mi valoración

      </h3>

      <div className="grid grid-cols-5 gap-3">

        {Array.from(
          { length: 10 },
          (_, i) => i + 1
        ).map((value) => (

          <button
            key={value}
            onClick={() =>
              saveRating(
                value
              )
            }
            className={`h-12 rounded-2xl font-bold transition ${
              rating === value
                ? "bg-fuchsia-500 text-white"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >

            {value}

          </button>

        ))}

      </div>

    </div>

  );

}