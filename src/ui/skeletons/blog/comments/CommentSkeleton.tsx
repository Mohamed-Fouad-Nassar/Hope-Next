import Skeleton from "react-loading-skeleton";

export default function CommentSkeleton() {
  return (
    <div className="mb-4 flex justify-between items-start gap-2">
      <Skeleton circle width={40} height={40} />
      <div className="flex-1 py-2 px-4 rounded bg-gray-50">
        <div className="pb-1">
          <Skeleton height={12} width={160} />
        </div>
        <Skeleton height={10} count={2} />
        <span className="flex justify-end">
          <Skeleton height={6} width={120} />
        </span>
      </div>
    </div>
  );
}
