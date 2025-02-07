import Skeleton from "react-loading-skeleton";

import CommentSkeleton from "./CommentSkeleton";
import CommentFormSkeleton from "./CommentFormSkeleton";

export default function CommentsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto sm:px-5">
      <CommentFormSkeleton />
      <div className="flex justify-start items-start gap-2 mb-4">
        <Skeleton height={20} width={130} />
      </div>
      <ul className="pt-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
}
