import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        Contact us
      </h2>
      <p className="text-lg leading-8 text-gray-600">
        Learn how to grow your business with our expert advice.
      </p>

      <h3 className="text-pretty text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
        Contact Info
      </h3>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-3">
          <span className="bg-slate-100 w-10 h-10 flex justify-center items-center rounded-full">
            <MapPinIcon className="h-6 w-6 text-gray-500" />
          </span>
          <p>our address</p>
        </li>

        <li className="flex items-center gap-3">
          <span className="bg-slate-100 w-10 h-10 flex justify-center items-center rounded-full">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
          </span>
          <p>our email</p>
        </li>

        <li className="flex items-center gap-3">
          <span className="bg-slate-100 w-10 h-10 flex justify-center items-center rounded-full">
            <PhoneIcon className="h-6 w-6 text-gray-500" />
          </span>
          <p>our phone number</p>
        </li>
      </ul>

      <h3 className="pt-5 text-pretty text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
        Social Media Links
      </h3>
      <ul className="flex items-center gap-3">
        <li>
          <a
            href="#"
            className="w-10 h-10 flex justify-center items-center rounded bg-main-600/30 hover:bg-main-600 text-main-700 hover:text-white"
          >
            <MapPinIcon className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="w-10 h-10 flex justify-center items-center rounded bg-main-600/30 hover:bg-main-600 text-main-700 hover:text-white"
          >
            <MapPinIcon className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="w-10 h-10 flex justify-center items-center rounded bg-main-600/30 hover:bg-main-600 text-main-700 hover:text-white"
          >
            <MapPinIcon className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="w-10 h-10 flex justify-center items-center rounded bg-main-600/30 hover:bg-main-600 text-main-700 hover:text-white"
          >
            <MapPinIcon className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="w-10 h-10 flex justify-center items-center rounded bg-main-600/30 hover:bg-main-600 text-main-700 hover:text-white"
          >
            <MapPinIcon className="h-6 w-6" />
          </a>
        </li>
      </ul>
    </div>
  );
}
