import { getTopAnime } from "@/services/anime.service";

import Container from "@/components/ui/Container";

import SectionHeader from "@/components/ui/SectionHeader";

import InfiniteCatalog from "@/components/catalog/InfiniteCatalog";

import PageTransition from "@/components/ui/PageTransition";

export default async function CatalogoPage() {

  const animeList = await getTopAnime();

  return (
    <PageTransition>

      <main className="min-h-screen bg-black text-white pt-32">

        <Container>

          {/* HEADER */}
          <SectionHeader
            badge="Catálogo"
            title="Explora Anime"
            description="Descubre nuevos mundos, historias y personajes inolvidables."
          />

          {/* CONTENT */}
          <InfiniteCatalog
            initialAnime={animeList}
          />

        </Container>

      </main>

    </PageTransition>
  );
}