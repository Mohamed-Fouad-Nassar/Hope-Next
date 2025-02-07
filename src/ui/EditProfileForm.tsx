"use client";

import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import Spinner from "./Spinner";
import FormRow from "./FormRow";

import { updateProfileSchema } from "@/lib/validations";
import { TUpdateProfileState, updateProfile } from "@/lib/actions";

import { TUser } from "@/types/auth.types";

function FormButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end gap-2 items-center">
      <Button
        as="Link"
        href="/profile"
        disabled={pending}
        variation="secondary"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={pending}
        className="flex justify-center items-center gap-2 text-sm"
      >
        {pending ? (
          <>
            <Spinner size="!size-4" />
            <span>Updating Profile...</span>
          </>
        ) : (
          "Update Profile"
        )}
      </Button>
    </div>
  );
}

export default function EditProfileForm({ user }: { user: TUser }) {
  async function clientAction(
    prev: TUpdateProfileState | undefined,
    formData: FormData
  ) {
    const newUser = {
      image: formData.get("image"),
      username: formData.get("username"),
    };

    const result = updateProfileSchema.safeParse(newUser);
    if (!result.success) {
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    const res = await updateProfile(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
      }
    }

    return;
  }

  const initialState: TUpdateProfileState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form className="mx-auto max-w-3xl space-y-6" action={formAction}>
      <FormRow label="Full Name" errors={state?.errors?.username}>
        <input
          id="username"
          type="text"
          name="username"
          defaultValue={user?.username}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Email" errors={[]}>
        <div className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 sm:text-sm sm:leading-6">
          {user?.email}
        </div>
      </FormRow>

      <FormRow label="Avatar" errors={state?.errors?.image}>
        <input
          id="image"
          type="text"
          name="image"
          defaultValue={user?.image || ""}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      {/* <FormRow label="Avatar" errors={state?.errors?.image}>
        <input
          id="image"
          type="file"
          name="image"
          className="block w-full rounded-md py-[1px] pl-[1px] border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-main-600 sm:text-sm sm:leading-6 file:py-1.5 file:mr-3 file:px-4 file:rounded-s-md file:border-0 file:border-r file:border-gray-50 file:bg-gray-50 file:text-main-500 hover:file:bg-gray-200 focus:outline-none"
          accept="image/*"
        />
      </FormRow> */}

      <FormButtons />
    </form>
  );
}
