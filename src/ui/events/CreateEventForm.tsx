"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";

import Modal from "@/ui/Modal";
import Button from "@/ui/Button";
import Spinner from "@/ui/Spinner";
import FormRow from "@/ui/FormRow";
import Combobox from "@/ui/Combobox ";
import { eventLocationStatus } from "./EventRow";
import CreateOrganizerForm from "@/ui/organizers/CreateOrganizerForm";

import { createEventSchema } from "@/lib/validations";
import { createEvent, TCreateEventState } from "@/lib/actions";

import { TEventOrganizer } from "@/types/events.types";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="mt-4 flex justify-end items-center gap-3">
      <Button as="Link" href="/dashboard/posts" variation="secondary">
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={pending}
        className="flex items-center gap-1"
      >
        {pending ? (
          <>
            <Spinner size="!size-4" />
            <span>Creating...</span>
          </>
        ) : (
          <span>Create Event</span>
        )}
      </Button>
    </div>
  );
}

export default function CreateEventForm({
  organizers,
}: {
  organizers: TEventOrganizer[];
}) {
  const router = useRouter();
  const [organizerId, setOrganizerId] = useState("");
  const [eventLocationType, setEventLocationType] = useState("");

  const data = organizers?.map((el: TEventOrganizer) => ({
    title: el?.name,
    value: el?.id,
    subTitle: el?.contact,
  }));

  async function clientAction(
    prev: TCreateEventState | undefined,
    formData: FormData
  ) {
    const event = {
      title: formData.get("title"),
      description: formData.get("description"),
      bannerImage: formData.get("bannerImage"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      locationType: eventLocationType,
      onlineLink:
        eventLocationType === "ONLINE" || eventLocationType === "HYBRID"
          ? formData.get("onlineLink")
          : null,
      venue:
        eventLocationType === "ONSITE" || eventLocationType === "HYBRID"
          ? formData.get("venue")
          : null,
      address:
        eventLocationType === "ONSITE" || eventLocationType === "HYBRID"
          ? formData.get("address")
          : null,
      mapLink:
        eventLocationType === "ONSITE" || eventLocationType === "HYBRID"
          ? formData.get("mapLink")
          : null,
      organizerId,
    };

    const result = createEventSchema.safeParse(event);
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to create new event");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new event",
      };
    }

    const res = await createEvent(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/dashboard/events");
      }
    }
    return;
  }

  const initialState: TCreateEventState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <div className="container">
        <input
          type="hidden"
          name="bannerImage"
          value="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1932"
        />

        <FormRow label="Title" errors={state?.errors?.title}>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <FormRow label="Description" errors={state?.errors?.description}>
          <textarea
            rows={3}
            id="description"
            name="description"
            placeholder="Write Event Description Here.."
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
          <FormRow label="Start Date" errors={state?.errors?.startDate}>
            <input
              id="startDate"
              name="startDate"
              type="datetime-local"
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>

          <FormRow label="End Date" errors={state?.errors?.endDate}>
            <input
              id="endDate"
              name="endDate"
              type="datetime-local"
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>
        </div>

        <FormRow label="locationType" errors={state?.errors?.locationType}>
          <select
            id="locationType"
            name="locationType"
            value={eventLocationType}
            onChange={(e) => setEventLocationType(e.target.value)}
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6 capitalize"
          >
            <option value="" hidden disabled>
              Please Select Event Location Type
            </option>
            {Object.keys(eventLocationStatus).map((value) => (
              <option key={value} value={value}>
                {value.toLocaleLowerCase()}
              </option>
            ))}
          </select>
        </FormRow>

        {/* Location Type Data */}
        {(eventLocationType === "HYBRID" || eventLocationType === "ONLINE") && (
          <>
            <h4 className="text-lg font-semibold mb-3">Online Data</h4>
            <FormRow
              label="Online Meeting Link"
              errors={state?.errors?.onlineLink}
            >
              <input
                type="text"
                id="onlineLink"
                name="onlineLink"
                className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
              />
            </FormRow>
          </>
        )}
        {(eventLocationType === "HYBRID" || eventLocationType === "ONSITE") && (
          <>
            <h4 className="text-lg font-semibold mb-3">On-site data</h4>
            <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
              <FormRow label="Venue" errors={state?.errors?.venue}>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
                />
              </FormRow>

              <FormRow label="Address" errors={state?.errors?.address}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
                />
              </FormRow>
            </div>

            <FormRow label="Location Map Link" errors={state?.errors?.mapLink}>
              <input
                type="text"
                id="mapLink"
                name="mapLink"
                className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
              />
            </FormRow>
          </>
        )}

        {/* Organizer Data */}
        <h4 className="text-lg font-semibold mb-3">Organizer Data</h4>
        <Modal>
          <div className="flex items-center gap-2">
            <Combobox
              data={data}
              selectedValue={organizerId}
              handleSelectValue={setOrganizerId}
              placeholder="Select an Organizer..."
            />
            <Modal.Open opens="create-organizer">
              <Button className="w-fit flex items-center gap-1 whitespace-nowrap">
                <PlusIcon className="size-5" />
                <span className="hidden sm:block">create organizer</span>
              </Button>
            </Modal.Open>
            <Modal.Window title="Create Organizer Form" name="create-organizer">
              <CreateOrganizerForm type="modal" />
            </Modal.Window>
          </div>
        </Modal>

        {/* 
          gallery
          resources
          */}
        <></>

        <SubmitButton />
      </div>
    </form>
  );
}
