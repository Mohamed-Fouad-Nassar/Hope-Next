import { Suspense } from "react";

import Spinner from "@/ui/Spinner";
import Logo from "@/ui/layout/Logo";
import ChangePasswordFeedback from "@/ui/ChangePasswordFeedback";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Your Password",
};

export default function Page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Change Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner size="!size-5" />
            </div>
          }
        >
          <ChangePasswordFeedback token={searchParams.token} />
        </Suspense>
      </div>
    </div>
  );
}
