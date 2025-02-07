"use client";

import {
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import EventTag from "./EventTag";
import EventOptions from "./EventOptions";
import FallbackImage from "@/ui/FallbackImage";

import { formateDateTime } from "@/utils/utils";

type TEventBannerProps = {
  id: number;
  title: string;
  status: string;
  endDate: string;
  startDate: string;
  bannerImage: string;
  locationType: string;
};

export const eventStatusIcons: Record<string, React.ReactNode> = {
  UP_COMING: <ClockIcon className="size-4" />,
  FINISHED: <CheckIcon className="size-4" />,
  CANCELLED: <XMarkIcon className="size-4" />,
};

export default function EventBanner({
  event,
  description,
}: {
  description?: string;
  event: TEventBannerProps;
}) {
  const { id, bannerImage, title, startDate, endDate, status, locationType } =
    event;
  return (
    <div className={`relative w-full ${description ? "h-full" : "h-96 mb-6 "}`}>
      {/* <Image
        fill
        src={bannerImage}
        alt={`${title} image`}
        className="object-cover rounded-lg shadow-md"
        onError={(e) => {
          e.target.srcset = "/image-1.jpg";
        }}
      /> */}
      <FallbackImage src={bannerImage} alt={`${title} image`} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg">
        <div className="flex flex-col md:flex-row md:items-end absolute bottom-6 left-6 right-6 text-white space-y-2 space-x-2">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2">
              <EventTag>
                {eventStatusIcons[status]}
                {status.replace("_", " ")}
              </EventTag>
              <EventTag>
                <MapPinIcon className="size-4" />
                {locationType.replace("_", " ")}
              </EventTag>
            </div>

            <h1 className="text-4xl py-1 font-bold">{title}</h1>
            {description && (
              <p className="text-sm mb-2 line-clamp-2">{description}</p>
            )}

            <div className="flex items-center gap-2">
              <ClockIcon className="size-5" />
              <span>
                {formateDateTime(startDate)} {" | "} {formateDateTime(endDate)}
              </span>
            </div>
          </div>

          <EventOptions title={title} id={description ? id : undefined} />
        </div>
      </div>
    </div>
  );
}
