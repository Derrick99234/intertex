"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewOrder from "@/components/admin/order/view-order";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import React, { use, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function OrderManagement() {
  const [viewOrder, setViewOrder] = useState({
    status: false,
    orderId: "",
  });
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("allOrders");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      // Format for table
      const formatted = data.map((order: any, index: number) => ({
        checkbox: false,
        no: String(index + 1).padStart(2, "0"),
        id: order._id,
        userId: order.userId,
        item: order.products.length,
        deliveryMethod: order.deliveryMethod,
        amount: `₦${order.amount}`,
        date: new Date(order.date).toLocaleDateString(),
        status: order.status,
        more: <IoEyeOutline className="cursor-pointer" />,
      }));

      setOrders(formatted);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (activeTab === "pending-orders") {
      filtered = orders.filter((o) => o.status === "pending");
    } else if (activeTab === "succesful-orders") {
      filtered = orders.filter((o) => o.status === "successful");
    } else if (activeTab === "failed-orders") {
      filtered = orders.filter((o) => o.status === "cancelled");
    }

    setFilteredOrders(filtered);
  }, [orders, activeTab]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <p className="text-red-500 mb-3">Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const fetchActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex mt-20">
      <AdminSidebar />

      <div className="p-5 flex-1 ml-64">
        {viewOrder.status ? (
          <ViewOrder />
        ) : (
          <div>
            <DisplayStats />
            <DynamicTable
              columns={[
                { key: "checkbox", label: "", type: "checkbox" as const },
                { key: "no", label: "NO" },
                { key: "userId", label: "User ID" },
                { key: "id", label: "Order ID" },
                { key: "deliveryMethod", label: "Delivery Method" },
                { key: "amount", label: "Amount" },
                { key: "date", label: "Date" },
                { key: "status", label: "Status" },
                { key: "more", label: "More", type: "action" },
              ]}
              data={filteredOrders}
              title="Orders"
              itemsPerPage={5}
              onAction={(id: string) => {
                setViewOrder({
                  status: true,
                  orderId: id,
                });
              }}
              searchPlaceholder="Search by date, email..."
              showViewAll={false}
              fetchActiveTab={fetchActiveTab}
              navigations={[
                {
                  name: "All Orders",
                  href: "allOrder",
                },
                {
                  name: "Pending Orders",
                  href: "pending-orders",
                },
                {
                  name: "Successful orders",
                  href: "succesful-orders",
                },
                {
                  name: "Failed orders",
                  href: "failed-orders",
                },
              ]}
              // onViewAll={() => console.log("View all users")}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderManagement;
