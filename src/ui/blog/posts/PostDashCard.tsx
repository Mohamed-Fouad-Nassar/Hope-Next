"use client";

import Tag from "@/ui/Tag";
import Menus from "@/ui/Menus";
import PostStats from "./PostStats";
import Author from "@/ui/blog/Author";
import { postStatus } from "./PostRow";
import PostDashMenu from "./PostDashMenu";

import { TPost } from "@/types/blog.types";

export default function PostDashCard({ post }: { post: TPost }) {
  const {
    id,
    user,
    title,
    status,
    createdAt,
    _count: { comments, likes, saves },
  } = post;

  return (
    <Menus>
      <div className="w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Author author={user} />
          <div className="flex justify-end gap-2">
            <PostDashMenu id={id} status={status} />
          </div>
        </div>
        <div className="pt-4 pb-2 mb-2 border-b">
          <h2 className="text-xl font-medium pb-2">{title}</h2>
          <div className="mt-2 flex justify-between gap-2">
            <Tag className="!mx-0" status={postStatus[status]}>
              {status}
            </Tag>
            <PostStats comments={comments} likes={likes} saves={saves} />
          </div>
        </div>
        <p className="text-xs pt-2 text-end text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </Menus>
  );
}
