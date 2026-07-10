"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { authFetch } from "@/lib/auth-fetch";

type OrderProduct = {
  product?: {
    _id?: string;
    productName?: string;
    slug?: string;
    price?: number;
  };
  quantity?: number;
  size?: string;
};

type Order = {
  _id: string;
  amount?: number;
  currency?: string;
  status?: string;
  deliveryMethod?: string;
  deliveryInformation?: {
    deliveryAddress?: string;
    phoneNumber?: string;
  };
  userId?: {
    fullName?: string;
    email?: string;
  };
  products?: OrderProduct[];
};

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  const [message, setMessage] = useState("Preparing payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Missing order reference.");
      return;
    }

    const startPayment = async () => {
      try {
        setMessage("Loading your order...");
        const orderRes = await authFetch(`/orders/${orderId}`);

        if (!orderRes.ok) {
          throw new Error("Could not load order details.");
        }

        const orderData = (await orderRes.json()) as Order;

        if (!orderData?._id) {
          throw new Error("Order not found.");
        }

        if (["successful", "completed"].includes(String(orderData.status).toLowerCase())) {
          router.replace("/order");
          return;
        }

        const amount = Math.round(Number(orderData.amount || 0) * 100);
        if (!amount) {
          throw new Error("Invalid order amount.");
        }

        setMessage("Initializing secure checkout...");
        const paymentRes = await authFetch("/paystack/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: orderData.userId?.email,
            amount,
            currency: orderData.currency,
            callback_url: `${window.location.origin}/payment-success`,
            metadata: {
              customer_name: orderData.userId?.fullName,
              deliveryOption: orderData.deliveryMethod,
              orderId: orderData._id,
              cart: (orderData.products || []).map((item) => ({
                product_id: item.product?._id,
                name: item.product?.slug || item.product?.productName,
                quantity: item.quantity,
                price: item.product?.price,
              })),
            },
          }),
        });

        const paymentData = await paymentRes.json();

        if (paymentData?.status && paymentData?.data?.authorization_url) {
          window.location.href = paymentData.data.authorization_url;
          return;
        }

        throw new Error(
          paymentData?.message || "Unable to initialize payment.",
        );
      } catch (paymentError: any) {
        setError(paymentError?.message || "Payment failed to start.");
      }
    };

    startPayment();
  }, [orderId, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 text-center">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Payment cannot start
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/order")}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium hover:bg-indigo-700"
          >
            Back to orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {message}
        </h1>
        <p className="text-gray-600">
          Do not close this page. We are redirecting you to Paystack.
        </p>
      </div>
    </div>
  );
}
