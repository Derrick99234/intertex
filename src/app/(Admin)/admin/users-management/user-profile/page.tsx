"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import UserProfileComponent from "@/components/admin/users/user-profile";
import React, { Suspense, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  const [viewProduct, setViewProduct] = useState({
    status: false,
    productId: "",
  });

  const productsData = [
    {
      checkbox: true,
      no: "01",
      productId: "PRD001",
      productName: "Cotton T-Shirt",
      quantity: 10,
      deliveryMethod: "pick-up",
      date: "12-12-2024",
      status: "Active",
      review: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "02",
      productId: "PRD002",
      productName: "Denim Jeans",
      category: "Apparel",
      price: "$59.99",
      stock: 75,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "03",
      productId: "PRD003",
      productName: "Leather Shoes",
      category: "Footwear",
      price: "$89.99",
      stock: 30,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "04",
      productId: "PRD004",
      productName: "Silk Scarf",
      category: "Accessories",
      price: "$19.99",
      stock: 200,
      status: "Active",
      more: <IoEyeOutline />,
    },
    {
      checkbox: true,
      no: "05",
      productId: "PRD005",
      productName: "Running Sneakers",
      category: "Footwear",
      price: "$74.99",
      stock: 20,
      status: "Low Stock",
      more: <IoEyeOutline />,
    },
  ];
  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 w-full ml-64">
        <div className="flex gap-5 font-semibold text-lg mb-5 border border-gray-300 rounded p-3">
          {[
            { name: "Profile", href: "profile" },
            { name: "Orders", href: "orders" },
            { name: "Activity Log", href: "activity-log" },
          ].map((nav, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(nav.href)}
              className={`border border-secondary py-1 rounded-sm text-secondary px-4 text-sm cursor-pointer ${
                activeTab === nav.href ? "bg-secondary text-white" : ""
              }`}
            >
              {nav.name}
            </button>
          ))}
        </div>
        {activeTab === "orders" ? (
          <>
            <DynamicTable
              columns={[
                { key: "checkbox", label: "", type: "checkbox" as const },
                { key: "no", label: "NO" },
                { key: "productId", label: "Product ID" },
                { key: "productName", label: "Product Name" },
                { key: "quantity", label: "Quantity" },
                { key: "deliveryMethod", label: "Delivery Method" },
                { key: "date", label: "Date" },
                { key: "status", label: "Status" },
                { key: "review", label: "Review", type: "action" },
              ]}
              data={productsData}
              onAction={(id: string) => {
                setViewProduct({
                  status: true,
                  productId: id,
                });
              }}
              title="Orders"
              itemsPerPage={5}
              searchPlaceholder="Search by name, ID..."
              showViewAll={false}
            />
          </>
        ) : activeTab === "activity-log" ? (
          <h2>hello</h2>
        ) : (
          <Suspense fallback={<div>Loading user profile...</div>}>
            <UserProfileComponent />
          </Suspense>
        )}
      </div>
    </section>
  );
}

export default UserProfile;
