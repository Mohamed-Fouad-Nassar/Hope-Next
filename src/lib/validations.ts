import { z } from "zod";
import { convert } from "html-to-text";

import { EVENT_LIMIT, POST_LIMIT } from "./constants";

const today = new Date();
today.setHours(0, 0, 0, 0);

// ------------------- Author Schema -------------------
export const userSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be 50 characters or less"),
});

// ------------------- Settings Schema -------------------
export const settingsSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  eventsPerPage: z.number().min(1).default(9),
  usersPerPage: z.number().min(1).default(10),
  articlesPerPage: z.number().min(1).default(9),
  commentsPerPage: z.number().min(1).default(12),
  postLengthLimit: z.number().min(1).default(3000),
  eventLengthLimit: z.number().min(1).default(1500),
});
export const updateSettingsSchema = settingsSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ------------------- Post Schema -------------------
// -------------- Post Schema --------------
// export const postSchema = z.object({
//   id: z.number(),
//   image: z.string(),
//   userId: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
//   title: z
//     .string({
//       required_error: "Title is required",
//       invalid_type_error: "Title must be a string",
//     })
//     .min(5, "Title must be at least 5 characters long")
//     .max(255, "Title must be 255 characters or less"),
//   description: z
//     .string()
//     .min(100, "Description must be at least 100 characters long")
//     .max(5000, "Description must be 5000 characters or less"),
// });
// export enum PostStatus {
//   DRAFT = "DRAFT",
//   HIDDEN = "HIDDEN",
//   PUBLISHED = "PUBLISHED",
// }
export const postSchema = z.object({
  id: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(["DRAFT", "HIDDEN", "PUBLISHED"]),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image must be a string",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(5, "Title must be at least 5 characters long")
    .max(255, "Title must be 255 characters or less"),
  description: z
    .string()
    .refine(
      (value) => convert(value).trim().length >= 100,
      "The text must be at least 100 characters long after trimming"
    )
    .refine(
      (value) => convert(value).trim().length < POST_LIMIT,
      `The text must be less than ${POST_LIMIT} characters long after trimming`
    ),
});
export const createPostSchema = postSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
export const updatePostSchema = postSchema
  .omit({
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .extend({
    id: z.number(),
  });
export const likeSavePostSchema = z.object({
  postId: z.number({ message: "Post id must be number" }),
});
export const deletePostSchema = z.object({
  postId: z.number({ message: "Post id must be number" }),
});
// -------------- Comment Schema --------------
export const commentSchema = z.object({
  id: z.number(),
  postId: z.number({ message: "Post id must be number" }),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z
    .string()
    .min(5, "Content must be at least 5 characters long")
    .max(500, "Content must be 500 characters or less"),
  userId: z.string({ message: "User id must be string" }),
});
export const createCommentSchema = commentSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
export const updateCommentSchema = commentSchema.omit({
  id: true,
  userId: true,
  postId: true,
  createdAt: true,
  updatedAt: true,
});
export const deleteCommentSchema = commentSchema.omit({
  userId: true,
  content: true,
  createdAt: true,
  updatedAt: true,
});

// ------------------- Auth Schema -------------------
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(16, "Password must be at least 16 characters long"),
    // password: z
    //   .string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/\d/, "Password must contain at least one digit")
    //   .regex(
    //     /[@$!%*?&]/,
    //     "Password must contain at least one special character"
    //   ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });
export const authSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isAdmin: z.boolean(),
  image: z.string().url("Image is Required"),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(2, "Username must be at least 2 characters long")
    .max(100, "Username must be 100 characters or less"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email()
    .min(3, "Email must be at least 3 characters long")
    .max(100, "Email must be 100 characters or less"),
  // password: z
  //   .string()
  //   .min(8, "Password must be at least 8 characters long")
  //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .regex(/\d/, "Password must contain at least one digit")
  //   .regex(
  //     /[@$!%*?&]/,
  //     "Password must contain at least one special character"
  //   ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must be at least 16 characters long"),
});
export const registerSchema = authSchema.omit({
  id: true,
  image: true,
  createdAt: true,
  updatedAt: true,
});
export const loginSchema = authSchema.omit({
  id: true,
  image: true,
  isAdmin: true,
  username: true,
  createdAt: true,
  updatedAt: true,
});
export const updateProfileSchema = authSchema
  .omit({
    id: true,
    email: true,
    isAdmin: true,
    password: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();
export const updatePasswordSchema = authSchema
  .omit({
    id: true,
    email: true,
    image: true,
    isAdmin: true,
    username: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });

// ------------------- Event Schema -------------------
// Event
export const eventSchema = z.object({
  id: z.number(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(5, "Title must be at least 5 characters long")
    .max(255, "Title must be 255 characters or less"),
  description: z
    .string()
    .refine(
      (value) => convert(value).trim().length >= 100,
      "The text must be at least 100 characters long after trimming"
    )
    .refine(
      (value) => convert(value).trim().length < EVENT_LIMIT,
      `The text must be less than ${EVENT_LIMIT} characters long after trimming`
    ),
  locationType: z.enum(["ONLINE", "ONSITE", "HYBRID"]),
  status: z.enum(["UP_COMING", "FINISHED", "CANCELLED"]).default("UP_COMING"),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date",
    })
    .refine((val) => new Date(val) > today, {
      message: "Start date must be greater than today",
    }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end date",
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  venue: z.string().nullable().default(null),
  address: z.string().nullable().default(null),
  mapLink: z
    .string()
    .url({ message: "Invalid URL for map link" })
    .nullable()
    .default(null),
  onlineLink: z
    .string()
    .url({ message: "Invalid URL for online link" })
    .nullable()
    .default(null),
  bannerImage: z.string().url({ message: "Invalid URL for banner image" }),
  gallery: z
    .array(z.string().url({ message: "Invalid URL in gallery" }))
    .default([]),
  resources: z
    .array(z.string().url({ message: "Invalid URL in resources" }))
    .default([]),
  userId: z.string(),
  organizerId: z.string(),
});
export const createEventSchema = eventSchema
  .omit({
    id: true,
    status: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    path: ["endDate"],
    message: "End date must be later than start date",
  });
export const updateEventSchema = eventSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    organizerId: true,
  })
  .partial();
export const deleteEventSchema = z.object({
  eventId: z.number({ message: "Event id must be number" }),
});
// Organizers
export const organizerSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(255, "Name must be 255 characters or less"),
  contact: z
    .string()
    .min(2, "Contact must be at least 2 characters long")
    .max(255, "Contact must be 255 characters or less"),
  website: z
    .string()
    // .max(255, "Website must be 255 characters or less")
    .url({ message: "Invalid URL for website" })
    .nullable()
    .default(null),
});
export const createOrganizerSchema = organizerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
