"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import Spinner from "@/ui/Spinner";

import { createOrganizerSchema } from "@/lib/validations";
import { createOrganizer, TCreateOrganizerState } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="mt-4 flex justify-end items-center gap-3">
      <Button as="Link" href="/dashboard/organizers" variation="secondary">
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
          <span>Create Organizer</span>
        )}
      </Button>
    </div>
  );
}

export default function CreateOrganizerForm({
  type = "regular",
}: {
  type?: "modal" | "regular";
}) {
  const router = useRouter();

  async function clientAction(
    prev: TCreateOrganizerState | undefined,
    formData: FormData
  ) {
    const organizer = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      website: formData.get("website") || null,
    };

    const result = createOrganizerSchema.safeParse(organizer);
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to create new organizer");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new organizer",
      };
    }

    const res = await createOrganizer(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        if (type === "modal") router.refresh();
        else router.replace("/dashboard/organizers");
      }
    }
    return;
  }

  const initialState: TCreateOrganizerState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <div
        className={
          type === "modal" ? "w-[350px] md:w-[550px] md:p-2" : "container"
        }
      >
        <FormRow label="Name" errors={state?.errors?.name}>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <FormRow label="Contact" errors={state?.errors?.contact}>
          <input
            id="contact"
            type="text"
            name="contact"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <FormRow label="Website" errors={state?.errors?.website}>
          <input
            id="website"
            type="text"
            name="website"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <SubmitButton />
      </div>
    </form>
  );
}
