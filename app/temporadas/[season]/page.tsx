import Container from "@/components/ui/Container";

import AnimeCard from "@/components/anime/AnimeCard";

type SeasonPageProps = {
  params: Promise<{
    season: string;
  }>;
};

export default async function SeasonPage({
  params,
}: SeasonPageProps) {

  const { season } =
    await params;

  const year = 2026;

  const response =
    await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  const data =
    await response.json();

  const animeList =
    data.data || [];

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        {/* HEADER */}
        <div className="mb-14">

          <h1 className="text-5xl md:text-7xl font-black capitalize">

            {season} {year}

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Descubre los animes más destacados de la temporada.

          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {animeList.map((anime: any,
            index: number
          ) => (

            <AnimeCard
              key={`${anime.mal_id}-${index}`}
              id={anime.mal_id}
              title={anime.title}
              image={
                anime.images.jpg
                  .large_image_url ||
                anime.images.jpg
                  .image_url
              }
              
              score={anime.score}
            />

          ))}

        </div>

      </Container>

    </main>
  );
}