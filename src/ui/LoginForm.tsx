"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import Button from "./Button";
import FormRow from "./FormRow";
import Spinner from "./Spinner";

import { loginSchema } from "@/lib/validations";
import { login, TLoginState } from "@/lib/actions";

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
          <span>Logging User in...</span>
        </>
      ) : (
        "Log in"
      )}
    </Button>
  );
}

export default function LoginForm() {
  const router = useRouter();

  async function clientAction(
    prev: TLoginState | undefined,
    formData: FormData
  ) {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(user);
    if (!result.success) {
      toast.error("Missing Fields. Failed to create new user");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to create new user",
      };
    }

    const res = await login(result.data);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        router.replace("/");
      }
    }

    return;
  }

  const initialState: TLoginState | undefined = {};
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <FormRow label="Email" errors={state?.errors?.email}>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          value="user@test.com"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
        />
      </FormRow>

      <FormRow
        label="Password"
        forgetPassword={true}
        errors={state?.errors?.password}
      >
        <input
          id="password"
          type="password"
          name="password"
          value="123456"
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

// import { login } from "@/services/authAPI";

// export default function LoginForm() {
//   const router = useRouter();

//   const [password, setPassword] = useState("123456");
//   const [email, setEmail] = useState("user@test.com");

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     await login({ email, password });
//     router.replace("/");
//   }

//   return (
//     <form onSubmit={handleLogin} className="space-y-6">
//       <FormRow label="Email" error={""}>
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

//       <FormRow label="Password" error={""} forgetPassword={true}>
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

//       <Button type="submit" className="w-full">
//         Sign in
//       </Button>
//     </form>
//   );
// }

// {
//   /* <form action="#" method="POST" className="space-y-6">
//   <div>
//     <label
//       htmlFor="email"
//       className="block text-sm font-medium leading-6 text-gray-900"
//     >
//       Email address
//     </label>
//     <div className="mt-2">
//       <input
//         id="email"
//         name="email"
//         type="email"
//         required
//         autoComplete="email"
//         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//       />
//     </div>
//   </div>
//   <div>
//     <div className="flex items-center justify-between">
//       <label
//         htmlFor="password"
//         className="block text-sm font-medium leading-6 text-gray-900"
//       >
//         Password
//       </label>
//       <div className="text-sm">
//         <Link
//           href="/reset-password"
//           className="font-semibold text-main-600 hover:text-main-500 hover:underline"
//         >
//           Forgot password?
//         </Link>
//       </div>
//     </div>
//     <div className="mt-2">
//       <input
//         id="password"
//         name="password"
//         type="password"
//         required
//         autoComplete="current-password"
//         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
//       />
//     </div>
//   </div>

//   <div>
//     <button
//       type="submit"
//       className="flex w-full justify-center rounded-md bg-main-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-main-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
//     >
//       Sign in
//     </button>
//   </div>
// </form>; */
// }
