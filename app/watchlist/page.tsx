"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { supabase } from "@/lib/supabase";

import AnimeCard from "@/components/anime/AnimeCard";

import RemoveFavoriteButton from "@/components/anime/RemoveFavoriteButton";

import Container from "@/components/ui/Container";

import SectionHeader from "@/components/ui/SectionHeader";

export default function WatchlistPage() {

  const [favorites, setFavorites] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const { data: session } =
    useSession();

  const removeFavorite =
    (animeId: number) => {

      setFavorites((prev) =>
        prev.filter(
          (anime) =>
            anime.anime_id !== animeId
        )
      );

    };

  useEffect(() => {

    const loadFavorites =
      async () => {

        if (!session?.user?.email) {

          setLoading(false);

          return;

        }

        const { data } =
          await supabase
            .from("favorites")
            .select("*")
            .eq(
              "user_email",
              session.user.email
            );

        setFavorites(data || []);

        setLoading(false);

      };

    loadFavorites();

  }, [session]);

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-2xl font-bold">
          Cargando...
        </h1>

      </main>
    );

  }

  if (!session) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-6">

        <h1 className="text-4xl font-bold">
          Inicia sesión
        </h1>

        <p className="text-zinc-400">
          Necesitas una cuenta para ver tu Watchlist.
        </p>

      </main>
    );

  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        <SectionHeader
          badge="Tu colección"
          title="Watchlist"
          description="Tus animes favoritos guardados."
        />

        {favorites.length === 0 ? (

          <div className="mt-24 flex flex-col items-center text-center">

            {/* ICON */}
            <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl backdrop-blur-xl shadow-2xl shadow-black/40">

              ❤️

            </div>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-white mt-10">
              Tu Watchlist está vacía
            </h2>

            {/* DESCRIPTION */}
            <p className="text-zinc-400 mt-5 max-w-md leading-relaxed">

              Guarda tus animes favoritos y crea
              tu colección personalizada.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {favorites.map((anime) => (

              <div
                key={anime.anime_id}
                className="relative"
              >

                <RemoveFavoriteButton
                  animeId={anime.anime_id}
                  onRemove={() =>
                    removeFavorite(
                      anime.anime_id
                    )
                  }
                />

                <AnimeCard
                  id={anime.anime_id}
                  title={anime.title}
                  image={anime.image}
                  score={anime.score}
                />

              </div>

            ))}

          </div>

        )}

      </Container>

    </main>
  );
}