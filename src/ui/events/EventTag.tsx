export default function EventTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 px-2 py-1 text-sm rounded bg-main-400 text-white">
      {children}
    </span>
  );
}
