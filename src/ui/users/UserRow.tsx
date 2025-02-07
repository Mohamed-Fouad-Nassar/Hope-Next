"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import Tag from "../Tag";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import Author from "../blog/Author";
import PostStats from "../blog/posts/PostStats";

import { TUser } from "@/types/auth.types";

export default function UserRow({
  user,
  isLast,
}: {
  user: TUser;
  isLast: boolean;
}) {
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
      <tr className="text-center bg-gray-50 dark:bg-gray-600 dark:text-gray-400 *:p-2 *:lg:px-6 *:lg:py-4 border-b dark:border-gray-700 last:border-none">
        <td>{id}</td>
        <td className="text-start">
          {
            <Author
              author={{
                id,
                email,
                isAdmin,
                username,
                image: image ? image : "",
              }}
            />
          }
        </td>
        <td className="text-start font-medium">
          {isAdmin ? (
            <Tag status="primary">admin</Tag>
          ) : (
            <Tag status="third">user</Tag>
          )}
        </td>
        <td className="text-xs">{new Date(createdAt).toLocaleString()}</td>
        <td>
          <PostStats
            className="justify-center"
            likes={likes}
            saves={saves}
            comments={comments}
          />
        </td>
        <td>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id} isLast={isLast}>
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
        </td>
      </tr>
    </Menus>
  );
}
