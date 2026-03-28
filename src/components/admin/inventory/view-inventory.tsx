import { useState } from "react";
import DisplayDetails from "@/components/admin/display-details";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

export default function ViewInventory({
  product,
  onBack,
}: {
  product: any;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState("product-details");

  const renderProductDetailsTab = () => {
    const data = [
      {
        label: "Product ID",
        value: product?._id || "N/A",
      },
      {
        label: "Product Name",
        value: product?.name || "N/A",
      },
      {
        label: "Subcategory",
        value: product?.subcategory?.name || "N/A",
      },
      {
        label: "Status",
        value: product?.status ? "Active" : "Inactive",
      },
      {
        label: "Created At",
        value: product?.createdAt
          ? new Date(product.createdAt).toLocaleDateString("en-GB")
          : "N/A",
      },
    ];
    return (
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderQuantityLeftTab = () => {
    const stockRows =
      product?.sizes?.map((size: any) => ({
        label: size.size || "Unknown",
        value: size.quantity ?? 0,
      })) || [];

    const data =
      stockRows.length > 0
        ? stockRows
        : [
            {
              label: "Total Products",
              value: product?.totalProducts ?? "N/A",
            },
            {
              label: "Total Sold",
              value: product?.totalSold ?? "N/A",
            },
          ];

    return (
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const tabs: TabData[] = [
    {
      id: "product-details",
      label: "Products Details",
      component: renderProductDetailsTab(),
    },
    {
      id: "quantity-left",
      label: "Quantity Left",
      component: renderQuantityLeftTab(),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-secondary text-secondary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px] flex justify-between">
        <div className="flex flex-col w-full">
          {tabs.find((tab) => tab.id === activeTab)?.component}
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="border border-secondary py-2 px-6 text-secondary font-semibold rounded cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 m-4 w-full max-w-xs flex-col border rounded border-gray-300">
          <p className="text-center text-sm text-gray-500">
            Product media preview is not available in inventory view yet.
          </p>
        </div>
      </div>
    </div>
  );
}
