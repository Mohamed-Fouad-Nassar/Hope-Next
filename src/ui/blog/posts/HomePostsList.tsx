import PostCard from "./PostCard";

import { getPosts } from "@/services/blogAPI";

export default async function HomePostsList() {
  const posts = await getPosts();

  return (
    <div className="mx-auto mt-8 pt-8 grid grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.slice(0, 6).map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="italic">No posts available yet.</p>
      )}
    </div>
  );
}
