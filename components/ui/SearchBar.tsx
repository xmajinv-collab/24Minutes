"use client";

import { useEffect, useState } from "react";

import { searchAnime } from "@/services/anime.service";

import { Anime } from "@/types/anime";

export default function SearchBar() {

  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] =
    useState("");

  const [results, setResults] = useState<Anime[]>([]);

  // DEBOUNCE
  useEffect(() => {

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timer);

  }, [query]);

  // SEARCH
  useEffect(() => {

    const fetchAnime = async () => {

      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      const data = await searchAnime(
        debouncedQuery
      );

      setResults(data.slice(0, 5));
    };

    fetchAnime();

  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-xl">

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Buscar anime..."
        className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-white/20 transition"
      />

      {/* ICON */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
        🔍
      </div>

      {/* RESULTS */}
      {results.length > 0 && (

        <div className="absolute top-full mt-4 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50">

          {results.map((anime) => (

            <div
              key={anime.mal_id}
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition cursor-pointer"
            >

              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-14 h-20 object-cover rounded-lg"
              />

              <div>

                <h3 className="font-semibold text-white">
                  {anime.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  ⭐ {anime.score}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}