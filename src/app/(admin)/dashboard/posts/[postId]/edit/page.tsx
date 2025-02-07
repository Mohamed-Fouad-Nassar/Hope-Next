import Breadcrumb from "@/ui/Breadcrumb";
import UpdatePostForm from "@/ui/blog/posts/UpdatePostForm";

import { getPostById } from "@/services/blogAPI";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Post",
};

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getPostById(postId);

  return (
    <main className="flex-1 px-3 py-5">
      <Breadcrumb
        curTitle={`Edit Post: #${postId}`}
        links={[
          {
            title: "Posts",
            href: "/dashboard/posts",
            withIcon: false,
          },
        ]}
      />
      <UpdatePostForm post={post} />
    </main>
  );
}
