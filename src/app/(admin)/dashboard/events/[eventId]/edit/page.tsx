import Breadcrumb from "@/ui/Breadcrumb";
import UpdateEventForm from "@/ui/events/UpdateEventForm";

import { getEventById } from "@/services/eventsAPI";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Event",
};

export default async function Page({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const event = await getEventById(eventId);

  return (
    <main className="flex-1 px-3 py-5">
      {/* <DashPageHeading>Update Event #{eventId}</DashPageHeading> */}
      <Breadcrumb
        curTitle={`Edit Event: #${eventId}`}
        links={[
          {
            title: "Events",
            href: "/dashboard/events",
            withIcon: false,
          },
        ]}
      />
      <UpdateEventForm event={event} />
    </main>
  );
}
