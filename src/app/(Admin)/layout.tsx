import type { Metadata } from "next";
import "../globals.css";
import AdminHeader from "@/components/admin/header/admin-header";

export const metadata: Metadata = {
  title: "Admin | Intertex",
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
        <AdminHeader />
        {children}
      </body>
    </html>
  );
}
