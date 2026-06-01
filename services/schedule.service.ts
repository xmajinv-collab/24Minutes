export async function getScheduleDay(
  day: string
) {

  const response =
    await fetch(
      `https://api.jikan.moe/v4/schedules/${day}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  if (!response.ok) {

    return [];

  }

  const data =
    await response.json();

  return data.data || [];

}