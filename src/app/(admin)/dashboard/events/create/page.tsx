import Breadcrumb from "@/ui/Breadcrumb";
import CreateEventForm from "@/ui/events/CreateEventForm";

import { getOrganizers } from "@/services/eventsAPI";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "New Event",
};

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getOrganizers();

  return (
    <main className="flex-1 px-3 py-5">
      <Breadcrumb
        curTitle="Create"
        links={[
          {
            title: "Events",
            href: "/dashboard/events",
            withIcon: false,
          },
        ]}
      />
      <CreateEventForm organizers={data} />
    </main>
  );
}
