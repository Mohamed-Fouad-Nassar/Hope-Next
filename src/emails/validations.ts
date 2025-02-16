import { z } from "zod";

export const contactEmailSchema = z.object({
  from_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name must be at most 25 characters"),
  from_email: z.string().email("Email is not valid format"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be at most 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export const emailSchema = z.object({
  email: z.string().email("Email is not valid format"),
});
