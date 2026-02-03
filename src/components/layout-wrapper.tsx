"use client";
import AdminHeader from "@/components/admin/header/admin-header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/aside/aside";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const excludedRoutes = ["/admin"];
  const shouldRenderLayout = !excludedRoutes.includes(pathname);

  const shouldRenderSidebar =
    shouldRenderLayout && !pathname.startsWith("/admin/reset-password");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {shouldRenderLayout ? (
          <>
            <AdminHeader
              onToggleSidebar={
                shouldRenderSidebar
                  ? () => setIsSidebarOpen((prev) => !prev)
                  : undefined
              }
            />
            {shouldRenderSidebar && (
              <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            )}
            <main
              className={`pt-20 ${shouldRenderSidebar ? "pl-0 md:pl-64" : ""}`}
            >
              <div className="px-4 sm:px-6">{children}</div>
            </main>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
