import Link from "next/link";

import Logo from "@/ui/layout/Logo";
import LoginForm from "@/ui/LoginForm";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Log in",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-main-600 hover:text-main-500 hover:underline"
          >
            Register For Free
          </Link>
        </p>
      </div>
    </div>
  );
}
