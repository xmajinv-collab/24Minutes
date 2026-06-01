export async function getAnimeNews() {

  try {

    const response =
      await fetch(
        "https://www.animenewsnetwork.com/all/rss.xml",
        {
          next: {
            revalidate: 3600,
          },
        }
      );

    if (!response.ok) {

      return [];

    }

    const xml =
      await response.text();

    const items =
      xml
        .split("<item>")
        .slice(1, 7)
        .map((item) => {

          const title =
            item.match(
              /<title><!\[CDATA\[(.*?)\]\]><\/title>/
            )?.[1] || "";

          const link =
            item.match(
              /<link>(.*?)<\/link>/
            )?.[1] || "";

          const pubDate =
            item.match(
              /<pubDate>(.*?)<\/pubDate>/
            )?.[1] || "";

          return {
            title,
            link,
            pubDate,
          };

        })
        .filter(
          (item) =>
            item.title &&
            item.link
        );

    return items;

  } catch {

    return [];

  }

}