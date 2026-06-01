import HeroSection from "@/components/sections/HeroSection";

import TrendingSection from "@/components/sections/TrendingSection";

import SeasonsSection from "@/components/sections/SeasonsSection";

import NewsSection from "@/components/home/NewsSection";

import AnimeAssistant from "@/components/ai/AnimeAssistant";

import ContinueWatching from "@/components/profile/ContinueWatching";

import FavoritesPreview from "@/components/home/FavoritesPreview";

export default async function Home() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <HeroSection />

      {/* PERSONALIZED */}
      <section className="relative z-20 -mt-20 rounded-t-[40px] bg-black border-t border-white/10 pt-24">

        <div className="space-y-28">

          {/* CONTINUE WATCHING */}
          <ContinueWatching />

          {/* FAVORITES */}
          <FavoritesPreview />

        </div>

      </section>

      {/* DISCOVER */}
      <section className="mt-32">

        <div className="space-y-32">

          {/* TRENDING */}
          <TrendingSection />

          {/* SEASONS */}
          <SeasonsSection />

        </div>

      </section>

      {/* AI */}
      <section className="mt-40">

        <AnimeAssistant />

      </section>

      {/* NEWS */}
      <section className="mt-40 pb-32">

        <NewsSection />

      </section>

    </main>
  );
}