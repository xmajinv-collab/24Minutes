"use client";

type ErrorProps = {
  error: Error;

  reset: () => void;
};

export default function Error({
  reset,
}: ErrorProps) {

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl text-center">

        <h1 className="text-6xl font-black">

          Oops...

        </h1>

        <p className="mt-6 text-zinc-400 text-lg leading-relaxed">

          Algo salió mal mientras cargábamos esta página anime.

        </p>

        <button
          onClick={reset}
          className="mt-10 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
        >

          Reintentar

        </button>

      </div>

    </main>
  );
}