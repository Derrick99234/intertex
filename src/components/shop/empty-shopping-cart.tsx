"use client";

import { useRouter } from "next/navigation";
import React from "react";

// --- INLINE SVG ICONS ---

// Shopping Bag Icon (used as the central visual element)
const ShoppingBagIcon = ({ className = "w-24 h-24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// --- Empty Cart Component ---

export default function EmptyCartPage() {
  // Placeholder function for the CTA button action
  const router = useRouter();
  const handleStartShopping = () => {
    router.push("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 font-sans">
      <div
        className="
          bg-white 
          p-8 sm:p-12 
          rounded-3xl 
          shadow-xl 
          shadow-indigo-100/50
          max-w-md w-full 
          text-center 
          border border-gray-100
          transition-all duration-500
          hover:shadow-2xl
        "
      >
        {/* Visual Element */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-indigo-50 border-4 border-indigo-100/50">
            <ShoppingBagIcon className="w-20 h-20 text-indigo-400 opacity-80" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Your Cart is Empty!
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet. Explore our
          bestsellers and find something great!
        </p>

        {/* Call to Action Button */}
        <button
          onClick={handleStartShopping}
          className="
            w-full py-4 px-6 
            text-white text-lg cursor-pointer
            font-bold rounded-xl 
            bg-indigo-600 hover:bg-indigo-700 
            transition duration-300 ease-in-out 
            shadow-lg shadow-indigo-500/40 
            focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70 
            transform hover:scale-[1.01]
            tracking-wider
          "
        >
          Start Shopping Now
        </button>
      </div>
    </div>
  );
}
