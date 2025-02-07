import { TCommentWithUser } from "@/types/blog.types";
import Link from "next/link";

export default function ProfileComments({
  comments,
}: {
  comments: TCommentWithUser[];
}) {
  if (!comments.length)
    return <p className="italic text-gray-700">There are no comment yet.</p>;

  return (
    <div className="mx-auto lg:mx-0 grid justify-center grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {comments?.slice(0, 6)?.map((comment) => (
        <div key={comment?.id} className="w-full">
          <p className="border-b pb-2">
            You are comment on{" "}
            <Link
              className="uppercase font-medium text-main-600 hover:underline hover:text-main-800"
              href={`/blog/${comment?.postId}`}
            >
              post #{comment?.postId}
            </Link>
          </p>
          <h2 className="pt-2 mb-2 border-b text-xl font-medium pb-2">
            {comment?.content?.slice(0, 60) + "..."}
          </h2>
          <p className="text-xs pt-2 text-end text-gray-500">
            {new Date(comment?.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

      {comments.length > 6 && (
        <div className="flex items-end font-medium pt-10">
          Check all of your posts:{" "}
          <Link
            href="#"
            // href="/profile/comments"
            className="ms-2 flex gap-2 text-main-600 hover:underline"
          >
            All Comments →
          </Link>
        </div>
      )}
    </div>
  );
}
