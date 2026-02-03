"use client";
import DisplayDetails from "@/components/admin/display-details";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
// import DisplayDetails from "../display-details";
const users = [
  {
    no: 1,
    userId: "01000SA",
    fullName: "Adeyanju Gabriel",
    email: "adeyanju.celestial@gmail.com",
    quantity: 20,
    amount: "$5500",
    deliveryMethod: "Delivery",
    date: "03-03-2025",
    review: <IoEyeOutline />,
  },
];
const data = [
  {
    label: "Product ID",
    value: "ABC10001",
  },
  {
    label: "Product Name",
    value: "Product T-Shirt Classic",
  },
  {
    label: "Date Created",
    value: "02-02-2025",
  },
];
export default function BuyerDetails() {
  return (
    <section className="py-5">
      <div className="space-y-6 p-4 sm:p-6 w-full max-w-lg">
        <DisplayDetails data={data} />
      </div>

      <DynamicTable
        columns={[
          { key: "checkbox", label: "", type: "checkbox" as const },
          { key: "no", label: "NO" },
          { key: "userId", label: "User ID" },
          { key: "fullName", label: "Full Name" },
          { key: "email", label: "User Email", type: "email" as const },
          { key: "quantity", label: "Quantity" },
          { key: "amount", label: "Amount" },
          { key: "deliveryMethod", label: "Delivery Method" },
          { key: "date", label: "Date" },
          { key: "review", label: "Review", type: "action" },
        ]}
        data={users}
        title="Buyers"
        itemsPerPage={5}
        searchPlaceholder="Search by date, email..."
        onAction={() => console.log("Click on action button")}
        showViewAll={false}
      />
    </section>
  );
}
