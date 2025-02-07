import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Search from "@/ui/Search";
import Filter from "@/ui/Filter";
import Button from "@/ui/Button";
import EventsTable from "@/ui/events/EventsTable";
import DashPageHeading from "@/ui/DashPageHeading";
import EventsTableSkeleton from "@/ui/skeletons/events/EventsTableSkeleton";

import { EventStatus, EventTypeStatus } from "@prisma/client";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Events",
};

export default function Page({
  searchParams: { type = "all", page = "1", status = "all" },
}: {
  searchParams: {
    page: string;
    status: EventStatus | "all";
    type: EventTypeStatus | "all";
  };
}) {
  return (
    <main className="flex-1 px-3 py-5">
      <div className="mb-6">
        <div className="pb-3 flex flex-col items-center gap-3 justify-between md:flex-row md:items-stretch">
          <DashPageHeading className="!pb-0 !ml-0 md:!ml-12 lg:!ml-0">
            Events
          </DashPageHeading>
          <div className="flex flex-col md:flex-row items-center gap-2">
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
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-full max-w-[450px]">
            <Search searchField="title" />
          </div>

          <Button
            as="Link"
            href="/dashboard/events/create"
            className="px-4 flex h-9 gap-1 items-center text-sm font-medium rounded-lg"
          >
            <PlusIcon className="size-5" />
            <span className="hidden md:block">Create Event</span>
          </Button>
        </div>
      </div>

      <Suspense key={type + page + status} fallback={<EventsTableSkeleton />}>
        <EventsTable page={page} type={type} status={status} />
      </Suspense>
    </main>
  );
}
