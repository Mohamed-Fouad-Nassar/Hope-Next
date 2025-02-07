"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import Spinner from "@/ui/Spinner";
import FormRow from "@/ui/FormRow";

import { createCommentSchema } from "@/lib/validations";
import { createNewComment, TCreateCommentState } from "@/lib/actions";

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
          <span> Sending...</span>
        </>
      ) : (
        <>
          <PaperAirplaneIcon className="size-5 -mt-0.5 -rotate-45" />
          <span>Comment</span>
        </>
      )}
    </Button>
  );
}

export default function CreateCommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(
    prev: TCreateCommentState | undefined,
    formData: FormData
  ) {
    const comment = {
      postId: parseInt(formData.get("postId") as string),
      content: formData.get("content"),
    };

    const result = createCommentSchema.safeParse(comment);
    if (!result.success) {
      toast.error("Missing Fields. Failed to create new comment");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new comment",
      };
    }

    const res = await createNewComment(result.data);
    console.log(res);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        formRef?.current?.reset();
      }
    }
    return res;
  }

  const initialState: TCreateCommentState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form ref={formRef} action={formAction} className="mb-6">
      <input type="hidden" name="postId" value={postId} />

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

      <div className="flex flex-col md:flex-row gap-2 justify-between items-end">
        <FormRow
          className="flex-1 w-full !mb-0"
          label="Leave a Comment"
          errors={state?.errors?.content}
        >
          <textarea
            rows={1}
            id="comment"
            name="content"
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

// export default function CreateCommentForm({ postId }: { postId: string }) {
//   const formRef = useRef<HTMLFormElement>(null);

//   // Modify the function signature to match the expected parameters
//   async function clientAction(
//     state:
//       | { status: number; message: string; errors?: undefined }
//       | {
//           status: number;
//           errors: { postId?: string[]; content?: string[] };
//           message: string;
//         },
//     formData: FormData
//   ) {
//     const comment = {
//       postId: parseInt(formData.get("postId") as string),
//       content: formData.get("content"),
//     };

//     const result = createCommentSchema.safeParse(comment);
//     if (!result.success) {
//       console.log(result?.error?.flatten().fieldErrors);
//       toast.error("Missing Fields. Failed to create new comment");
//       return {
//         status: 400,
//         errors: result.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to create new comment",
//       };
//     }

//     const res = await createNewComment(result.data);
//     if (res?.message) {
//       if (res?.status === 400) {
//         toast.error(res.message);
//         if (res?.errors) return res;
//       } else if (res?.status === 200) {
//         toast.success(res.message);
//         formRef?.current?.reset();
//       }
//     }
//     return res;
//   }

//   const initialState:
//     | {
//         status: number;
//         message: string;
//         errors?: { postId?: string[]; content?: string[] };
//       }
//     | undefined = {
//     status: 0,
//     message: "",
//   };

//   const [state, formAction] = useFormState(clientAction, initialState);

//   return (
//     <form ref={formRef} action={formAction} className="mb-6">
//       <input type="hidden" name="postId" value={postId} />
//       {state?.errors?.postId && (
//         <div
//           role="alert"
//           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//         >
//           {state.errors?.postId?.map((err) => (
//             <span key={err}>{err}</span>
//           ))}
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row gap-2 justify-between items-end">
//         <FormRow
//           className="flex-1 w-full !mb-0"
//           label="Leave a Comment"
//           errors={state?.errors?.content}
//         >
//           <textarea
//             rows={1}
//             id="comment"
//             name="content"
//             placeholder="Write Your Comment Here.."
//             aria-describedby="helper-text-explanation"
//             className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
//           />
//         </FormRow>

//         <div className="m-1.5">
//           <SubmitButton />
//         </div>
//       </div>
//     </form>
//   );
// }
