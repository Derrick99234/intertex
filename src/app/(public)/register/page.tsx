"use client";
import CreatePassword from "@/components/auth/create-user";
import InputField from "@/components/input-field/input-field";
import Google from "@/components/other-authentication-method/google";
import Link from "next/link";
import React, { useState } from "react";

function Register() {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isTermsAndConditionsChecked) {
      setError("You must agree to the terms and conditions before proceeding.");
      return;
    }
    setShowCreatePassword(true);
  };

  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form
        className={`max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10 ${
          showCreatePassword ? "hidden" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          id="fullName"
          onChange={handleChange}
          name="fullName"
          required
        />
        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        />
        <p className="text-[10.91px] text-gray-600 mb-4 font-semibold">
          <input
            type="checkbox"
            name="terms"
            className="mr-1"
            id="terms"
            checked={isTermsAndConditionsChecked}
            onChange={(e) => setIsTermsAndConditionsChecked(e.target.checked)}
          />
          Before proceeding, you must agree to our{" "}
          <Link
            href={"/terms-conditions"}
            className="text-secondary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/terms-conditions"}
            className="text-secondary hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          , along with our partners{" "}
          <Link
            href={"/terms-conditions"}
            className="text-secondary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/terms-conditions"}
            className="text-secondary hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          .
        </p>
        {error && (
          <p className="text-red-600 text-sm text-center mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200"
        >
          Continue
        </button>
        <p className="my-6 text-sm text-center">Sign up faster with</p>
        <Google />
        <p className="mt-4 text-sm text-center text-gray-600">
          I already have an account,
          <Link href={"/login"} className="text-secondary hover:underline">
            {" "}
            Sign in
          </Link>
        </p>
      </form>
      {showCreatePassword && <CreatePassword form={form} />}
    </section>
  );
}

export default Register;
