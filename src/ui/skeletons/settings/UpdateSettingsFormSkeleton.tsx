import Skeleton from "react-loading-skeleton";

export default function UpdateSettingsFormSkeleton() {
  return (
    <div className="mt-6 mx-auto max-w-3xl">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 mb-3 pb-3 border-b">
          <Skeleton height={20} width={170} />
          <Skeleton height={38} />
        </div>
      ))}
      <div className="pt-4 flex justify-end">
        <Skeleton width={145} height={40} />
      </div>
    </div>
  );
}
