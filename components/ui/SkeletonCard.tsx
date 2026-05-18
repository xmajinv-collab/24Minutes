export default function SkeletonCard() {

  return (
    <div className="animate-pulse">

      <div className="aspect-[3/4] rounded-3xl bg-white/5 border border-white/10" />

      <div className="h-5 bg-white/5 rounded-full mt-4 w-3/4" />

      <div className="h-4 bg-white/5 rounded-full mt-3 w-1/2" />

    </div>
  );
}