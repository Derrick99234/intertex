"use client";
import InputField from "@/components/input-field/input-field";
import Facebook from "@/components/other-authentication-method/facebook";
import Google from "@/components/other-authentication-method/google";
import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Invalid credentials"}`);
        return;
      }

      const data = await response.json();

      // Save token if returned
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }

      alert("Login successful!");
      router.push("/update-profile");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form
        className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <InputField
          label="Email Address"
          onChange={handleChange}
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          required
        />
        <InputField
          label="Password"
          onChange={handleChange}
          id="password"
          name="password"
          required
          type="password"
        />
        <p className="text-[10.91px] text-gray-600 mb-4 font-semibold text-right">
          Forget password?{" "}
          <Link
            href={"/password-reset"}
            className="text-secondary hover:underline"
          >
            Reset now
          </Link>{" "}
          .
        </p>
        <button
          type="submit"
          className="mt-4 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200"
        >
          Sign In
        </button>
        <p className="my-6 text-sm text-center">Sign in faster with</p>
        <Google />
        <Facebook />
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account,
          <Link href={"/register"} className="text-secondary hover:underline">
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
