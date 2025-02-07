"use client";

import {
  ClockIcon,
  ShareIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import Menus from "@/ui/Menus";
import Button from "@/ui/Button";
import EventTag from "./EventTag";
import EventOptions from "./EventOptions";
import FallbackImage from "@/ui/FallbackImage";
import { eventStatusIcons } from "./EventBanner";

import { formateDateTime } from "@/utils/utils";

import { Event } from "@prisma/client";

export default function EventCard({ event }: { event: Event }) {
  const { id, title, bannerImage, description } = event;

  return (
    // bg-white dark:bg-gray-800
    <Menus>
      <div className="mx-auto">
        <a
          href={`/events/${id}`}
          className="relative block w-full aspect-video"
        >
          {/* <Image
            fill
            src={bannerImage}
            alt="event image"
            className="object-cover rounded"
            onError={(e) => {
              e.target.srcset = "/image-1.jpg";
            }}
            // onError={(e) => console.log(e.target.srcset)}
          />*/}
          <FallbackImage src={bannerImage} alt={`${title} image`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg">
            <div className="text-white absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <EventTag>
                  {eventStatusIcons[event.status]}
                  {event.status.replace("_", " ")}
                </EventTag>
                <EventTag>
                  <MapPinIcon className="size-4" />
                  {event.locationType.replace("_", " ")}
                </EventTag>
              </div>
            </div>
          </div>
        </a>

        <div className="py-5">
          <a href={`/events/${id}`}>
            <h5
              className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"
              title={title}
            >
              {title}
            </h5>
          </a>
          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2"
            title={description}
          >
            {description}
          </p>

          <div className="mb-3 space-y-1 text-sm text-gray-600 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-6" />
              <span
                className="flex-1 line-clamp-1"
                title={`${event.venue} ${event.address}`}
              >
                {event.venue}, {event.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="size-6" />
              <span
                className="flex-1 line-clamp-1"
                title={`${formateDateTime(event.startDate)} | ${formateDateTime(
                  event.endDate
                )}`}
              >
                {formateDateTime(event.startDate)} |{" "}
                {formateDateTime(event.endDate)}
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <div className="flex-1">
              <Button
                as="Link"
                variation="primary"
                href={`/events/${id}`}
                className="w-fit flex items-center gap-2 !px-3 !py-2 !text-sm !font-medium"
              >
                Read More
                <ArrowRightIcon className="size-3.5" />
              </Button>
            </div>

            <Menus.Menu>
              <Menus.Toggle id={id}>
                <Button variation="secondary">
                  <ShareIcon strokeWidth={2} className="size-4" />
                </Button>
              </Menus.Toggle>
              <Menus.List id={id}>
                <EventOptions
                  id={id}
                  title={title}
                  className="px-2 py-4 !text-black flex flex-col"
                />
              </Menus.List>
            </Menus.Menu>
          </div>
        </div>
      </div>
    </Menus>
  );
}
