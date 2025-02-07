import PostCard from "./PostCard";
import Pagination from "@/ui/Pagination";

import { ARTICLES_PER_PAGE } from "@/lib/constants";

import { getPosts, getPostsCount } from "@/services/blogAPI";

export default async function PostsList({ page = "1" }: { page: string }) {
  const posts = await getPosts(page);
  const { count } = await getPostsCount();

  return (
    <>
      <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-8 border-t border-gray-200 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          <>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        ) : (
          <p>No Posts Yet</p>
        )}
      </div>

      {posts.length > 0 && (
        <Pagination count={count} pageSize={ARTICLES_PER_PAGE} />
      )}
    </>
  );
}
