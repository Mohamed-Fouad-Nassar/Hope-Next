import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function SubscriptionSection() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container px-4">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-semibold tracking-tight">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg">
              Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
              velit quis. Duis tempor incididunt dolore.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                required
                name="email"
                type="email"
                id="email-address"
                autoComplete="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="flex-none rounded-md text-white bg-main-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-main-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-700"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md p-2 ring-1 ring-white/10">
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6" />
              </div>
              <dt className="mt-4 font-semibold">Weekly articles</dt>
              <dd className="mt-2 leading-7">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure
                cupidatat duis commodo amet.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md p-2 ring-1 ring-white/10">
                <HandRaisedIcon aria-hidden="true" className="h-6 w-6" />
              </div>
              <dt className="mt-4 font-semibold">No spam</dt>
              <dd className="mt-2 leading-7">
                Officia excepteur ullamco ut sint duis proident non adipisicing.
                Voluptate incididunt anim.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div> */}
    </div>
  );
}
