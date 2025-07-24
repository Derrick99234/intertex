import React from "react";
import OtpInput from "./otp-input";

function OtpVerification({
  setShowVerificationModal,
}: {
  setShowVerificationModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50"
      onClick={() => setShowVerificationModal(false)}
    >
      <div
        className="bg-white p-10 min-w-lg rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowVerificationModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-center">Kindly enter OTP sent to you</p>
        <form className="flex flex-col items-center justify-center p-4">
          <OtpInput />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <button
          className="text-red-500 text-center cursor-pointer font-semibold block mx-auto"
          onClick={() => alert("Resend OTP functionality not implemented")}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
