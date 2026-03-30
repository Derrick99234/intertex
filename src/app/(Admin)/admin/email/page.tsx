"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailManagementPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: "",
    audience: "all-subscribers",
    message: "",
  });
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

  const handleSendEmail = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send email.");
      }

      setForm({
        subject: "",
        audience: "all-subscribers",
        message: "",
      });
      showNotification("Email campaign sent successfully.", "success");
    } catch (error: any) {
      showNotification(error.message || "Unable to send email.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="bg-white rounded-lg shadow p-5 max-w-3xl">
        <h1 className="text-lg font-semibold text-secondary mb-4">
          Email Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Subject
            </label>
            <input
              value={form.subject}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  subject: event.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2 outline-none"
              placeholder="Newsletter subject"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Audience
            </label>
            <select
              value={form.audience}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  audience: event.target.value,
                }))
              }
              className="w-full border rounded px-3 py-2 outline-none bg-white"
            >
              <option value="all-subscribers">All Subscribers</option>
              <option value="customers">Customers</option>
              <option value="leads">Leads</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                message: event.target.value,
              }))
            }
            className="w-full border rounded px-3 py-2 outline-none min-h-40"
            placeholder="Write your email content..."
          />
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="button"
            className="bg-secondary text-white px-5 py-2 rounded cursor-pointer hover:bg-secondary/80"
            onClick={handleSendEmail}
          >
            Send
          </button>
        </div>
      </div>

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
