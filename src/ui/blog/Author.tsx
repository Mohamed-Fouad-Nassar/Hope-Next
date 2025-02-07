import Image from "next/image";

import { TPostUser } from "@/types/blog.types";
import Tag from "../Tag";

type TAuthorProps = {
  author: TPostUser;
  isAdmin?: boolean;
  createdAt?: string;
};

export default function Author({
  author,
  createdAt,
  isAdmin = undefined,
}: TAuthorProps) {
  const { image, username, email } = author;

  return (
    <div className="relative min-w-fit flex items-center gap-x-4">
      <Image
        width={40}
        height={40}
        src={image}
        alt={username}
        className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-gray-50"
      />

      <div className="text-sm leading-6">
        <div className="font-semibold text-gray-900">
          <span className="capitalize flex gap-2 items-center">
            <span className="absolute inset-0" />
            {username}
            {isAdmin !== undefined && (
              <span className="md:hidden">
                {isAdmin === true ? (
                  <Tag status="primary" className="text-[0.65rem]">
                    Admin
                  </Tag>
                ) : (
                  <Tag status="third" className="text-[0.65rem]">
                    User
                  </Tag>
                )}
              </span>
            )}
          </span>
          {/* <Link href={author.href}>
            <span className="absolute inset-0" />
            {author.name}
          </Link> */}
        </div>

        {createdAt ? (
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </span>
        ) : (
          <span className="text-sm text-gray-500">{email}</span>
        )}
      </div>
    </div>
  );
}
