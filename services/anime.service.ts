import { Anime } from "@/types/anime";

import { fetcher } from "@/lib/fetcher";

const BASE_URL =
  "https://api.jikan.moe/v4";

export async function getTopAnime(
  page = 1
): Promise<Anime[]> {

  const data =
    await fetcher(
      `${BASE_URL}/top/anime?page=${page}`
    );

  return data.data;
}

export async function searchAnime(
  query: string
): Promise<Anime[]> {

  const data =
    await fetcher(
      `${BASE_URL}/anime?q=${query}&limit=10&sfw=true&order_by=score&sort=desc`,
      300
    );

  return data.data || [];

}

export async function getAnimeById(
  id: string
) {

  const data =
    await fetcher(
      `${BASE_URL}/anime/${id}`
    );

  return data.data;
}

export async function getAnimeRecommendations(
  id: string
) {

  const data =
    await fetcher(
      `${BASE_URL}/anime/${id}/recommendations`
    );

  return data.data;
}

export async function getAnimeCharacters(
  id: string
) {

  const data =
    await fetcher(
      `${BASE_URL}/anime/${id}/characters`
    );

  return data.data;
}

export async function getSeasonAnime(
  page = 1
) {

  const data =
    await fetcher(
      `${BASE_URL}/seasons/now?page=${page}`
    );

  return data.data;
}

export async function getAnimePictures(
  id: string
) {

  const data =
    await fetcher(
      `${BASE_URL}/anime/${id}/pictures`
    );

  return data.data;
}