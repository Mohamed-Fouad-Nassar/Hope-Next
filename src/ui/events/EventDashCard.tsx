"use client";

import {
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Tag from "../Tag";
import Menus from "../Menus";
import Modal from "../Modal";
import Author from "../blog/Author";
import DeleteEventForm from "./DeleteEventForm";
import { eventLocationStatus, eventStatus } from "./EventRow";

import { formateDateTime } from "@/utils/utils";

import { TEventWithUser } from "@/types/events.types";

export default function EventDashCard({ event }: { event: TEventWithUser }) {
  const {
    id,
    user,
    title,
    status,
    endDate,
    createdAt,
    startDate,
    locationType,
  } = event;

  return (
    <Menus>
      <div className="w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Author author={user} />
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
          </div>
        </div>

        <div className="pt-4 pb-2 mb-2 border-b">
          <div className="pb-2 w-fit flex justify-start items-end gap-2">
            <Tag status={eventStatus[status]}>{status.replace("_", " ")}</Tag>
            <Tag status={eventLocationStatus[locationType]}>{locationType}</Tag>
          </div>
          <h2 className="text-xl font-medium pb-2">{title}</h2>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            {formateDateTime(startDate)} | {formateDateTime(endDate)}
          </div>
        </div>
        <p className="text-xs pt-2 text-end text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </Menus>
  );
}
