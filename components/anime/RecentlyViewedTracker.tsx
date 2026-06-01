"use client";

import {
  useEffect,
} from "react";

type Props = {
  anime: {
    mal_id: number;
    title: string;
    image: string;
    score: number;
  };
};

export default function RecentlyViewedTracker({
  anime,
}: Props) {

  useEffect(() => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        ) || "[]"
      );

    const filtered =
      existing.filter(
        (item: any) =>
          item.mal_id !==
          anime.mal_id
      );

    const updated = [
      anime,
      ...filtered,
    ].slice(0, 10);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updated)
    );

  }, [anime]);

  return null;
}