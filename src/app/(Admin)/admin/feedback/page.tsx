"use client";

import DynamicTable from "@/components/admin/dynamic-table";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FeedbackItem = {
  id: string;
  no: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: string;
  more: string;
  raw: any;
};

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
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

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/admin/feedback`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch feedback.");
        }

        const items = (data.feedback || data || []).map(
          (item: any, index: number) => ({
            id: item._id || item.id,
            no: String(index + 1).padStart(2, "0"),
            name: item.name || item.fullName || "Anonymous",
            email: item.email || "N/A",
            message: item.message || item.subject || "No message",
            date: new Date(item.createdAt || item.date).toLocaleDateString(
              "en-GB"
            ),
            status: item.status || "new",
            more: "View",
            raw: item,
          })
        );

        setFeedback(items);
      } catch (error: any) {
        showNotification(error.message || "Unable to fetch feedback.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [router]);

  return (
    <section className="py-5 space-y-5">
      <DynamicTable
        title="Feedback"
        columns={[
          { key: "no", label: "NO" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email", type: "email" as const },
          { key: "message", label: "Message" },
          { key: "date", label: "Date", type: "date" as const },
          { key: "status", label: "Status" },
          { key: "more", label: "More", type: "action" as const },
        ]}
        data={feedback}
        itemsPerPage={5}
        searchPlaceholder="Search by name or email..."
        showViewAll={false}
        onAction={(id: string) => {
          const entry = feedback.find((item) => item.id === id);
          setSelectedFeedback(entry?.raw ?? null);
        }}
      />

      {selectedFeedback && (
        <div className="bg-white rounded-lg shadow p-5 max-w-3xl">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-lg font-semibold text-secondary">
                Feedback Details
              </h2>
              <p className="text-sm text-gray-500">
                {selectedFeedback.email || "No email provided"}
              </p>
            </div>
            <button
              type="button"
              className="text-sm text-red-500 cursor-pointer"
              onClick={() => setSelectedFeedback(null)}
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedFeedback.name || selectedFeedback.fullName || "Anonymous"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {selectedFeedback.status || "new"}
            </p>
            <p>
              <span className="font-semibold">Message:</span>{" "}
              {selectedFeedback.message || selectedFeedback.subject || "No message"}
            </p>
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
