"use client";
import Delivery from "@/components/shop/delivery-option/delivery";
import Pickup from "@/components/shop/delivery-option/pick-up";
import { API_BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function DeliveryOption({
  deliveryOption,
  setDeliveryOption,
  handlePayment,
}: {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  handlePayment: () => void;
}) {
  const [loading, setLoading] = useState(false);

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);

  //     // Example payload – replace with dynamic user/cart data
  //     const payload = {
  //       email: "customer@example.com", // logged-in user's email
  //       amount: 5000 * 100, // Paystack requires amount in kobo (₦5000)
  //       metadata: {
  //         deliveryOption,
  //       },
  //     };

  //     // Send to backend
  //     const res = await fetch(`${API_BASE_URL}/paystack/initialize`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();

  //     if (data.status && data.data.authorization_url) {
  //       // Redirect user to Paystack payment page
  //       window.location.href = data.data.authorization_url;
  //     } else {
  //       alert("Unable to initialize payment");
  //       console.error("Paystack response:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error initializing payment:", error);
  //     alert("Payment failed to start.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white border-l-2 border-gray-200">
      <h1 className="font-semibold mb-4 text-center">
        How would you like to get your products?
      </h1>

      <div className="flex justify-center items-center my-5 text-sm">
        <button
          className={`${
            deliveryOption === "delivery"
              ? "bg-secondary text-white"
              : "bg-gray-300"
          } font-semibold py-2 px-6 cursor-pointer`}
          onClick={() => setDeliveryOption("delivery")}
        >
          Delivery
        </button>
        <button
          className={`${
            deliveryOption === "pickup"
              ? "bg-secondary text-white"
              : "bg-gray-300"
          } font-semibold cursor-pointer py-2 px-6`}
          onClick={() => setDeliveryOption("pickup")}
        >
          Pick-up
        </button>
      </div>

      {deliveryOption === "delivery" ? <Delivery /> : <Pickup />}

      <div className="flex gap-4 mt-10 text-sm">
        <button className="border border-secondary py-2 w-full">Back</button>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-secondary text-white py-2 w-full cursor-pointer"
        >
          {loading ? "Processing..." : "Continue to payment"}
        </button>
      </div>
    </div>
  );
}
