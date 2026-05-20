"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import AnimeCard from "@/components/anime/AnimeCard";

import SkeletonCard from "@/components/ui/SkeletonCard";

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

  const [query, setQuery] =
    useState("");

  const [sort, setSort] =
    useState("score");

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

  const filteredAnime =
    useMemo(() => {

      let filtered =
        animeList.filter((anime) =>
          anime.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
        );

      if (sort === "score") {

        filtered.sort(
          (a, b) =>
            (b.score || 0) -
            (a.score || 0)
        );

      }

      if (sort === "popularity") {

        filtered.sort(
          (a, b) =>
            (a.popularity || 0) -
            (b.popularity || 0)
        );

      }

      if (sort === "year") {

        filtered.sort(
          (a, b) =>
            (b.year || 0) -
            (a.year || 0)
        );

      }

      return filtered;

    }, [animeList, query, sort]);

  return (
    <div className="mt-16">

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Buscar anime..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition backdrop-blur-xl"
        />

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition backdrop-blur-xl"
        >
          <option value="score">
            Top Score
          </option>

          <option value="popularity">
            Popularidad
          </option>

          <option value="year">
            Más nuevos
          </option>

        </select>

      </div>
      {/* RESULTS */}
      <div className="flex items-center justify-between mb-8">

        <p className="text-zinc-400">
          {filteredAnime.length} animes encontrados
        </p>

      </div>

      {/* GRID */}
        {filteredAnime.length === 0 ? (

          <div className="py-32 text-center">

            <h2 className="text-4xl font-bold text-white">
              No se encontraron animes
            </h2>

            <p className="text-zinc-400 mt-4">
              Prueba otra búsqueda o filtro.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {filteredAnime.map((anime, index) => (

              <AnimeCard
                key={`${anime.mal_id}-${index}`}
                id={anime.mal_id}
                title={anime.title}
                image={
                  anime.images.jpg.image_url
                }
                score={anime.score}
              />

            ))}

          </div>

        )}
      {/* LOADING */}
      {loading && (

  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">

    {Array.from({ length: 5 }).map(
      (_, index) => (

        <SkeletonCard
          key={index}
        />

      )
    )}

  </div>

)}
    </div>
  );
}