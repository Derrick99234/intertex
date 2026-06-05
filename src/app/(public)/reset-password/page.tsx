"use client";

import InputField from "@/components/input-field/input-field";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<{
    status: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ status: false, message: "", type: "info" });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info",
  ) => {
    setNotifications({ status: true, message, type });
    window.setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 2500);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/password-reset/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send reset OTP.");
      }

      showNotification("OTP sent successfully.", "success");
      router.push(`/reset-password/sent?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      showNotification(error.message || "Unable to send reset OTP.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center mt-2 mb-10 text-gray-600">
          Enter your email below to reset your password
        </p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          I remembered my password,{" "}
          <Link href="/login" className="text-secondary hover:underline">
            Sign in
          </Link>
        </p>
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
