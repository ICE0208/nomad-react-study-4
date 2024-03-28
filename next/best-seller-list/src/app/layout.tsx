import type { Metadata } from "next";
import "@/styles/globals.scss";
import { APP_TITLE } from "./constants";

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
      <body>{children}</body>
    </html>
  );
}
