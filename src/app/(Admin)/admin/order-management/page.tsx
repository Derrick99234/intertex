"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewOrder from "@/components/admin/order/view-order";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

function OrderManagement() {
  const [viewOrder, setViewOrder] = useState({
    status: false,
    order: null as any,
  });
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all-orders");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.push("/admin");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        const formatted = data.map((order: any, index: number) => ({
          checkbox: false,
          no: String(index + 1).padStart(2, "0"),
          id: order._id,
          userId:
            order.userId?.fullName ||
            order.userId?.email ||
            order.userId?._id ||
            order.userId ||
            "N/A",
          items: order.products?.length ?? 0,
          deliveryMethod: order.deliveryMethod || "N/A",
          deliveryInformation: order.deliveryInformation,
          amount: formatCurrency(order.amount ?? 0),
          date: new Date(order.date || order.createdAt).toLocaleDateString(
            "en-GB"
          ),
          status: order.status || "pending",
          more: <IoEyeOutline className="cursor-pointer" />,
          order,
        }));

        setOrders(formatted);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders");
      }
    };

    fetchOrders();
  }, [router]);

  useEffect(() => {
    let filtered = orders;
    if (activeTab === "pending-orders") {
      filtered = orders.filter((order) => order.status === "pending");
    } else if (activeTab === "successful-orders") {
      filtered = orders.filter((order) => order.status === "successful");
    } else if (activeTab === "failed-orders") {
      filtered = orders.filter((order) =>
        ["cancelled", "failed"].includes(order.status)
      );
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

  return (
    <section className="py-5">
      {viewOrder.status ? (
        viewOrder.order ? (
          <ViewOrder
            order={viewOrder.order}
            onBack={() => setViewOrder({ status: false, order: null })}
          />
        ) : (
          <p>Order not found</p>
        )
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
              { key: "items", label: "Items" },
              { key: "amount", label: "Amount" },
              { key: "date", label: "Date" },
              { key: "status", label: "Status" },
              { key: "more", label: "More", type: "action" },
            ]}
            data={filteredOrders}
            title="Orders"
            itemsPerPage={5}
            onAction={(id: string) => {
              const selectedOrder = filteredOrders.find((order) => order.id === id);
              setViewOrder({
                status: true,
                order: selectedOrder?.order ?? null,
              });
            }}
            searchPlaceholder="Search by date, user, order ID..."
            showViewAll={false}
            fetchActiveTab={setActiveTab}
            navigations={[
              {
                name: "All Orders",
                href: "all-orders",
              },
              {
                name: "Pending Orders",
                href: "pending-orders",
              },
              {
                name: "Successful Orders",
                href: "successful-orders",
              },
              {
                name: "Failed Orders",
                href: "failed-orders",
              },
            ]}
          />
        </div>
      )}
    </section>
  );
}

export default OrderManagement;
