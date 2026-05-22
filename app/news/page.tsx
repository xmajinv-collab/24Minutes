import Container from "@/components/ui/Container";

import { getAnimeNews } from "@/services/news.service";

export default async function NewsPage() {

  const news =
    await getAnimeNews();

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        {/* HEADER */}
        <div className="mb-16">

          <h1 className="text-5xl md:text-7xl font-black">

            Anime News

          </h1>

          <p className="text-zinc-400 mt-6 text-lg max-w-2xl">

            Mantente al día con las últimas noticias del mundo anime y manga.

          </p>

        </div>

        {/* NEWS GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {news.map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/10 bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition duration-300"
            >

              <div className="flex items-center gap-3 text-sm text-zinc-500 mb-5">

                <span>
                  NEWS
                </span>

                <span>
                  •
                </span>

                <span>
                  {new Date(
                    item.pubDate || ""
                  ).toLocaleDateString()}
                </span>

              </div>

              <h2 className="text-2xl font-bold leading-snug group-hover:text-fuchsia-300 transition">

                {item.title}

              </h2>

              <p className="text-zinc-400 mt-6">

                Leer noticia completa →

              </p>

            </a>

          ))}

        </div>

      </Container>

    </main>
  );
}