import EventCard from "@/ui/events/EventCard";

import { getEventsByTitle } from "@/services/eventsAPI";

export default async function page({
  searchParams: { title },
}: {
  searchParams: { title: string };
}) {
  const events = await getEventsByTitle(title);

  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <h2 className="min-w-fit text-pretty mb-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Search Events With Title: {title}
        </h2>
        <span className="text-gray-600">You got {events.length} events</span>

        <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            <>
              {events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>
          ) : (
            <p>No events Yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
