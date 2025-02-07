import DashPageHeading from "@/ui/DashPageHeading";
import UpdateSettingsForm from "@/ui/settings/UpdateSettingsForm";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <main className="flex-1 px-3 py-5">
      <DashPageHeading className="!pb-0">Settings</DashPageHeading>
      <UpdateSettingsForm />
    </main>
  );
}
