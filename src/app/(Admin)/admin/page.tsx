"use client"; // <== Required if you're using Next.js App Router

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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
    }, 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        showNotification(data.message || "Login failed", "error");
        throw new Error(data.message || "Login failed");
      }

      showNotification("Login successful", "success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showNotification("redirecting to dashboard...", "info");

      const { accessToken } = await res.json();
      localStorage.setItem("adminToken", accessToken);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
      showNotification(err.message || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex justify-center max-w-5xl w-full">
        <div className="bg-secondary w-full">
          <Image
            src={"/logo/intertex_logo_2.png"}
            alt="Admin Login"
            width={200}
            height={200}
            className="w-36 h-auto mt-4 ml-4"
          />
          <Image
            src={"/images/admin-images/Shopping bag-bro.png"}
            alt="Admin Login"
            width={200}
            height={200}
            className="w-[30rem] h-auto"
          />
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white flex-col py-20 px-10 min-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center mt-5 mb-8 text-sm">
            Login into your account
          </p>

          {/* {error && (
            <p className="text-red-600 text-center mb-4 font-semibold">
              {error}
            </p>
          )} */}

          <label htmlFor="email" className="text-lg mb-2 block">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
            className="mb-6 p-2 border border-gray-300 rounded w-full"
          />

          <label htmlFor="password" className="text-lg mb-2 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />

          <Link href="#" className="text-right text-sm font-semibold block">
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-secondary text-lg text-white cursor-pointer w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-20"
          >
            {/* {loading ? "Signing in..." : "Sign In"} */}
            sign in
          </button>
        </form>
      </div>
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </section>
  );
}

export default AdminLogin;
