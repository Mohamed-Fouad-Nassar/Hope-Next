import HeroSection from "@/ui/HeroSection";
import BlogSection from "@/ui/blog/BlogSection";
import ContactSection from "@/ui/ContactSection";
import ServicesSection from "@/ui/ServicesSection";
import EventsSection from "@/ui/events/EventsSection";
import SubscriptionSection from "@/ui/SubscriptionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BlogSection />
      <EventsSection />
      <SubscriptionSection />
      <ContactSection />
    </>
  );
}
