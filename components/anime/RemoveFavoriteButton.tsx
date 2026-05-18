"use client";

import { supabase } from "@/lib/supabase";

import { useSession } from "next-auth/react";

type RemoveFavoriteButtonProps = {
  animeId: number;
  onRemove: () => void;
};

export default function RemoveFavoriteButton({
  animeId,
  onRemove,
}: RemoveFavoriteButtonProps) {

  const { data: session } =
    useSession();

  const removeFavorite =
    async () => {

      if (!session?.user?.email)
        return;

      await supabase
        .from("favorites")
        .delete()
        .eq(
          "anime_id",
          animeId
        )
        .eq(
          "user_email",
          session.user.email
        );

      onRemove();

    };

  return (
    <button
      onClick={removeFavorite}
      className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 hover:bg-red-500 transition duration-300 flex items-center justify-center"
    >
      ✕
    </button>
  );
}