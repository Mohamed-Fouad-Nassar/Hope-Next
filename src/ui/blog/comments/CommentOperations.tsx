import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import Modal from "@/ui/Modal";
import Button from "@/ui/Button";
import UpdateCommentForm from "./UpdateCommentForm";

import { TComment } from "@/types/blog.types";
import { DeleteCommentForm } from "./DeleteCommentForm";

export default function CommentOperations({
  comment,
  isAdmin,
  isOwner,
}: {
  isAdmin: boolean | undefined;
  isOwner: boolean;
  comment: TComment;
}) {
  if ((isOwner && isAdmin) || isOwner)
    return (
      <div className="self-stretch flex justify-center flex-col gap-2">
        <Modal.Open opens="edit-comment">
          <Button variation="secondary" size="sm">
            <PencilIcon className="size-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </Modal.Open>
        <Modal.Open opens="delete-comment">
          <Button variation="danger" size="sm">
            <TrashIcon className="size-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </Modal.Open>

        <Modal.Window name="edit-comment" title="Edit Comment Form">
          <UpdateCommentForm comment={comment} />
        </Modal.Window>
        <Modal.Window name="delete-comment" title="Confirm Delete Comment">
          <DeleteCommentForm postId={comment?.postId} commentId={comment?.id} />
        </Modal.Window>
      </div>
    );

  if (isAdmin && !isOwner)
    return (
      <div className="self-end">
        <Modal.Open opens="delete-comment">
          <Button variation="danger" size="sm">
            <TrashIcon className="size-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </Modal.Open>

        <Modal.Window name="delete-comment" title="Confirm Delete Comment">
          <DeleteCommentForm postId={comment?.postId} commentId={comment?.id} />
        </Modal.Window>
      </div>
    );

  // return (
  //   <div className="flex flex-col gap-3">
  //     <Modal.Open opens="edit-comment">
  //       <Button variation="secondary" size="sm">
  //         <PencilIcon className="size-4" />
  //         <span className="sr-only">Edit</span>
  //       </Button>
  //     </Modal.Open>
  //     <Modal.Open opens="delete-comment">
  //       <Button variation="danger" size="sm">
  //         <TrashIcon className="size-4" />
  //         <span className="sr-only">Delete</span>
  //       </Button>
  //     </Modal.Open>

  //     <Modal.Window name="edit-comment" title="Edit Comment Form">
  //       <UpdateCommentForm comment={comment} />
  //     </Modal.Window>
  //     <Modal.Window name="delete-comment" title="Confirm Delete Comment">
  //       <DeleteCommentForm postId={comment?.postId} commentId={comment?.id} />
  //     </Modal.Window>
  //   </div>
  // );
}
