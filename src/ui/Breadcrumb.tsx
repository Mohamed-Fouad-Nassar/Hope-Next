import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb({
  links,
  curTitle,
}: {
  curTitle: string;
  links: { title: string; href: Url; withIcon: boolean }[];
}) {
  return (
    <nav
      className="flex text-2xl font-bold pb-5 ml-12 lg:ml-0"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {links?.map(({ title, href, withIcon }, i) => (
          <li key={i}>
            <div className="flex items-center">
              {withIcon && (
                <ChevronRightIcon
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-gray-500 mt-1"
                />
              )}
              <Link
                href={href}
                className="text-2xl font-bold text-gray-500 hover:text-main-600 dark:text-gray-400 dark:hover:text-white"
              >
                {title}
              </Link>
            </div>
          </li>
        ))}

        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRightIcon
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 text-gray-500 mt-1"
            />
            <span className="ms-1 text-2xl font-medium text-gray-700 md:ms-2 dark:text-gray-400">
              {curTitle}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
