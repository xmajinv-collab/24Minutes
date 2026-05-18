
export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-4 mb-12">

      <button className="px-5 py-3 rounded-2xl bg-white text-black font-semibold">
        Todos
      </button>

      <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        Acción
      </button>

      <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        Romance
      </button>

      <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        Fantasía
      </button>

      <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        Sci-Fi
      </button>

      <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        Drama
      </button>

    </div>
  );
}