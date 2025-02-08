import axios from "axios";
import { cookies } from "next/headers";

import { BASE_URL } from "@/lib/constants";
import { TFullUser, TUser } from "@/types/auth.types";

export async function getUsers(page: string = "1"): Promise<TUser[]> {
  const cookie = cookies().get("jwtToken")?.value || "";
  const res = await fetch(`${BASE_URL}/api/auth/users?page=${page}`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch all users`);
  return res.json();
}
export async function getCurrentUser(): Promise<TFullUser> {
  const cookie = cookies().get("jwtToken")?.value || "";

  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch current user`);
  return res.json();
}
export async function getUserById(userId: string, token: string) {
  try {
    const res = await axios.get(`${BASE_URL}/api/auth/profile/${userId}`, {
      headers: { cookie: `jwtToken=${token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function getUsersCount(): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/api/auth/users/count`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch users count");
  return res.json();
}
