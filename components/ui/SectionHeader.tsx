type SectionHeaderProps = {
  badge: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  badge,
  title,
  description,
}: SectionHeaderProps) {

  return (
    <div className="mb-12">

      <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-4">
        {badge}
      </p>

      <h2 className="text-4xl md:text-5xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="text-zinc-400 mt-6 text-lg max-w-2xl">
          {description}
        </p>
      )}

    </div>
  );
}