import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-333px)] mt-[77px]">{children}</main>
      <Footer />
    </>
  );
}
