import type { Metadata } from "next";
import "@/styles/globals.scss";
import { APP_TITLE } from "./constants";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_TITLE}`,
    default: "Loading | Best Seller",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
