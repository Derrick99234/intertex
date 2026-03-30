"use client";

import OtpVerification from "@/components/admin/otp-verification/otp-verification";
import { useSearchParams } from "next/navigation";
import React from "react";

function ResetEmailSent() {
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "example@domain.com";

  return (
    <section>
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center mt-24">
            Check your mail
          </h2>
          <p className="text-center text-lg mt-5 mb-16">
            If your account exists for {email}, <br />
            you&apos;ll receive an OTP confirmation code in your email.
          </p>
          <button
            type="button"
            className="bg-secondary text-lg text-white w-full cursor-pointer px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
            onClick={() => setShowVerificationModal(true)}
          >
            Enter OTP
          </button>
        </div>
      </div>
      {showVerificationModal && (
        <OtpVerification
          email={email}
          setShowVerificationModal={setShowVerificationModal}
        />
      )}
    </section>
  );
}

export default ResetEmailSent;
