import Container from "@/components/ui/Container";

import DaySchedule from "@/components/calendar/DaySchedule";

import { getScheduleDay } from "@/services/schedule.service";

export default async function CalendarioPage() {

  const [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  ] = await Promise.all([

    getScheduleDay("monday"),
    getScheduleDay("tuesday"),
    getScheduleDay("wednesday"),
    getScheduleDay("thursday"),
    getScheduleDay("friday"),
    getScheduleDay("saturday"),
    getScheduleDay("sunday"),

  ]);

  return (
    <main className="min-h-screen bg-black text-white pt-40">

      <Container>

        <div className="mb-20">

          <h1 className="text-6xl font-black">

            Calendario Anime

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Descubre qué animes se emiten cada día.

          </p>

        </div>

        <DaySchedule
          title="Lunes"
          anime={monday}
        />

        <DaySchedule
          title="Martes"
          anime={tuesday}
        />

        <DaySchedule
          title="Miércoles"
          anime={wednesday}
        />

        <DaySchedule
          title="Jueves"
          anime={thursday}
        />

        <DaySchedule
          title="Viernes"
          anime={friday}
        />

        <DaySchedule
          title="Sábado"
          anime={saturday}
        />

        <DaySchedule
          title="Domingo"
          anime={sunday}
        />

      </Container>

    </main>
  );
}