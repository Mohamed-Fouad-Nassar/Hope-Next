"use client";

import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import Spinner from "./Spinner";
import FormRow from "./FormRow";

import {
  sendResetPasswordEmail,
  TResetPasswordFormState,
} from "@/emails/actions";
import { emailSchema } from "@/emails/validations";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex justify-center items-center gap-3"
    >
      {pending ? (
        <>
          <Spinner size="size-4" />
          Sending...
        </>
      ) : (
        "Reset Password"
      )}
    </Button>
  );
}

export default function ResetPasswordForm() {
  const router = useRouter();

  async function clientAction(
    prev: TResetPasswordFormState | undefined,
    formData: FormData
  ) {
    const email = formData.get("email");

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      toast.error("Missing Fields. Failed to send reset password email");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to send reset password email",
      };
    }

    const res = await sendResetPasswordEmail({ email });
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/check-email");
      }
    }
  }

  const initialState: TResetPasswordFormState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <FormRow label="Your Email" errors={state?.errors?.email}>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <div className="flex justify-between items-center gap-3 *:flex-1 *:text-center">
        <Button as="Link" href="/login" variation="secondary">
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
