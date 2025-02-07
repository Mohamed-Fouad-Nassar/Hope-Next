import Skeleton from "react-loading-skeleton";

import AuthorSkeleton from "../blog/posts/AuthorSkeleton";

export default function UserDashCardSkeleton() {
  return (
    <div className="w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <AuthorSkeleton />
        <div className="flex justify-end gap-2">
          <Skeleton width={40} height={40} />
        </div>
      </div>
      <div className="pt-4 pb-4 mb-2 border-b">
        <Skeleton height={25} />
        <div className="pt-2 flex justify-center gap-2">
          <Skeleton width={40} height={35} />
          <Skeleton width={40} height={35} />
          <Skeleton width={40} height={35} />
        </div>
      </div>
      <div className="flex justify-end">
        <Skeleton height={10} width={120} />
      </div>
    </div>
  );
}
