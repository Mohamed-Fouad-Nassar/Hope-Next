import PostCard from "@/ui/blog/posts/PostCard";

import { getPostsByTitle } from "@/services/blogAPI";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Search",
};

export default async function page({
  searchParams: { title },
}: {
  searchParams: { title: string };
}) {
  const posts = await getPostsByTitle(title);

  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <h2 className="min-w-fit text-pretty mb-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Search Posts With Title: {title}
        </h2>
        {posts.length > 0 && (
          <span className="text-gray-600">You got {posts.length} posts</span>
        )}

        <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            <>
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          ) : (
            <p className="italic">No Posts Yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
