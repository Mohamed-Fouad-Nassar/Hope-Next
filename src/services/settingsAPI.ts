// import axios from "axios";
import { notFound } from "next/navigation";

// import { updateSettingsSchema } from "@/lib/validations";

export async function getSettings() {
  const res = await fetch(`${process.env.BASE_API_URL}/settings`, {
    cache: "no-cache",
  });

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error(`Failed to fetch settings`);
  return res.json();
}

// export async function updateSettings(setting: unknown) {
//   try {
//     const validation = updateSettingsSchema.safeParse(setting);
//     if (!validation.success)
//       return {
//         status: 400,
//         errors: validation.error.flatten().fieldErrors,
//         message: "Missing Fields. Failed to update Settings",
//       };

//     await axios.put(`/api/settings`, validation.data);

//     return { status: 200, message: "Settings updated successfully" };
//   } catch (err) {
//     console.log(err);
//     return {
//       status: 400,
//       message: "Failed to update Settings",
//     };
//   }
// }
