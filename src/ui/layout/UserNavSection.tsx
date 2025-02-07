"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  UserIcon,
  ChartBarIcon,
  BookmarkIcon,
  HandThumbUpIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  UserIcon as UserIconFilled,
  ChartBarIcon as ChartBarIconFilled,
  BookmarkIcon as BookmarkIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
} from "@heroicons/react/24/solid";
import { JwtPayload } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/lib/actions";

import useClickOutside from "@/hooks/useClickOutside";
import UserMenuItem from "./UserMenuItem";

const links = [
  {
    icon: UserIcon,
    activeIcon: UserIconFilled,
    title: "Profile",
    path: "/profile",
    forAdminOnly: false,
  },
  {
    icon: ChartBarIcon,
    activeIcon: ChartBarIconFilled,
    title: "Dashboard",
    path: "/dashboard",
    forAdminOnly: true,
  },
  {
    icon: HandThumbUpIcon,
    activeIcon: HandThumbUpIconFilled,
    title: "Liked Posts",
    path: "/profile/liked-posts",
    forAdminOnly: false,
  },
  {
    icon: BookmarkIcon,
    activeIcon: BookmarkIconFilled,
    title: "Saved Posts",
    path: "/profile/saved-posts",
    forAdminOnly: false,
  },
];

export default function UserNavSection({
  user,
  handleCloseMenu,
}: {
  user: JwtPayload;
  handleCloseMenu?: () => void;
}) {
  const pathname = usePathname();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useClickOutside(() =>
    setProfileMenuOpen(false)
  ) as React.RefObject<HTMLDivElement>;

  return (
    <div className="relative ml-3" ref={menuRef}>
      <div>
        <button
          type="button"
          className="w-full group relative flex items-center gap-3"
          onClick={() => setProfileMenuOpen((cur) => !cur)}
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            width={44}
            height={44}
            alt={user?.username}
            className="rounded-full bg-gray-100 group-focus:outline-none ring-2 ring-offset-gray-800/20 ring-white ring-offset-2 group-focus:ring-offset-gray-800/50"
            src={
              user?.image ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
          />

          <div className="flex-1 text-start max-w-full md:max-w-64 lg:max-w-40">
            <p className="font-semibold truncate" title={user?.username}>
              {user?.username}
            </p>
            <p className="text-sm text-gray-700 truncate" title={user?.email}>
              {user?.email}
            </p>
          </div>
        </button>
      </div>

      <div
        className={`${
          profileMenuOpen ? "block" : "hidden"
        } absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
      >
        {links
          .filter(({ forAdminOnly }) => user?.isAdmin || !forAdminOnly)
          .map((item) => (
            <UserMenuItem
              key={item?.path}
              pathname={pathname}
              handleCloseMenu={handleCloseMenu}
              item={item}
            />
          ))}

        <hr className="my-1" />
        <LogOutForm />
      </div>
    </div>
  );
}

function LogOutForm() {
  const router = useRouter();

  async function formAction() {
    const res = await logout();
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/");
      }
    }
  }

  return (
    <form className="block" action={formAction}>
      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-none"
        role="menuitem"
      >
        <ArrowRightStartOnRectangleIcon className="size-4" />
        <span>Log out</span>
      </button>
    </form>
  );
}
