"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import Spinner from "@/ui/Spinner";
import { eventLocationStatus, eventStatus } from "./EventRow";

import { updateEventSchema } from "@/lib/validations";
import { TUpdateEventState, updateEvent } from "@/lib/actions";

import { Event } from "@prisma/client";

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
            <span> Updating...</span>
          </>
        ) : (
          <span>Update Event</span>
        )}
      </Button>
    </div>
  );
}

export default function UpdateEventForm({ event }: { event: Event }) {
  const router = useRouter();
  const [eventLocationType, setEventLocationType] = useState(
    event?.locationType as string
  );

  async function clientAction(
    prev: TUpdateEventState | undefined,
    formData: FormData
  ) {
    const newEvent = {
      title: formData.get("title"),
      description: formData.get("description"),
      bannerImage: formData.get("bannerImage"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      locationType: eventLocationType,
      status: formData.get("status"),
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
    };

    // console.log("client new event: ", newEvent);

    const result = updateEventSchema.safeParse(newEvent);
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to update event");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update event",
      };
    }

    const res = await updateEvent(event?.id, result.data);
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

  const initialState: TUpdateEventState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <div className="container">
        <input
          type="hidden"
          name="bannerImage"
          defaultValue={event.bannerImage}
          // value="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1932"
        />

        <FormRow
          // errors={[]}
          label="Title"
          errors={state?.errors?.title}
        >
          <input
            // required
            id="title"
            type="text"
            name="title"
            defaultValue={event?.title}
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <FormRow
          // errors={[]}
          label="Description"
          errors={state?.errors?.description}
        >
          <textarea
            rows={3}
            id="description"
            name="description"
            defaultValue={event?.description}
            placeholder="Write Event Description Here.."
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
          <FormRow
            // errors={[]}
            label="Start Date"
            errors={state?.errors?.startDate}
          >
            <input
              // required
              id="startDate"
              name="startDate"
              type="datetime-local"
              // defaultValue={event?.startDate?.toString()}
              defaultValue={new Date(event?.startDate)
                .toISOString()
                .slice(0, 16)}
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>

          <FormRow
            // errors={[]}
            label="End Date"
            errors={state?.errors?.endDate}
          >
            <input
              // required
              id="endDate"
              name="endDate"
              type="datetime-local"
              // defaultValue={event?.endDate?.toString()}
              defaultValue={new Date(event?.endDate).toISOString().slice(0, 16)}
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
          <FormRow
            // errors={[]}
            label="locationType"
            errors={state?.errors?.locationType}
          >
            <select
              id="locationType"
              name="locationType"
              value={eventLocationType}
              onChange={(e) => setEventLocationType(e.target.value)}
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6 !lowercase"
            >
              <option value="" hidden disabled>
                Please Select Event Location Type
              </option>
              {Object.keys(eventLocationStatus).map((value) => (
                <option key={value} value={value}>
                  {/* {value?.charAt(0)?.toLocaleUpperCase() +
                    value?.slice(1)?.toLocaleLowerCase()} */}
                  {value}
                </option>
              ))}
            </select>
          </FormRow>
          <FormRow
            // errors={[]}
            label="Status"
            errors={state?.errors?.status}
          >
            <select
              id="status"
              name="status"
              defaultValue={event?.status}
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6 !lowercase"
            >
              <option value="" hidden disabled>
                Please Select Event Status
              </option>
              {Object.keys(eventStatus).map((value) => (
                <option key={value} value={value}>
                  {/* {value?.charAt(0)?.toLocaleUpperCase() +
                    value?.replace("_", " ")?.slice(1)?.toLocaleLowerCase()} */}
                  {value?.replace("_", " ")}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        {/* Location Type Data */}
        {(eventLocationType === "HYBRID" || eventLocationType === "ONLINE") && (
          <>
            <h4 className="text-lg font-semibold mb-3">Online Data</h4>
            <FormRow
              // errors={[]}
              label="Online Meeting Link"
              errors={state?.errors?.onlineLink}
            >
              <input
                // required
                type="text"
                id="onlineLink"
                name="onlineLink"
                defaultValue={event?.onlineLink || ""}
                className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
              />
            </FormRow>
          </>
        )}
        {(eventLocationType === "HYBRID" || eventLocationType === "ONSITE") && (
          <>
            <h4 className="text-lg font-semibold mb-3">On-site data</h4>
            <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
              <FormRow
                // errors={[]}
                label="Venue"
                errors={state?.errors?.venue}
              >
                <input
                  // required
                  type="text"
                  id="venue"
                  name="venue"
                  defaultValue={event?.venue || ""}
                  className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
                />
              </FormRow>

              <FormRow
                // errors={[]}
                label="Address"
                errors={state?.errors?.address}
              >
                <input
                  // required
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={event?.address || ""}
                  className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
                />
              </FormRow>
            </div>

            <FormRow
              // errors={[]}
              label="Location Map Link"
              errors={state?.errors?.mapLink}
            >
              <input
                // required
                type="text"
                id="mapLink"
                name="mapLink"
                defaultValue={event?.mapLink || ""}
                className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
              />
            </FormRow>
          </>
        )}

        {/* Organizer Data */}
        {/* <h4 className="text-lg font-semibold mb-3">Organizer Data</h4>
        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-3 *:flex-1">
          <FormRow
            // errors={[]}
            label="Name"
            errors={state?.errors?.organizerName}
          >
            <input
              // required
              type="text"
              id="organizerName"
              name="organizerName"
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>

          <FormRow
            // errors={[]}
            label="Contact"
            errors={state?.errors?.organizerContact}
          >
            <input
              // required
              type="text"
              id="organizerContact"
              name="organizerContact"
              className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
            />
          </FormRow>
        </div>
        <FormRow
          // errors={[]}
          label="Website"
          errors={state?.errors?.organizerWebsite}
        >
          <input
            type="text"
            id="organizerWebsite"
            name="organizerWebsite"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow> */}

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
