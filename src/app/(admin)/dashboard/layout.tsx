import SideBar from "@/ui/SideBar";

import DashboardLinksList from "@/ui/DashboardLinksList";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | Hope Dashboard",
    default: "Hope Dashboard",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar>
        <DashboardLinksList />
      </SideBar>
      {children}
    </>
  );
}
