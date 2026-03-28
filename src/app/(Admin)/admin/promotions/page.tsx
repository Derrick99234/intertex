"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import { useMemo } from "react";

export default function PromotionsPage() {
  const promotions = useMemo(
    () => [
      {
        id: "PROMO-001",
        code: "WELCOME10",
        discount: "10%",
        status: "Active",
        starts: "N/A",
        ends: "N/A",
        more: "Manage",
      },
    ],
    []
  );

  return (
    <section className="py-5">
      <DynamicTable
        title="Create Promotion"
        columns={[
          { key: "code", label: "Code" },
          { key: "discount", label: "Discount" },
          { key: "status", label: "Status" },
          { key: "starts", label: "Starts" },
          { key: "ends", label: "Ends" },
          { key: "more", label: "More", type: "action" as const },
        ]}
        data={promotions}
        itemsPerPage={5}
        searchPlaceholder="Search by code..."
        showViewAll={true}
        onViewAll={() => {}}
        onAction={() => {}}
      />
    </section>
  );
}

