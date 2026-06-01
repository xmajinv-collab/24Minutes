import Container from "@/components/ui/Container";

import SeasonsSection from "@/components/sections/SeasonsSection";

export default function TemporadasPage() {

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 mb-20">

          <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-fuchsia-500/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-6">

              📺 Seasonal Anime

            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">

              Temporadas Anime
            </h1>

            <p className="text-zinc-400 mt-6 text-base md:text-lg max-w-3xl leading-relaxed">

              Descubre los animes que están en emisión esta temporada,
              encuentra nuevas series para seguir y mantente al día con los
              estrenos más populares del momento.

            </p>

          </div>

        </section>

        {/* SEASON CONTENT */}
        <SeasonsSection />

      </Container>

    </main>
  );
}