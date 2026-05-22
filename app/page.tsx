import HeroSection from "@/components/sections/HeroSection";

import TrendingSection from "@/components/sections/TrendingSection";

import SeasonsSection from "@/components/sections/SeasonsSection";

import NewsSection from "@/components/home/NewsSection";  

export default async function Home() {

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <HeroSection />

      {/* TRENDING */}
      <div className="mt-32">
        <TrendingSection />
      </div>

      {/* SEASONS */}
      <div className="mt-40">
        <SeasonsSection />
      </div>

      {/* NEWS */}
      <div className="mt-40">
        <NewsSection />
      </div>

    </main>
  );
}