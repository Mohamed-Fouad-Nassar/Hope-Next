import Spinner from "@/ui/Spinner";

export default function Loading() {
  return (
    <main className="flex-1 max-h-screen px-3 py-5 flex justify-center items-center">
      <Spinner />
    </main>
  );
}
