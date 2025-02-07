"use client";

import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import FormRow from "./FormRow";
import Spinner from "./Spinner";

import { updatePasswordSchema } from "@/lib/validations";
import { TUpdatePasswordState, updatePassword } from "@/lib/actions";

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
            <span>Updating Password...</span>
          </>
        ) : (
          "Update Password"
        )}
      </Button>
    </div>
  );
}

// export default function UpdatePasswordForm({ user }: { user: TUser }) {
export default function UpdatePasswordForm() {
  async function clientAction(
    prev: TUpdatePasswordState | undefined,
    formData: FormData
  ) {
    const passwords = {
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
    };

    const result = updatePasswordSchema.safeParse(passwords);
    if (!result.success) {
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    const res = await updatePassword(result.data);
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

  const initialState: TUpdatePasswordState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form className="mx-auto max-w-3xl space-y-6" action={formAction}>
      <FormRow label="New Password" errors={state?.errors?.password}>
        <input
          id="password"
          type="text"
          name="password"
          defaultValue={""}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>
      <FormRow
        label="Repeat New Password"
        errors={state?.errors?.repeatPassword}
      >
        <input
          id="repeatPassword"
          type="text"
          name="repeatPassword"
          defaultValue={""}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormButtons />
    </form>
  );
}
