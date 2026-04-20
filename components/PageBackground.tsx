export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
