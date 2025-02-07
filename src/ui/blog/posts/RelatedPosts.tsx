// import PostCard from "./PostCard";

// import { TPost } from "@/data/blog-data";

export default function RelatedPosts() {
//   {
//   postId,
//   posts,
// }: {
//   postId: string;
//   posts: TPost[];
// }
  return (
    <div className="pb-8 mb-8 border-b border-gray-200">
      {/* <h3 className="text-pretty mb-4 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
        Related Posts
      </h3>
      <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {posts
          .filter((post) => post.id !== parseInt(postId))
          .slice(0, 3)
          .map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div> */}
    </div>
  );
}
