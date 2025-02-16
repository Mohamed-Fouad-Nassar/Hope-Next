"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import Button from "./Button";
import FormRow from "./FormRow";
import Spinner from "./Spinner";

import { contactEmailSchema } from "@/emails/validations";
import { sendContactEmail, TContactFormState } from "@/emails/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex ml-auto gap-3 items-center"
    >
      {pending ? (
        <>
          <Spinner size="size-4" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <PaperAirplaneIcon className="size-5 -mt-0.5 -rotate-45" />
        </>
      )}
    </Button>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(
    prev: TContactFormState | undefined,
    formData: FormData
  ) {
    const data = Object.fromEntries(formData.entries());

    const result = contactEmailSchema.safeParse(data);
    if (!result.success) {
      toast.error("Missing Fields. Failed to send email");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to send email",
      };
    }

    const res = await sendContactEmail(data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        formRef.current?.reset();
      }
    }
  }

  const initialState: TContactFormState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form ref={formRef} action={formAction}>
      <FormRow label="Your Name" errors={state?.errors?.from_name}>
        <input
          id="name"
          type="text"
          name="from_name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Your email" errors={state?.errors?.from_email}>
        <input
          id="email"
          type="email"
          name="from_email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Subject" errors={state?.errors?.subject}>
        <input
          type="text"
          id="subject"
          name="subject"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Your Message" errors={state?.errors?.message}>
        <textarea
          rows={6}
          id="message"
          name="message"
          placeholder="Leave a Message..."
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <SubmitButton />
    </form>
  );
}
