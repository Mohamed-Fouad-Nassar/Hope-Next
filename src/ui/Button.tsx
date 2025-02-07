// "use client";

// import clsx from "clsx";

// type TButtonProps = {
//   className?: string;
//   disabled?: boolean;
//   onClick?: (e?: React.FormEvent) => void;
//   children: React.ReactNode;
//   size?: "sm" | "lg" | "regular";
//   type?: "submit" | "reset" | "button";
//   variation?: "primary" | "secondary" | "third" | "danger";
// };

// export default function Button({
//   children,
//   className,
//   disabled = false,
//   type = "button",
//   size = "regular",
//   variation = "primary",
//   onClick,
// }: TButtonProps) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={clsx(
//         className,
//         "rounded focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed",
//         {
//           "text-sm font-medium px-5 py-2.5": size === "regular",
//         },
//         {
//           "text-xs font-normal px-3 py-1.5": size === "sm",
//         },
//         {
//           "font-semibold px-6 py-3": size === "lg",
//         },
//         {
//           "text-white bg-main-700 hover:bg-main-800 focus:ring-main-500/40 dark:bg-main-600 dark:hover:bg-main-700  dark:focus:ring-main-800/40":
//             variation === "primary",
//         },
//         {
//           "text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700":
//             variation === "secondary",
//         },
//         {
//           "text-gray-900 bg-transparent hover:text-main-800 focus:ring-transparent":
//             variation === "third",
//         },
//         {
//           "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900":
//             variation === "danger",
//         }
//       )}
//     >
//       {children}
//     </button>
//   );
// }

"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

type TButtonBaseProps = {
  className?: string;
  disabled?: boolean;
  size?: "sm" | "lg" | "regular";
  variation?: "primary" | "secondary" | "third" | "danger";
  children: React.ReactNode;
};

type TButtonProps = TButtonBaseProps & {
  as?: "button";
  type?: "submit" | "reset" | "button";
  onClick?: (e?: React.FormEvent) => void;
};

type TLinkProps = TButtonBaseProps & {
  as: "Link";
  href: string;
};

type ButtonOrLinkProps = TButtonProps | TLinkProps;

export default function Button({
  as = "button",
  children,
  className,
  disabled = false,
  size = "regular",
  variation = "primary",
  ...rest
}: ButtonOrLinkProps) {
  const baseClasses = clsx(
    className,
    "rounded focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed",
    {
      "text-sm font-medium px-5 py-2.5": size === "regular",
      "text-xs font-normal px-3 py-1.5": size === "sm",
      "font-semibold px-6 py-3": size === "lg",
    },
    {
      "text-white bg-main-700 hover:bg-main-800 focus:ring-main-500/40 dark:bg-main-600 dark:hover:bg-main-700  dark:focus:ring-main-800/40":
        variation === "primary",
      "text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700":
        variation === "secondary",
      "text-gray-900 bg-transparent hover:text-main-800 focus:ring-transparent":
        variation === "third",
      "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900":
        variation === "danger",
    }
  );

  if (as === "Link") {
    const { href, ...linkProps } = rest as TLinkProps;
    return (
      <Link href={href} className={baseClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick } = rest as TButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
