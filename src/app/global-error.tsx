"use client";
import { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Error | Hope",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: { message: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-950 text-primary-100 min-h-screen relative">
        <main className="flex justify-center items-center flex-col gap-6">
          <h1 className="text-3xl font-semibold">Something went wrong!</h1>
          <p className="text-lg">{error.message}</p>

          <button
            onClick={reset}
            className="bg-accent-500 text-primary-800 px-6 py-3 text-lg"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
