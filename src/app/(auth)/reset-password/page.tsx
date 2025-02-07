import Logo from "@/ui/layout/Logo";
import ResetPasswordForm from "@/ui/ResetPasswordForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
