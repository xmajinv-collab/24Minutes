"use client";

import { useState } from "react";

type AnimeSynopsisProps = {
  synopsis: string;
};

export default function AnimeSynopsis({
  synopsis,
}: AnimeSynopsisProps) {

  const [expanded, setExpanded] =
    useState(false);

  return (
    <div className="mt-8 max-w-2xl">

      <p
        className={`text-zinc-300 leading-relaxed text-base md:text-lg transition-all duration-500 ${
          expanded
            ? ""
            : "line-clamp-6"
        }`}
      >
        {synopsis}
      </p>

      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="mt-4 text-sm text-white/70 hover:text-white transition"
      >
        {expanded
          ? "Ver menos"
          : "Ver más"}
      </button>

    </div>
  );
}