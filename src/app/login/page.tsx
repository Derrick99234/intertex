import InputField from "@/components/input-field/input-field";
import Facebook from "@/components/other-authentication-method/facebook";
import Google from "@/components/other-authentication-method/google";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary">
      <form className="max-w-md w-full mx-auto p-6 px-10 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          id="email"
          name="email"
          required
        />
        <InputField
          label="Password"
          //   placeholder="Enter your full name"
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
          <Link href={"/login"} className="text-secondary hover:underline">
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
