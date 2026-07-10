"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, TAX_RATE } from "@/lib/constants";
import { NotificationSystem } from "@/components/notification-popup";
import { LoadingSpinner } from "@/components/loading-spinner";
import { AiOutlineDelete } from "react-icons/ai";
import { authFetch } from "@/lib/auth-fetch";
import DeliveryOption, {
  CURRENCY_OPTIONS,
  CurrencyCode,
  DEFAULT_CURRENCY,
} from "@/components/shop/delivery-option/delivery-option";
import EmptyCartPage from "@/components/shop/empty-shopping-cart";

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
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info",
  ) => {
    setNotifications({ message, type, status: true });

    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 2000);
  };

  async function fetchCart() {
    try {
      const res = await authFetch("/cart");
      if (!res.ok) {
        const errorData = await res.json();
        showNotification(
          `Failed to load cart: ${errorData.message || "Unknown error"}`,
          "error",
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

  useEffect(() => {
    const savedCurrency = localStorage.getItem("intertex-currency");
    if (
      savedCurrency &&
      CURRENCY_OPTIONS.some((item) => item.code === savedCurrency)
    ) {
      setCurrency(savedCurrency as CurrencyCode);
      return;
    }

    const locale = navigator.language.toLowerCase();
    if (locale.includes("en-gb")) {
      setCurrency("GBP");
    } else if (locale.includes("en-ng")) {
      setCurrency("NGN");
    } else if (locale.includes("en-us")) {
      setCurrency("USD");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("intertex-currency", currency);
  }, [currency]);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    _id: "",
  });

  const [deliveryInformation, setDeliveryInformation] = useState({
    deliveryAddress: "",
    phoneNumber: "",
    address: "",
    alternativePhoneNumber: "",
    pickUpLocation: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      const response = await authFetch("/user/get-user");
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
    try {
      setDeleting({
        productId,
        size,
      });
      await authFetch(`/cart/${productId}/${size}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
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
    return <EmptyCartPage />;
  }

  const currencySymbol =
    CURRENCY_OPTIONS.find((option) => option.code === currency)?.symbol || "₦";

  const convertPrice = (price: number) => {
    if (currency === "GBP") return price / 2000;
    if (currency === "USD") return price / 1500;
    return price;
  };

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);

  const subtotal = cart.items.reduce(
    (acc, item) => acc + convertPrice(item.product.price) * item.quantity,
    0,
  );
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  const handlePayment = async () => {
    try {
      if (deliveryOption === "delivery" && !deliveryInformation.deliveryAddress.trim()) {
        showNotification("Please select a delivery address", "error");
        setLoading(false);
        return;
      }
      if (!deliveryInformation.phoneNumber.trim()) {
        showNotification("Please enter your phone number", "error");
        setLoading(false);
        return;
      }

      setLoading(true);

      const amount = Math.round(total * 100);

      const orderDetailstoSend = {
        currency,
        deliveryMethod: deliveryOption,
        amount: total,
        deliveryInformation: {
          deliveryAddress:
            deliveryInformation.pickUpLocation ||
            deliveryInformation.deliveryAddress ||
            deliveryInformation.address,
          phoneNumber: deliveryInformation.phoneNumber,
        },
        status: "pending",
        products: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
        })),
      };

      const orderRes = await authFetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetailstoSend),
      });

      let orderResponse: any;
      try {
        orderResponse = await orderRes.json();
      } catch {
        orderResponse = { status: orderRes.status, body: "Unable to parse response" };
      }

      if (!orderRes.ok) {
        console.error("Order creation failed:", orderRes.status, orderResponse);
        showNotification(
          orderResponse?.message || `Could not create order. Server responded with ${orderRes.status}.`,
          "error",
        );
        return;
      }

      const payload = {
        email: user.email,
        amount,
        currency,
        callback_url: `${window.location.origin}/payment-success`,
        metadata: {
          customer_name: user.fullName,
          deliveryOption,
          orderId: orderResponse._id,
          cart: cart.items.map((item) => ({
            product_id: item._id,
            name: item.product.slug,
            quantity: item.quantity,
            price: convertPrice(item.product.price),
          })),
        },
      };

      const res = await authFetch("/paystack/initialize", {
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
        showNotification("Unable to initialize payment", "error");
        console.error("Paystack response:", data);
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      showNotification("Payment failed to start.", "error");
      window.location.href = "/order";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-6 flex-wrap">
      <div className="max-w-2xl w-full mx-auto bg-white p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Cart Summary
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Showing prices in {currency} ({currencySymbol})
        </p>

        <div className="space-y-4 border-b border-gray-200 pb-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4"
            >
              <div className="w-16 h-20 relative bg-gray-100 rounded-md">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.slug}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {item.product.slug.replace(/-/g, " ")}
                </h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {formatMoney(
                    convertPrice(item.product.price) * item.quantity,
                  )}
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

        <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>
              {currencySymbol}
              {formatMoney(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total</span>
            <span className="text-lg font-semibold text-gray-900">
              {currencySymbol}
              {formatMoney(total)}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Including {currencySymbol}
            {formatMoney(taxes)} in taxes
          </p>
        </div>
      </div>

      <DeliveryOption
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        handlePayment={handlePayment}
        deliveryInformation={deliveryInformation}
        setDeliveryInformation={setDeliveryInformation}
        currency={currency}
        setCurrency={setCurrency}
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
