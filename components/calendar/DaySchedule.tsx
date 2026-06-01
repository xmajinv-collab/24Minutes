type Props = {
  title: string;
};

export default function DaySchedule({
  title,
}: Props) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

      <h2 className="text-2xl font-bold">

        {title}

      </h2>

    </div>
  );
}