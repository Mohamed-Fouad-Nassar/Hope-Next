import Logo from "@/ui/layout/Logo";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Check Your Email",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Success, Check your email
        </h2>
      </div>
      <p className="max-w-2xl mx-auto mt-3 text-center text-gray-600">
        To complete changing your password, please check your email and hit the
        link in this email, and change your password
      </p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
    </div>
  );
}
