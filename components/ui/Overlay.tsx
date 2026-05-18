type OverlayProps = {
  opacity?: string;
};

export default function Overlay({
  opacity = "bg-black/60",
}: OverlayProps) {

  return (
    <div
      className={`absolute inset-0 ${opacity}`}
    />
  );
}