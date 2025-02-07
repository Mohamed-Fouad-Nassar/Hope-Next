import Link from "next/link";
import { Suspense } from "react";

import HomePostsList from "./posts/HomePostsList";
import PostsListSkeleton from "@/ui/skeletons/blog/posts/PostsListSkeleton";

export default function BlogSection() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container px-4">
        <div className="mx-auto lg:mx-0">
          <Link
            href="/blog"
            className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl hover:underline"
          >
            From the blog
          </Link>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <Suspense fallback={<PostsListSkeleton count={6} />}>
          <HomePostsList />
        </Suspense>
      </div>
    </div>
  );
}
