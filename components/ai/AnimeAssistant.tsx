"use client";

import {
  useState,
} from "react";
import AnimeCard from "@/components/anime/AnimeCard"; 
export default function AnimeAssistant() {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleSearch =
    async () => {

      if (!query) return;

      setLoading(true);

      try {

        const favorites =
  JSON.parse(
    localStorage.getItem(
      "favorites"
    ) || "[]"
  );

const recent =
  JSON.parse(
    localStorage.getItem(
      "recentlyViewed"
    ) || "[]"
  );

        const response =
          await fetch(
            "/api/ai",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
            query,

            favorites:
              favorites.map(
                (f: any) =>
                  f.title
              ),

            recent:
              recent.map(
                (r: any) =>
                  r.title
              ),
          }),
            }
          );

        const data =
          await response.json();

        const animeNames =

      data.result
        .split(",")

        .map(
          (
            anime: string
          ) =>
            anime.trim()
        );
const animeResults =
  await Promise.all(

    animeNames.map(
      async (
        animeName: string
      ) => {

        const response =
          await fetch(
            `https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`
          );

        const data =
          await response.json();

        return data.data?.[0];

      }
    )

  );

setResults(
  animeResults.filter(
    Boolean
  )
);

      } catch (error) {

        setResults([
          "Error al conectar con la IA.",
        ]);

      }

      setLoading(false);

    };

  return (
    <section className="mt-40">

      <div className="mb-10 text-center">

        <h2 className="text-5xl font-black">

          AI Anime Assistant

        </h2>

        <p className="text-zinc-400 mt-4 text-lg">

          Describe el anime que buscas y deja que la IA recomiende algo perfecto para ti.

        </p>

      </div>

      {/* INPUT */}
      <div className="max-w-3xl mx-auto">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            placeholder="Ej: quiero un anime oscuro medieval..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-500 outline-none focus:border-fuchsia-500/40 transition backdrop-blur-xl"
          />

          <button
            onClick={
              handleSearch
            }
            className="px-8 py-5 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
          >

            Buscar

          </button>

        </div>

      </div>

      {/* RESULTS */}
      {(results.length > 0 ||
        loading) && (

        <div className="max-w-5xl mx-auto mt-16">

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10">

            {loading ? (

              <div className="text-center py-10">

                <p className="text-zinc-400 text-lg animate-pulse">

                  La IA está pensando...

                </p>

              </div>

            ) : (

              <>

                <p className="text-zinc-400 mb-6">

                  Recomendaciones IA:

                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                  {results.map(
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
                          .large_image_url ||
                        anime.images.jpg
                          .image_url
                      }
                      score={
                        anime.score
                      }
                    />

                  ))}

                </div>
              </>

            )}

          </div>

        </div>

      )}

    </section>
  );
}