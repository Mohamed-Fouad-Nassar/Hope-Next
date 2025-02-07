import Footer from "@/ui/layout/Footer";
import Header from "@/ui/layout/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="relative min-h-[calc(100dvh-77px)] mt-[77px] flex justify-between items-stretch gap-2 lg:p-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
