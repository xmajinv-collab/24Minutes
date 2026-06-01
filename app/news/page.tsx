import Container from "@/components/ui/Container";

import { getAnimeNews } from "@/services/news.service";

export default async function NewsPage() {

  const news =
    await getAnimeNews();

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 mb-20">

          <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-fuchsia-500/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px]" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-6">

              📰 Anime News

            </div>

            <h1 className="text-4xl md:text-7xl font-black">

              Noticias Anime
            </h1>

            <p className="text-zinc-400 mt-6 text-base md:text-lg max-w-3xl leading-relaxed">

              Mantente al día con las últimas noticias,
              anuncios, estrenos y novedades del mundo anime y manga.

            </p>

          </div>

        </section>

        {/* NEWS GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {news.map(
            (item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[32px] border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition duration-500"
            >

              {/* TOP */}
              <div className="h-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500" />

              {/* CONTENT */}
              <div className="p-8">

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

                <h2 className="text-xl md:text-2xl font-bold leading-snug group-hover:text-fuchsia-300 transition">

                  {item.title}

                </h2>

                <div className="mt-8 text-zinc-400 group-hover:text-white transition">

                  Leer noticia →
                </div>

              </div>

            </a>

          ))}

        </div>

      </Container>

    </main>
  );
}