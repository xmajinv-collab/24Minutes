import Image from "next/image";

import Link from "next/link";

import { redirect } from "next/navigation";

import {
  getServerSession,
} from "next-auth";

import Container from "@/components/ui/Container";

import { supabase } from "@/lib/supabase";

import RecentlyViewed from "@/components/profile/RecentlyViewed";

import ProfileActivity from "@/components/profile/ProfileActivity";

import ProfileAchievements from "@/components/profile/ProfileAchievements";

import ContinueWatching from "@/components/profile/ContinueWatching";

export default async function PerfilPage() {

  const session =
    await getServerSession();

  if (!session) {

    redirect("/");

  }

  const { data: favorites } =
    await supabase
      .from("favorites")
      .select("*")
      .eq(
        "user_email",
        session.user?.email
      );

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute top-[-250px] left-[-200px] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[200px]" />

        <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px]" />

      </div>

      {/* HERO */}
      <section className="relative pt-40 pb-24 border-b border-white/10">

        <Container>

          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">

            {/* AVATAR */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-black/50 shrink-0">

              <Image
                src={
                  session.user?.image ||
                  "/default-avatar.png"
                }
                alt="Avatar"
                fill
                sizes="192px"
                className="object-cover"
              />

            </div>

            {/* CONTENT */}
            <div className="flex-1 text-center lg:text-left">

              {/* NAME */}
              <h1 className="text-5xl md:text-7xl font-black leading-none">

                {
                  session.user?.name
                }

              </h1>

              {/* EMAIL */}
              <p className="text-zinc-400 mt-4 text-lg">

                {
                  session.user?.email
                }

              </p>

              {/* BADGES */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">

                <div className="px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-sm">

                  Otaku

                </div>

                <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">

                  Premium User

                </div>

              </div>

              {/* STATS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    STATUS

                  </p>

                  <p className="font-bold text-lg">

                    Anime Collector

                  </p>

                </div>

                <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">

                  <p className="text-xs text-zinc-500 mb-1">

                    FAVORITES

                  </p>

                  <p className="font-bold text-lg">

                    {favorites?.length || 0}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* CONTENT */}
      <Container>

        <div className="space-y-28 pt-24 pb-32">

          {/* CONTINUE WATCHING */}
          <ContinueWatching />

          {/* FAVORITES */}
          <section>

            <div className="mb-8">

              <h2 className="text-4xl font-black">

                Tus favoritos

              </h2>

              <p className="text-zinc-400 mt-2">

                Tu colección personal anime.

              </p>

            </div>

            {favorites &&
            favorites.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                {favorites.map(
                  (anime: any) => (

                  <Link
                    key={anime.anime_id}
                    href={`/anime/${anime.anime_id}`}
                    className="group block"
                  >

                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 transition-all duration-700 group-hover:-translate-y-3 group-hover:border-white/20">

                      <Image
                        src={anime.image}
                        alt={anime.title}
                        width={400}
                        height={600}
                        className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {/* SCORE */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-sm font-medium">

                        ⭐ {anime.score}

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

            ) : (

              <div className="py-20 text-center border border-white/10 rounded-[32px] bg-white/[0.02]">

                <h3 className="text-3xl font-bold">

                  No tienes favoritos

                </h3>

                <p className="text-zinc-400 mt-4">

                  Empieza a añadir animes a tu colección.

                </p>

              </div>

            )}

          </section>

          {/* RECENTLY VIEWED */}
          <RecentlyViewed />

          {/* PROFILE ACTIVITY */}
          <ProfileActivity />

          {/* ACHIEVEMENTS */}
          <ProfileAchievements />

        </div>

      </Container>

    </main>
  );
}