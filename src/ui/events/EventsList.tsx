import EventCard from "./EventCard";
import Pagination from "@/ui/Pagination";

import { getEvents, getEventsCount } from "@/services/eventsAPI";

import { EVENTS_PER_PAGE } from "@/lib/constants";

import { EventStatus, EventTypeStatus } from "@prisma/client";

export default async function EventsList({
  page = "1",
  type = "all",
  status = "all",
}: {
  page: string;
  status: EventStatus | "all";
  type: EventTypeStatus | "all";
}) {
  const events = await getEvents(page, type, status);
  const { count } = await getEventsCount(type, status);

  return (
    <>
      <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-8 border-t border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <EventCard key={event?.id} event={event} />
        ))}
      </div>

      {events.length > 0 && (
        <Pagination pageSize={EVENTS_PER_PAGE} count={count} />
      )}
    </>
  );
}
