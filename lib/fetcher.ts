export async function fetcher(
  url: string,
  revalidate = 3600
) {

  const response =
    await fetch(url, {
      next: {
        revalidate,
      },
    });

  if (!response.ok) {

    if (response.status === 429) {

  console.warn(
    "Jikan rate limit reached"
  );

  return {
    data: [],
  };

}

throw new Error(
  `Fetch failed: ${response.status}`
);

  }

  return response.json();
}