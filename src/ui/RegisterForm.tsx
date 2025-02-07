"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import Spinner from "./Spinner";
import FormRow from "./FormRow";

import { registerSchema } from "@/lib/validations";
import { register, TRegisterState } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 text-sm"
    >
      {pending ? (
        <>
          <Spinner size="!size-4" />
          <span>Creating User...</span>
        </>
      ) : (
        "Register"
      )}
    </Button>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  async function clientAction(
    prev: TRegisterState | undefined,
    formData: FormData
  ) {
    const newUser = {
      isAdmin: false,
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
    };

    const result = registerSchema.safeParse(newUser);
    if (!result.success) {
      toast.error("Missing Fields. Failed to create new user");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    const res = await register(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/login");
      }
    }
    return;
  }

  const initialState: TRegisterState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <FormRow label="Full Name" errors={state?.errors?.username}>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>
      <FormRow label="Email address" errors={state?.errors?.email}>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>
      <FormRow label="Password" errors={state?.errors?.password}>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>
      <FormRow label="Confirm Password" errors={state?.errors?.password}>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="current-password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <SubmitButton />
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import Button from "./Button";
// import FormRow from "./FormRow";

// import { register } from "@/services/authAPI";

// export default function RegisterForm() {
//   const router = useRouter();

//   const [password, setPassword] = useState("123456");
//   const [email, setEmail] = useState("user@test.com");
//   const [username, setUsername] = useState("user from ui");
//   const [confirmPassword, setConfirmPassword] = useState("123456");

//   async function handleRegister(e: React.FormEvent) {
//     e.preventDefault();

//     const req = await register({
//       email,
//       password,
//       username,
//       isAdmin: false,
//     });

//     if (req?.status === 201) router.replace("/login");
//   }

//   return (
//     <form onSubmit={handleRegister} className="space-y-6">
//       <FormRow label="Full Name" error={""}>
//         <input
//           required
//           type="text"
//           id="username"
//           value={username}
//           autoComplete="username"
//           onChange={(e) => setUsername(e.target.value)}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//         />
//       </FormRow>
//       <FormRow label="Email address" error={""}>
//         <input
//           required
//           id="email"
//           type="email"
//           value={email}
//           autoComplete="email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//         />
//       </FormRow>
//       <FormRow label="Password" error={""}>
//         <input
//           required
//           id="password"
//           type="password"
//           value={password}
//           autoComplete="current-password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//         />
//       </FormRow>
//       <FormRow label="Confirm Password" error={""}>
//         <input
//           required
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           autoComplete="current-password"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//         />
//       </FormRow>

//       <Button type="submit" className="w-full">
//         Register
//       </Button>
//     </form>
//   );
// }
