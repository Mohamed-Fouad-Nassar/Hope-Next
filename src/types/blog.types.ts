import { Post } from "@prisma/client";

export type TPostUser = {
  id: string;
  email: string;
  image: string;
  username: string;
  isAdmin?: boolean;
};

export type TComment = {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    image: string;
    username: string;
  };
};

export type TCommentWithUser = TComment & {
  user: TPostUser;
};

export type TPost = Post & {
  user: TPostUser;
  isLiked: boolean;
  isSaved: boolean;
  _count: {
    likes: number;
    saves: number;
    comments: number;
  };
};

export type TPostWithComments = TPost & {
  comments: TComment[];
};

export type TLikedSavedPost = {
  id: number;
  createdAt: string;
  userId: string;
  postId: number;
  post: TPost;
};
