type SeasonCardProps = {
  title: string;
  emoji: string;
  image: string;
};

export default function SeasonCard({
  title,
  emoji,
  image,
}: SeasonCardProps) {
  return (
    <div className="group relative h-[260px] overflow-hidden rounded-3xl cursor-pointer">

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8">

        <div className="text-5xl">
          {emoji}
        </div>

        <div>

          <h2 className="text-4xl font-bold text-white">
            {title}
          </h2>

          <p className="text-zinc-200 mt-2 text-lg">
            Explora animes de temporada
          </p>

        </div>

      </div>

    </div>
  );
}