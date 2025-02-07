"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import Modal from "../Modal";
import Menus from "../Menus";
import Author from "../blog/Author";

import { TUser } from "@/types/auth.types";
import PostStats from "../blog/posts/PostStats";

export default function UserDashCard({ user }: { user: TUser }) {
  const {
    id,
    email,
    image,
    isAdmin,
    username,
    createdAt,
    _count: { likes, saves, comments },
  } = user;

  return (
    <Menus>
      <div className="w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <Author
            isAdmin={isAdmin}
            author={{
              id,
              email,
              isAdmin,
              username,
              image: image ? image : "",
            }}
          />

          <div className="flex justify-end gap-2">
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={id} />
                <Menus.List id={id}>
                  <Menus.Button
                    // as="Link"
                    // href={`/blog/${id}`}
                    icon={<EyeIcon className="size-4 dark:text-gray-300" />}
                  >
                    View
                  </Menus.Button>
                  <Menus.Button
                    // as="Link"
                    // href={`/dashboard/posts/${id}/edit`}
                    icon={<PencilIcon className="size-4 dark:text-gray-300" />}
                  >
                    Edit
                  </Menus.Button>
                  <hr className="border-gray-200 dark:border-gray-500" />
                  <Modal.Open opens="delete-post-row">
                    <Menus.Button
                      icon={<TrashIcon className="size-4 dark:text-gray-300" />}
                    >
                      Delete
                    </Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>
              <Modal.Window title="Delete Post" name="delete-post-row">
                {/* <DeleteUserForm postId={id} /> */}
                <div>Delete User Form</div>
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className="pt-4 pb-2 mb-2 border-b">
          <h2 className="text-lg font-medium pb-2">{id}</h2>
          <div className="block w-fit mx-auto">
            <PostStats comments={comments} likes={likes} saves={saves} />
          </div>
        </div>

        <p className="text-xs pt-2 text-end text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </Menus>
  );
}
