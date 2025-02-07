import Skeleton from "react-loading-skeleton";
import PostCardSkeleton from "../blog/posts/PostCardSkeleton";

export default function ProfileTabsSkeleton() {
  return (
    <div className="w-full mt-5">
      <div className="p-2 rounded border border-gray-200 sm:hidden">
        <Skeleton height={25} className="w-full" />
      </div>

      <div className="hidden sm:flex border-b border-gray-200">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-1 items-center justify-center px-4 py-3 space-x-2"
          >
            <Skeleton height={25} width={120} />
          </div>
        ))}
      </div>

      <div className="py-6 px-3 mt-4 mx-auto lg:mx-0 grid justify-center grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
