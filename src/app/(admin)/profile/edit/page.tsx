import Breadcrumb from "@/ui/Breadcrumb";
import EditProfileForm from "@/ui/EditProfileForm";
import UpdatePasswordForm from "@/ui/UpdatePasswordForm";

import { getCurrentUser } from "@/services/authAPI";

export default async function page() {
  const user = await getCurrentUser();

  return (
    <main className="flex-1 px-3 py-5">
      <Breadcrumb
        curTitle="Edit"
        links={[
          {
            title: "Profile",
            href: "/profile",
            withIcon: false,
          },
        ]}
      />

      <div className="mb-8 pb-8 border-b border-gray-300">
        <h2 className="text-lg font-bold pb-3">Update Profile</h2>
        <EditProfileForm user={user} />
      </div>

      <div>
        <h2 className="text-lg font-bold pb-3">Update Password</h2>
        <UpdatePasswordForm />
      </div>
    </main>
  );
}
