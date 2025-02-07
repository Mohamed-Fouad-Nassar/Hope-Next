import Skeleton from "react-loading-skeleton";

import ProfileTabsSkeleton from "./ProfileTabsSkeleton";

export default function ProfileDetailsSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center gap-x-6">
        <Skeleton circle width={128} height={128} />
        <div className="flex-1">
          <Skeleton height={15} width={150} />
          <p className="mt-0.5">
            <Skeleton height={10} width={180} />
          </p>
        </div>
        <div className="hidden sm:flex self-end flex-col items-end">
          <Skeleton height={8} width={150} />
          <Skeleton height={8} width={180} />
        </div>
      </div>
      <div className="sm:hidden flex flex-col items-end">
        <Skeleton height={8} width={150} />
        <Skeleton height={8} width={180} />
      </div>

      <ProfileTabsSkeleton />
    </>
  );
}
