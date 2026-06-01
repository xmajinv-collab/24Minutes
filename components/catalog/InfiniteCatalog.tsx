"use client";

import {
  useMemo,
  useState,
} from "react";

import AnimeCard from "@/components/anime/AnimeCard";

type Props = {
  initialAnime: any[];
};

export default function InfiniteCatalog({
  initialAnime,
}: Props) {

  const [query, setQuery] =
    useState("");

  const [sort, setSort] =
    useState("score");

  const [genre, setGenre] =
    useState("all");

  const [
    yearFilter,
    setYearFilter,
  ] = useState("all");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("all");

  const [
    minScore,
    setMinScore,
  ] = useState(0);

  const animeList =
    initialAnime || [];

  const filteredAnime =
    useMemo(() => {

      let filtered =
        animeList.filter((anime) =>

          anime.title
            ?.toLowerCase()
            .includes(
              query.toLowerCase()
            ) &&

          (genre === "all" ||

            anime.genres?.some(
              (g: any) =>
                g.name === genre
            )) &&

          (yearFilter ===
            "all" ||

            anime.year?.toString() ===
              yearFilter) &&

          (statusFilter ===
            "all" ||

            anime.status ===
              statusFilter) &&

          (anime.score || 0) >=
            minScore

        );

      if (
        sort === "score"
      ) {

        filtered.sort(
          (a, b) =>
            (b.score || 0) -
            (a.score || 0)
        );

      }

      if (
        sort ===
        "popularity"
      ) {

        filtered.sort(
          (a, b) =>
            (a.rank || 9999) -
            (b.rank || 9999)
        );

      }

      if (
        sort === "year"
      ) {

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
    <section className="mt-20 pb-32">

      {/* FILTER PANEL */}
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 mb-14">

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">

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
            className="flex-1 min-w-[220px] bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition backdrop-blur-xl"
          />

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300"
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
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300"
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
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300"
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
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-zinc-300"
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
        <div className="mt-8">

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
            className="w-full accent-white"
          />

        </div>

      </div>

      {/* RESULTS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>

          <h2 className="text-3xl md:text-4xl font-black">

            Explorar Anime

          </h2>

          <p className="text-zinc-500 mt-2">

            {filteredAnime.length} resultados encontrados

          </p>

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">

        {filteredAnime.map(
          (anime: any) => (

          <AnimeCard
            key={anime.mal_id}
            id={anime.mal_id}
            title={anime.title}
            image={
              anime.images.jpg
                .large_image_url ||

              anime.images.jpg
                .image_url
            }
            score={
              anime.score || 0
            }
          />

        ))}

      </div>

      {/* EMPTY */}
      {filteredAnime.length === 0 && (

        <div className="mt-20 py-20 rounded-[32px] border border-white/10 bg-white/[0.02] text-center">

          <h3 className="text-3xl font-bold">

            No se encontraron animes

          </h3>

          <p className="text-zinc-400 mt-4">

            Prueba otros filtros o búsquedas.

          </p>

        </div>

      )}

    </section>
  );
}