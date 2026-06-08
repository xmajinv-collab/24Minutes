import AnimeCard from "@/components/anime/AnimeCard";

type Props = {
  title: string;
  anime: any[];
};

export default function DaySchedule({
  title,
  anime,
}: Props) {

    
        if (!anime?.length) {
        return null;
        }

  return (
    <section className="mb-20">

      <h2 className="text-4xl font-black mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {anime.slice(0, 10).map((item) => (

          <AnimeCard
            key={item.mal_id}
            id={item.mal_id}
            title={item.title}
            image={
              item.images.jpg.large_image_url ||
              item.images.jpg.image_url
            }
            score={item.score || 0}
          />

        ))}

      </div>

    </section>
  );
}