import Table from "@/ui/Table";
import EventRowSkeleton from "./EventRowSkeleton";
import EventDashCardSkeleton from "./EventDashCardSkeleton";

import { EVENTS_PER_PAGE } from "@/lib/constants";

export default function EventsTableSkeleton() {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <Table.Head
            actions={true}
            titles={["Id", "Title", "Created at", "Dates", "Status", "Type"]}
          />

          <Table.Body
            data={Array.from({ length: EVENTS_PER_PAGE })}
            render={(_, i) => <EventRowSkeleton key={i} />}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {Array.from({ length: EVENTS_PER_PAGE }).map((_, i) => (
          <EventDashCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
