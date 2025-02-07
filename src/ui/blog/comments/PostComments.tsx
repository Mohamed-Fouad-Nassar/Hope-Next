import Link from "next/link";
import { cookies } from "next/headers";

import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

import { getPostCommentsById } from "@/services/blogAPI";

import { verifyToken } from "@/utils/jwt";

export default async function PostComments({ postId }: { postId: string }) {
  // await new Promise((res) => setTimeout(res, 5000));

  const comments = await getPostCommentsById(postId);

  const userToken = cookies().get("jwtToken")?.value || "";
  const user = await verifyToken(userToken);

  return (
    <div className="max-w-5xl mx-auto sm:px-5">
      {userToken ? (
        <CreateCommentForm postId={postId} />
      ) : (
        <Link
          href="/login"
          className="inline-block text-sm mb-2 italic text-main-600 hover:underline"
        >
          Login to add a new comment?
        </Link>
      )}

      <div className="flex justify-start items-start gap-2">
        <h3 className="text-pretty mb-4 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Comments
        </h3>
        <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
          {comments?.length}
        </span>
      </div>

      <ul className="pt-3">
        {!comments?.length ? (
          <p className="text-pretty italic text-sm">No Comments Yet</p>
        ) : (
          comments?.map((comment) => (
            <li key={comment.id}>
              <Comment
                comment={comment}
                isAdmin={user?.isAdmin}
                isOwner={user?.id === comment?.userId}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
