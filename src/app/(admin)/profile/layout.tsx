import SideBar from "@/ui/SideBar";
import ProfileLinksList from "@/ui/profile/ProfileLinksList";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | Your Profile",
    default: "Your Profile",
  },
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar>
        <ProfileLinksList />
      </SideBar>
      {children}
    </>
  );
}
