export default function SkeletonCard() {

  return (
    <div className="animate-pulse">

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">

        {/* IMAGE */}
        <div className="aspect-[2/3] bg-white/5" />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* SCORE */}
        <div className="absolute top-4 right-4 w-14 h-7 rounded-full bg-white/10" />

        {/* CONTENT */}
        <div className="absolute bottom-0 p-5 w-full">

          <div className="h-5 w-3/4 rounded-full bg-white/10 mb-3" />

          <div className="h-4 w-1/2 rounded-full bg-white/5" />

        </div>

      </div>

    </div>
  );
}