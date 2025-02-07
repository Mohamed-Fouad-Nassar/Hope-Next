import Link from "next/link";

import PostCard from "../blog/posts/PostCard";

import { TPost } from "@/types/blog.types";

export default function ProfilePosts({ posts }: { posts: TPost[] }) {
  if (!posts.length)
    return <p className="italic text-gray-700">There are no posts yet.</p>;

  return (
    <>
      <div className="mx-auto lg:mx-0 grid justify-center grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length > 6 && (
        <div className="flex items-end font-medium pt-10">
          Check all of your posts:{" "}
          <Link
            href="/dashboard/posts"
            className="ms-2 flex gap-2 text-main-600 hover:underline"
          >
            All Posts →
          </Link>
        </div>
      )}
    </>
  );
}
