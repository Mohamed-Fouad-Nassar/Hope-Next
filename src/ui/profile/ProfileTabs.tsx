"use client";

import {
  BookmarkIcon,
  NewspaperIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconFilled,
  NewspaperIcon as NewspaperIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconFilled,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ProfilePosts from "./ProfilePosts";
import ProfileComments from "./ProfileComments";

import { TCommentWithUser, TLikedSavedPost, TPost } from "@/types/blog.types";

type ProfileTabsProps = {
  posts: TPost[];
  isAdmin: boolean;
  comments: TCommentWithUser[];
  likes: TLikedSavedPost[];
  saves: TLikedSavedPost[];
};

export default function ProfileTabs({
  posts,
  likes,
  saves,
  isAdmin,
  comments,
}: ProfileTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tabIndex") ?? "0";
  function handleActiveTab(value: string): void {
    const params = new URLSearchParams();
    params.set("tabIndex", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const tabs = [
    {
      id: "0",
      label: "Liked Posts",
      icon: HandThumbUpIcon,
      activeIcon: HandThumbUpIconFilled,
      forAdminOnly: false,
    },
    {
      id: "1",
      label: "Saved Posts",
      icon: BookmarkIcon,
      activeIcon: BookmarkIconFilled,
      forAdminOnly: false,
    },
    {
      id: "2",
      label: "Your Comments",
      icon: ChatBubbleOvalLeftEllipsisIcon,
      activeIcon: ChatBubbleOvalLeftEllipsisIconFilled,
      forAdminOnly: false,
    },
    {
      id: "3",
      label: "Your Posts",
      icon: NewspaperIcon,
      activeIcon: NewspaperIconFilled,
      forAdminOnly: true,
    },
  ];

  return (
    <div className="w-full mt-5">
      <div>
        <select
          value={activeTab}
          onChange={(e) => handleActiveTab(e.target.value)}
          className="block w-full p-2 rounded border-gray-200 text-gray-700 sm:hidden"
        >
          {tabs
            .filter(({ forAdminOnly }) => isAdmin || !forAdminOnly)
            .map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
        </select>

        <div className="hidden sm:flex border-b border-gray-200">
          {tabs
            .filter(({ forAdminOnly }) => isAdmin || !forAdminOnly)
            .map(({ id, label, icon: Icon, activeIcon: ActiveIcon }) => (
              <button
                key={id}
                onClick={() => handleActiveTab(id)}
                className={`flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium transition-colors space-x-2 ${
                  activeTab == id
                    ? "text-main-600 border-b-2 border-main-600"
                    : "text-gray-500 hover:text-main-600"
                }`}
              >
                {activeTab === id ? (
                  <ActiveIcon className="size-5" />
                ) : (
                  <Icon className="size-5" />
                )}
                <span>{label}</span>
              </button>
            ))}
        </div>
      </div>

      <div className="py-6 px-3 mt-4">
        {activeTab === "0" && (
          <ProfilePosts
            posts={likes?.map(({ post }) => ({ ...post, isLiked: true }))}
          />
        )}
        {activeTab === "1" && (
          <ProfilePosts
            posts={saves?.map(({ post }) => ({ ...post, isSaved: true }))}
          />
        )}
        {activeTab === "2" && <ProfileComments comments={comments} />}
        {isAdmin && activeTab === "3" && <ProfilePosts posts={posts} />}
      </div>
    </div>
  );
}
