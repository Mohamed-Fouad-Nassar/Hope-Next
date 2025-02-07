import Skeleton from "react-loading-skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="w-full mx-auto">
      <div className="relative aspect-video w-full">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="flex flex-col gap-2 py-5">
        <Skeleton height={20} />
        <Skeleton count={2} height={10} />
        <Skeleton count={2} height={8} />
        <div className="mt-1 flex justify-between items-center gap-2">
          <Skeleton width={115} height={36} />
          <Skeleton width={60} height={36} />
        </div>
      </div>
    </div>
  );
}
