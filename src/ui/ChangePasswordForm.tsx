"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import FormRow from "./FormRow";
import Spinner from "./Spinner";

import { passwordSchema } from "@/lib/validations";
import { changePassword, TChangePasswordState } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-3"
    >
      {pending ? (
        <>
          <Spinner size="!size-4" />
          Updating...
        </>
      ) : (
        "Change Password"
      )}
    </Button>
  );
}

export default function ChangePasswordForm({ token }: { token: string }) {
  const router = useRouter();

  async function clientAction(
    prev: TChangePasswordState | undefined,
    formData: FormData
  ) {
    const newPasswords = {
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
    };

    const results = passwordSchema.safeParse(newPasswords);
    if (!results.success) {
      toast.error("Missing Fields. Failed to update Password");
      return {
        status: 400,
        errors: results.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update Password",
      };
    }

    const passwords = { token, ...results.data };
    const res = await changePassword(passwords);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/login");
      }
    }
  }

  const initialState: TChangePasswordState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <FormRow label="Password" errors={state?.errors?.password}>
        <input
          type="text"
          id="password"
          name="password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Confirm Password" errors={state?.errors?.repeatPassword}>
        <input
          type="text"
          id="repeatPassword"
          name="repeatPassword"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <SubmitButton />
    </form>
  );
}
