"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { searchAnime } from "@/services/anime.service";

import { Anime } from "@/types/anime";

export default function SearchBar() {

  const [query, setQuery] =
    useState("");

  const [debouncedQuery, setDebouncedQuery] =
    useState("");

  const [results, setResults] =
    useState<Anime[]>([]);

  const [loading, setLoading] =
    useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  // DEBOUNCE
  useEffect(() => {

    const timer =
      setTimeout(() => {

        setDebouncedQuery(query);

      }, 400);

    return () =>
      clearTimeout(timer);

  }, [query]);

  // CLOSE DROPDOWN
  useEffect(() => {

    const handleClickOutside =
      (event: MouseEvent) => {

        if (
          searchRef.current &&
          !searchRef.current.contains(
            event.target as Node
          )
        ) {

          setResults([]);

        }

      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // SEARCH
  useEffect(() => {

    const fetchAnime =
      async () => {

        if (!debouncedQuery) {

          setResults([]);

          return;

        }

        setLoading(true);

        const data =
          await searchAnime(
            debouncedQuery
          );

        const normalizedQuery =
          debouncedQuery.toLowerCase();

        const filtered =
          data.filter((anime) => {

            const title =
              anime.title
                ?.toLowerCase() || "";

            const synopsis =
              anime.synopsis
                ?.toLowerCase() || "";

            const genres =
              anime.genres
                ?.map((g) =>
                  g.name.toLowerCase()
                )
                .join(" ") || "";

            return (

              title.includes(
                normalizedQuery
              ) ||

              synopsis.includes(
                normalizedQuery
              ) ||

              genres.includes(
                normalizedQuery
              )

            );

          });

        setResults(
          filtered.slice(0, 5)
        );

        setLoading(false);

      };

    fetchAnime();

  }, [debouncedQuery]);

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-xl"
    >

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }

        onKeyDown={(e) => {

          if (
            e.key === "Enter" &&
            results.length > 0
          ) {

            window.location.href =
              `/anime/${results[0].mal_id}`;

          }

          if (e.key === "Escape") {

            setResults([]);

          }

        }}

        placeholder="Buscar anime..."

        className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-white/20 transition"
      />

      {/* ICON */}
      <div className="absolute right-5 top-5 text-zinc-500">

        🔍

      </div>

      {/* QUICK TAGS */}
      <div className="flex flex-wrap gap-3 mt-4">

        {[
          "Action",
          "Romance",
          "Fantasy",
          "Dark",
          "Comedy",
          "Psychological",
        ].map((tag) => (

          <button
            key={tag}
            onClick={() =>
              setQuery(tag)
            }
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition"
          >

            {tag}

          </button>

        ))}

      </div>

      {/* LOADING */}
      {loading && (

        <div className="absolute top-full mt-4 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-zinc-400 z-50">

          Buscando anime...

        </div>

      )}

      {/* NO RESULTS */}
      {!loading &&
        debouncedQuery &&
        results.length === 0 && (

        <div className="absolute top-full mt-4 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-zinc-400 z-50">

          No se encontraron resultados.

        </div>

      )}

      {/* RESULTS */}
      {results.length > 0 && !loading && (

        <div className="absolute top-full mt-4 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl shadow-black/40">

          {results.map((anime) => (

            <a
              key={anime.mal_id}
              href={`/anime/${anime.mal_id}`}
             className="flex items-center gap-4 p-4 hover:bg-white/5 hover:scale-[1.02] transition duration-300 cursor-pointer border-b border-white/5 last:border-none"
            >

              <img
                src={
                  anime.images.jpg
                    .image_url
                }
                alt={anime.title}
                className="w-14 h-20 object-cover rounded-xl shadow-lg shadow-black/40"
              />

              <div>

                <h3 className="font-semibold text-white">

                  {anime.title}

                </h3>

                <p className="text-zinc-400 text-sm">

                  ⭐ {anime.score}

                </p>

                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">

                  {anime.synopsis ||
                    "Sin descripción disponible."}

                </p>

              </div>

            </a>

          ))}

        </div>

      )}

    </div>
  );
}