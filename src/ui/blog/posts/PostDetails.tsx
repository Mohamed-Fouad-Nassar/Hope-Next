import Author from "../Author";
import PostOperations from "./PostOperations";

import { getPostById } from "@/services/blogAPI";

export default async function PostDetails({ postId }: { postId: string }) {
  const {
    id,
    user,
    title,
    isLiked,
    isSaved,
    createdAt,
    description,
    _count: { likes, saves },
  } = await getPostById(postId);

  return (
    <>
      <div className="mx-auto lg:mx-0">
        <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl first-letter:capitalize">
          {title}
        </h2>

        <div className="mt-4 w-full flex flex-wrap justify-between gap-3 items-end">
          <Author author={user} createdAt={`${createdAt}`} />
          <PostOperations
            postId={id}
            title={title}
            likes={likes}
            saves={saves}
            isLiked={isLiked}
            isSaved={isSaved}
          />
        </div>
      </div>
      <div className="mx-auto my-4 py-4 border-y border-gray-200 lg:mx-0 lg:max-w-none">
        <article
          className="py-2 post-body first-letter:capitalize"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </>
  );
}
