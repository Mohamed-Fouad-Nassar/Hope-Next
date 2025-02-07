import clsx from "clsx";
import Link from "next/link";
import { ComponentType } from "react";

export default function SidebarLink({
  href,
  icon,
  title,
  pathname,
  activeIcon,
}: {
  href: string;
  title: string;
  pathname: string;
  icon?: ComponentType<{ className?: string }>;
  activeIcon?: ComponentType<{ className?: string }>;
}) {
  const Icon = pathname === href ? activeIcon : icon;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "flex items-center px-3 py-2 text-gray-700 rounded transition duration-75 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700",
          {
            "bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-700":
              pathname === href,
          }
        )}
      >
        {Icon && <Icon className="size-5" />}
        <span className="flex-1 ms-3">{title}</span>
      </Link>
    </li>
  );
}
