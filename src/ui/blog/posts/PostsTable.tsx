import { PostStatus } from "@prisma/client";

import Table from "@/ui/Table";
import PostRow from "./PostRow";
import Pagination from "@/ui/Pagination";
import PostDashCard from "./PostDashCard";

import { ARTICLES_PER_PAGE } from "@/lib/constants";

import { getPosts, getPostsCount } from "@/services/blogAPI";

export default async function PostsTable({
  page = "1",
  status = "all",
}: {
  page?: string;
  status?: PostStatus | "all";
}) {
  const posts = await getPosts(page, status);
  const { count } = await getPostsCount(status);

  return (
    <>
      <div className="hidden md:block relative">
        <Table>
          <Table.Head
            actions={true}
            titles={[
              "Id",
              "Title",
              "Status",
              "User",
              "Created at",
              "Statistics",
            ]}
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

      {posts.length > 0 && (
        <Pagination pageSize={ARTICLES_PER_PAGE} count={count} />
      )}
    </>
  );
}
