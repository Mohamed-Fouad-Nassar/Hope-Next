import Spinner from "@/ui/Spinner";

export default function loading() {
  return (
    <main className="flex h-[calc(100dvh-77px)] justify-center items-center">
      <Spinner />
    </main>
  );
}
