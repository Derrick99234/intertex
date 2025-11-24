import AdminSidebar from "@/components/admin/aside/aside";
import AdminManagementPageProp from "@/components/admin/manage-category/manage-category";
import React from "react";

function AdminManagementPage() {
  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        <AdminManagementPageProp />
      </div>
    </section>
  );
}

export default AdminManagementPage;
