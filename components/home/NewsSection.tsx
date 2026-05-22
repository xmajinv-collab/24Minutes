import Container from "@/components/ui/Container";

import { getAnimeNews } from "@/services/news.service";

export default async function NewsSection() {

  let news = [];

  try {

    news = await getAnimeNews();

  } catch (error) {

    console.error(
      "NEWS ERROR:",
      error
    );

    return null;

  }

  return (
    <section className="py-24">

      <Container>

        {/* HEADER */}
        <div className="mb-12">

          <h2 className="text-4xl font-bold">
            Noticias Anime
          </h2>

          <p className="text-zinc-400 mt-3">
            Mantente al día con las últimas novedades del mundo anime.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {news.map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition duration-300 p-6"
            >

              <h3 className="text-xl font-semibold leading-snug group-hover:text-fuchsia-300 transition">

                {item.title}

              </h3>

              <p className="text-zinc-400 text-sm mt-4">

                {new Date(
                  item.pubDate || ""
                ).toLocaleDateString()}

              </p>

            </a>

          ))}

        </div>

      </Container>

    </section>
  );
}