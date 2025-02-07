import clsx from "clsx";

export default function Tag({
  children,
  className,
  status = "primary",
}: {
  className?: string;
  children: React.ReactNode;
  status?: "primary" | "secondary" | "third" | "danger";
}) {
  return (
    <span
      className={clsx(
        "block w-fit mx-auto text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase",
        {
          "bg-main-100 text-main-800 dark:bg-main-900 dark:text-main-300":
            status === "primary",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
            status === "secondary",
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300":
            status === "third",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
            status === "danger",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
