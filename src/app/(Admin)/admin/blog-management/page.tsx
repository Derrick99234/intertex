"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import { useRouter } from "next/navigation";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";

function BlogManagement() {
  const blogs = [
    {
      checkbox: true,
      no: "01",
      initiatorId: "INT0098",
      topic: "Interex won Africa Fashion of the Year...",
      datePosted: "12-12-2024",
      edit: <MdEdit className="text-secondary" />,
      action: <MdDelete className="text-red-500" />,
      more: <IoEyeOutline />,
    },
  ];

  const router = useRouter();

  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        <DisplayStats />
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "initiatorId", label: "Initiator ID" },
            { key: "topic", label: "Topic" },
            { key: "datePosted", label: "Date Posted" },
            { key: "edit", label: "Edit", type: "action" },
            { key: "action", label: "Action", type: "action" },
            { key: "more", label: "More", type: "action" },
          ]}
          data={blogs}
          title="New Blog"
          itemsPerPage={5}
          onAction={(id: string) => {
            console.log("Action on order ID:", id);
          }}
          searchPlaceholder="Search by date, email..."
          showViewAll={true}
          //   navigations={[
          //     {
          //       name: "All Orders",
          //       href: "all-order",
          //     },
          //     {
          //       name: "Pending Orders",
          //       href: "pending-orders",
          //     },
          //     {
          //       name: "Successful orders",
          //       href: "succesful-orders",
          //     },
          //     {
          //       name: "Failed orders",
          //       href: "failed-orders",
          //     },
          //   ]}
          onViewAll={() => router.push("/admin/blog-management/create")}
        />
      </div>
    </section>
  );
}

export default BlogManagement;
