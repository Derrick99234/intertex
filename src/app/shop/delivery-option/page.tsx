"use client";
import Delivery from "@/components/shop/delivery-option/delivery";
import { useState } from "react";

function DeliveryOption() {
  const [deliveryOption, setDeliveryOption] = useState("delivery");

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-4xl w-full mx-auto p-6 px-10 bg-white rounded-md shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          How would you like to get your products?
        </h1>
        <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" />

        <div className="flex justify-center items-center my-8">
          <button className="bg-secondary font-semibold py-2 px-6 cursor-pointer text-white">
            Delivery
          </button>
          <button className="bg-gray-300 font-semibold cursor-pointer py-2 px-6">
            Pick-up
          </button>
        </div>
        <Delivery />
      </div>
    </section>
  );
}

export default DeliveryOption;
