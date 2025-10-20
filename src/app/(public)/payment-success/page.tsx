"use client";

import { API_BASE_URL } from "@/lib/constants";
import React, { useEffect, useState } from "react";

// --- INLINE SVG ICONS ---

// Success Checkmark Icon
const CheckCircleIcon = ({ className = "w-16 h-16" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} text-indigo-500`}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Failure X Icon
const XCircleIcon = ({ className = "w-16 h-16" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} text-red-500`}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// --- State Screens ---

const SuccessScreen = ({
  orderId,
  redirectTime,
}: {
  orderId: string;
  redirectTime: number;
}) => (
  <div className="flex flex-col items-center text-center p-8 sm:p-12 bg-white rounded-xl shadow-2xl shadow-indigo-300/50 max-w-lg w-full transform transition-all duration-700 animate-fadeIn">
    <div className="relative mb-6">
      {/* Animated Success Icon */}
      <CheckCircleIcon className="w-20 h-20 text-indigo-500 animate-bounceOnce" />
      {/* Subtle background pulse for effect */}
      <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-50 animate-pingSlow"></div>
    </div>

    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
      Order Confirmed! 🎉
    </h1>
    <p className="text-gray-600 text-lg mb-4">
      Your payment was successful and your order is being processed.
    </p>

    <div className="bg-indigo-50 p-3 rounded-lg w-full mb-6">
      <p className="text-sm font-semibold text-indigo-700">
        Order Reference:{" "}
        <span className="font-mono text-indigo-900">{orderId}</span>
      </p>
    </div>

    <p className="text-sm text-gray-500 mt-2 font-medium">
      Redirecting you to the order area in{" "}
      <strong className="text-indigo-600">{redirectTime}</strong> seconds...
    </p>
  </div>
);

const FailureScreen = ({
  orderId,
  redirectTime,
}: {
  orderId: string;
  redirectTime: number;
}) => (
  <div className="flex flex-col items-center text-center p-8 sm:p-12 bg-white rounded-xl shadow-2xl shadow-red-300/50 max-w-lg w-full transform transition-all duration-700 animate-fadeIn">
    <div className="relative mb-6">
      {/* Animated Failure Icon */}
      <XCircleIcon className="w-20 h-20 text-red-500 animate-shake" />
      {/* Subtle background pulse for effect */}
      <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 animate-pingSlow"></div>
    </div>

    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
      Payment Failed
    </h1>
    <p className="text-gray-600 text-lg mb-4">
      There was an issue processing your payment. Please check your payment
      details or contact support.
    </p>

    <div className="bg-red-50 p-3 rounded-lg w-full mb-6">
      <p className="text-sm font-semibold text-red-700">
        Reference: <span className="font-mono text-red-900">{orderId}</span>
      </p>
    </div>

    <p className="text-sm text-gray-500 mt-2 font-medium">
      Redirecting you to the order area in{" "}
      <strong className="text-red-600">{redirectTime}</strong> seconds...
    </p>
  </div>
);

// --- Main Application Component ---
export default function PaymentSuccessPage() {
  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false); // Success/Failure state
  const [orderId, setOrderId] = useState("N/A");
  const [redirectTime, setRedirectTime] = useState(2); // Countdown state

  // Custom Tailwind styles for animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes bounceOnce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-bounceOnce { animation: bounceOnce 0.6s ease-out 1; }
      .animate-shake { animation: shake 0.5s ease-in-out 1; }
      .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      .animate-pingSlow { animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Effect 1: Extract 'reference' from URL using standard browser API
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("reference");
      setReference(ref);

      if (!ref) {
        // Start the verification process immediately even if reference is missing (will result in failure)
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Effect 2: Verification and Redirect Logic (REPLACING MOCK)
  useEffect(() => {
    // Only proceed if reference is not null (meaning we've checked the URL)
    if (reference === null) return;

    // Variable to hold the cleanup function for timers
    let timerCleanup = () => {};

    // Helper function to start the countdown and redirection
    const startRedirectTimers = () => {
      const countdown = setInterval(() => {
        setRedirectTime((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        clearInterval(countdown);
        window.location.href = "/order";
      }, 2000);

      // Store the cleanup function
      timerCleanup = () => {
        clearInterval(countdown);
        clearTimeout(redirectTimer);
      };
    };

    const verifyTransaction = async () => {
      let success = false;

      try {
        // Check for missing reference first
        if (!reference) {
          throw new Error("Missing payment reference in URL.");
        }

        // 1. Call NestJS backend for Paystack verification
        const res = await fetch(
          `${API_BASE_URL}/paystack/verify?reference=${reference}`
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        // 2. Process verification result from NestJS/Paystack
        if (
          data.status === true &&
          data.data &&
          data.data.status === "success"
        ) {
          success = true;
          // Prefer the orderId from Paystack metadata if available
          const fetchedOrderId = data.data.metadata?.orderId;

          // NOTE: Add your backend order status update call here if needed:
          await fetch(`${API_BASE_URL}/orders/${fetchedOrderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "successful" }),
          });
        } else {
          console.error("Verification failed in NestJS response:", data);
        }
      } catch (error) {
        console.error("Verification/Network error:", error);
        // On any error, payment is considered failed
        success = false;
      } finally {
        setVerified(success);
        setLoading(false);
        // 3. Start the countdown timers now that the result is ready
        startRedirectTimers();
      }
    };

    verifyTransaction();

    // The effect's cleanup function handles clearing the timers
    return () => {
      timerCleanup();
    };
  }, [reference]); // Dependency ensures this runs once the reference is resolved

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mb-4"></div>
        <p className="text-gray-600 font-semibold text-lg">
          Verifying your secure payment...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 font-sans">
      {verified ? (
        <SuccessScreen orderId={orderId} redirectTime={redirectTime} />
      ) : (
        <FailureScreen orderId={orderId} redirectTime={redirectTime} />
      )}
    </div>
  );
}
