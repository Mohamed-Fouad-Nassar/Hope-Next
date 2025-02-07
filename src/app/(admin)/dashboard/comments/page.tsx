import type { Metadata } from "next";

import Search from "@/ui/Search";
import DashPageHeading from "@/ui/DashPageHeading";
import CommentsTable from "@/ui/blog/comments/CommentsTable";
import CommentsTableSkeleton from "@/ui/skeletons/blog/comments/CommentsTableSkeleton";

import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Comments",
};

export default function Page({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  return (
    <main className="flex-1 px-3 py-5">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <DashPageHeading>Blog Comments</DashPageHeading>

        <div className="w-full max-w-[450px]">
          <Search searchField="postId" placeholder="Search by post Id" />
        </div>
      </div>

      <Suspense key={page} fallback={<CommentsTableSkeleton />}>
        <CommentsTable page={page} />
      </Suspense>
    </main>
  );
}
