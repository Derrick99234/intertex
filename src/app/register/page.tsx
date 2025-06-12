import InputField from "@/components/input-field/input-field";
import Facebook from "@/components/other-authentication-method/facebook";
import Google from "@/components/other-authentication-method/google";
import Link from "next/link";
import React from "react";

function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          id="fullName"
          name="fullName"
          required
        />
        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          required
        />
        <p className="text-[10.91px] text-gray-600 mb-4 font-semibold">
          <input type="checkbox" name="" className="mr-1" id="" />
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
        <button
          type="submit"
          className="mt-4 px-4 py-3 w-full bg-secondary text-white rounded-2xl hover:bg-secondary/70 transition-colors duration-200"
        >
          Sign Up
        </button>
        <p className="my-6 text-sm text-center">Sign up faster with</p>
        <Google />
        <Facebook />
        <p className="mt-4 text-sm text-center text-gray-600">
          I already have an account,
          <Link href={"/login"} className="text-secondary hover:underline">
            {" "}
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
