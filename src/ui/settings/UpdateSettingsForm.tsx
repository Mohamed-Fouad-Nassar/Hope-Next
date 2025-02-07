"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import Spinner from "@/ui/Spinner";
import UpdateSettingsFormSkeleton from "@/ui/skeletons/settings/UpdateSettingsFormSkeleton";

import { useSettings } from "@/contexts/SettingsContext";

import { updateSettingsSchema } from "@/lib/validations";
import { TUpdateSettingsState, updateSettings } from "@/lib/actions";

function FormButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="pt-2 flex justify-end gap-2 items-center">
      <Button
        type="submit"
        disabled={pending}
        className="flex justify-center items-center gap-2 text-sm"
      >
        {pending ? (
          <>
            <Spinner size="!size-4" />
            <span>Updating Settings...</span>
          </>
        ) : (
          "Update Settings"
        )}
      </Button>
    </div>
  );
}

export default function UpdateSettingsForm() {
  const router = useRouter();
  const { isLoading, error, settings, reloadSettings } = useSettings();

  async function clientAction(
    prev: TUpdateSettingsState | undefined,
    formData: FormData
  ) {
    const newSettings = {
      usersPerPage: parseInt(formData.get("usersPerPage") as string),
      eventsPerPage: parseInt(formData.get("eventsPerPage") as string),
      articlesPerPage: parseInt(formData.get("articlesPerPage") as string),
      commentsPerPage: parseInt(formData.get("commentsPerPage") as string),
      postLengthLimit: parseInt(formData.get("postLengthLimit") as string),
      eventLengthLimit: parseInt(formData.get("eventLengthLimit") as string),
    };

    const result = updateSettingsSchema.safeParse(newSettings);
    if (!result.success) {
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    const res = await updateSettings(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        await reloadSettings();
        router.refresh();
        toast.success(res.message);
      }
    }
    return;
  }

  const initialState: TUpdateSettingsState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  if (isLoading) return <UpdateSettingsFormSkeleton />;
  if (error)
    return (
      <p className="text-red-500 bg-red-200 border border-red-400 rounded px-3 py-2">
        {error.message}
      </p>
    );

  return (
    <form action={formAction} className="mt-6 mx-auto max-w-3xl">
      <FormRow
        // errors={[]}
        label="Users Per Page"
        className="border-b pb-4 !mb-2"
        errors={state?.errors?.usersPerPage}
      >
        <input
          type="number"
          name="usersPerPage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.usersPerPage}
        />
      </FormRow>

      <FormRow
        // errors={[]}
        label="Articles Per Page"
        className="border-b pb-4 !mb-2"
        errors={state?.errors?.articlesPerPage}
      >
        <input
          type="number"
          name="articlesPerPage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.articlesPerPage}
        />
      </FormRow>

      <FormRow
        // errors={[]}
        label="Post Length Limit"
        className="border-b pb-4 !mb-2"
        errors={state?.errors?.postLengthLimit}
      >
        <input
          type="number"
          name="postLengthLimit"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.postLengthLimit}
        />
      </FormRow>

      <FormRow
        // errors={[]}
        label="Comments Per Page"
        className="border-b pb-4 !mb-2"
        errors={state?.errors?.commentsPerPage}
      >
        <input
          type="number"
          name="commentsPerPage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.commentsPerPage}
        />
      </FormRow>

      <FormRow
        // errors={[]}
        label="Events Per Page"
        className="border-b pb-4 !mb-2"
        errors={state?.errors?.eventsPerPage}
      >
        <input
          type="number"
          name="eventsPerPage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.eventsPerPage}
        />
      </FormRow>

      <FormRow
        // errors={[]}
        errors={state?.errors?.eventLengthLimit}
        label="Event Length Limit"
        className="border-b pb-4 !mb-2"
      >
        <input
          type="number"
          name="eventLengthLimit"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-500 focus:ring-main-500 sm:text-sm"
          placeholder="you@example.com"
          defaultValue={settings?.eventLengthLimit}
        />
      </FormRow>

      <FormButtons />
    </form>
  );
}
