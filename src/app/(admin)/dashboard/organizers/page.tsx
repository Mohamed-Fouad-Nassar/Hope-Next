import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import DashPageHeading from "@/ui/DashPageHeading";
import OrganizersTable from "@/ui/organizers/OrganizersTable";
import EventsTableSkeleton from "@/ui/skeletons/events/EventsTableSkeleton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Organizers",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="flex-1 px-3 py-5">
      <div className="mb-6">
        <div className="pb-3 flex items-center gap-3 justify-between md:items-stretch">
          <DashPageHeading className="!pb-0 md:!ml-12 lg:!ml-0">
            Organizes
          </DashPageHeading>
          <Button
            as="Link"
            href="/dashboard/organizers/create"
            className="px-4 flex h-9 gap-1 items-center text-sm font-medium rounded-lg"
          >
            <PlusIcon className="size-5" />
            <span className="hidden md:block">Create Organizer</span>
          </Button>
          {/* <div className="flex flex-col md:flex-row items-center gap-2">
            <Filter
              filterField="type"
              options={[
                { label: "All", value: "all" },
                { label: "Online", value: "ONLINE" },
                { label: "Onsite", value: "ONSITE" },
                { label: "Hybrid", value: "HYBRID" },
              ]}
            />
            <Filter
              filterField="status"
              options={[
                { label: "All", value: "all" },
                { label: "Up Coming", value: "UP_COMING" },
                { label: "Finished", value: "FINISHED" },
                { label: "Cancelled", value: "CANCELLED" },
              ]}
            />
          </div> */}
        </div>
      </div>

      <Suspense fallback={<EventsTableSkeleton />}>
        <OrganizersTable />
      </Suspense>
    </main>
  );
}
