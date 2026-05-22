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
    useState(initialAnime || []);

  const [page, setPage] =
    useState(2);

  const [loading, setLoading] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [sort, setSort] =
    useState("score");

  const [genre, setGenre] =
    useState("all");

  const [yearFilter, setYearFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [minScore, setMinScore] =
    useState(0);

  async function loadMore() {

    if (loading) return;

    setLoading(true);

    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );

    const data =
      await response.json();

    setAnimeList((prev) => [
      ...prev,
      ...(data.data || []),
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
        (animeList || []).filter(
          (anime) => {

            const matchesQuery =
              anime.title
                ?.toLowerCase()
                .includes(
                  query.toLowerCase()
                );

            const matchesGenre =
              genre === "all" ||

              anime.genres?.some(
                (g: any) =>
                  g.name === genre
              );

            const matchesYear =
              yearFilter ===
                "all" ||

              anime.year?.toString() ===
                yearFilter;

            const matchesStatus =
              statusFilter ===
                "all" ||

              anime.status ===
                statusFilter;

            const matchesScore =
              (anime.score || 0) >=
              minScore;

            return (
              matchesQuery &&
              matchesGenre &&
              matchesYear &&
              matchesStatus &&
              matchesScore
            );

          }
        );

      if (sort === "score") {

        filtered.sort(
          (a, b) =>
            (b.score || 0) -
            (a.score || 0)
        );

      }

      if (
        sort === "popularity"
      ) {

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

    }, [
      animeList,
      query,
      sort,
      genre,
      yearFilter,
      statusFilter,
      minScore,
    ]);

  return (
    <div className="mt-16">

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-12">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Buscar anime..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition backdrop-blur-xl text-white placeholder:text-zinc-500"
        />

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="bg-zinc-900 text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition"
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

        {/* GENRE */}
        <select
          value={genre}
          onChange={(e) =>
            setGenre(
              e.target.value
            )
          }
          className="bg-zinc-900 text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition"
        >

          <option value="all">
            Género
          </option>

          <option value="Action">
            Action
          </option>

          <option value="Adventure">
            Adventure
          </option>

          <option value="Comedy">
            Comedy
          </option>

          <option value="Drama">
            Drama
          </option>

          <option value="Fantasy">
            Fantasy
          </option>

          <option value="Romance">
            Romance
          </option>

          <option value="Sci-Fi">
            Sci-Fi
          </option>

          <option value="Psychological">
            Psychological
          </option>

        </select>

        {/* YEAR */}
        <select
          value={yearFilter}
          onChange={(e) =>
            setYearFilter(
              e.target.value
            )
          }
          className="bg-zinc-900 text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition"
        >

          <option value="all">
            Año
          </option>

          <option value="2026">
            2026
          </option>

          <option value="2025">
            2025
          </option>

          <option value="2024">
            2024
          </option>

          <option value="2023">
            2023
          </option>

        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="bg-zinc-900 text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition"
        >

          <option value="all">
            Estado
          </option>

          <option value="Currently Airing">
            Airing
          </option>

          <option value="Finished Airing">
            Finished
          </option>

        </select>

      </div>

      {/* SCORE */}
      <div className="mb-10">

        <div className="flex items-center justify-between mb-3">

          <p className="text-zinc-400">
            Score mínimo
          </p>

          <p className="text-white font-semibold">
            {minScore}
          </p>

        </div>

        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={minScore}
          onChange={(e) =>
            setMinScore(
              Number(
                e.target.value
              )
            )
          }
          className="w-full accent-fuchsia-500"
        />

      </div>

      {/* RESULTS */}
      <div className="flex items-center justify-between mb-8">

        <p className="text-zinc-400">

          {filteredAnime.length}
          {" "}
          animes encontrados

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

          {filteredAnime.map(
            (
              anime,
              index
            ) => (

            <AnimeCard
              key={`${anime.mal_id}-${index}`}
              id={anime.mal_id}
              title={anime.title}
              image={
                anime.images.jpg
                  .image_url
              }
              score={anime.score}
            />

          ))}

        </div>

      )}

      {/* LOADING */}
      {loading && (

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">

          {Array.from({
            length: 5,
          }).map(
            (_, index) => (

            <SkeletonCard
              key={index}
            />

          ))}

        </div>

      )}

    </div>
  );
}