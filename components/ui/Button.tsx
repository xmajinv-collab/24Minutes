type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {

  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-white text-black hover:scale-105",

    secondary:
      "bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}