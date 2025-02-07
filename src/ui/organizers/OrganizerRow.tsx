"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";

import { formateDateTime } from "@/utils/utils";

import { TEventOrganizer } from "@/types/events.types";

export default function OrganizerRow({
  isLast,
  organizer,
}: {
  isLast: boolean;
  organizer: TEventOrganizer;
}) {
  const {
    id,
    name,
    contact,
    createdAt,
    updatedAt,
    _count: { events: eventsCount },
  } = organizer;

  return (
    <Menus>
      <tr className="text-center bg-gray-50 dark:bg-gray-600 dark:text-gray-400 *:p-2 *:lg:px-6 *:lg:py-4 border-b dark:border-gray-700 last:border-none">
        <td>{id}</td>
        <td className="text-start font-medium">{name}</td>
        <td className="font-medium">{contact}</td>
        <td className="font-medium">{eventsCount}</td>
        <td className="text-xs">{formateDateTime(createdAt)}</td>
        <td className="text-xs">{formateDateTime(updatedAt)}</td>
        <td>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id} isLast={isLast}>
                <Menus.Button
                  as="Link"
                  href={`/organizers/${id}`}
                  icon={<EyeIcon className="size-4 dark:text-gray-300" />}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  as="Link"
                  href={`/dashboard/organizers/${id}/edit`}
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
        </td>
      </tr>
    </Menus>
  );
}
