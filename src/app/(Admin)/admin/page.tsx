import Image from "next/image";
import Link from "next/link";
import React from "react";

function AdminLogin() {
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
        <form className="bg-white flex-col py-20 px-10 min-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center mt-5 mb-16 text-sm">
            Login into your account
          </p>
          <label htmlFor="email" className="text-lg mb-2 block">
            Email address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="mb-6 p-2 border border-gray-300 rounded w-full"
          />
          <label htmlFor="password" className="text-lg mb-2 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <Link href={"#"} className="text-right text-sm font-semibold block">
            Forget password ?
          </Link>
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-20"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
