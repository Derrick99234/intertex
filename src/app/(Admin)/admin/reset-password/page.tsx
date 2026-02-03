import React from "react";

function ResetPassword() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form className="bg-white flex-col py-12 sm:py-16 px-6 sm:px-10 rounded">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          <p className="text-center mt-5 mb-16 text-sm">
            Kindly enter your registered email address and OTP code will be send
            for confirmation.
          </p>
          {/* <label htmlFor="email" className="text-lg mb-2 block">
            Email address
          </label> */}
          <input
            type="email"
            placeholder="Enter your email"
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
          />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
