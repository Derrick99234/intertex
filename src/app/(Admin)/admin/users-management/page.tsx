"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function UserManagement() {
  const users = [
    {
      userId: "01000SA",
      fullName: "Adeyanju Gabriel",
      email: "adeyanju.celestial@gmail.com",
      dateJoined: "03-03-2025",
      totalOrders: 10,
      more: <IoEyeOutline />,
    },
    {
      userId: "01001AB",
      fullName: "Fatima Yusuf",
      email: "fatima.y@gmail.com",
      dateJoined: "12-01-2025",
      totalOrders: 5,
      more: <IoEyeOutline />,
    },
    {
      userId: "01002CD",
      fullName: "Chinedu Okafor",
      email: "okafor.chi@gmail.com",
      dateJoined: "25-12-2024",
      totalOrders: 13,
      more: <IoEyeOutline />,
    },
    {
      userId: "01003EF",
      fullName: "Blessing Johnson",
      email: "blessing.j@gmail.com",
      dateJoined: "08-04-2025",
      totalOrders: 2,
      more: <IoEyeOutline />,
    },
    {
      userId: "01004GH",
      fullName: "Tunde Salami",
      email: "tunde.salami@yahoo.com",
      dateJoined: "30-01-2025",
      totalOrders: 7,
      more: <IoEyeOutline />,
    },
    {
      userId: "01005IJ",
      fullName: "Linda Okeke",
      email: "linda.okeke@gmail.com",
      dateJoined: "14-02-2025",
      totalOrders: 11,
      more: <IoEyeOutline />,
    },
    {
      userId: "01006KL",
      fullName: "Michael Adewole",
      email: "mike.adewole@outlook.com",
      dateJoined: "22-03-2025",
      totalOrders: 4,
      more: <IoEyeOutline />,
    },
    {
      userId: "01007MN",
      fullName: "Jennifer Musa",
      email: "jennymusa@gmail.com",
      dateJoined: "10-06-2025",
      totalOrders: 9,
      more: <IoEyeOutline />,
    },
    {
      userId: "01008OP",
      fullName: "David Emmanuel",
      email: "david.emma@gmail.com",
      dateJoined: "17-05-2025",
      totalOrders: 6,
      more: <IoEyeOutline />,
    },
    {
      userId: "01009QR",
      fullName: "Zainab Lawal",
      email: "zlawal@mail.com",
      dateJoined: "01-01-2025",
      totalOrders: 12,
      more: <IoEyeOutline />,
    },
  ];
  return (
    <section className="flex mt-20">
      <AdminSidebar />

      <div className="p-5 flex-1 ml-64">
        <DisplayStats />

        {/* Recent Users Section */}
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "userId", label: "User ID" },
            { key: "fullName", label: "Full Name" },
            { key: "email", label: "Email", type: "email" as const },
            { key: "dateJoined", label: "Date Joined" },
            { key: "totalOrders", label: "Total Orders" },
            { key: "more", label: "More", type: "action" },
          ]}
          data={users}
          title="Recent Users"
          itemsPerPage={5}
          onAction={() => console.log("Click on action button")}
          searchPlaceholder="Search by date, email..."
          showViewAll={true}
          navigations={[
            {
              name: "All Users",
              href: "all-users",
            },
            {
              name: "Top Users",
              href: "top-users",
            },
            // {
            //   name: "Inactive Users",
            //   href: "inactive-users",
            // },
            {
              name: "Deactivated Users",
              href: "deactivated-users",
            },
          ]}
          // onViewAll={() => console.log("View all users")}
        />
      </div>
    </section>
  );
}

export default UserManagement;
