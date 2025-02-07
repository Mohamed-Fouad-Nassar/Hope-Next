import Skeleton from "react-loading-skeleton";

import AuthorSkeleton from "./AuthorSkeleton";

export default function PostCardSkeleton() {
  return (
    <div className="flex max-w-xl flex-col items-start justify-between">
      <div className="w-full">
        <Skeleton className="mt-3" height={22} />
        <div className="mt-4">
          <Skeleton height={14} count={3} />
        </div>
      </div>
      <div className="mt-4 w-full flex justify-between gap-3 items-end">
        <AuthorSkeleton />
        <div className="flex items-center mb-1 gap-3">
          <Skeleton width={30} height={20} />
          <Skeleton width={30} height={20} />
          <Skeleton width={30} height={20} />
        </div>
      </div>
    </div>
  );
}
