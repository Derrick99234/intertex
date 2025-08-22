import type { Metadata } from "next";
import "../globals.css";
import LayoutWrapper from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "Admin | Intertex",
  icons: "/logo/logo.png",
  description: "Admin dashboard",
};
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
