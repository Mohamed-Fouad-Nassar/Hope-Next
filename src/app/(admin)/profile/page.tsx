import { Suspense } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

import Button from "@/ui/Button";
import DashPageHeading from "@/ui/DashPageHeading";
import ProfileDetails from "@/ui/profile/ProfileDetails";
import ProfileDetailsSkeleton from "@/ui/skeletons/profile/ProfileDetailsSkeleton";

export default async function page() {
  return (
    <main className="flex-1 p-3">
      <div className="pb-3 mb-3 flex justify-between items-center gap-2">
        <DashPageHeading className="!pb-0">Profile</DashPageHeading>
        <Button
          as="Link"
          href="/profile/edit"
          variation="secondary"
          className="flex justify-center items-center gap-2"
        >
          <PencilIcon className="size-4" />
          Edit Profile
        </Button>
      </div>

      <Suspense fallback={<ProfileDetailsSkeleton />}>
        <ProfileDetails />
      </Suspense>
    </main>
  );
}

// "use client";

// import ConfirmDelete from "@/ui/ConfirmDelete";
// import Modal, { useModalContext } from "@/ui/Modal";

// <Modal>
//   <Modal.Open opens="Delete Profile">
//     <button>Delete Profile</button>
//   </Modal.Open>

//   <Modal.Window name="Delete Profile" title="Confirm Delete Profile">
//     <DeleteProfileForm profileId={1} />
//   </Modal.Window>
// </Modal>

// function DeleteProfileForm({ profileId }: { profileId: number }) {
//   const { close } = useModalContext();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("delete profile with Id: ", profileId);
//     close();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ConfirmDelete close={close} resourceName="Profile" />
//     </form>
//   );
// }
