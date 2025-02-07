"use client";

import {
  UserIcon,
  BookmarkIcon,
  Cog8ToothIcon,
  HandThumbUpIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  UserIcon as UserIconFill,
  BookmarkIcon as BookmarkIconFill,
  Cog8ToothIcon as Cog8ToothIconFill,
  HandThumbUpIcon as HandThumbUpIconFill,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

import Button from "../Button";
import SidebarLink from "../SidebarLink";

export default function ProfileLinksList() {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col gap-1">
        <SidebarLink
          href="/profile"
          title="Profile"
          pathname={pathname}
          icon={UserIcon}
          activeIcon={UserIconFill}
        />
        <SidebarLink
          href="/profile/liked-posts"
          title="Liked Posts"
          pathname={pathname}
          icon={HandThumbUpIcon}
          activeIcon={HandThumbUpIconFill}
        />
        <SidebarLink
          href="/profile/saved-posts"
          title="Saved Posts"
          pathname={pathname}
          icon={BookmarkIcon}
          activeIcon={BookmarkIconFill}
        />
        <SidebarLink
          // href="/profile/settings"
          href="#"
          title="Settings"
          pathname={pathname}
          icon={Cog8ToothIcon}
          activeIcon={Cog8ToothIconFill}
        />
      </ul>

      <Button
        variation="third"
        className="w-full text-center flex items-center gap-2"
      >
        <ArrowRightStartOnRectangleIcon className="size-5 -ml-0.5" />
        <span>Logout</span>
      </Button>
    </>
  );
}
