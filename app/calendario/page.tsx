import Container from "@/components/ui/Container";

export default function CalendarioPage() {

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32">

      <Container>

        <div className="mb-20">

          <h1 className="text-5xl md:text-7xl font-black">

            Calendario Anime

          </h1>

          <p className="text-zinc-400 mt-6 text-lg max-w-3xl">

            Descubre qué animes se emiten cada día de la semana.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {days.map((day) => (

            <div
              key={day}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >

              <h2 className="text-2xl font-bold capitalize">

                {day}

              </h2>

            </div>

          ))}

        </div>

      </Container>

    </main>
  );
}