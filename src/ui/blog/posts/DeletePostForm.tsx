import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { useModalContext } from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

import { deletePostSchema } from "@/lib/validations";
import { deletePost, TDeletePostState } from "@/lib/actions";

export default function DeletePostForm({ postId }: { postId: number }) {
  const { close } = useModalContext();
  const initialState: TDeletePostState | undefined = {};

  async function clientAction(
    prev: TDeletePostState | undefined,
    formData: FormData
  ) {
    const postId = parseInt(formData?.get("postId") as string);

    const result = deletePostSchema.safeParse({ postId });
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to delete post");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete post",
      };
    }

    const res = await deletePost(result.data.postId);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <ConfirmDelete close={close} resourceName="Post" />
    </form>
  );
}
