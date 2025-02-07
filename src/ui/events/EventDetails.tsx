import { LinkIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";

import EventBanner from "./EventBanner";
import TextExpander from "../TextExpander";
import EventResources from "./EventResources";
import EventGallerySlider from "./EventGallerySlider";

import { getEventById } from "@/services/eventsAPI";

export default async function EventDetails({ eventId }: { eventId: string }) {
  const {
    id,
    title,
    venue,
    status,
    endDate,
    address,
    mapLink,
    gallery,
    startDate,
    resources,
    onlineLink,
    bannerImage,
    description,
    locationType,
    organizer,
  } = await getEventById(eventId);

  return (
    <>
      {/* Banner Section */}
      <EventBanner
        event={{
          id: id,
          title: title,
          status: status,
          bannerImage: bannerImage,
          locationType: locationType,
          endDate: endDate.toString(),
          startDate: startDate.toString(),
        }}
      />

      {/* Event Details */}
      <div className="px-1 space-y-6">
        <TextExpander className="px-1 text-gray-700">
          {description}
        </TextExpander>

        <div className="mt-3 grid gap-3 grid-cols-1 md:grid-cols-2">
          {/* Offline Location */}
          {(locationType === "ONSITE" || locationType === "HYBRID") && (
            <div className="col-span-2 md:col-span-1 py-2 px-4 bg-gray-50 rounded">
              <h2 className="text-xl pb-3 font-semibold">Event Location</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-main-200 rounded-full flex justify-center items-center">
                  <MapPinIcon className="size-6 text-main-800" />
                </div>
                <a
                  href={mapLink || "#"}
                  className="group flex-1 flex flex-col text-gray-800"
                >
                  <span className="group-hover:text-main-800 font-semibold">
                    {venue}
                  </span>
                  <span className="text-sm">{address}</span>
                </a>
              </div>
            </div>
          )}

          {/* Online Link */}
          {(locationType === "ONLINE" || locationType === "HYBRID") && (
            <div className="col-span-2 md:col-span-1 py-2 px-4 bg-gray-50 rounded">
              <h2 className="text-xl pb-3 font-semibold">Event Link</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-main-200 rounded-full flex justify-center items-center">
                  <LinkIcon className="size-6 text-main-800" />
                </div>
                <a
                  href={onlineLink || "#"}
                  className="group flex-1 flex flex-col text-gray-800"
                >
                  <span className="group-hover:text-main-800 font-semibold">
                    {organizer?.name}
                  </span>
                  <span className="text-sm">Online Meeting Link</span>
                </a>
              </div>
            </div>
          )}

          {/* Organizer Details */}
          <div className="col-span-2 py-2 px-4 bg-gray-50 rounded">
            <h2 className="text-xl pb-3 font-semibold">Organizer Info</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-main-200 rounded-full flex justify-center items-center">
                <UserIcon className="size-6 text-main-800" />
              </div>
              <a
                href={organizer?.website || "#"}
                className="group flex-1 flex flex-col text-gray-800"
              >
                <span className="group-hover:text-main-800 font-semibold">
                  {organizer?.name}
                </span>
                <span className="text-sm">{organizer?.contact}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {gallery.length > 0 && <EventGallerySlider gallery={gallery} />}

      {/* Resources Section */}
      {resources.length > 0 && (
        <EventResources
          // resources={resources}
          resources={[
            {
              id: 1,
              type: "document",
              title: "Caregiver Guide",
              url: "/files/caregiver-guide.pdf",
            },
            {
              id: 2,
              type: "link",
              title: "Support Group Info",
              url: "https://example.com/support-group",
            },
            {
              id: 3,
              type: "document",
              title: "Youth Workshop Materials",
              url: "/files/youth-workshop.pdf",
            },
            {
              id: 4,
              type: "link",
              title: "Event Feedback Form",
              url: "https://example.com/feedback",
            },
          ]}
        />
      )}
    </>
  );
}
