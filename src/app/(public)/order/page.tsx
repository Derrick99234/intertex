"use client";

import DynamicTable from "@/components/admin/dynamic-table";
import ViewOrder from "@/components/admin/order/view-order";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/constants";

function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewOrder, setViewOrder] = useState({
    status: false,
    orderId: "",
  });

  // Fetch Orders from API
  useEffect(() => {
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
          userId: order.userId,
          orderId: order._id,
          deliveryMethod: order.deliveryMethod,
          amount: `$${order.amount}`,
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
    fetchOrders();
  }, []);

  // Handle action click
  const handleViewOrder = (id: string) => {
    setViewOrder({
      status: true,
      orderId: id,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <p className="text-red-500 mb-3">Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[70vh] text-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mb-4">
          You currently have no orders. Once someone places an order, you’ll see it here.
        </p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </motion.div>
    );
  }

  return (
    <div className="p-5">
      {viewOrder.status ? (
        <p>Hel</p>
      ) : (
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "userId", label: "User ID" },
            { key: "orderId", label: "Order ID" },
            { key: "deliveryMethod", label: "Delivery Method" },
            { key: "amount", label: "Amount" },
            { key: "date", label: "Date" },
            { key: "status", label: "Status" },
            { key: "more", label: "More", type: "action" },
          ]}
          data={orders}
          title="Orders"
          itemsPerPage={5}
          onAction={(id: string) => handleViewOrder(id)}
          searchPlaceholder="Search by date, email..."
          showViewAll={false}
          navigations={[
            { name: "All Orders", href: "all-order" },
            { name: "Pending Orders", href: "pending-orders" },
            { name: "Successful Orders", href: "succesful-orders" },
            { name: "Failed Orders", href: "failed-orders" },
          ]}
        />
      )}
    </div>
  );
}

export default OrderPage;
