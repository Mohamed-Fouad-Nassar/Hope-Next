import Breadcrumb from "@/ui/Breadcrumb";
import CreateOrganizerForm from "@/ui/organizers/CreateOrganizerForm";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "New Event Organizer",
};

export default function Page() {
  return (
    <main className="flex-1 px-3 py-5">
      <Breadcrumb
        curTitle="Create"
        links={[
          {
            title: "Organizers",
            href: "/dashboard/organizers",
            withIcon: false,
          },
        ]}
      />
      <CreateOrganizerForm />
    </main>
  );
}
