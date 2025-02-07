import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { useModalContext } from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

import { deleteCommentSchema } from "@/lib/validations";
import { deleteComment, TDeleteCommentState } from "@/lib/actions";

export function DeleteCommentForm({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) {
  const { close } = useModalContext();

  async function clientAction(
    prev: TDeleteCommentState | undefined,
    formData: FormData
  ) {
    const comment = {
      id: parseInt(formData?.get("commentId") as string),
      postId: parseInt(formData?.get("postId") as string),
    };

    const result = deleteCommentSchema.safeParse(comment);
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to delete comment");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete comment",
      };
    }

    const res = await deleteComment(comment);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
      }
    }
    close();
  }

  const initialState: TDeleteCommentState | undefined = {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="commentId" value={commentId} />
      <ConfirmDelete close={close} resourceName="Comment" />
    </form>
  );
}
