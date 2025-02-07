import axios from "axios";
import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Modal from "@/ui/Modal";
import Menus from "@/ui/Menus";
import DeletePostForm from "./DeletePostForm";

import { PostStatus } from "@prisma/client";

export default function PostDashMenu({
  id,
  isLast,
  status,
}: {
  id: number;
  isLast?: boolean;
  status: PostStatus;
}) {
  const router = useRouter();

  async function handleChangeStatus(postId: number, status: PostStatus) {
    try {
      await axios.put(`/api/blog/posts/${postId}`, {
        status,
      });
      toast.success("Post updated successfully");
      router.refresh();
    } catch (error) {
      console.error("error: ", error);
      toast.error("Failed to updated post");
    }
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id} isLast={isLast}>
          <Menus.Button
            as="Link"
            href={`/blog/${id}`}
            icon={<EyeIcon className="size-4 dark:text-gray-300" />}
          >
            View
          </Menus.Button>
          <Menus.Button
            as="Link"
            href={`/dashboard/posts/${id}/edit`}
            icon={<PencilIcon className="size-4 dark:text-gray-300" />}
          >
            Edit
          </Menus.Button>
          <hr className="border-gray-200 dark:border-gray-500" />
          {status !== "PUBLISHED" && (
            <Menus.Button
              onClick={() => handleChangeStatus(id, "PUBLISHED")}
              icon={
                <PaperAirplaneIcon className="-rotate-45 size-4 dark:text-gray-300" />
              }
            >
              Publish Post
            </Menus.Button>
          )}
          {status !== "HIDDEN" && (
            <Menus.Button
              onClick={() => handleChangeStatus(id, "HIDDEN")}
              icon={<EyeSlashIcon className="size-4 dark:text-gray-300" />}
            >
              Hide Post
            </Menus.Button>
          )}
          {status !== "DRAFT" && (
            <Menus.Button
              onClick={() => handleChangeStatus(id, "DRAFT")}
              icon={<DocumentTextIcon className="size-4 dark:text-gray-300" />}
            >
              Draft Post
            </Menus.Button>
          )}
          <hr className="border-gray-200 dark:border-gray-500" />
          <Modal.Open opens="delete-post-row">
            <Menus.Button
              icon={<TrashIcon className="size-4 dark:text-gray-300" />}
            >
              Delete
            </Menus.Button>
          </Modal.Open>
        </Menus.List>
      </Menus.Menu>
      <Modal.Window title="Delete Post" name="delete-post-row">
        <DeletePostForm postId={id} />
      </Modal.Window>
    </Modal>
  );
}
