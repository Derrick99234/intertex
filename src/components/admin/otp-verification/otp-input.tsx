"use client";

import { useEffect, useRef } from "react";

export default function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextValue = event.target.value.replace(/\D/g, "").slice(-1);
    const digits = value.padEnd(6, " ").split("");
    digits[index] = nextValue || " ";
    const normalized = digits.join("").replace(/\s/g, "");
    onChange(normalized);

    if (nextValue && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 my-5">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          inputMode="numeric"
          value={value[index] ?? ""}
          className="w-10 h-12 text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-black"
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </div>
  );
}
