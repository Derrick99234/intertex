import React from "react";
import { FcGoogle } from "react-icons/fc";

function Google() {
  return (
    <button className="w-full h-12 font-semibold rounded-2xl border border-secondary flex justify-center items-center gap-2">
      <FcGoogle className="text-2xl" /> Continue with Google
    </button>
  );
}

export default Google;
