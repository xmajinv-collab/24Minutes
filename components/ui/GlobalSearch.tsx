"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

export default function GlobalSearch() {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const searchRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    async function search() {

      if (!query) {

        setResults([]);

        return;

      }

      setLoading(true);

      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
      );

      const data =
        await response.json();

      setResults(data.data);

      setLoading(false);

    }

    const timeout =
      setTimeout(search, 400);

    return () =>
      clearTimeout(timeout);

  }, [query]);

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

  return (
    <div
      ref={searchRef}
      className="relative w-[320px]"
    >

      {/* INPUT */}
      <input
        type="text"
        placeholder="Buscar anime..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-white/20 transition backdrop-blur-md"
      />

      {/* RESULTS */}
      {query && results.length > 0 && (

        <div className="absolute top-full mt-4 w-full bg-black/95 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl z-50 shadow-2xl shadow-black/40">

          {loading ? (

            <div className="p-6 text-zinc-400">

              Buscando...

            </div>

          ) : (

            results.map((anime: any) => (

              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
                onClick={() => {

                  setQuery("");

                  setResults([]);

                }}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition"
              >

                <Image
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  width={50}
                  height={70}
                  className="rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-medium line-clamp-1">
                    {anime.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mt-1">
                    ⭐ {anime.score || "N/A"}
                  </p>

                </div>

              </Link>

            ))

          )}

        </div>

      )}

    </div>
  );
}