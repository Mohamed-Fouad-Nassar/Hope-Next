import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Event } from "@prisma/client";
import { BASE_URL } from "@/lib/constants";

import {
  TEventOrganizer,
  TEventWithOrganizer,
  TEventWithUser,
} from "@/types/events.types";

// --------------------- Events ---------------------
export async function getEvents(
  page?: string,
  type?: string,
  status?: string
): Promise<TEventWithUser[]> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(
    `${BASE_URL}/events?page=${page || "1"}&type=${type || "all"}&status=${
      status || "all"
    }`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error(`Failed to fetch all events`);
  return res.json();
}

export async function getEventById(
  eventId: string | number
): Promise<TEventWithOrganizer> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/events/${eventId}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

export async function getEventsByTitle(title: string): Promise<Event[]> {
  const cookie = cookies().get("jwtToken")?.value || "";

  const res = await fetch(`${BASE_URL}/events/search?query=${title}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getEventsCount(
  type?: string,
  status?: string
): Promise<{ count: number }> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const res = await fetch(
    `${BASE_URL}/events/count?type=${type || "all"}&status=${status || "all"}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch events count");
  return res.json();
}

// --------------------- Organizers ---------------------
export async function getOrganizers(): Promise<TEventOrganizer[]> {
  const res = await fetch(`${BASE_URL}/organizers`, {
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch events organizers");
  return res.json();
}

export async function getOrganizersCount(): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/organizers/count`, {
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch events organizers");
  return res.json();
}
