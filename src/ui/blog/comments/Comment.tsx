"use client";

import Image from "next/image";

import Modal from "@/ui/Modal";
import CommentOperations from "./CommentOperations";

import { TComment } from "@/types/blog.types";

export default function Comment({
  comment,
  isOwner,
  isAdmin,
}: {
  comment: TComment;
  isOwner: boolean;
  isAdmin: boolean | undefined;
}) {
  return (
    <div
      id={`comment-${comment.id}`}
      className="mb-4 flex justify-between items-start gap-2"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50">
        <Image
          width={40}
          height={40}
          alt={comment.user.username}
          src={comment.user.image}
          className="rounded-full"
        />
      </div>

      <div className="flex-1 py-2 px-4 text-sm rounded bg-gray-50">
        <h4 className="font-medium pb-1">{comment.user.username}</h4>
        <p className="text-gray-700">{comment.content}</p>
        <span className="block text-end text-xs pt-1 text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>

      {(isOwner || isAdmin) && (
        <Modal>
          <CommentOperations
            isOwner={isOwner}
            isAdmin={isAdmin}
            comment={comment}
          />
        </Modal>
      )}
    </div>
  );
}
