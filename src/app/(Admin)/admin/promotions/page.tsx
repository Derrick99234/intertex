"use client";

import DynamicTable from "@/components/admin/dynamic-table";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PromotionItem = {
  id: string;
  no: string;
  code: string;
  discount: string;
  status: string;
  starts: string;
  ends: string;
  more: string;
  raw: any;
};

const emptyForm = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  startsAt: "",
  endsAt: "",
  status: "active",
};

export default function PromotionsPage() {
  const router = useRouter();
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ status: true, message, type });
    window.setTimeout(() => {
      setNotifications((current) => ({ ...current, status: false }));
    }, 2500);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
    setShowForm(false);
  };

  const fetchPromotions = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/promotions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch promotions.");
      }

      const items = (data.promotions || data || []).map(
        (item: any, index: number) => ({
          id: item._id || item.id,
          no: String(index + 1).padStart(2, "0"),
          code: item.code,
          discount:
            item.discountType === "fixed"
              ? `NGN ${item.discountValue}`
              : `${item.discountValue}%`,
          status: item.status || "active",
          starts: item.startsAt
            ? new Date(item.startsAt).toLocaleDateString("en-GB")
            : "N/A",
          ends: item.endsAt
            ? new Date(item.endsAt).toLocaleDateString("en-GB")
            : "N/A",
          more: "Manage",
          raw: item,
        })
      );

      setPromotions(items);
    } catch (error: any) {
      showNotification(error.message || "Unable to fetch promotions.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [router]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      setIsLoading(true);
      const endpoint = editingId
        ? `${API_BASE_URL}/admin/promotions/${editingId}`
        : `${API_BASE_URL}/admin/promotions`;
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          discountValue: Number(form.discountValue),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save promotion.");
      }

      showNotification(
        editingId
          ? "Promotion updated successfully."
          : "Promotion created successfully.",
        "success"
      );
      resetForm();
      fetchPromotions();
    } catch (error: any) {
      showNotification(error.message || "Unable to save promotion.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/admin/promotions/${editingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete promotion.");
      }

      showNotification("Promotion deleted successfully.", "success");
      resetForm();
      fetchPromotions();
    } catch (error: any) {
      showNotification(error.message || "Unable to delete promotion.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-5 space-y-5">
      <DynamicTable
        title="Create Promotion"
        columns={[
          { key: "no", label: "NO" },
          { key: "code", label: "Code" },
          { key: "discount", label: "Discount" },
          { key: "status", label: "Status" },
          { key: "starts", label: "Starts" },
          { key: "ends", label: "Ends" },
          { key: "more", label: "More", type: "action" as const },
        ]}
        data={promotions}
        itemsPerPage={5}
        searchPlaceholder="Search by code..."
        showViewAll={true}
        onViewAll={() => {
          setShowForm(true);
          setEditingId("");
          setForm(emptyForm);
        }}
        onAction={(id: string) => {
          const promotion = promotions.find((item) => item.id === id)?.raw;
          if (!promotion) return;
          setEditingId(id);
          setShowForm(true);
          setForm({
            code: promotion.code || "",
            discountType: promotion.discountType || "percentage",
            discountValue: String(promotion.discountValue || ""),
            startsAt: promotion.startsAt?.slice(0, 10) || "",
            endsAt: promotion.endsAt?.slice(0, 10) || "",
            status: promotion.status || "active",
          });
        }}
      />

      {showForm && (
        <div className="bg-white rounded-lg shadow p-5 max-w-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-secondary">
              {editingId ? "Manage Promotion" : "Create Promotion"}
            </h2>
            <button
              type="button"
              className="text-sm text-red-500 cursor-pointer"
              onClick={resetForm}
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.code}
              onChange={(event) =>
                setForm((current) => ({ ...current, code: event.target.value }))
              }
              className="border rounded px-3 py-2"
              placeholder="Promo code"
            />
            <select
              value={form.discountType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  discountType: event.target.value,
                }))
              }
              className="border rounded px-3 py-2 bg-white"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed amount</option>
            </select>
            <input
              value={form.discountValue}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  discountValue: event.target.value,
                }))
              }
              className="border rounded px-3 py-2"
              placeholder="Discount value"
            />
            <select
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value,
                }))
              }
              className="border rounded px-3 py-2 bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="date"
              value={form.startsAt}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  startsAt: event.target.value,
                }))
              }
              className="border rounded px-3 py-2"
            />
            <input
              type="date"
              value={form.endsAt}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  endsAt: event.target.value,
                }))
              }
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-3 justify-end">
            {editingId && (
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="bg-secondary text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleSubmit}
            >
              {editingId ? "Update Promotion" : "Create Promotion"}
            </button>
          </div>
        </div>
      )}

      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </section>
  );
}
