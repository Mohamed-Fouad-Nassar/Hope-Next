import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container px-4">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Contact us
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        <div className="pt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
