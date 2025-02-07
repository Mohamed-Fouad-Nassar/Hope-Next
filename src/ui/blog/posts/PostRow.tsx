"use client";

import Tag from "@/ui/Tag";
import Menus from "@/ui/Menus";
import PostStats from "./PostStats";
import Author from "@/ui/blog/Author";
import PostDashMenu from "./PostDashMenu";

import { TPost } from "@/types/blog.types";

export const postStatus: Record<string, "secondary" | "third" | "primary"> = {
  HIDDEN: "third",
  DRAFT: "primary",
  PUBLISHED: "secondary",
};

export default function PostRow({
  post,
  isLast,
}: {
  post: TPost;
  isLast: boolean;
}) {
  const {
    id,
    user,
    title,
    status,
    createdAt,
    _count: { likes, saves, comments },
  } = post;

  return (
    <Menus>
      <tr className="text-center bg-gray-50 dark:bg-gray-600 dark:text-gray-400 *:p-2 *:lg:px-6 *:lg:py-4 border-b dark:border-gray-700 last:border-none">
        <td>{id}</td>
        <td className="text-start font-medium">{title}</td>
        <td className="text-start">
          {<Tag status={postStatus[status]}>{status}</Tag>}
        </td>
        <td className="text-start">{<Author author={user} />}</td>
        <td className="text-xs">{new Date(createdAt).toLocaleString()}</td>
        <td>
          <PostStats
            className="justify-center"
            likes={likes}
            saves={saves}
            comments={comments}
          />
        </td>
        <td>
          <PostDashMenu id={id} status={status} isLast={isLast} />
        </td>
      </tr>
    </Menus>
  );
}
