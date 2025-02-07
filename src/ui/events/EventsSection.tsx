import Link from "next/link";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

import HomeEventsList from "./HomeEventsList";

export default function EventsSection() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container px-4">
        <div className="mx-auto lg:mx-0">
          <Link
            href="/events"
            className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl hover:underline"
          >
            Events
          </Link>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <Suspense fallback={<Skeleton className="w-full h-80 md:h-[500px]" />}>
          <HomeEventsList />
        </Suspense>
      </div>
    </div>
  );
}
