import InputField from "@/components/input-field/input-field";
import Link from "next/link";
import React from "react";

function ResetPassword() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center mt-2 mb-10 text-gray-600">
          Enter your email below to reset your password
        </p>
        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200"
        >
          Proceed
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          I remembered my password,
          <Link href={"/login"} className="text-secondary hover:underline">
            {" "}
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default ResetPassword;
