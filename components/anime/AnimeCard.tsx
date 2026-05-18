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
      className="group block transition duration-500 hover:-translate-y-2"
    >

      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={400}
          height={600}
          className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-[2px]" />

        {/* SCORE */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm border border-white/10">

          ⭐ {score || "N/A"}

        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 p-5 w-full">

          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-zinc-200 transition">

            {title}

          </h3>

        </div>

      </div>

    </Link>
  );
}