import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { BASE_URL } from "@/lib/constants";
import { PostStatus } from "@prisma/client";

import { TPost, TComment, TLikedSavedPost } from "@/types/blog.types";

// Posts
export async function getPosts(
  page: string = "1",
  status: PostStatus | "all" = "PUBLISHED"
): Promise<TPost[]> {
  // await new Promise((res) => setTimeout(res, 5000));

  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(
    `${BASE_URL}/blog/posts?page=${page}&status=${status}`,
    {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );

  if (res.status === 404) notFound();

  if (!res.ok)
    throw new Error(`Failed to fetch all ${status.toLocaleLowerCase()} posts`);
  return res.json();
}
export async function getPublishedPosts(page: string = "1"): Promise<TPost[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/posts?page=${page}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (!res.ok) throw new Error("Failed to all fetch posts");
  return res.json();
}
export async function getHiddenPosts(page: string = "1"): Promise<TPost[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/posts?page=${page}&status=HIDDEN`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (!res.ok) throw new Error("Failed to all fetch posts");
  return res.json();
}
export async function getDraftPosts(page: string = "1"): Promise<TPost[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/posts?page=${page}&status=DRAFT`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (!res.ok) throw new Error("Failed to all fetch posts");
  return res.json();
}
export async function getPostsCount(
  status: PostStatus | "all" = "PUBLISHED"
): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/blog/posts/count?status=${status}`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch posts count");
  return res.json();
}
export async function getPostById(postId: string | number): Promise<TPost> {
  // await new Promise((res) => setTimeout(res, 10000));

  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/posts/${postId}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}
export async function getPostCommentsById(
  postId: string | number
): Promise<TComment[]> {
  // await new Promise((res) => setTimeout(res, 10000));

  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/posts/${postId}/comments`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch post comments");
  return res.json();
}
export async function getPostsByTitle(title: string): Promise<TPost[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  // if (!title) return [];

  const res = await fetch(`${BASE_URL}/blog/posts/search?query=${title}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
export async function getLikedPosts(): Promise<TLikedSavedPost[] | null> {
  try {
    const cookie = cookies().get("jwtToken")?.value || "";
    const res = await axios.get(`${BASE_URL}/blog/posts/likes`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function getSavedPosts(): Promise<TLikedSavedPost[] | null> {
  try {
    const cookie = cookies().get("jwtToken")?.value || "";
    const res = await axios.get(`${BASE_URL}/blog/posts/saves`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Comments
export async function getComments(page: string = "1"): Promise<TComment[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/blog/comments?page=${page}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch all comments`);
  return res.json();
}
export async function getCommentsCount(): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/blog/comments/count`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch comments count");
  return res.json();
}
// export async function createNewPost() {}
// export async function updatePost() {}
// export async function deletePost() {}
