import AnimeCard from "@/components/anime/AnimeCard";

type Props = {
  title: string;
  anime: any[];
};

export default function DaySchedule({
  title,
  anime,
}: Props) {

  const today =
    new Date()
      .toLocaleDateString(
        "es-ES",
        {
          weekday: "long",
        }
      )
      .toLowerCase();

  const isToday =
    title
      .toLowerCase()
      .includes(today);

  return (
    <section className="mb-24">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        <h2 className="text-4xl font-black">

          {title}

          <span className="text-zinc-500 text-2xl ml-3">

            • {anime.length}

          </span>

        </h2>

        {isToday && (

          <span className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-sm border border-fuchsia-500/20">

            Hoy

          </span>

        )}

      </div>

      {/* EMPTY */}
      {anime.length === 0 ? (

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-12 text-center">

          <p className="text-zinc-500">

            No hay animes programados.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {anime
            .slice(0, 10)
            .map((item) => (

              <AnimeCard
                key={item.mal_id}
                id={item.mal_id}
                title={item.title}
                image={
                  item.images?.jpg
                    ?.large_image_url ||
                  item.images?.jpg
                    ?.image_url
                }
                score={
                  item.score || 0
                }
              />

            ))}

        </div>

      )}

    </section>
  );
}