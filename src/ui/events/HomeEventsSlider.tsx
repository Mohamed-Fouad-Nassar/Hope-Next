"use client";

import Link from "next/link";
import Carousel from "../Carousel";
import EventBanner from "./EventBanner";

import { Event } from "@prisma/client";

export default function HomeEventsSlider({ events }: { events: Event[] }) {
  return (
    <Carousel
      data={events}
      // withBullets={false}
      render={(currentSlide, _, index) => (
        <Carousel.CarouselItem
          key={index}
          index={index}
          currentSlide={currentSlide}
        >
          <Link href={`/events/${events[index].id}`}>
            <EventBanner
              event={{
                id: events[index].id,
                status: events[index].status,
                title: events[index].title,
                locationType: events[index].locationType,
                bannerImage: events[index].bannerImage,
                endDate: events[index].endDate.toString(),
                startDate: events[index].startDate.toString(),
              }}
              description={events[index].description}
            />
          </Link>
        </Carousel.CarouselItem>
      )}
      errMessage="No events available yet."
    />
  );
}
