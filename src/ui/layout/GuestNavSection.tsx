import clsx from "clsx";
import Link from "next/link";

export default function GuestNavSection({ className }: { className?: string }) {
  return (
    <>
      <Link
        href="/login"
        className={clsx(
          className,
          "text-sm px-3 py-2 bg-slate-200 rounded font-semibold leading-6 text-gray-900"
        )}
      >
        Log in
      </Link>

      <Link
        href="/register"
        className={clsx(
          className,
          "text-sm px-3 py-2 bg-slate-200 rounded font-semibold leading-6 text-gray-900"
        )}
      >
        register
      </Link>
    </>
  );
}
