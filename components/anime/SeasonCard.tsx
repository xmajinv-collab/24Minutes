import Image from "next/image";

import Link from "next/link";

type SeasonCardProps = {
  title: string;
  image: string;
  slug: string;
};

export default function SeasonCard({
  title,
  image,
  slug,
}: SeasonCardProps) {

  return (
    <Link
      href={`/temporadas/${slug}`}
      className="group block"
    >

      <div className="relative h-[240px] md:h-[280px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30">

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-cyan-500/10" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-end h-full p-8">

          <div>

            <h2 className="text-3xl md:text-4xl font-black text-white">

              {title}

            </h2>

            <p className="text-zinc-300 mt-2">

              Explora animes de temporada

            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition">

              Ver temporada →

            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}