"use client";
import Delivery from "@/components/shop/delivery-option/delivery";
import Pickup from "@/components/shop/delivery-option/pick-up";
import { useState } from "react";

export default function DeliveryOption() {
  const [deliveryOption, setDeliveryOption] = useState("delivery");

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white border-l-2 border-gray-200">
      <h1 className="font-semibold mb-4 text-center">
        How would you like to get your products?
      </h1>
      {/* <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" /> */}

      <div className="flex justify-center items-center my-5 text-sm">
        <button
          className={`
              ${
                deliveryOption === "delivery"
                  ? "bg-secondary text-white"
                  : "bg-gray-300"
              } font-semibold py-2 px-6 cursor-pointer `}
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
        <button className="bg-secondary text-white py-2 w-full">
          Continue to payment
        </button>
      </div>
    </div>
  );
}
