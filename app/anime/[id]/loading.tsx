import Container from "@/components/ui/Container";

export default function Loading() {

  return (
    <main className="min-h-screen bg-black text-white animate-pulse">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16">

            {/* COVER */}
            <div className="w-full h-[620px] rounded-3xl bg-white/5 border border-white/10" />

            {/* INFO */}
            <div>

              {/* TITLE */}
              <div className="h-6 w-32 rounded-full bg-white/5 mb-6" />

              <div className="h-16 w-3/4 rounded-2xl bg-white/5 mb-10" />

              {/* SYNOPSIS + SCORE */}
              <div className="grid md:grid-cols-[1fr_200px] gap-8">

                {/* SYNOPSIS */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

                  <div className="h-5 w-32 rounded-full bg-white/5 mb-8" />

                  <div className="space-y-4">

                    <div className="h-4 rounded-full bg-white/5" />

                    <div className="h-4 rounded-full bg-white/5" />

                    <div className="h-4 w-3/4 rounded-full bg-white/5" />

                  </div>

                </div>

                {/* SCORE */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">

                  <div className="w-32 h-32 rounded-full bg-white/5" />

                  <div className="space-y-4 mt-8 w-full">

                    <div className="h-4 rounded-full bg-white/5" />

                    <div className="h-4 rounded-full bg-white/5" />

                    <div className="h-4 rounded-full bg-white/5" />

                  </div>

                </div>

              </div>

              {/* TRAILER + DETAILS */}
              <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <div className="aspect-video rounded-3xl bg-white/5 border border-white/10" />

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">

                  <div className="space-y-6">

                    {Array.from({
                      length: 4,
                    }).map((_, i) => (

                      <div
                        key={i}
                        className="h-5 rounded-full bg-white/5"
                      />

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}