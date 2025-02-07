import { Suspense } from "react";

import EventDetails from "@/ui/events/EventDetails";
import EventDetailsSkeleton from "@/ui/skeletons/events/EventDetailsSkeleton";

import { getEventById } from "@/services/eventsAPI";

export async function generateMetadata({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { title } = await getEventById(eventId);
  return { title };
}

export default function Page({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <Suspense fallback={<EventDetailsSkeleton />}>
          <EventDetails eventId={eventId} />
        </Suspense>
      </div>
    </div>
  );
}
