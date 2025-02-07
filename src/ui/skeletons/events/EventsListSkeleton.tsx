import EventCardSkeleton from "./EventCardSkeleton";

import { EVENTS_PER_PAGE } from "@/lib/constants";

export default function EventsListSkeleton({
  count = EVENTS_PER_PAGE,
}: {
  count?: number;
}) {
  return (
    <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-8 border-t border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
