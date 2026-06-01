"use client";

const achievements = [
  {
    title:
      "Anime Collector",
    description:
      "Añadiste tus primeros favoritos.",
    icon:
      "🏆",
  },

  {
    title:
      "Explorer",
    description:
      "Visitaste múltiples temporadas.",
    icon:
      "🌍",
  },

  {
    title:
      "Night Watcher",
    description:
      "Pasaste horas explorando anime.",
    icon:
      "🌙",
  },

  {
    title:
      "24 MINUTES Member",
    description:
      "Formas parte de la plataforma.",
    icon:
      "🔥",
  },
];

export default function ProfileAchievements() {

  return (
    <section className="mt-32">

      <div className="mb-10">

        <h2 className="text-4xl font-black">

          Logros

        </h2>

        <p className="text-zinc-400 mt-2">

          Tu progreso dentro de 24 MINUTES.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {achievements.map(
          (
            achievement,
            index
          ) => (

          <div
            key={index}
            className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500"
          >

            <div className="text-5xl mb-5">

              {
                achievement.icon
              }

            </div>

            <h3 className="text-2xl font-bold text-white">

              {
                achievement.title
              }

            </h3>

            <p className="text-zinc-400 mt-3 leading-relaxed">

              {
                achievement.description
              }

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}