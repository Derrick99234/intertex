import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function Google() {
  return (
    <button
      onClick={() =>
        signIn("google", { callbackUrl: "/other-verification-method" })
      }
      className="w-full h-12 font-semibold rounded-2xl border border-secondary flex justify-center items-center gap-2 cursor-pointer"
    >
      <FcGoogle className="text-2xl" /> Continue with Google
    </button>
  );
}

export default Google;
