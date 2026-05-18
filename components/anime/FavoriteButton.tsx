"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { useSession } from "next-auth/react";

type FavoriteButtonProps = {
  anime: {
    mal_id: number;
    title: string;
    image: string;
    score: number;
  };
};

export default function FavoriteButton({
  anime,
}: FavoriteButtonProps) {

  const { data: session } = useSession();

  const [isFavorite, setIsFavorite] =
    useState(false);

 useEffect(() => {

  const checkFavorite =
    async () => {

      if (!session?.user?.email)
        return;

      const { data } =
        await supabase
          .from("favorites")
          .select("*")
          .eq(
            "anime_id",
            anime.mal_id
          )
          .eq(
            "user_email",
            session.user.email
          );

      setIsFavorite(
        !!data?.length
      );

    };

  checkFavorite();

}, [
  anime.mal_id,
  session,
]);


  const toggleFavorite = async () => {

  if (!session?.user?.email) return;

  if (isFavorite) {

    await supabase
      .from("favorites")
      .delete()
      .eq(
        "anime_id",
        anime.mal_id
      )
      .eq(
        "user_email",
        session.user.email
      );

    setIsFavorite(false);

  } else {

    await supabase
      .from("favorites")
      .insert({
        user_email:
          session.user.email,

        anime_id:
          anime.mal_id,

        title:
          anime.title,

        image:
          anime.image,

        score:
          anime.score,
      });

    setIsFavorite(true);

  }

};
  return (
    <button
      onClick={toggleFavorite}
      className={`mt-8 px-6 py-3 rounded-2xl border transition duration-300 ${
        isFavorite
          ? "bg-red-500 text-white border-red-500"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      {isFavorite
        ? "❤️ En favoritos"
        : "🤍 Añadir a favoritos"}
    </button>
  );
}