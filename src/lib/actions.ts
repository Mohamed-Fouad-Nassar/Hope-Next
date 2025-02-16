"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import axios, { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";

import {
  loginSchema,
  registerSchema,
  deletePostSchema,
  createPostSchema,
  updatePostSchema,
  deleteEventSchema,
  createEventSchema,
  updateEventSchema,
  likeSavePostSchema,
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
  updateProfileSchema,
  updatePasswordSchema,
  updateSettingsSchema,
  createOrganizerSchema,
} from "./validations";
import { BASE_URL } from "./constants";
import { verifyToken } from "@/utils/jwt";

// ----------------------- AUTH ------------------------
// Register
export type TRegisterState = {
  status?: number;
  message?: string;
  errors?: {
    email?: string[];
    isAdmin?: string[];
    username?: string[];
    password?: string[];
  };
};
export async function register(newUser: unknown) {
  // new Promise((res) => setTimeout(res, 3000));
  try {
    const validation = registerSchema.safeParse(newUser);
    if (!validation.success) {
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    // create the user and send verification email
    await axios.post(`${BASE_URL}/api/auth/register`, validation.data);

    revalidatePath("/");
    return { status: 200, message: "Verification email sent successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to create new user",
    };
  }
}
// Log in
export type TLoginState = {
  status?: number;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};
export async function login(user: unknown) {
  // new Promise((res) => setTimeout(res, 5000));
  try {
    const validation = loginSchema.safeParse(user);
    if (!validation.success) {
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to log in user",
      };
    }
    const res = await axios.post(`${BASE_URL}/api/auth/login`, validation.data);

    cookies().set("jwtToken", res.data.token);
    revalidatePath("/");
    return { status: 200, message: "User logged in successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to log in user",
    };
  }
}
// Log out
export async function logout() {
  try {
    const res = await axios.get(`${BASE_URL}/api/auth/logout`);
    cookies().delete("jwtToken");
    revalidatePath("/");
    return { status: 200, ...res.data };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to log out user",
    };
  }
}
// ----------------------- USER ------------------------
// Update User Profile
export type TUpdateProfileState = {
  status?: number;
  message?: string;
  errors?: {
    username?: string[];
    image?: string[];
  };
};
export async function updateProfile(newUser: unknown) {
  // new Promise((res) => setTimeout(res, 3000));
  try {
    const cookie = cookies().get("jwtToken")?.value;
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to update profile",
      };
    const userFromToken = await verifyToken(cookie);

    const validation = updateProfileSchema.safeParse(newUser);
    if (!validation.success) {
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update profile",
      };
    }

    await axios.put(
      `${BASE_URL}/api/auth/profile/${userFromToken?.id}`,
      validation.data,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath("/");
    return { status: 200, message: "Profile updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update profile",
    };
  }
}
// Update User Password
export type TUpdatePasswordState = {
  status?: number;
  message?: string;
  errors?: {
    password?: string[];
    repeatPassword?: string[];
  };
};
export async function updatePassword(newPasswords: unknown) {
  // new Promise((res) => setTimeout(res, 3000));

  try {
    const cookie = cookies().get("jwtToken")?.value;
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to update password",
      };
    const userFromToken = await verifyToken(cookie);

    const validation = updatePasswordSchema.safeParse(newPasswords);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update Password",
      };

    await axios.put(
      `${BASE_URL}/api/auth/profile/${userFromToken?.id}`,
      { password: validation?.data?.password },
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath("/");
    return { status: 200, message: "Password updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update Password",
    };
  }
}
// Change Password
export type TChangePasswordState = {
  status?: number;
  message?: string;
  errors?: {
    password?: string[];
    repeatPassword?: string[];
  };
};
export async function changePassword(data: unknown) {
  try {
    const { token, ...passwords } = data as {
      token: string;
      password: string;
      repeatPassword: string;
    };

    const validation = updatePasswordSchema.safeParse(passwords);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update Password",
      };

    const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: "PUT",
      body: JSON.stringify({
        token,
        password: validation?.data?.password,
        repeatPassword: validation?.data?.repeatPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return { status: 400, message: "Failed to update Password" };

    return { status: 200, message: "Password updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update Password",
    };
  }
}

// ----------------------- BLOG ------------------------
// -------- Post --------
// Create Post
// export type TCreatePostState = {
//   status?: number;
//   message?: string;
//   errors?: {
//     title?: string[];
//     image?: string[];
//     userId?: string[];
//     description?: string[];
//   };
// };
// export async function createPost(post: unknown) {
//   // new Promise((res) => setTimeout(res, 5000));
//   try {
//     const cookie = cookies().get("jwtToken")?.value || "";
//     if (!cookie)
//       return {
//         status: 401,
//         message: "Authentication token missing. Failed to create new post",
//       };

//     const validation = createPostSchema.safeParse(post);
//     if (!validation.success)
//       return {
//         status: 400,
//         errors: validation.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to create new post",
//       };

//     const res = await axios.post(
//       `${BASE_URL}/api/blog/posts`,
//       validation.data,
//       {
//         headers: {
//           Authorization: `Bearer ${cookie}`,
//         },
//       }
//     );
//     console.log(res?.data);
//     return { status: 200, message: "Post created successfully" };
//   } catch (err) {
//     console.log({
//       status: 400,
//       message: isAxiosError(err)
//         ? err.response?.data?.message || err.response?.data || err.message
//         : "Failed to create new post",
//     });

//     return {
//       status: 400,
//       message: isAxiosError(err)
//         ? err.response?.data?.message || err.response?.data || err.message
//         : "Failed to create new post",
//     };
//   }
// }
export type TCreatePostState = {
  status?: number;
  message?: string;
  errors?: {
    title?: string[];
    image?: string[];
    userId?: string[];
    description?: string[];
  };
};
export async function createPost(post: unknown) {
  try {
    const cookie = cookies()?.get("jwtToken")?.value || "";
    if (!cookie) {
      return {
        status: 401,
        message: "Authentication token missing. Failed to create new post",
      };
    }

    const validation = createPostSchema.omit({ status: true }).safeParse(post);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new post",
      };

    await axios.post(
      `${BASE_URL}/api/blog/posts`,
      { ...validation?.data, status: "PUBLISHED" },
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    return { status: 200, message: "Post created successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to create new post",
    };
  }
}
export async function saveDraft(post: unknown) {
  try {
    const cookie = cookies()?.get("jwtToken")?.value || "";
    if (!cookie) {
      return {
        status: 401,
        message: "Authentication token missing. Failed to save draft",
      };
    }

    const validation = createPostSchema.omit({ status: true }).safeParse(post);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to save draft",
      };

    await axios.post(
      `${BASE_URL}/api/blog/posts`,
      { ...validation?.data, status: "DRAFT" },
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    return { status: 200, message: "Draft saved successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to save draft",
    };
  }
}
// id;
// image;
// title;
// status;
// Description;
export type TUpdatePostState = {
  status?: number;
  message?: string;
  errors?: {
    title?: string[];
    image?: string[];
    id?: string[];
    status?: string[];
    description?: string[];
  };
};
export async function updatePost(newPost: unknown) {
  try {
    const cookie = cookies()?.get("jwtToken")?.value || "";
    if (!cookie) {
      return {
        status: 401,
        message: "Authentication token missing. Failed to update post",
      };
    }

    const validation = updatePostSchema.safeParse(newPost);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update post",
      };

    await axios.put(
      `${BASE_URL}/api/blog/posts/${validation.data?.id}`,
      { ...validation?.data },
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath(`/blog`);
    revalidatePath(`/dashboard/posts`);
    return { status: 200, message: "Post updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to update post",
    };
  }
}
// Handle Like Post
export type TLikeSavePostHandlerState = {
  status?: number;
  message?: string;
  errors?: {
    postId?: string[];
  };
};
export async function likePost(postId: unknown) {
  try {
    if (!postId)
      return { status: 400, message: "PostId Missing. Failed to like post" };

    if (isNaN(parseInt(postId as string)))
      return {
        status: 400,
        message: "PostId Must be a number. Failed to like post",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to like post",
      };

    const validation = likeSavePostSchema.safeParse({ postId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to like post",
      };

    await axios.post(`${BASE_URL}/api/blog/posts/likes`, validation.data, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    revalidatePath(`/blog/${postId}`);
    return { status: 200, message: "Post Liked successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to like post",
    };
  }
}
export async function unlikePost(postId: unknown) {
  try {
    if (!postId)
      return {
        status: 400,
        message: "PostId Missing. Failed to like post",
      };

    if (isNaN(parseInt(postId as string)))
      return {
        status: 400,
        message: "PostId Must be a number. Failed to unlike post",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to unlike post",
      };

    const validation = likeSavePostSchema.safeParse({ postId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to unlike post",
      };

    await axios.delete(
      `${BASE_URL}/api/blog/posts/likes?postId=${validation.data?.postId}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath(`/blog/${postId}`);
    return { status: 200, message: "post like removed successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to unlike post",
    };
  }
}
// Handle Save Post
export async function savePost(postId: unknown) {
  try {
    if (!postId)
      return { status: 400, message: "PostId Missing. Failed to save post" };

    if (isNaN(parseInt(postId as string)))
      return {
        status: 400,
        message: "PostId Must be a number. Failed to save post",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to save post",
      };

    const validation = likeSavePostSchema.safeParse({ postId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to save post",
      };

    await axios.post(`${BASE_URL}/api/blog/posts/saves`, validation.data, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    revalidatePath(`/blog/${postId}`);
    return { status: 200, message: "Post Saved successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to save post",
    };
  }
}
export async function unSavePost(postId: unknown) {
  try {
    if (!postId)
      return {
        status: 400,
        message: "PostId Missing. Failed to unsave post",
      };

    if (isNaN(parseInt(postId as string)))
      return {
        status: 400,
        message: "PostId Must be a number. Failed to unsave post",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to unsave post",
      };

    const validation = likeSavePostSchema.safeParse({ postId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to unsave post",
      };

    await axios.delete(
      `${BASE_URL}/api/blog/posts/saves?postId=${validation.data?.postId}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath(`/blog/${postId}`);
    return { status: 200, message: "post save removed successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to unsave post",
    };
  }
}
// Delete Post
export type TDeletePostState = {
  status?: number;
  message?: string;
  errors?: {
    postId?: string[];
  };
};
export async function deletePost(postId: number) {
  try {
    if (!postId)
      return {
        status: 400,
        message: "PostId Missing. Failed to delete post",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to delete post",
      };

    const validation = deletePostSchema.safeParse({ postId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete post",
      };

    await axios.delete(
      `${BASE_URL}/api/blog/posts/${validation.data?.postId}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    revalidatePath("/blog");
    revalidatePath("/dashboard/posts");
    return { status: 200, message: "post deleted successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to delete post",
    };
  }
}

// -------- Comment --------
// Create Comment
export type TCreateCommentState = {
  status?: number;
  message?: string;
  errors?: {
    postId?: string[];
    content?: string[];
  };
};
export async function createNewComment(comment: unknown) {
  // new Promise((res) => setTimeout(res, 5000));

  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await verifyToken(userToken);
    const userId = user ? user?.id : undefined;

    if (!userId)
      return {
        status: 400,
        message: "User Id Not Found",
      };

    const validation = createCommentSchema.safeParse(comment);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new comment",
      };

    await axios.post(`${BASE_URL}/api/blog/comments`, validation.data, {
      headers: { cookie: `jwtToken=${userToken}` },
    });

    revalidatePath(`/blog/${validation.data?.postId}`);
    return {
      status: 200,
      message: "Comment created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to create new comment",
    };
  }
}
// Update Comment
export type TUpdateCommentState = {
  status?: number;
  message?: string;
  errors?: {
    // userId?: string[];
    postId?: string[];
    content?: string[];
    id?: string[];
  };
};
export async function updateComment(comment: unknown) {
  // new Promise((res) => setTimeout(res, 5000));

  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await verifyToken(userToken);
    const userId = user ? user?.id : undefined;

    if (!userId)
      return {
        status: 400,
        message: "UserId Not Found",
      };

    const validation = updateCommentSchema
      .extend({
        id: z.number(),
        postId: z.number({ message: "Post id must be number" }),
      })
      .safeParse(comment);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update comment",
      };

    await axios.put(
      `${BASE_URL}/api/blog/comments/${validation.data?.id}`,
      { content: validation.data?.content },
      { headers: { cookie: `jwtToken=${userToken}` } }
    );

    revalidatePath(`/blog/${validation.data?.postId}`);
    return {
      status: 200,
      message: "Comment updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update comment",
    };
  }
}
// Delete Comment
export type TDeleteCommentState = {
  status?: number;
  message?: string;
  errors?: {
    id?: string[];
    postId?: string[];
  };
};
export async function deleteComment(comment: unknown) {
  // new Promise((res) => setTimeout(res, 5000));

  try {
    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie) {
      return {
        status: 401,
        message: "Authentication token missing. Failed to delete comment",
      };
    }

    const user = await verifyToken(cookie);
    const userId = user ? user?.id : undefined;
    if (!userId)
      return {
        status: 400,
        message: "UserId Not Found",
      };

    const validation = deleteCommentSchema.safeParse(comment);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete comment",
      };

    await axios.delete(`${BASE_URL}/api/blog/comments/${validation.data?.id}`, {
      headers: { cookie: `jwtToken=${cookie}` },
    });

    revalidatePath(`/blog/${validation.data?.postId}`);
    return {
      status: 200,
      message: "Comment deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to delete comment",
    };
  }
}

// ----------------------- EVENTS ------------------------
// Create Event
export type TCreateEventState = {
  status?: number;
  message?: string;
  errors?: {
    title?: string[];
    venue?: string[];
    address?: string[];
    endDate?: string[];
    mapLink?: string[];
    startDate?: string[];
    onlineLink?: string[];
    description?: string[];
    bannerImage?: string[];
    locationType?: string[];
    organizerId?: string[];
    // organizerName?: string[];
    // organizerContact?: string[];
    // organizerWebsite?: string[];
  };
};
export async function createEvent(event: unknown) {
  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await await verifyToken(userToken);
    const userId = user ? user?.id : undefined;

    if (!userId)
      return {
        status: 400,
        message: "User Id Not Found",
      };

    const validation = createEventSchema.safeParse(event);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new event",
      };

    await axios.post(
      `${BASE_URL}/api/events`,
      {
        ...validation.data,
        startDate: new Date(validation.data?.startDate).toISOString(),
        endDate: new Date(validation.data?.endDate).toISOString(),
      },
      {
        headers: { cookie: `jwtToken=${userToken}` },
      }
    );

    revalidatePath(`/events`);
    revalidatePath(`dashboard/events`);
    return { status: 200, message: "Event created successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to create new event",
    };
  }
}
// Update Event
export type TUpdateEventState = {
  status?: number;
  message?: string;
  errors?: {
    title?: string[];
    venue?: string[];
    status?: string[];
    address?: string[];
    endDate?: string[];
    mapLink?: string[];
    startDate?: string[];
    onlineLink?: string[];
    description?: string[];
    bannerImage?: string[];
    locationType?: string[];
  };
};
export async function updateEvent(id: number, event: unknown) {
  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await verifyToken(userToken);
    const userId = user ? user?.id : undefined;
    if (!userId)
      return {
        status: 400,
        message: "User Id Not Found",
      };

    const validation = updateEventSchema.safeParse(event);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update event",
      };

    await axios.put(`${BASE_URL}/api/events/${id}`, validation.data, {
      headers: { cookie: `jwtToken=${userToken}` },
    });

    revalidatePath(`/events`);
    revalidatePath(`dashboard/events`);
    return { status: 200, message: "Event updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update event",
    };
  }
}
// Delete Event
export type TDeleteEventState = {
  status?: number;
  message?: string;
  errors?: {
    eventId?: string[];
  };
};
export async function deleteEvent(eventId: number) {
  try {
    if (!eventId)
      return {
        status: 400,
        message: "eventId Missing. Failed to delete event",
      };

    const cookie = cookies().get("jwtToken")?.value || "";
    if (!cookie)
      return {
        status: 401,
        message: "Authentication token missing. Failed to delete event",
      };

    const validation = deleteEventSchema.safeParse({ eventId });
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete event",
      };

    console.log(`${BASE_URL}/api/events/${validation.data?.eventId}`);

    await axios.delete(`${BASE_URL}/api/events/${validation.data?.eventId}`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return { status: 200, message: "event deleted successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to delete event",
    };
  }
}
// Create Organizer
export type TCreateOrganizerState = {
  status?: number;
  message?: string;
  errors?: {
    name?: string[];
    contact?: string[];
    website?: string[];
  };
};
export async function createOrganizer(organizer: unknown) {
  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await verifyToken(userToken);
    const userId = user ? user?.id : undefined;

    if (!userId)
      return {
        status: 400,
        message: "User Id Not Found",
      };

    const validation = createOrganizerSchema.safeParse(organizer);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new organizer",
      };

    await axios.post(`${BASE_URL}/api/organizers`, validation.data, {
      headers: { cookie: `jwtToken=${userToken}` },
    });

    revalidatePath(`/organizers`);
    revalidatePath(`dashboard/events`);
    revalidatePath(`dashboard/organizers`);
    return { status: 200, message: "Organizer created successfully" };
  } catch (err) {
    return {
      status: 400,
      message: isAxiosError(err)
        ? err.response?.data?.message || err.response?.data || err.message
        : "Failed to create organizer",
    };
  }
}
// ----------------------- Settings ------------------------
// Update Settings
export type TUpdateSettingsState = {
  status?: number;
  message?: string;
  errors?: {
    usersPerPage?: string[];
    eventsPerPage?: string[];
    articlesPerPage?: string[];
    commentsPerPage?: string[];
    postLengthLimit?: string[];
    eventLengthLimit?: string[];
  };
};
export async function updateSettings(setting: unknown) {
  try {
    const userToken = cookies().get("jwtToken")?.value || "";
    const user = await verifyToken(userToken);
    if (!user?.id)
      return {
        status: 400,
        message: "User Id Not Found",
      };

    const validation = updateSettingsSchema.safeParse(setting);
    if (!validation.success)
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to update Settings",
      };

    await axios.put(`${BASE_URL}/api/settings`, validation.data, {
      headers: { cookie: `jwtToken=${userToken}` },
    });

    return { status: 200, message: "Settings updated successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to update Settings",
    };
  }
}
