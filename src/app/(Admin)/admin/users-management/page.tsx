"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";

function UserManagement() {
  const users = [
    {
      userId: "01000SA",
      fullName: "Adeyanju Gabriel",
      email: "adeyanju.celestial@gmail.com",
      dateJoined: "03-03-2025",
      totalOrders: 10,
    },
    {
      userId: "01001AB",
      fullName: "Fatima Yusuf",
      email: "fatima.y@gmail.com",
      dateJoined: "12-01-2025",
      totalOrders: 5,
    },
    {
      userId: "01002CD",
      fullName: "Chinedu Okafor",
      email: "okafor.chi@gmail.com",
      dateJoined: "25-12-2024",
      totalOrders: 13,
    },
    {
      userId: "01003EF",
      fullName: "Blessing Johnson",
      email: "blessing.j@gmail.com",
      dateJoined: "08-04-2025",
      totalOrders: 2,
    },
    {
      userId: "01004GH",
      fullName: "Tunde Salami",
      email: "tunde.salami@yahoo.com",
      dateJoined: "30-01-2025",
      totalOrders: 7,
    },
    {
      userId: "01005IJ",
      fullName: "Linda Okeke",
      email: "linda.okeke@gmail.com",
      dateJoined: "14-02-2025",
      totalOrders: 11,
    },
    {
      userId: "01006KL",
      fullName: "Michael Adewole",
      email: "mike.adewole@outlook.com",
      dateJoined: "22-03-2025",
      totalOrders: 4,
    },
    {
      userId: "01007MN",
      fullName: "Jennifer Musa",
      email: "jennymusa@gmail.com",
      dateJoined: "10-06-2025",
      totalOrders: 9,
    },
    {
      userId: "01008OP",
      fullName: "David Emmanuel",
      email: "david.emma@gmail.com",
      dateJoined: "17-05-2025",
      totalOrders: 6,
    },
    {
      userId: "01009QR",
      fullName: "Zainab Lawal",
      email: "zlawal@mail.com",
      dateJoined: "01-01-2025",
      totalOrders: 12,
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
          ]}
          data={users}
          title="Recent Users"
          itemsPerPage={5}
          searchPlaceholder="Search by date, email..."
          showViewAll={true}
          navigations={[
            {
              name: "All Users",
              href: "/admin/users-management",
            },
            {
              name: "Top-users",
              href: "/admin/products",
            },
            {
              name: "Inactive users",
              href: "/admin/products",
            },
            {
              name: "Decativated users",
              href: "/admin/products",
            },
          ]}
          // onViewAll={() => console.log("View all users")}
        />
      </div>
    </section>
  );
}

export default UserManagement;
