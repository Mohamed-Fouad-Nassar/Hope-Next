import Skeleton from "react-loading-skeleton";
import AuthorSkeleton from "../posts/AuthorSkeleton";

export default function CommentDashCardSkeleton() {
  return (
    <div className="w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <AuthorSkeleton />
        <div className="flex justify-end gap-2">
          <Skeleton width={40} height={40} />
        </div>
      </div>
      <div className="pt-4 pb-4 mb-2 border-b flex justify-between items-center gap-3">
        <div className="flex-1">
          <Skeleton height={20} count={2} />
        </div>
        <Skeleton height={25} width={120} />
      </div>
      <div className="flex justify-end">
        <Skeleton height={10} width={120} />
      </div>
    </div>
  );
}
