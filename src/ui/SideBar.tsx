"use client";

import clsx from "clsx";
import { useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

import Logo from "./layout/Logo";

import useClickOutside from "@/hooks/useClickOutside";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useClickOutside(() => setSidebarOpen(false));

  return (
    <>
      {/* <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="inline-flex items-center p-2 mt-4 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="size-6" />
      </button> */}

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="flex absolute items-center p-2 mt-4 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="size-6" />
      </button>

      <aside
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 left-0 z-50 lg:z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:bg-transparent transition-transform -translate-x-full lg:w-56 lg:sticky lg:top-[85px] lg:pt-0 lg:h-[calc(100dvh-100px)] lg:translate-x-0",
          { "translate-x-0": sidebarOpen }
        )}
      >
        <div className="h-full flex flex-col justify-between px-3 lg:pl-0 py-4 overflow-y-auto">
          <div className="lg:hidden pb-8">
            <Logo />
          </div>

          <div className="flex flex-col justify-between flex-1">{children}</div>
        </div>
      </aside>
    </>
  );
}
