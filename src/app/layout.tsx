import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { SettingsProvider } from "@/contexts/SettingsContext";

import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s | Hope", default: "Hope" },
  description:
    "Hope, is a medical app designed to support cancer patients by providing vital information on doctors, hospitals, healing centers, medicines, and nearby pharmacies. The app also features a blog to raise awareness, offering guidance on living with cancer and managing treatments. Through reliable resources and a supportive community, Hope empowers patients and improves their quality of life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // selection:bg-main-200 selection:text-main-900

  return (
    <html lang="en">
      <body className="antialiased">
        <SkeletonTheme baseColor="#e7e7e7" highlightColor="#d4d4d4">
          <SettingsProvider>{children}</SettingsProvider>
          {/* {children} */}
        </SkeletonTheme>

        <Toaster
          position="top-center"
          containerStyle={{
            textTransform: "capitalize",
          }}
        />
      </body>
    </html>
  );
}
