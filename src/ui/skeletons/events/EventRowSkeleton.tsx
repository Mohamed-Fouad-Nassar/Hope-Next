import Skeleton from "react-loading-skeleton";

export default function EventRowSkeleton() {
  return (
    <tr className="*:p-2 *:lg:px-6 *:lg:py-4 bg-gray-50 dark:bg-gray-600 dark:text-gray-400 border-b dark:border-gray-700 last:border-none">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="h-10 ">
          <Skeleton height={30} className="min-w-4" />
        </td>
      ))}
    </tr>
  );
}
