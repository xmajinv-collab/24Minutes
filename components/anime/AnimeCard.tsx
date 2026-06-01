"use client";

import Link from "next/link";

import Image from "next/image";

import {
  useState,
} from "react";

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

  const [loaded, setLoaded] =
    useState(false);

  return (
    <Link
      href={`/anime/${id}`}
      className="group block"
    >

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:scale-[1.02] group-hover:border-white/20">

        {/* BACKDROP GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/10 to-transparent blur-3xl scale-110" />

        {/* IMAGE SKELETON */}
        {!loaded && (

          <div className="absolute inset-0 animate-pulse bg-white/5" />

        )}

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          width={400}
          height={600}
          onLoad={() =>
            setLoaded(true)
          }
          className={`w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-[1.08] ${
            loaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10 backdrop-blur-[2px]" />

        {/* SCORE */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-sm font-medium shadow-xl">

          {score > 0 && (
              <>
                ⭐ {score}
              </>
            )}

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