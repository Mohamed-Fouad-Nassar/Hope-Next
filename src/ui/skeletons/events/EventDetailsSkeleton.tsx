import Skeleton from "react-loading-skeleton";

export default function EventDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-96 mb-6" />

      <div className="px-1 space-y-6">
        <Skeleton className="px-1" height={12} count={6} />

        <div className="mt-3 grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="col-span-2 md:col-span-1 py-2 px-4 bg-gray-50 rounded">
            <Skeleton width={180} height={14} />
            <div className="pt-3 flex items-center gap-3">
              <Skeleton circle width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 py-2 px-4 bg-gray-50 rounded">
            <Skeleton width={180} height={14} />
            <div className="pt-3 flex items-center gap-3">
              <Skeleton circle width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
          </div>
          <div className="col-span-2 py-2 px-4 bg-gray-50 rounded">
            <Skeleton width={180} height={14} />
            <div className="pt-3 flex items-center gap-3">
              <Skeleton circle width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 px-2 w-full">
          <Skeleton className="mb-4" height={14} width={180} />
          <Skeleton className="h-80 rounded-lg md:h-[500px]" />
        </div>

        <div className="pb-6 px-2 w-full">
          <Skeleton className="mb-4" height={14} width={180} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded">
              <Skeleton className="rounded" width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded">
              <Skeleton className="rounded" width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded">
              <Skeleton className="rounded" width={48} height={48} />
              <div className="flex-1">
                <Skeleton height={12} />
                <Skeleton height={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
