export default function PlaceholderScreen({ name }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-[var(--color-copper-bright)] font-[var(--font-engraved)] text-2xl">
      [ Ekran: {name} ]
    </div>
  );
}
