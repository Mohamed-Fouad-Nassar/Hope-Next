// import { BASE_URL } from "@/lib/constants";

// export async function sendWelcomeEmail(email: unknown) {
//   const res = await fetch(`${BASE_URL}/api/send/welcome`, {
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });

//   console.log(res);
//   if (!res.ok) throw new Error(`Failed to send welcome email`);

//   const data = await res.json();
//   console.log(data);

//   return data;
//   return res.json();
// }

// export async function sendVerifyAccountEmail(email: unknown) {
//   const res = await fetch(`${BASE_URL}/api/send/verify-account`, {
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });

//   console.log(res);
//   if (!res.ok) throw new Error(`Failed to send verify account email`);

//   const data = await res.json();
//   console.log(data);

//   return data;
//   return res.json();
// }

// export async function sendContactEmail(emailContent: unknown) {
//   const res = await fetch(`${BASE_URL}/api/send/contact`, {
//     method: "POST",
//     body: JSON.stringify(emailContent),
//   });

//   console.log(res);
//   if (!res.ok) throw new Error(`Failed to send contact email`);

//   const data = await res.json();
//   console.log(data);

//   return data;
//   return res.json();
// }

// export async function sendResetPasswordEmail(email: unknown) {
//   const res = await fetch(`${BASE_URL}/api/send/reset-password`, {
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });

//   console.log(res);
//   if (!res.ok) throw new Error(`Failed to send reset password email`);

//   const data = await res.json();
//   console.log(data);

//   return data;
//   return res.json();
// }

// export async function sendChangePasswordEmail(email: unknown) {
//   const res = await fetch(`${BASE_URL}/api/send/change-password`, {
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });

//   console.log(res);
//   if (!res.ok) throw new Error(`Failed to send change password email`);

//   const data = await res.json();
//   console.log(data);

//   return data;
//   return res.json();
// }
