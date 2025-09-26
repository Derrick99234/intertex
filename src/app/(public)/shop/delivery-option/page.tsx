"use client";
import Delivery from "@/components/shop/delivery-option/delivery";
import Pickup from "@/components/shop/delivery-option/pick-up";
import { useState } from "react";

export default function DeliveryOption() {
  const [deliveryOption, setDeliveryOption] = useState("delivery");

  return (
    <div className="max-w-xl w-full min-h-[120vh] mx-auto p-6 px-10 bg-white rounded-md shadow-md py-14">
      <h1 className="text-lg font-bold mb-4 text-center">
        How would you like to get your products?
      </h1>
      <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" />

      <div className="flex justify-center items-center my-8">
        <button
          className={`
              ${
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
      <div className="flex gap-4 mt-20">
        <button className="border border-secondary py-4 w-full">Back</button>
        <button className="bg-secondary text-white py-4 w-full">
          Continue to payment
        </button>
      </div>
    </div>
  );
}
