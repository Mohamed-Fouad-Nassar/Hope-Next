"use client";

import {
  usePathname,
  // useSearchParams
} from "next/navigation";
import {
  UsersIcon,
  ChartPieIcon,
  NewspaperIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import {
  UsersIcon as UsersIconFill,
  ChartPieIcon as ChartPieIconFill,
  NewspaperIcon as NewspaperIconFill,
  Cog6ToothIcon as Cog6ToothIconFill,
  CalendarDaysIcon as CalendarDaysIconFill,
  IdentificationIcon as IdentificationIconFill,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconFill,
} from "@heroicons/react/24/solid";

import SidebarLink from "./SidebarLink";
// import SidebarDropdown from "./SidebarDropdown";

export default function DashboardLinksList() {
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const status = searchParams.get("status");

  return (
    <ul className="font-medium text-sm flex flex-col gap-1.5">
      <SidebarLink
        href="/dashboard"
        title="Dashboard"
        pathname={pathname}
        icon={ChartPieIcon}
        activeIcon={ChartPieIconFill}
      />
      <SidebarLink
        href="/dashboard/settings"
        title="Settings"
        pathname={pathname}
        icon={Cog6ToothIcon}
        activeIcon={Cog6ToothIconFill}
      />
      {/* <SidebarDropdown
        title="Posts"
        isOpened={pathname.includes("/dashboard/posts")}
        icon={NewspaperIcon}
        activeIcon={NewspaperIconFill}
      >
        <SidebarLink
          href={"/dashboard/posts"}
          title="Published Posts"
          pathname={status ? `${pathname}?status=${status}` : pathname}
        />
        <SidebarLink
          href="/dashboard/posts?status=HIDDEN"
          title="Hidden Posts"
          pathname={status ? `${pathname}?status=${status}` : pathname}
        />
        <SidebarLink
          href="/dashboard/posts?status=DRAFT"
          title="Draft Posts"
          pathname={status ? `${pathname}?status=${status}` : pathname}
        />
      </SidebarDropdown> */}
      <hr />
      <SidebarLink
        href="/dashboard/posts"
        title="Posts"
        pathname={pathname}
        icon={NewspaperIcon}
        activeIcon={NewspaperIconFill}
      />
      <SidebarLink
        href="/dashboard/comments"
        title="Comments"
        pathname={pathname}
        icon={ChatBubbleOvalLeftEllipsisIcon}
        activeIcon={ChatBubbleOvalLeftEllipsisIconFill}
      />
      <hr />
      <SidebarLink
        href="/dashboard/events"
        title="Events"
        pathname={pathname}
        icon={CalendarDaysIcon}
        activeIcon={CalendarDaysIconFill}
      />
      <SidebarLink
        href="/dashboard/organizers"
        title="Organizers"
        pathname={pathname}
        icon={IdentificationIcon}
        activeIcon={IdentificationIconFill}
      />
      <hr />
      <SidebarLink
        href="/dashboard/users"
        title="Users"
        pathname={pathname}
        icon={UsersIcon}
        activeIcon={UsersIconFill}
      />

      {/* <span className="border-t border-gray-200"></span> */}
    </ul>
  );
}
