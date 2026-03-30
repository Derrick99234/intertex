"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import OtpInput from "./otp-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";

function OtpVerification({
  email,
  setShowVerificationModal,
}: {
  email: string;
  setShowVerificationModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
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

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp.length !== 6) {
      showNotification("Enter the 6-digit OTP sent to your email.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/password-reset/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to verify OTP.");
      }

      const resetToken = data.resetToken || data.token;

      if (!resetToken) {
        throw new Error("OTP verified but reset token was not returned.");
      }

      router.push(`/admin/reset-password/${resetToken}?token=${resetToken}`);
      setShowVerificationModal(false);
    } catch (error: any) {
      showNotification(error.message || "Unable to verify OTP.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/password-reset/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
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
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50"
      onClick={() => setShowVerificationModal(false)}
    >
      <div
        className="bg-white p-10 min-w-lg rounded-lg relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            setShowVerificationModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-center">Kindly enter the OTP sent to {email}</p>
        <form
          className="flex flex-col items-center justify-center p-4"
          onSubmit={handleVerifyOtp}
        >
          <OtpInput value={otp} onChange={setOtp} />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <button
          type="button"
          className="text-red-500 text-center cursor-pointer font-semibold block mx-auto"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>

        {notifications.status && (
          <NotificationSystem
            message={notifications.message}
            type={notifications.type}
          />
        )}
        <LoadingSpinner isLoading={isLoading} />
      </div>
    </div>
  );
}

export default OtpVerification;
