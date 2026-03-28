"use client";
import { useState } from "react";

export default function EmailManagementPage() {
  const [form, setForm] = useState({
    subject: "",
    audience: "All Subscribers",
    message: "",
  });

  return (
    <section className="py-5">
      <div className="bg-white rounded-lg shadow p-5 max-w-3xl">
        <h1 className="text-lg font-semibold text-secondary mb-4">
          Email Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Subject
            </label>
            <input
              value={form.subject}
              onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
              className="w-full border rounded px-3 py-2 outline-none"
              placeholder="Newsletter subject"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Audience
            </label>
            <select
              value={form.audience}
              onChange={(e) => setForm((p) => ({ ...p, audience: e.target.value }))}
              className="w-full border rounded px-3 py-2 outline-none bg-white"
            >
              <option>All Subscribers</option>
              <option>Customers</option>
              <option>Leads</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="w-full border rounded px-3 py-2 outline-none min-h-40"
            placeholder="Write your email content..."
          />
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="button"
            className="bg-secondary text-white px-5 py-2 rounded cursor-pointer hover:bg-secondary/80"
            onClick={() => {}}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

