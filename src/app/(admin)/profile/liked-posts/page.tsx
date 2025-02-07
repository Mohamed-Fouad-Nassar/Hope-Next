import { Suspense } from "react";

import Spinner from "@/ui/Spinner";
import PostCard from "@/ui/blog/posts/PostCard";
import DashPageHeading from "@/ui/DashPageHeading";

import { getLikedPosts } from "@/services/blogAPI";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Liked Posts",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getLikedPosts();

  return (
    <div className="flex-1 px-3 py-5">
      <DashPageHeading className="!pb-0">Liked Posts</DashPageHeading>

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-96">
            <Spinner />
          </div>
        }
      >
        <div className="mx-auto mt-4 pt-4 grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {posts?.length && posts?.length > 0 ? (
            <>
              {posts?.map((post) => (
                <PostCard key={post.id} post={post?.post} />
              ))}
            </>
          ) : (
            <p className="italic text-base text-gray-600">
              There are no Liked Posts Yet
            </p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
