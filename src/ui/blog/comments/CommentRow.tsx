"use client";

import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import Author from "../Author";
import { DeleteCommentForm } from "./DeleteCommentForm";

import { TComment } from "@/types/blog.types";

export default function CommentRow({
  isLast,
  comment,
}: {
  isLast: boolean;
  comment: TComment;
}) {
  const { id, postId, content, createdAt, user } = comment;

  return (
    <Menus>
      <tr className="text-center bg-gray-50 dark:bg-gray-600 dark:text-gray-400 *:p-2 *:lg:px-6 *:lg:py-4 border-b dark:border-gray-700 last:border-none">
        <td className="font-bold">{id}</td>
        <td className="font-bold">{postId}</td>
        <td className="text-start text-pretty font-medium">
          {content?.length > 60 ? content?.slice(0, 60) + "..." : content}
        </td>
        <td className="text-start">{<Author author={user} />}</td>
        <td className="text-xs">{new Date(createdAt).toLocaleString()}</td>
        <td>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id} isLast={isLast}>
                <Menus.Button
                  as="Link"
                  href={`/blog/${postId}#comment-${id}`}
                  icon={<EyeIcon className="size-4 dark:text-gray-300" />}
                >
                  View
                </Menus.Button>
                {/* <Menus.Button
                  as="Link"
                  href={`/dashboard/posts/${id}/edit`}
                  icon={<PencilIcon className="size-4 dark:text-gray-300" />}
                >
                  Edit
                </Menus.Button> */}
                <hr className="border-gray-200 dark:border-gray-500" />
                <Modal.Open opens="delete-comment-row">
                  <Menus.Button
                    icon={<TrashIcon className="size-4 dark:text-gray-300" />}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window title="Delete Comment" name="delete-comment-row">
              <DeleteCommentForm postId={postId} commentId={id} />
            </Modal.Window>
          </Modal>
        </td>
      </tr>
    </Menus>
  );
}
