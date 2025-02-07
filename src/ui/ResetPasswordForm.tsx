import Link from "next/link";

export default function ResetPasswordForm() {
  return (
    <form action="#" className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3">
        <Link
          href="/login"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-main-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-main-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-600"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
