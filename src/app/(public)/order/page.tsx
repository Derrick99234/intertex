"use client";
import { Package, MessageCircle, MapPin, X } from "lucide-react";
import DynamicTable from "@/components/admin/dynamic-table";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";

function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewOrder, setViewOrder] = useState({
    status: false,
    orderId: "",
  });

  const onClose = () => {
    setViewOrder({
      ...viewOrder,
      status: false,
    });
  };

  const fetchActiveTab = (href: string) => {
    console.log(href);
  };

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
          id: order._id,
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
    fetchOrders();
  }, []);

  // Handle action click
  const handleViewOrder = (id: string) => {
    console.log(id);
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
          You currently have no orders. Once someone places an order, you’ll see
          it here.
        </p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </motion.div>
    );
  }

  return (
    <div className="p-5">
      {viewOrder.status ? (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-tr from-purple-500 to-indigo-500 p-4 rounded-full shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Dynamic content */}
            {(() => {
              const currentOrder = orders.find(
                (o) => o.id === viewOrder.orderId
              );
              const status = currentOrder?.status?.toLowerCase();

              console.log(`Order Status: ${status}`);

              if (status === "pending") {
                return (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Payment Pending ⏳
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Your order has been placed but payment hasn’t been
                      completed yet. Please make payment to confirm your order
                      and avoid cancellation.
                    </p>
                    <div className="flex flex-col gap-3 w-full mt-6">
                      <Link
                        href={`/payment/${viewOrder.orderId}`}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
                      >
                        Make Payment Now
                      </Link>
                      <button
                        onClick={onClose}
                        className="border border-gray-300 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </>
                );
              }

              if (status === "cancelled") {
                return (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Order Rejected ❌
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Unfortunately, your order was rejected. You can try again
                      by reordering or contacting our support for clarification.
                    </p>
                    <div className="flex flex-col gap-3 w-full mt-6">
                      <Link
                        href={`/order/retry/${viewOrder.orderId}`}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
                      >
                        Retry Payment
                      </Link>
                      <Link
                        href="https://wa.me/2348124544127"
                        target="_blank"
                        className="flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                      >
                        <MessageCircle className="w-5 h-5 text-gray-500" />
                        Contact Support
                      </Link>
                    </div>
                  </>
                );
              }

              // Successful order (default)
              return (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Order Confirmed ✨
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Your order has been received successfully. One of our team
                    members will reach out shortly with the next steps.
                  </p>
                  <div className="flex flex-col gap-3 w-full mt-6">
                    <Link
                      href="https://wa.me/2348124544127"
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Link>
                    <Link
                      href="/our-stores"
                      className="flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      <MapPin className="w-5 h-5 text-gray-500" />
                      View Pickup Details
                    </Link>
                    <Link
                      href="/shop"
                      className="flex items-center justify-center gap-2 border border-green-500 py-2.5 rounded-lg font-medium text-green-600 hover:bg-green-50 transition"
                    >
                      Reorder Item
                    </Link>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      ) : (
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "id", label: "Order ID" },
            { key: "item", label: "Item" },
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
          showSearch={false}
          showViewAll={false}
          fetchActiveTab={fetchActiveTab}
          navigations={[
            { name: "All Orders", href: "all" },
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
