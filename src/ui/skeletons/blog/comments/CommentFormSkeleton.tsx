import Skeleton from "react-loading-skeleton";

export default function CommentFormSkeleton() {
  return (
    <div className="mb-6">
      <Skeleton height={15} width={250} />
      <div className="flex flex-col md:flex-row gap-2 mt-1 md:gap-2 justify-between items-end">
        <div className="flex-1 w-full">
          <Skeleton height={40} />
        </div>
        <Skeleton height={40} width={125} />
      </div>
    </div>
  );
}
