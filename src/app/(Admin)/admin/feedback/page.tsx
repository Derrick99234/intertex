"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import { useMemo } from "react";

export default function FeedbackPage() {
  const feedback = useMemo(
    () => [
      {
        id: "FB-001",
        name: "Anonymous",
        email: "anonymous@example.com",
        message: "No feedback yet.",
        date: new Date().toLocaleDateString("en-GB"),
        more: "View",
      },
    ],
    []
  );

  return (
    <section className="py-5">
      <DynamicTable
        title="Feedback"
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email", type: "email" as const },
          { key: "message", label: "Message" },
          { key: "date", label: "Date", type: "date" as const },
          { key: "more", label: "More", type: "action" as const },
        ]}
        data={feedback}
        itemsPerPage={5}
        searchPlaceholder="Search by email..."
        showViewAll={false}
        onAction={() => {}}
      />
    </section>
  );
}

