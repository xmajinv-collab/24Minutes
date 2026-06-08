import { fetcher } from "@/lib/fetcher";

const BASE_URL =
  "https://api.jikan.moe/v4";

export async function getScheduleDay(
  day: string
) {

  try {

    const data =
      await fetcher(
        `${BASE_URL}/schedules/${day}`
      );

    return data.data || [];

  } catch {

    return [];

  }

}