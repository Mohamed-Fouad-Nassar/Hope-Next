import PostSkeleton from "@/ui/skeletons/blog/posts/PostSkeleton";
import CommentsSkeleton from "@/ui/skeletons/blog/comments/CommentsSkeleton";

export default function loading() {
  return (
    <PostSkeleton isFullscreen={true}>
      <CommentsSkeleton />
    </PostSkeleton>
  );
}
