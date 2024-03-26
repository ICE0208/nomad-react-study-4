import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Loading...",
  },
  description: "This is my app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ul>
          <li>
            <h2>
              <Link href={"/"}>Home</Link>
            </h2>
          </li>
          <li>
            <h2>
              <Link href={"/about-us"}>AboutUs</Link>
            </h2>
          </li>
        </ul>
        {children}
      </body>
    </html>
  );
}
