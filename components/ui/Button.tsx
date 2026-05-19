type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {

  const baseStyles =
    "relative overflow-hidden px-7 py-3.5 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 active:scale-95";

  const variants = {

    primary:
      "bg-white text-black shadow-2xl shadow-white/10 hover:shadow-fuchsia-500/20 hover:bg-zinc-100",

    secondary:
      "bg-white/5 text-white backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl shadow-black/20",

  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
    >

      {/* HOVER GLOW */}
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-transparent" />

      {/* CONTENT */}
      <span className="relative z-10">
        {children}
      </span>

    </button>
  );
}