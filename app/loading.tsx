export default function Loading() {

  return (
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden">

      <div className="flex flex-col items-center">

        {/* SPINNER */}
        <div className="relative w-20 h-20">

          <div className="absolute inset-0 rounded-full border-4 border-white/10" />

          <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />

        </div>

        {/* TEXT */}
        <p className="mt-8 text-zinc-400 text-lg animate-pulse tracking-wide">

          Loading 24 Minutes...

        </p>

      </div>

    </main>
  );
}