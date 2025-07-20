"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ClientResetForm({
  params,
}: {
  params: { token: string };
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = params.token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("Password reset successful!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex-col mt-20 px-10 min-w-xs"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            Reset Your {token}
          </h2>
          <p className="text-center mt-5 mb-16 text-sm">
            Kindly enter your new password and confirm
          </p>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}
