"use client";
import OtpVerification from "@/components/admin/otp-verification/otp-verification";
import React from "react";

function ResetEmailSent() {
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
  return (
    <section>
      <div className="flex justify-center items-center ">
        <div className="">
          <h2 className="text-3xl font-bold mb-8 text-center mt-24">
            Check your mail
          </h2>
          <p className="text-center text-lg mt-5 mb-16">
            If your account exist for example@domain.com <br />
            you’ll receive OTP confirmation code on your email
          </p>
          <button
            className="bg-secondary text-lg text-white w-full cursor-pointer px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
            onClick={() => setShowVerificationModal(true)}
          >
            Okay
          </button>
        </div>
      </div>
      {showVerificationModal && (
        <OtpVerification setShowVerificationModal={setShowVerificationModal} />
      )}
    </section>
  );
}

export default ResetEmailSent;
