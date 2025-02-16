import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container px-4">
        <div className="pt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ContactInfo />
          <div>
            <h3 className="text-pretty text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl mb-5">
              Leave a message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
