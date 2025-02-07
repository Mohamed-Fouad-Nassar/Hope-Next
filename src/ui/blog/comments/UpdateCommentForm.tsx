"use client";

import { z } from "zod";
import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import Spinner from "@/ui/Spinner";
import FormRow from "@/ui/FormRow";
import { useModalContext } from "@/ui/Modal";

import { updateCommentSchema } from "@/lib/validations";
import { updateComment, TUpdateCommentState } from "@/lib/actions";

import { TComment } from "@/types/blog.types";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
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
        <>
          <PaperAirplaneIcon className="size-5 -mt-0.5 -rotate-45" />
          <span>Update Comment</span>
        </>
      )}
    </Button>
  );
}

export default function UpdateCommentForm({ comment }: { comment: TComment }) {
  const { close } = useModalContext();

  async function clientAction(
    prev: TUpdateCommentState | undefined,
    formData: FormData
  ) {
    const newComment = {
      content: formData.get("content"),
      id: parseInt(formData.get("id") as string),
      postId: parseInt(formData.get("postId") as string),
    };

    const result = updateCommentSchema
      .extend({
        id: z.number(),
        postId: z.number({ message: "Post id must be number" }),
      })
      .safeParse(newComment);
    if (!result.success) {
      toast.error("Missing Fields. Failed to update comment");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update comment",
      };
    }

    const res = await updateComment(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        close();
      }
    }
  }

  const initialState: TUpdateCommentState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form
      action={formAction}
      className="md:min-w-[500px] lg:min-w-[600px] mb-6"
    >
      <input type="hidden" name="id" value={comment?.id} />
      <input type="hidden" name="postId" value={comment?.postId} />

      {state?.errors && state.errors?.postId && (
        <div
          role="alert"
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        >
          {state.errors?.postId?.map((err) => (
            <span key={err}>{err}</span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 justify-between items-end">
        <FormRow
          className="w-full !mb-0"
          label="Leave a Comment"
          errors={state?.errors?.content}
        >
          <textarea
            rows={2}
            id="comment"
            name="content"
            defaultValue={comment?.content}
            placeholder="Write Your Comment Here.."
            aria-describedby="helper-text-explanation"
            className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          />
        </FormRow>

        <div className="m-1.5">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
