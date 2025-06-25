// components/OtpInput.tsx
"use client";

import { useRef } from "react";

export default function OtpInput() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // Move to next input if a digit is entered
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Only allow numbers
    if (!/^\d?$/.test(value)) {
      e.target.value = "";
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 my-5">
      {Array.from({ length: 6 }, (_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          inputMode="numeric"
          className="w-10 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-black"
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
