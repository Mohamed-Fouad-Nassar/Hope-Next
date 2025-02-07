import Breadcrumb from "@/ui/Breadcrumb";
import CreateNewPostForm from "@/ui/blog/posts/CreateNewPostForm";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "New Post",
};

export default function Page() {
  return (
    <main className="flex-1 px-3 py-5">
      <Breadcrumb
        curTitle="Create"
        links={[
          {
            title: "Posts",
            href: "/dashboard/posts",
            withIcon: false,
          },
        ]}
      />
      <CreateNewPostForm />
    </main>
  );
}
