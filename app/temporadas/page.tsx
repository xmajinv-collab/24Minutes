import Container from "@/components/ui/Container";

import SeasonsSection from "@/components/sections/SeasonsSection";

export default function TemporadasPage() {

  return (
    <main className="min-h-screen bg-black text-white pt-40">

      <Container>

        <div className="mb-20">

          <h1 className="text-6xl font-black">

            Temporadas Anime

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Descubre los animes de cada temporada.

          </p>

        </div>

        <SeasonsSection />

      </Container>

    </main>
  );
}