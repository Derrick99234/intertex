"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/password-reset/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send reset OTP.");
      }

      showNotification("OTP sent successfully.", "success");
      router.push(`/admin/reset-password/sent?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      showNotification(error.message || "Unable to send reset OTP.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          className="bg-white flex-col py-12 sm:py-16 px-6 sm:px-10 rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          <p className="text-center mt-5 mb-16 text-sm">
            Enter your registered email address and we&apos;ll send an OTP for
            confirmation.
          </p>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
          >
            Send OTP
          </button>
        </form>
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

export default ResetPassword;
