import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebook } from "react-icons/fa";

function Facebook() {
  return (
    <button
      type="button"
      className="mt-4 w-full h-12 font-semibold rounded-2xl bg-secondary cursor-pointer text-white border border-secondary flex justify-center items-center gap-2"
      onClick={() =>
        signIn("facebook", { callbackUrl: "/other-verification-method" })
      }
    >
      <FaFacebook className="text-2xl text-white" /> Continue with Facebook
    </button>
  );
}

export default Facebook;
