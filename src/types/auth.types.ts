import { User } from "@prisma/client";
import { TCommentWithUser, TLikedSavedPost, TPost } from "./blog.types";

export type TUserFromCookie = string | null | undefined | Promise<string>;

export type TUser = User & {
  _count: {
    likes: number;
    saves: number;
    comments: number;
  };
};
export type TFullUser = TUser & {
  posts: TPost[];
  likes: TLikedSavedPost[];
  saves: TLikedSavedPost[];
  comments: TCommentWithUser[];
};
