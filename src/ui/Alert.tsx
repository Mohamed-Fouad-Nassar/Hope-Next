import clsx from "clsx";

export default function Alert({
  children,
  className = "",
  status = "failed",
}: {
  status?: "failed" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(`p-4 rounded text-sm text-center border`, className, {
        "bg-red-100 border-red-400 text-red-700": status === "failed",
        "bg-green-100 border-green-400 text-green-700": status === "success",
      })}
    >
      {children}
    </div>
  );
}
