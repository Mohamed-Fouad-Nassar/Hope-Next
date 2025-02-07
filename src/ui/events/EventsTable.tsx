import Table from "@/ui/Table";
import EventRow from "./EventRow";
import Pagination from "@/ui/Pagination";
import EventDashCard from "./EventDashCard";

import { getEvents, getEventsCount } from "@/services/eventsAPI";

import { EVENTS_PER_PAGE } from "@/lib/constants";

import { EventStatus, EventTypeStatus } from "@prisma/client";

export default async function EventsTable({
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
      <div className="hidden md:block relative">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "Title", "User", "Created at", "Dates", "Status"]}
          />

          <Table.Body
            data={events}
            render={(event) => (
              <EventRow
                key={event?.id}
                event={event}
                isLast={
                  event == events[events.length - 1] ||
                  event == events[events.length - 2]
                }
              />
            )}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {events.map((event) => (
          <EventDashCard key={event?.id} event={event} />
        ))}
      </div>

      {events.length > 0 && (
        <Pagination pageSize={EVENTS_PER_PAGE} count={count} />
      )}
    </>
  );
}
