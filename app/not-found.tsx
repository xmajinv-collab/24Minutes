import Link from "next/link";

import Container from "@/components/ui/Container";

export default function NotFound() {

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">

      {/* GLOW */}
      <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[180px]" />

      <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px]" />

      <Container>

        <div className="relative z-10 text-center">

          {/* ERROR */}
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tight">

            404

          </h1>

          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-bold mt-6">

            Anime no encontrado

          </h2>

          {/* DESCRIPTION */}
          <p className="text-zinc-400 mt-6 max-w-xl mx-auto leading-relaxed">

            Parece que este universo anime no existe o fue eliminado.

          </p>

          {/* BUTTON */}
          <Link
            href="/"
            className="inline-flex mt-10 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300 shadow-2xl shadow-white/10"
          >

            Volver al inicio

          </Link>

        </div>

      </Container>

    </main>
  );
}
