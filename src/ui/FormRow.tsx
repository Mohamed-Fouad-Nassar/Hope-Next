import clsx from "clsx";
import Link from "next/link";

type TFormRowProps = {
  label: string;
  className?: string;
  forgetPassword?: boolean;
  children: React.ReactElement;
  // error: string | null | undefined;
  errors: string[] | null | undefined;
};

export default function FormRow({
  label,
  errors,
  children,
  // error,
  className = "",
  forgetPassword = false,
}: TFormRowProps) {
  return (
    <div className={clsx(className, "mb-5")}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={children?.props?.id}
          className="flex-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        {forgetPassword && (
          <div className="w-fit text-sm">
            <Link
              href="/reset-password"
              className="font-semibold text-main-600 hover:text-main-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </div>

      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        id={children?.props["aria-describedby"]}
      >
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      {/* {error && <span className="text-sm text-red-600">{error}</span>} */}
    </div>
  );
}
