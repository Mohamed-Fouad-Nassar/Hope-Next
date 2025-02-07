import { Suspense } from "react";

import PostDetails from "@/ui/blog/posts/PostDetails";
import PostComments from "@/ui/blog/comments/PostComments";
import PostSkeleton from "@/ui/skeletons/blog/posts/PostSkeleton";
import CommentsSkeleton from "@/ui/skeletons/blog/comments/CommentsSkeleton";

import { getPostById } from "@/services/blogAPI";

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { title } = await getPostById(postId);
  return { title };
}

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container">
        <Suspense fallback={<PostSkeleton />}>
          <PostDetails postId={postId} />
        </Suspense>

        {/* <RelatedPosts postId={postId} posts={posts} />*/}

        <Suspense key={postId} fallback={<CommentsSkeleton />}>
          <PostComments postId={postId} />
        </Suspense>
      </div>
    </div>
  );
}
