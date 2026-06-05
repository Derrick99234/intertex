"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import OtpInput from "@/components/admin/otp-verification/otp-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";

export default function ResetPasswordSent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
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

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      showNotification("Enter the 6-digit OTP sent to your email.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/auth/password-reset/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to verify OTP.");
      }

      const resetToken = data.resetToken || data.token;
      if (!resetToken) {
        throw new Error("OTP verified but reset token was not returned.");
      }

      sessionStorage.setItem("userResetToken", resetToken);
      router.push("/reset-password/new-password");
    } catch (error: any) {
      showNotification(error.message || "Unable to verify OTP.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/auth/password-reset/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend OTP.");
      }

      showNotification("OTP resent successfully.", "success");
    } catch (error: any) {
      showNotification(error.message || "Unable to resend OTP.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10 text-center">
        <h1 className="text-2xl font-bold">Check your mail</h1>
        <p className="mt-2 mb-4 text-gray-600">
          If your account exists for <strong>{email}</strong>, you&apos;ll
          receive an OTP confirmation code in your email.
        </p>
        <OtpInput value={otp} onChange={setOtp} />
        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={isLoading}
          className="mt-6 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200 disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isLoading}
          className="mt-4 text-red-500 text-sm hover:underline cursor-pointer disabled:opacity-50"
        >
          Resend OTP
        </button>
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
