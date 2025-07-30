"use client";
import AdminHeader from "@/components/admin/header/admin-header";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const excludedRoutes = ["/admin"];
  const shouldRenderLayout = !excludedRoutes.includes(pathname);
  return (
    <html lang="en">
      <body>
        {shouldRenderLayout ? (
          <>
            <AdminHeader />
            <main>{children}</main>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
