"use client";

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("contact form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <input
          id="name"
          type="text"
          aria-describedby="helper-text-explanation"
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          aria-describedby="helper-text-explanation"
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={6}
          className="w-full rounded-md border-0 px-3.5 py-2 bg-gray-100 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-main-700 sm:text-sm sm:leading-6"
          placeholder="Leave a Message..."
          defaultValue={""}
        />
      </div>

      <button
        type="submit"
        className="w-fit block ml-auto rounded-md text-white bg-main-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-main-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-700"
      >
        Send Message
      </button>
    </form>
  );
}
