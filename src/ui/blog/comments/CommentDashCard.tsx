"use client";

import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

import Modal from "@/ui/Modal";
import Menus from "@/ui/Menus";
import Author from "../Author";
import { DeleteCommentForm } from "./DeleteCommentForm";

import { TComment } from "@/types/blog.types";

export default function CommentDashCard({ comment }: { comment: TComment }) {
  const { id, content, createdAt, postId, user } = comment;

  return (
    <Menus>
      <div className="w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Author author={user} />
          <div className="flex justify-end gap-2">
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
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
          </div>
        </div>
        <div className="text-xl font-medium pt-4 pb-2 mb-2 border-b flex justify-between items-center">
          <h2>
            {content.length > 60 ? content.slice(0, 60) + "..." : content}
          </h2>
          <p className="min-w-fit text-base">Post #{postId}</p>
        </div>
        <p className="text-xs pt-2 text-end text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </Menus>
  );
}
