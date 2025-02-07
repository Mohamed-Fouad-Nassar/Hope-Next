import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  ReactNode,
  useState,
  // LegacyRef,
  ComponentType,
} from "react";

// import useClickOutside from "@/hooks/useClickOutside";

export default function SidebarDropdown({
  icon,
  title,
  children,
  isOpened,
  activeIcon,
}: {
  title: string;
  isOpened: boolean;
  children: ReactNode;
  icon: ComponentType<{ className?: string }>;
  activeIcon: ComponentType<{ className?: string }>;
}) {
  const [openDropdown, setOpenDropdown] = useState(isOpened);
  // const menuRef = useClickOutside(() => setOpenDropdown(false), false) as
  //   | LegacyRef<HTMLUListElement>
  //   | undefined;

  // console.log("isOpened: ", isOpened);

  const Icon = openDropdown ? activeIcon : icon;

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpenDropdown((cur) => !cur)}
        className={clsx(
          "flex items-center w-full px-3 py-2 text-gray-900 transition duration-75 rounded group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          // { "bg-gray-100 dark:bg-gray-700": openDropdown }
        )}
      >
        <Icon className="size-5" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {title}
        </span>
        <ChevronDownIcon
          className={clsx("size-4 transition-all duration-75", {
            "rotate-180": openDropdown,
          })}
        />
      </button>
      <ul
        // ref={menuRef}
        className={clsx("py-2 space-y-2", {
          hidden: !openDropdown,
        })}
      >
        {children}
      </ul>
    </li>
  );
}
