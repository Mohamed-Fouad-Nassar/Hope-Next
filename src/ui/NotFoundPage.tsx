"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

type TNotFoundProps = {
  title?: string;
  message?: string;
};

export default function NotFoundPage({
  title = "Page Not Found",
  message = " Sorry, we couldn’t find the page you’re looking for.",
}: TNotFoundProps) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <main className="w-full min-h-[calc(100dvh-76px)] grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-main-600">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          {message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button onClick={handleGoBack} variation="secondary">
            Go Back
          </Button>
          <Button as="Link" href="/">
            Go to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
