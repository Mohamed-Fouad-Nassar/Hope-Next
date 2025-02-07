import Link from "next/link";
import { convert } from "html-to-text";

import Author from "../Author";
import PostStats from "./PostStats";

import { TPost } from "@/types/blog.types";

export default function PostCard({ post }: { post: TPost }) {
  const {
    id,
    user,
    title,
    // status,
    isLiked,
    isSaved,
    createdAt,
    description,
    _count: { likes, saves, comments },
  } = post;

  return (
    <article
      key={id}
      className="flex mx-auto max-w-xl flex-col items-start justify-between"
    >
      <div className="group relative">
        <h3
          title={title}
          className="first-letter:capitalize mt-3 line-clamp-2 capitalize text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 group-hover:underline"
        >
          <Link href={`/blog/${id}`}>
            <span className="absolute inset-0" />
            {title}
            {/* <span className="text-xs text-gray-500"> ({status})</span> */}
          </Link>
        </h3>

        <p className="first-letter:capitalize mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
          {convert(description, {
            wordwrap: 130,
          })}
        </p>
      </div>

      <div className="mt-4 w-full flex justify-between gap-3 items-end">
        <Author author={user} createdAt={`${createdAt}`} />
        <PostStats
          likes={likes}
          saves={saves}
          isLiked={isLiked}
          isSaved={isSaved}
          comments={comments}
        />
      </div>
    </article>
  );
}
