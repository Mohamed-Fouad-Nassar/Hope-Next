"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import loading from "@/app/(app)/blog/loading";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/ui/Button";
import FormRow from "@/ui/FormRow";
import RichTextEditor from "@/ui/richTextEditor";

import { updatePostSchema } from "@/lib/validations";
import { TUpdatePostState, updatePost } from "@/lib/actions";

import { TPost } from "@/types/blog.types";
import { PostStatus } from "@prisma/client";

import { useSettings } from "@/contexts/SettingsContext";

function FormButtons() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-3">
      <Button
        as="Link"
        disabled={pending}
        variation="secondary"
        href="/dashboard/posts"
      >
        Cancel
      </Button>
      <Button disabled={pending} type="submit">
        Update Post
      </Button>
    </div>
  );
}

export default function UpdatePostForm({ post }: { post: TPost }) {
  const { error, settings, isLoading } = useSettings();
  const [content, setContent] = useState(post?.description);

  async function clientAction(
    prev: TUpdatePostState | undefined,
    formData: FormData
  ) {
    const newPost = {
      description: content,
      title: formData.get("title"),
      image: formData.get("image"),
      status: formData.get("status"),
      id: parseInt(formData.get("id") as string),
    };

    const result = updatePostSchema.safeParse(newPost);
    if (!result.success) {
      toast.error("Missing Fields. Failed to update post");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update post",
      };
    }

    const res = await updatePost(result?.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
      }
    }
  }

  const initialState: TUpdatePostState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  if (isLoading) return loading();
  if (error) return <>Error: {error}</>;

  return (
    <form action={formAction}>
      {state?.errors && state.errors?.id && (
        <div
          role="alert"
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        >
          {state.errors?.id?.map((err) => (
            <span key={err}>Post Id is {err}</span>
          ))}
        </div>
      )}

      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="image" value={post.image} />

      <FormRow label="Title" errors={state?.errors?.title}>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={post.title}
          aria-describedby="post-title"
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow label="Status" errors={state?.errors?.status}>
        <select
          id="status"
          name="status"
          defaultValue={post.status}
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6 capitalize"
        >
          {Object.keys(PostStatus).map((val) => (
            <option key={val} value={val}>
              {val.toLocaleLowerCase()}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Description" errors={state?.errors?.description}>
        <RichTextEditor
          content={content}
          onChange={setContent}
          limit={settings?.postLengthLimit || 2500}
        />
      </FormRow>

      <FormButtons />
    </form>
  );
}
