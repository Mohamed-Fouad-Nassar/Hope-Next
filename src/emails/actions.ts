"use server";

import { BASE_URL } from "@/lib/constants";
import { emailSchema, contactEmailSchema } from "./validations";

export type TEmailFormState = {
  status?: number;
  message?: string;
  errors?: {
    email?: string[];
  };
};

// export async function sendVerifyAccountEmail(email: unknown) {
//   try {
//     const validation = emailSchema.safeParse({ email });
//     if (!validation.success) {
//       return {
//         status: 400,
//         errors: validation.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to send verify account email",
//       };
//     }

//     const res = await fetch(`${BASE_URL}/api/send/verify-account`, {
//       method: "POST",
//       body: JSON.stringify({ email }),
//     });
//     if (!res.ok) throw new Error(`Failed to send verify account email`);

//     return { status: 200, message: "Verify account email sent successfully" };
//   } catch (err) {
//     console.log(err);
//     return {
//       status: 400,
//       message: "Failed to send verify account email",
//     };
//   }
// }

// export async function sendWelcomeEmail(email: unknown) {
//   try {
//     const validation = emailSchema.safeParse({ email });
//     if (!validation.success) {
//       return {
//         status: 400,
//         errors: validation.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to send welcome email",
//       };
//     }

//     const res = await fetch(`${BASE_URL}/api/send/welcome`, {
//       method: "POST",
//       body: JSON.stringify({ email }),
//     });
//     if (!res.ok) throw new Error(`Failed to send welcome email`);

//     return { status: 200, message: "Welcome email sent successfully" };
//   } catch (err) {
//     console.log(err);
//     return {
//       status: 400,
//       message: "Failed to send welcome email",
//     };
//   }
// }

// Contact Email
export type TContactFormState = {
  status?: number;
  message?: string;
  errors?: {
    from_name?: string[];
    from_email?: string[];
    subject?: string[];
    message?: string[];
  };
};
export async function sendContactEmail(data: unknown) {
  try {
    const validation = contactEmailSchema.safeParse(data);
    if (!validation.success) {
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to send contact email",
      };
    }

    const res = await fetch(`${BASE_URL}/api/send/contact`, {
      method: "POST",
      body: JSON.stringify({ data: validation.data }),
    });
    if (!res.ok) throw new Error(`Failed to send contact email`);

    return { status: 200, message: "Contact email sent successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to send contact email",
    };
  }
}

// Reset Password Email
export type TResetPasswordFormState = {
  status?: number;
  message?: string;
  errors?: {
    email?: string[];
  };
};
export async function sendResetPasswordEmail(email: unknown) {
  try {
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      return {
        status: 400,
        errors: validation.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to send reset password email",
      };
    }

    const res = await fetch(`${BASE_URL}/api/send/reset-password`, {
      method: "POST",
      body: JSON.stringify({ email: validation.data.email }),
    });
    if (!res.ok) throw new Error(`Failed to send reset password email`);

    return { status: 200, message: "Reset password email sent successfully" };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: "Failed to send reset password email",
    };
  }
}
