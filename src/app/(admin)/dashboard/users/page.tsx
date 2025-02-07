import Link from "next/link";
import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Search from "@/ui/Search";
import UsersTable from "@/ui/users/UsersTable";
import DashPageHeading from "@/ui/DashPageHeading";
import UsersTableSkeleton from "@/ui/skeletons/users/UsersTableSkeleton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};

export default function Page({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  return (
    <main className="flex-1 px-3 py-5">
      <div className="mb-6">
        <DashPageHeading>Users</DashPageHeading>

        <div className="flex items-center justify-center gap-2">
          <div className="w-full max-w-[450px]">
            <Search searchField="username" />
          </div>

          <Link
            href="/dashboard/users/create"
            className="flex h-9 gap-1 items-center rounded-lg bg-main-600 px-4 text-sm font-medium text-white transition-colors hover:bg-main-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
          >
            <PlusIcon className="size-5" />
            <span className="hidden md:block">Create New User</span>
          </Link>
        </div>
      </div>

      <Suspense key={page} fallback={<UsersTableSkeleton />}>
        <UsersTable page={page} />
      </Suspense>
    </main>
  );
}
