import Link from "next/link";

type UserMenuItemProps = {
  item: {
    path: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    activeIcon: React.ComponentType<{ className?: string }>;
  };
  pathname: string;
  handleCloseMenu?: () => void;
};

export default function UserMenuItem({
  pathname,
  handleCloseMenu,
  item: { path, icon, title, activeIcon },
}: UserMenuItemProps) {
  const Icon =
    (pathname.startsWith("/dashboard") && path.includes("/dashboard")) ||
    pathname === path
      ? activeIcon
      : icon;

  return (
    <Link
      key={path}
      href={path}
      role="menuitem"
      onClick={() => handleCloseMenu?.()}
      className={`flex items-center gap-2 px-4 py-2 text-sm hover:outline-none ${
        (pathname.startsWith("/dashboard") && path.includes("/dashboard")) ||
        pathname === path
          ? "bg-gray-100 outline-none"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="size-4" />
      <span>{title}</span>
    </Link>
  );
}
