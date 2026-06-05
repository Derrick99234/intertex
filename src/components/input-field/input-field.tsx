"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

function InputField({
  label,
  className,
  placeholder,
  type,
  id,
  readOnly,
  name,
  onChange,
  value,
  required,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type || "text";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-700`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={resolvedType}
          id={id}
          name={name}
          placeholder={placeholder}
          className={`mt-1 block w-full bg-gray-100 outline-none py-4 px-6 mb-5 rounded-3xl sm:text-sm ${isPassword ? "pr-12" : ""} ${className}`}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
