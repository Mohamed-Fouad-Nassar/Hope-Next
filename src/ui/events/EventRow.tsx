"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import Tag from "../Tag";
import Menus from "../Menus";
import Modal from "../Modal";
import DeleteEventForm from "./DeleteEventForm";

import { formateDateTime } from "@/utils/utils";

import { TEventWithUser } from "@/types/events.types";
import Author from "../blog/Author";

export const eventStatus: Record<string, "secondary" | "third" | "danger"> = {
  UP_COMING: "third",
  FINISHED: "secondary",
  CANCELLED: "danger",
};
export const eventLocationStatus: Record<
  string,
  "primary" | "secondary" | "third"
> = {
  ONLINE: "primary",
  ONSITE: "secondary",
  HYBRID: "third",
};

export default function EventRow({
  event,
  isLast,
}: {
  isLast: boolean;
  event: TEventWithUser;
}) {
  const {
    id,
    user,
    title,
    status,
    endDate,
    startDate,
    createdAt,
    locationType,
  } = event;

  return (
    <Menus>
      <tr className="text-center bg-gray-50 dark:bg-gray-600 dark:text-gray-400 *:p-2 *:lg:px-6 *:lg:py-4 border-b dark:border-gray-700 last:border-none">
        <td>{id}</td>
        <td className="text-start font-medium">{title}</td>
        <td>
          <Author author={user} />
        </td>
        <td className="text-xs font-medium">{formateDateTime(createdAt)}</td>
        <td className="text-xs font-medium">
          {formateDateTime(startDate)} | {formateDateTime(endDate)}
        </td>
        <td>
          <div className="flex flex-col items-end gap-2">
            <Tag status={eventLocationStatus[locationType]}>{locationType}</Tag>
            <Tag status={eventStatus[status]}>{status.replace("_", " ")}</Tag>
          </div>
        </td>

        <td>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id} isLast={isLast}>
                <Menus.Button
                  as="Link"
                  href={`/events/${id}`}
                  icon={<EyeIcon className="size-4 dark:text-gray-300" />}
                >
                  View
                </Menus.Button>
                <Menus.Button
                  as="Link"
                  href={`/dashboard/events/${id}/edit`}
                  icon={<PencilIcon className="size-4 dark:text-gray-300" />}
                >
                  Edit
                </Menus.Button>
                <hr className="border-gray-200 dark:border-gray-500" />
                <Modal.Open opens="delete-event-row">
                  <Menus.Button
                    icon={<TrashIcon className="size-4 dark:text-gray-300" />}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window title="Delete Event" name="delete-event-row">
              <DeleteEventForm eventId={id} />
            </Modal.Window>
          </Modal>
        </td>
      </tr>
    </Menus>
  );
}
