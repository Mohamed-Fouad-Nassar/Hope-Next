"use client";

import toast from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { HandThumbUpIcon as HandThumbUpIconFilled } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import Spinner from "@/ui/Spinner";

import { likeSavePostSchema } from "@/lib/validations";
import { likePost, TLikeSavePostHandlerState, unlikePost } from "@/lib/actions";

import { TUserFromCookie } from "@/types/auth.types";

function SubmitButton({ likes, isLiked }: { likes: number; isLiked: boolean }) {
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
          <span className="text-gray-900">{likes}</span>
          {isLiked ? (
            <HandThumbUpIconFilled className="size-6 text-gray-900" />
          ) : (
            <HandThumbUpIconOutline className="size-6 text-gray-500 group-hover:text-gray-900" />
          )}
        </>
      )}
    </Button>
  );
}

export default function LikePostForm({
  likes,
  userId,
  postId,
  isLiked,
}: {
  likes: number;
  postId: number;
  userId: TUserFromCookie;
  isLiked: boolean;
}) {
  async function handleLikePost(
    prev: TLikeSavePostHandlerState | undefined,
    formData: FormData
  ) {
    if (!userId) {
      toast.error("You Must Be Logged in to Like this Post");
      return;
    }

    if (!formData.get("postId")) {
      toast.error("PostId Missing. Failed to handle like post");
      return {
        status: 400,
        message: "PostId Missing. Failed to handle like post",
      };
    }
    if (isNaN(parseInt(formData.get("postId") as string))) {
      toast.error("PostId Must be a number. Failed to handle like post");
      return {
        status: 400,
        message: "PostId Must be a number. Failed to handle like post",
      };
    }

    const postId = parseInt(formData.get("postId") as string);

    const result = likeSavePostSchema.safeParse({ postId });
    if (!result.success) {
      toast.error("Missing Fields. Failed to handle like post");
      return {
        status: 400,
        errors: result?.error?.flatten().fieldErrors,
        message: "Missing Fields. Failed to handle like post",
      };
    }

    let res;
    if (isLiked) {
      res = await unlikePost(result.data.postId);
    } else {
      res = await likePost(result.data.postId);
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
  const [state, formAction] = useFormState(handleLikePost, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <SubmitButton likes={likes} isLiked={isLiked} />
    </form>
  );
}
