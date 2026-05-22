"use client";

import React from "react";
import Delivery from "@/components/shop/delivery-option/delivery";
import Pickup from "@/components/shop/delivery-option/pick-up";

export type CurrencyCode = "NGN" | "GBP" | "USD";

export const CURRENCY_OPTIONS: {
  code: CurrencyCode;
  label: string;
  symbol: string;
}[] = [
  { code: "NGN", label: "Nigeria (Naira)", symbol: "₦" },
  { code: "GBP", label: "UK (Pounds)", symbol: "£" },
  { code: "USD", label: "US (Dollars)", symbol: "$" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "NGN";

type DeliveryInformation = {
  deliveryAddress: string;
  phoneNumber: string;
  alternativePhoneNumber: string;
  address: string;
};

export default function DeliveryOption({
  deliveryOption,
  setDeliveryOption,
  deliveryInformation,
  setDeliveryInformation,
  handlePayment,
  currency,
  setCurrency,
}: {
  deliveryOption: string;
  setDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
  deliveryInformation: DeliveryInformation;
  setDeliveryInformation: React.Dispatch<
    React.SetStateAction<DeliveryInformation>
  >;
  handlePayment: () => void;
  currency: CurrencyCode;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyCode>>;
}) {
  const canContinue =
    deliveryOption === "pickup" ||
    Boolean(
      deliveryInformation.deliveryAddress.trim() ||
      deliveryInformation.address.trim() ||
      deliveryInformation.alternativePhoneNumber.trim(),
    );

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white border-l-2 border-gray-200">
      <h1 className="font-semibold mb-4 text-center">
        How would you like to get your products?
      </h1>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
        >
          {CURRENCY_OPTIONS.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center my-5 text-sm">
        <button
          type="button"
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
          type="button"
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

      {deliveryOption === "delivery" ? (
        <Delivery
          deliveryInformation={deliveryInformation}
          setDeliveryInformation={setDeliveryInformation}
        />
      ) : (
        <Pickup
          deliveryInformation={deliveryInformation}
          setDeliveryInformation={setDeliveryInformation}
        />
      )}

      <div className="flex gap-4 mt-10 text-sm">
        <button type="button" className="border border-secondary py-2 w-full">
          Back
        </button>
        <button
          type="button"
          onClick={handlePayment}
          disabled={!canContinue}
          className="bg-secondary text-white py-2 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
}
