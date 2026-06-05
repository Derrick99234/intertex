"use client";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function CreatePassword({
  form,
}: {
  form: {
    fullName: string;
    email: string;
  };
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      if (form.fullName === "" || form.email === "") {
        window.location.href = "/register";
      }
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: newPassword,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
      alert("User created successfully!");
      router.push("/login");
    } else {
      console.error("Passwords do not match");
    }
  };

  const criteria = [
    {
      label: "At least 8 characters",
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: "Lower case letters",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "Upper case letters",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Numbers",
      test: (pw: string) => /\d/.test(pw),
    },
    {
      label: "Special characters (e.g. !@#$%^&*)",
      test: (pw: string) => /[!@#$%^&*]/.test(pw),
    },
  ];

  return (
    <form
      className="bg-white rounded-2xl shadow-md max-w-md w-full p-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold">Create Password</h2>
        <p className="text-gray-500 text-sm mt-1">
          Enter new sets of passwords
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter New Password
          </label>
          <div className="relative mt-1">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Abc1234@1"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              tabIndex={-1}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-800 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition">
          Submit
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <p className="text-sm font-medium text-gray-800 mb-2">
          Your password must contain:
        </p>
        <ul className="space-y-2">
          {criteria.map((item, idx) => {
            const passed = item.test(newPassword);
            return (
              <li key={idx} className="flex items-center space-x-2 text-sm">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    passed
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {passed ? "✓" : "✕"}
                </div>
                <span
                  className={`${passed ? "text-gray-700" : "text-gray-400"}`}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );
}
