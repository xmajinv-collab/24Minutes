"use client";

import Image from "next/image";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Container from "@/components/ui/Container";

export default function PerfilPage() {

  const { data: session } =
    useSession();

  const [favoritesCount,
    setFavoritesCount] =
      useState(0);

  useEffect(() => {

    const loadFavorites =
      async () => {

        if (!session?.user?.email)
          return;

        const { data } =
          await supabase
            .from("favorites")
            .select("*")
            .eq(
              "user_email",
              session.user.email
            );

        setFavoritesCount(
          data?.length || 0
        );

      };

    loadFavorites();

  }, [session]);

  if (!session) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-bold">
          Inicia sesión
        </h1>

      </main>
    );

  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        <div className="max-w-3xl mx-auto rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-12 shadow-2xl shadow-black/40">

          <div className="flex flex-col items-center text-center">

            {/* AVATAR */}
            {session?.user?.image && (

              <Image
                src={session?.user?.image}
                alt={session?.user?.name || "User"}
                width={140}
                height={140}
                className="rounded-full border-4 border-white/10 shadow-2xl"
              />

            )}

            {/* NAME */}
            <h1 className="text-5xl font-bold mt-8">
              {session?.user?.name}
            </h1>

            {/* EMAIL */}
            <p className="text-zinc-400 mt-4 text-lg">
              {session?.user?.email}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-8 mt-12 w-full">

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

                <h2 className="text-5xl font-bold">
                  {favoritesCount}
                </h2>

                <p className="text-zinc-400 mt-3">
                  Favoritos
                </p>

              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

                <h2 className="text-5xl font-bold">
                  ♡
                </h2>

                <p className="text-zinc-400 mt-3">
                  Otaku Level
                </p>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </main>
  );
}