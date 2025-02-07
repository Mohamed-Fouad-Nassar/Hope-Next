import { Suspense } from "react";

import Search from "@/ui/Search";
import TagsSlider from "@/ui/TagsSlider";
import PostsList from "@/ui/blog/posts/PostsList";
import PostsListSkeleton from "@/ui/skeletons/blog/posts/PostsListSkeleton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Blog",
};

const tags = [
  { label: "All", value: "all" },
  { label: "Music", value: "music" },
  { label: "Sports", value: "sports" },
  { label: "Gaming", value: "gaming" },
  { label: "News", value: "news" },
  { label: "Live", value: "live" },
  { label: "Fashion", value: "fashion" },
  { label: "Education", value: "education" },
  { label: "Movies", value: "movies" },
  { label: "Tech", value: "tech" },
  { label: "Travel", value: "travel" },
  { label: "Fitness", value: "fitness" },
  { label: "Comedy", value: "comedy" },
];

export default async function Page({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <div className="flex items-center flex-col sm:flex-row justify-between gap-4 mx-auto lg:mx-0">
          <h2 className="min-w-fit text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our Blog
          </h2>

          <div className="mx-auto sm:mt-1 sm:ml-auto sm:mr-0 w-full max-w-[450px]">
            <Search
              searchField="title"
              placeholder="Search Posts with Title..."
            />
          </div>
        </div>

        <TagsSlider field="category" tags={tags} />

        <Suspense key={page} fallback={<PostsListSkeleton />}>
          <PostsList page={page} />
        </Suspense>
      </div>
    </div>
  );
}
