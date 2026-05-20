import Container from "@/components/ui/Container";

export default function Loading() {

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <Container>

        <div className="flex flex-col items-center justify-center">

          {/* LOGO */}
          <h1 className="text-5xl md:text-7xl font-black tracking-[0.3em] animate-pulse">

            24 MINUTES

          </h1>

          {/* LOADING */}
          <div className="mt-10 flex gap-3">

            <div className="w-3 h-3 rounded-full bg-fuchsia-500 animate-bounce" />

            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-150" />

            <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-300" />

          </div>

          <p className="text-zinc-500 mt-6 text-sm tracking-widest uppercase">

            Loading anime universe...

          </p>

        </div>

      </Container>

    </main>
  );
}