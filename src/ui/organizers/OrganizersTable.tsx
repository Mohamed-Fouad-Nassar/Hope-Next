import Table from "@/ui/Table";
import Pagination from "@/ui/Pagination";
import OrganizerRow from "./OrganizerRow";
import OrganizerDashCard from "./OrganizerDashCard";

import { getOrganizers, getOrganizersCount } from "@/services/eventsAPI";

const ORGANIZERS_PER_PAGE = 10;

export default async function OrganizersTable() {
  const organizers = await getOrganizers();
  const { count } = await getOrganizersCount();

  return (
    <>
      <div className="hidden md:block relative">
        <Table>
          <Table.Head
            actions={true}
            titles={[
              "Id",
              "Name",
              "Email",
              "Events Count",
              "Created at",
              "updated at",
            ]}
          />

          <Table.Body
            data={organizers}
            render={(organizer) => (
              <OrganizerRow
                key={organizer?.id}
                organizer={organizer}
                isLast={organizer == organizers[organizers.length - 1]}
              />
            )}
          />
        </Table>
      </div>

      <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
        {organizers.map((organizer) => (
          <OrganizerDashCard key={organizer?.id} organizer={organizer} />
        ))}
      </div>

      {organizers.length > 0 && (
        <Pagination pageSize={ORGANIZERS_PER_PAGE} count={count} />
      )}
    </>
  );
}
