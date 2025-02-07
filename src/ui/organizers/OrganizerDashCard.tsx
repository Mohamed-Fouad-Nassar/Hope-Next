"use client";

import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";

import { TEventOrganizer } from "@/types/events.types";

export default function OrganizerDashCard({
  organizer,
}: {
  organizer: TEventOrganizer;
}) {
  const {
    id,
    name,
    contact,
    website,
    createdAt,
    updatedAt,
    _count: { events: eventsCount },
  } = organizer;

  return (
    <Menus>
      <div className="w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h2 className="text-xl font-medium pb-2">{name}</h2>
            <p className="text-xs text-gray-500">{contact}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
                  <Menus.Button
                    icon={<EyeIcon className="size-4 dark:text-gray-300" />}
                  >
                    View
                  </Menus.Button>
                  <Menus.Button
                    icon={<PencilIcon className="size-4 dark:text-gray-300" />}
                  >
                    Edit
                  </Menus.Button>
                  <hr className="border-gray-200 dark:border-gray-500" />
                  <Modal.Open opens="delete-organizer-row">
                    <Menus.Button
                      icon={<TrashIcon className="size-4 dark:text-gray-300" />}
                    >
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>
              {/* <Modal.Window title="Delete Organizer" name="delete-organizer-row">
                <DeleteOrganizerForm organizerId={id} />
              </Modal.Window> */}
            </Modal>
          </div>
        </div>

        <div className="pt-4 pb-2 mb-2 border-b">
          <span className="text-base text-gray-500">{website}</span>
          <div className="pt-2 flex gap-2 flex-start items-center">
            <CalendarDaysIcon className="size-5 text-gray-500" />
            <p className="text-gray-600 font-medium">{eventsCount} events</p>
          </div>
        </div>
        <p className="text-xs pt-2 text-end text-gray-500">
          created at: {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-xs pt-2 text-end text-gray-500">
          Last updated at: {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
    </Menus>
  );
}
