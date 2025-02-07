// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useFormState, useFormStatus } from "react-dom";

// import Button from "@/ui/Button";
// import FormRow from "@/ui/FormRow";
// import Spinner from "@/ui/Spinner";
// import RichTextEditor from "@/ui/richTextEditor";

// import { createPostSchema } from "@/lib/validations";
// import { createPost, TCreatePostState } from "@/lib/actions";

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       type="submit"
//       disabled={pending}
//       className="flex justify-center items-center gap-2 text-sm"
//     >
//       {pending ? (
//         <>
//           <Spinner size="!size-4" />
//           <span>Creating Post...</span>
//         </>
//       ) : (
//         "Create Post"
//       )}
//     </Button>
//   );
// }

// function DraftButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       type="button"
//       variation="secondary"
//       disabled={pending}
//       className="flex justify-center items-center gap-2 text-sm"
//     >
//       {pending ? (
//         <>
//           <Spinner size="!size-4" />
//           <span>Saving Post...</span>
//         </>
//       ) : (
//         "Save as Draft"
//       )}
//     </Button>
//   );
// }

// export default function CreateNewPostForm() {
//   const router = useRouter();
//   const [content, setContent] = useState("");
//   const clientActionWithContent = clientAction.bind(null, content);

//   async function clientAction(
//     content: string,
//     prev: TCreatePostState,
//     formData: FormData
//   ) {
//     const postData = {
//       title: formData.get("title"),
//       image: formData.get("image"),
//       description: content.toString(),
//     };

//     const result = createPostSchema.safeParse(postData);
//     console.log(result);

//     if (!result.success) {
//       toast.error("Missing Fields. Failed to create new post");
//       console.log({
//         status: 400,
//         errors: result.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to create new post",
//       });
//       return {
//         status: 400,
//         errors: result.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to create new post",
//       };
//     }

//     const res = await createPost(result.data);
//     console.log(res);

//     if (res?.message) {
//       if (res?.status === 400) {
//         toast.error(res.message);
//         if (res?.errors) return res;
//       } else if (res?.status === 200) {
//         toast.success(res.message);
//         router.replace("/dashboard/posts");
//         router.refresh();
//       }
//     }
//     return;
//   }

//   const initialState: TCreatePostState = {};
//   const [state, formAction] = useFormState(
//     clientActionWithContent,
//     initialState
//   );

//   return (
//     <form action={formAction}>
// {state?.errors && state.errors?.image && (
//   <div
//     role="alert"
//     className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//   >
//     {state.errors?.image?.map((err) => (
//       <span key={err}>{err}</span>
//     ))}
//   </div>
// )}

//       <input type="hidden" name="image" value="" />

//       <FormRow label="Title" errors={state?.errors?.title}>
//         <input
//           id="title"
//           type="text"
//           name="title"
//           aria-describedby="post-title"
//           className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
//         />
//       </FormRow>

//       <FormRow label="Description" errors={state?.errors?.description}>
//         <RichTextEditor content={content} onChange={setContent} />
//       </FormRow>

//       <div className="flex justify-end items-center gap-3">
//         <Link
//           href="/dashboard/posts"
//           className="disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium px-5 py-2.5 text-gray-900 bg-transparent hover:text-main-800 focus:ring-transparent"
//         >
//           Cancel
//         </Link>
//         <DraftButton />
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";
import clsx from "clsx";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import RichTextEditor from "@/ui/richTextEditor";

import { createPostSchema } from "@/lib/validations";
import { createPost, saveDraft, TCreatePostState } from "@/lib/actions";

import { useSettings } from "@/contexts/SettingsContext";

function FormButtons({
  isPending,
  handleSubmitAction,
}: {
  isPending: boolean;
  handleSubmitAction: (
    action: (postData: unknown) => Promise<{ status: number; message: string }>
  ) => void;
}) {
  return (
    <div className="flex justify-end items-center gap-3">
      <Link
        href="/dashboard/posts"
        className={clsx(
          "text-sm font-medium px-5 py-2.5 text-gray-900 bg-transparent hover:text-main-800 focus:ring-transparent"
        )}
      >
        Cancel
      </Link>

      <Button
        type="button"
        onClick={() => handleSubmitAction(saveDraft)}
        variation="secondary"
        disabled={isPending}
        className="flex justify-center items-center gap-2 text-sm"
      >
        Save as Draft
      </Button>

      <Button
        type="button"
        onClick={() => handleSubmitAction(createPost)}
        disabled={isPending}
        className="flex justify-center items-center gap-2 text-sm"
      >
        Publish Post
      </Button>
    </div>
  );
}

export default function CreateNewPostForm() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TCreatePostState>({});

  const formRef = useRef<HTMLFormElement>(null);

  const { error, settings, isLoading } = useSettings();

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error}</>;

  const handleSubmitAction = async (
    action: (postData: unknown) => Promise<{ status: number; message: string }>
  ) => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const postData = {
      title: formData.get("title"),
      image: formData.get("image"),
      description: content.trim(),
    };

    const result = createPostSchema.omit({ status: true }).safeParse(postData);
    if (!result.success) {
      toast.error("Missing Fields. Failed to create/draft post");
      setErrors({
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create/draft post",
      });
      return;
    }

    setIsPending(true);

    try {
      const res = await action(result.data);

      if (res?.message) {
        if (res.status === 400) {
          setErrors({
            status: 400,
            // errors: res?.errors,
            message: res.message,
          });
          toast.error(res.message);
        } else if (res.status === 200) {
          toast.success(res.message);
          router.replace("/dashboard/posts");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <input type="hidden" name="image" value="" />
      <FormRow label="Title" errors={errors?.errors?.title}>
        <input
          id="title"
          type="text"
          name="title"
          required
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
        />
      </FormRow>
      <FormRow label="Description" errors={errors?.errors?.description}>
        <RichTextEditor
          content={content}
          onChange={setContent}
          limit={settings?.postLengthLimit || 2500}
        />
      </FormRow>
      <FormButtons
        isPending={isPending}
        handleSubmitAction={handleSubmitAction}
      />
    </form>
  );
}
