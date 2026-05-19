import Link from "next/link";

import Image from "next/image";

type AnimeCardProps = {
  id: number;
  title: string;
  image: string;
  score: number;
};

export default function AnimeCard({
  id,
  title,
  image,
  score,
}: AnimeCardProps) {

  return (
    <Link
      href={`/anime/${id}`}
      className="group block"
    >

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 transition duration-500 group-hover:-translate-y-3 group-hover:border-white/20">

        {/* BACKDROP GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-t from-fuchsia-500/20 via-cyan-500/10 to-transparent blur-2xl" />

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={400}
          height={600}
          className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10 backdrop-blur-[2px]" />

        {/* SCORE */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-sm font-medium shadow-xl">

          ⭐ {score || "N/A"}

        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 p-5 w-full">

          <h3 className="font-semibold text-lg leading-snug text-white line-clamp-2 transition duration-300 group-hover:text-zinc-200">

            {title}

          </h3>

        </div>

      </div>

    </Link>
  );
}