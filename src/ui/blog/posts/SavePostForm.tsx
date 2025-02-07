"use client";

import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { BookmarkIcon as BookmarkIconFilled } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import Spinner from "@/ui/Spinner";

import { likeSavePostSchema } from "@/lib/validations";
import { savePost, TLikeSavePostHandlerState, unSavePost } from "@/lib/actions";

import { TUserFromCookie } from "@/types/auth.types";

function SubmitButton({ saves, isSaved }: { saves: number; isSaved: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variation="third"
      disabled={pending}
      className="group !px-2 flex items-center gap-3 cursor-pointer"
    >
      {pending ? (
        <Spinner size="!size-6" />
      ) : (
        <>
          <span className="text-gray-900">{saves}</span>
          {isSaved ? (
            <BookmarkIconFilled className="size-6 text-gray-900" />
          ) : (
            <BookmarkIconOutline className="size-6 text-gray-500 group-hover:text-gray-900" />
          )}
        </>
      )}
    </Button>
  );
}

export default function SavePostForm({
  saves,
  postId,
  userId,
  isSaved,
}: {
  saves: number;
  postId: number;
  isSaved: boolean;
  userId: TUserFromCookie;
}) {
  async function handleSavePost(
    prev: TLikeSavePostHandlerState | undefined,
    formData: FormData
  ) {
    if (!userId) {
      toast.error("You Must Be Logged in to Save this Post");
      return;
    }

    if (!formData.get("postId")) {
      toast.error("PostId Missing. Failed to handle save post");
      return {
        status: 400,
        message: "PostId Missing. Failed to handle save post",
      };
    }
    if (isNaN(parseInt(formData.get("postId") as string))) {
      toast.error("PostId Must be a number. Failed to handle save post");
      return {
        status: 400,
        message: "PostId Must be a number. Failed to handle save post",
      };
    }

    const postId = parseInt(formData.get("postId") as string);

    const result = likeSavePostSchema.safeParse({ postId });
    if (!result.success) {
      toast.error("Missing Fields. Failed to handle save post");
      return {
        status: 400,
        errors: result?.error?.flatten().fieldErrors,
        message: "Missing Fields. Failed to handle save post",
      };
    }

    let res;
    if (isSaved) {
      res = await unSavePost(result.data.postId);
    } else {
      res = await savePost(result.data.postId);
    }
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
      }
    }
  }

  const initialState: TLikeSavePostHandlerState | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(handleSavePost, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <SubmitButton saves={saves} isSaved={isSaved} />
    </form>
  );
}
