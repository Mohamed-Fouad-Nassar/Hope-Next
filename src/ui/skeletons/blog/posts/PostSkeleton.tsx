import Skeleton from "react-loading-skeleton";

import AuthorSkeleton from "./AuthorSkeleton";

export default function PostSkeleton({
  children,
  isFullscreen = false,
}: {
  isFullscreen?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`bg-white ${isFullscreen ? "py-6 sm:py-8" : ""}`}>
      <div className={isFullscreen ? "container" : "px-0 mx-0"}>
        <div className="mx-auto lg:mx-0">
          <Skeleton height={40} />
          <div className="mt-4 w-full flex flex-wrap justify-between gap-3 items-end">
            <AuthorSkeleton />
            <div className="flex justify-end gap-3 items-center">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>
          </div>
        </div>

        <div className="mx-auto my-4 py-4 border-y border-gray-200 lg:mx-0 lg:max-w-none">
          <Skeleton count={15} />
        </div>

        {children}
      </div>
    </div>
  );
}
