import { Event } from "@prisma/client";

export type TEventUser = {
  id: string;
  email: string;
  image: string;
  username: string;
  isAdmin: boolean;
};
export type TEventWithUser = Event & { user: TEventUser };

export type TEventOrganizer = {
  id: string;
  name: string;
  contact: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  _count: { events: number };
};
export type TEventWithOrganizer = Event & { organizer: TEventOrganizer };
