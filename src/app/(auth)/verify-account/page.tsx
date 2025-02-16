import { Suspense } from "react";

import Spinner from "@/ui/Spinner";
import Logo from "@/ui/layout/Logo";
import VerifyAccountFeedback from "@/ui/VerifyAccountFeedback";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Verify Your Account",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verify your email, to complete your registration
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <VerifyAccountFeedback code={searchParams.code} />
        </Suspense>
      </div>
    </div>
  );
}
