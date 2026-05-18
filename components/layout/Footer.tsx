import Container from "../ui/Container";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 mt-40">

      <Container>

        <div className="grid md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>

            <Link
              href="/"
              className="text-3xl font-bold tracking-wide"
            >
              24 MINUTES
            </Link>

            <p className="text-zinc-400 mt-6 leading-relaxed max-w-sm">
              Explora nuevos mundos, sigue temporadas y descubre tu próximo anime favorito.
            </p>

          </div>

          {/* NAVIGATION */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Navegación
            </h3>

            <div className="flex flex-col gap-4 text-zinc-400">

              <a href="#" className="hover:text-white transition">
                Inicio
              </a>

              <a href="#" className="hover:text-white transition">
                Catálogo
              </a>

              <a href="#" className="hover:text-white transition">
                Temporadas
              </a>

              <a href="#" className="hover:text-white transition">
                Noticias
              </a>

            </div>

          </div>

          {/* SOCIAL */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Comunidad
            </h3>

            <div className="flex flex-col gap-4 text-zinc-400">

              <a href="#" className="hover:text-white transition">
                Discord
              </a>

              <a href="#" className="hover:text-white transition">
                Twitter / X
              </a>

              <a href="#" className="hover:text-white transition">
                Instagram
              </a>

              <a href="#" className="hover:text-white transition">
                GitHub
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 text-zinc-500 text-sm flex flex-col md:flex-row items-center justify-between gap-4">

          <p>
            © 2026 24 MINUTES. Todos los derechos reservados.
          </p>

          <p>
            Diseñado con pasión por el anime ✨
          </p>

        </div>

      </Container>

    </footer>
  );
}