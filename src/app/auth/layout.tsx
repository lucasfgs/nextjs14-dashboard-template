import type { Metadata } from "next";
import { Amplify } from "aws-amplify";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-2xl mx-auto py-16">{children}</main>
      </body>
    </html>
  );
}
