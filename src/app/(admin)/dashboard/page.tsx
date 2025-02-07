import DashPageHeading from "@/ui/DashPageHeading";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="flex-1 px-3 py-5">
      <DashPageHeading>Dashboard</DashPageHeading>
    </main>
  );
}
