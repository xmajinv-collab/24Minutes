"use client";

import {
  useEffect,
  useState,
} from "react";

import AnimeCard from "@/components/anime/AnimeCard";

type InfiniteCatalogProps = {
  initialAnime: any[];
};

export default function InfiniteCatalog({
  initialAnime,
}: InfiniteCatalogProps) {

  const [animeList, setAnimeList] =
    useState(initialAnime);

  const [page, setPage] =
    useState(2);

  const [loading, setLoading] =
    useState(false);

  async function loadMore() {

    if (loading) return;

    setLoading(true);

    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );

    const data = await response.json();

    setAnimeList((prev) => [
      ...prev,
      ...data.data,
    ]);

    setPage((prev) => prev + 1);

    setLoading(false);
  }

  useEffect(() => {

    const handleScroll = () => {

      if (
        window.innerHeight +
          window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        loadMore();
      }

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, [page, loading]);

  return (
    <>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {animeList.map((anime) => (

          <AnimeCard
            key={`${anime.mal_id}-${Math.random()}`}
            id={anime.mal_id}
            title={anime.title}
            image={anime.images.jpg.image_url}
            score={anime.score}
          />

        ))}

      </div>

      {loading && (

        <div className="text-center py-16 text-zinc-400">

          Cargando más anime...

        </div>

      )}

    </>
  );
}