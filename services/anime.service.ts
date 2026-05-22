import { Anime } from "@/types/anime";

const fetchOptions = {
  next: {
    revalidate: 3600,
  },
};

export async function getTopAnime(
  page = 1
): Promise<Anime[]> {

  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=${page}`,
    fetchOptions
  );

  const data = await response.json();

  return data.data;
}

export async function searchAnime(
  query: string
): Promise<Anime[]> {

  const response =
    await fetch(

      `https://api.jikan.moe/v4/anime?q=${query}&limit=10&sfw=true&order_by=score&sort=desc`,

      {
        next: {
          revalidate: 300,
        },
      }
    );

  const data =
    await response.json();

  return data.data || [];

}

export async function getAnimeById(
  id: string
) {

  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`,
    fetchOptions
  );

  const data = await response.json();

  return data.data;
}

export async function getAnimeRecommendations(
  id: string
) {

  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`,
    fetchOptions
  );

  const data = await response.json();

  return data.data;
}

export async function getAnimeCharacters(
  id: string
) {

  const response =
    await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`,
      fetchOptions
    );

  const data =
    await response.json();

  return data.data;

}

export async function getSeasonAnime(
  page = 1
) {

  const response = await fetch(
    `https://api.jikan.moe/v4/seasons/now?page=${page}`,
    fetchOptions
  );

  const data = await response.json();

  return data.data;
}

export async function getAnimePictures(
  id: string
) {

  const response =
    await fetch(
      `https://api.jikan.moe/v4/anime/${id}/pictures`,
      fetchOptions
    );

  const data =
    await response.json();

  return data.data;

}