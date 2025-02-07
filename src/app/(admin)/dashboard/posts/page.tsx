import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Filter from "@/ui/Filter";
import Search from "@/ui/Search";
import Button from "@/ui/Button";
import DashPageHeading from "@/ui/DashPageHeading";
import PostsTable from "@/ui/blog/posts/PostsTable";
import PostsTableSkeleton from "@/ui/skeletons/blog/posts/PostsTableSkeleton";

import { PostStatus } from "@prisma/client";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Posts",
};

export default async function Page({
  searchParams: { status = "all", page = "1" },
}: {
  searchParams: { status: PostStatus | "all"; page: string };
}) {
  return (
    <main className="flex-1 px-3 py-5">
      <div className="mb-6">
        <div className="pb-3 flex flex-col items-center gap-3 justify-between sm:flex-row sm:items-stretch">
          <DashPageHeading className="!pb-0">Blog Posts</DashPageHeading>
          <Filter
            filterField="status"
            options={[
              { label: "All", value: "all" },
              { label: "Published", value: "PUBLISHED" },
              { label: "Draft", value: "DRAFT" },
              { label: "Hidden", value: "HIDDEN" },
            ]}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-full max-w-[450px]">
            <Search searchField="title" />
          </div>

          <Button
            as="Link"
            href="/dashboard/posts/create"
            className="px-4 flex h-9 gap-1 items-center text-sm font-medium rounded-lg"
          >
            <PlusIcon className="size-5" />
            <span className="hidden md:block">Create Post</span>
          </Button>
        </div>
      </div>

      <Suspense key={status + page} fallback={<PostsTableSkeleton />}>
        <PostsTable page={page} status={status} />
      </Suspense>
    </main>
  );
}

// export default async function Page({
//   searchParams: { status = "PUBLISHED", page = "1" },
// }: {
//   searchParams: { status: PostStatus; page: string };
// }) {
//   return (
//     <main className="flex-1 px-3 py-5">
//       <div className="mb-6">
//         <DashPageHeading>Blog Posts ({status})</DashPageHeading>

//         <div className="flex items-center justify-center gap-2">
//           <div className="w-full max-w-[450px]">
//             <Search searchField="title" />
//           </div>

//           <Link
//             href="/dashboard/posts/create"
//             className="flex h-9 gap-1 items-center rounded-lg bg-main-600 px-4 text-sm font-medium text-white transition-colors hover:bg-main-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
//           >
//             <PlusIcon className="size-5" />
//             <span className="hidden md:block">Create Post</span>
//           </Link>
//         </div>
//       </div>

//       <Suspense key={status + page} fallback={<PostsTableSkeleton />}>
//         <PostsTable page={page} status={status} />
//       </Suspense>
//     </main>
//   );
// }
