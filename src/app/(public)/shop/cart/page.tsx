"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/constants";
import { NotificationSystem } from "@/components/notification-popup";
import { LoadingSpinner } from "@/components/loading-spinner";
import { AiOutlineDelete } from "react-icons/ai";
import DeliveryOption from "@/components/shop/delivery-option/delivery-option";

interface CartProduct {
  _id: string;
  price: number;
  slug: string;
  imageUrl: string;
}

interface CartItem {
  _id: string;
  product: CartProduct;
  size: string;
  quantity: number;
}

interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export default function CartSummary() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [deleting, setDeleting] = useState({
    productId: "",
    size: "",
  });
  const [loading, setLoading] = useState(true);

  // const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info",
  });
  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ message, type, status: true });

    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 2000);
  };
  async function fetchCart() {
    const token = localStorage.getItem("intertex-token");
    try {
      const res = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        showNotification(
          `Login failed: ${errorData.message || "Invalid credentials"}`,
          "error"
        );
        return;
      }
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("intertex-token");
    if (!token) {
      return;
    }
    setLoading(true);
    const fetchUserData = async () => {
      const response = await fetch(`${API_BASE_URL}/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setUser(data);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const [deliveryOption, setDeliveryOption] = useState("delivery");

  async function handleDelete(productId: string, size: string) {
    setLoading(true);
    const token = localStorage.getItem("intertex-token");
    try {
      setDeleting({
        productId,
        size,
      });
      await fetch(`${API_BASE_URL}/cart/${productId}/${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      // Refresh cart after deletion
      showNotification(`Cart Item deleted successfully`, "success");
      await fetchCart();
    } catch (err) {
      showNotification(`Error deleting item: ${err}`, "error");
    } finally {
      setLoading(false);
      setDeleting({
        productId: "",
        size: "",
      });
    }
  }

  if (!cart || cart.items.length === 0) {
    return <p className="text-center py-6">Your cart is empty</p>;
  }

  // Calculate subtotal, taxes, total
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.05; // Example 5% tax
  const total = subtotal + taxes;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const amount = total * 100; // Convert to kobo

      const payload = {
        email: user.email,
        amount,
        metadata: {
          customer_name: user.fullName,
          deliveryOption,
          cart: cart.items.map((item) => ({
            product_id: item._id,
            name: item.product.slug,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      };

      const res = await fetch(`${API_BASE_URL}/paystack/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        alert("Unable to initialize payment");
        console.error("Paystack response:", data);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Payment failed to start.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-6">
      <div className="max-w-2xl w-full mx-auto bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Cart Summary
        </h2>

        {/* Cart Items */}
        <div className="space-y-4 border-b border-gray-200 pb-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4"
            >
              {/* Product Image */}
              <div className="w-16 h-20 relative bg-gray-100 rounded-md">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.slug}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {item.product.slug.replace(/-/g, " ")}
                </h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>

              {/* Price + Delete */}
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">
                  ₦{(item.product.price * item.quantity).toLocaleString()}
                </span>
                <button
                  className="text-gray-400 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDelete(item.product._id, item.size)}
                >
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount Code */}
        <div className="flex items-center gap-2 my-4">
          <input
            type="text"
            placeholder="Gift or discount code"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 font-medium hover:bg-gray-300">
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ₦{total.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Including ₦{taxes.toLocaleString()} in taxes
          </p>
        </div>

        {/* Checkout Button */}
        {/* <button className="mt-6 w-full bg-secondary hover:bg-secondary/80 cursor-pointer text-white font-semibold py-3 rounded-md">
          Checkout
        </button> */}
      </div>
      <DeliveryOption
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        handlePayment={handlePayment}
      />
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={loading} />
    </div>
  );
}
