"use client";

const activities = [
  {
    action:
      "Añadió un anime a favoritos",
    anime:
      "Sousou no Frieren",
    time:
      "Hace 2 horas",
  },

  {
    action:
      "Vio recientemente",
    anime:
      "Jujutsu Kaisen",
    time:
      "Hace 5 horas",
  },

  {
    action:
      "Exploró temporada",
    anime:
      "Primavera 2026",
    time:
      "Ayer",
  },

  {
    action:
      "Visitó una página anime",
    anime:
      "Chainsaw Man",
    time:
      "Hace 2 días",
  },
];

export default function ProfileActivity() {

  return (
    <section className="mt-32">

      <div className="mb-10">

        <h2 className="text-4xl font-black">

          Actividad reciente

        </h2>

        <p className="text-zinc-400 mt-2">

          Tu actividad dentro de 24 MINUTES.

        </p>

      </div>

      <div className="space-y-4">

        {activities.map(
          (
            activity,
            index
          ) => (

          <div
            key={index}
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>

                <p className="text-white font-semibold">

                  {
                    activity.action
                  }

                </p>

                <p className="text-zinc-400 mt-1">

                  {
                    activity.anime
                  }

                </p>

              </div>

              <p className="text-zinc-500 text-sm">

                {
                  activity.time
                }

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}