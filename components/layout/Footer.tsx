import Container from "../ui/Container";

import Link from "next/link";

export default function Footer() {

  return (
    <footer className="relative mt-40 border-t border-white/10 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute bottom-[-200px] left-[10%] w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[180px]" />

        <div className="absolute top-[-150px] right-[10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[160px]" />

      </div>

      <Container>

        <div className="relative z-10 py-20">

          {/* TOP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

            {/* BRAND */}
            <div>

              <Link
                href="/"
                className="text-3xl font-black tracking-[0.2em] text-white hover:text-zinc-200 transition duration-300"
              >
                24 MINUTES
              </Link>

              <p className="text-zinc-400 mt-6 leading-relaxed max-w-sm">

                Explora nuevos mundos, sigue temporadas y descubre tu próximo anime favorito.

              </p>

            </div>

            {/* NAVIGATION */}
            <div>

              <h3 className="text-lg font-semibold mb-6">
                Navegación
              </h3>

              <div className="flex flex-col gap-4 text-zinc-400">

                <Link
                  href="/"
                  className="hover:text-white transition duration-300"
                >
                  Inicio
                </Link>

                <Link
                  href="/catalogo"
                  className="hover:text-white transition duration-300"
                >
                  Catálogo
                </Link>

                <Link
                  href="/temporadas"
                  className="hover:text-white transition duration-300"
                >
                  Temporadas
                </Link>

                <Link
                  href="/watchlist"
                  className="hover:text-white transition duration-300"
                >
                  Watchlist
                </Link>

              </div>

            </div>

            {/* COMMUNITY */}
            <div>

              <h3 className="text-lg font-semibold mb-6">
                Comunidad
              </h3>

              <div className="flex flex-col gap-4 text-zinc-400">

                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Discord
                </a>

                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Twitter / X
                </a>

                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  GitHub
                </a>

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

            <p className="text-zinc-500">

              © 2026 24 MINUTES. Todos los derechos reservados.

            </p>

            <p className="text-zinc-500">

              Diseñado con pasión por el anime ✨

            </p>

          </div>

        </div>

      </Container>

    </footer>
  );
}