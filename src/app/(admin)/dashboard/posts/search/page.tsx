import { getPostsByTitle } from "@/services/blogAPI";
import PostDashCard from "@/ui/blog/posts/PostDashCard";
import PostRow from "@/ui/blog/posts/PostRow";
import DashPageHeading from "@/ui/DashPageHeading";
import Table from "@/ui/Table";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Posts Search",
};

export default async function Page({
  searchParams: { title },
}: {
  searchParams: { title: string };
}) {
  const posts = await getPostsByTitle(title);

  return (
    <main className="flex-1 px-3 py-5">
      <DashPageHeading as="div">
        <h1>Search Posts With Title: {title}</h1>
        {posts.length > 0 && (
          <span className="block text-base font-medium text-gray-600">
            You got {posts.length} posts
          </span>
        )}
      </DashPageHeading>

      {posts.length > 0 ? (
        <>
          <div className="hidden md:block relative">
            <Table>
              <Table.Head
                actions={true}
                titles={["Id", "Title", "User", "Created at", "Statistics"]}
              />

              <Table.Body
                data={posts}
                render={(post) => (
                  <PostRow
                    key={post?.id}
                    post={post}
                    isLast={
                      post == posts[posts.length - 1] ||
                      post == posts[posts.length - 2]
                    }
                  />
                )}
              />
            </Table>
          </div>

          <div className="md:hidden space-y-2 rounded-lg bg-gray-50 p-2 md:pt-0">
            {posts.map((post) => (
              <PostDashCard key={post?.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <p className="italic">No Posts Yet</p>
      )}
    </main>
  );
}
