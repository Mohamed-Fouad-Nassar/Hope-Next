import Skeleton from "react-loading-skeleton";

export default function AuthorSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton circle width={40} height={40} />
      <div>
        <Skeleton width={100} height={12} />
        <Skeleton width={130} height={10} />
      </div>
    </div>
  );
}
