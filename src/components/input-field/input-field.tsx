import React from "react";

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
      <input
        type={type || "text"}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full bg-gray-100 outline-none py-4 px-6 mb-5 rounded-3xl sm:text-sm ${className}`}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        required={required}
      />
    </div>
  );
}

export default InputField;
