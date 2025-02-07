import { Suspense } from "react";

import Filter from "@/ui/Filter";
import Search from "@/ui/Search";
import EventsList from "@/ui/events/EventsList";
import EventsListSkeleton from "@/ui/skeletons/events/EventsListSkeleton";

import { EventStatus, EventTypeStatus } from "@prisma/client";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Events",
};

export default function Page({
  searchParams: { page = "1", type = "all", status = "all" },
}: {
  searchParams: {
    page: string;
    status: EventStatus | "all";
    type: EventTypeStatus | "all";
  };
}) {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <div className="flex items-center flex-col md:flex-row justify-between gap-4 mx-auto lg:mx-0">
          <h2 className="min-w-fit text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our Events
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <Filter
              filterField="type"
              options={[
                { value: "all", label: "All" },
                { value: "ONLINE", label: "Online" },
                { value: "ONSITE", label: "Onsite" },
                { value: "HYBRID", label: "Hybrid" },
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

        <div className="mx-auto mt-4 w-full max-w-[450px]">
          <Search
            searchField="title"
            placeholder="Search Events with Title..."
          />
        </div>

        <Suspense key={page + type + status} fallback={<EventsListSkeleton />}>
          <EventsList page={page} type={type} status={status} />
        </Suspense>
      </div>
    </div>
  );
}
