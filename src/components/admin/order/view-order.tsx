import { useState } from "react";
import DisplayDetails from "../display-details";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

export default function ViewOrder({
  order,
  onBack,
}: {
  order: any;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState("product-details");

  const renderProductDetailsTab = () => {
    const productSummary =
      order.products?.map((product: any, index: number) => ({
        label: `Item ${index + 1}`,
        value:
          product.productName ||
          product.product?.productName ||
          product.name ||
          "Unnamed product",
        thirdValue: `Qty: ${product.quantity ?? 1}`,
      })) ?? [];

    return (
      <div className="space-y-6 p-6 w-full">
        {productSummary.length > 0 ? (
          <DisplayDetails data={productSummary} />
        ) : (
          <p className="text-sm text-gray-500">No product details available.</p>
        )}
      </div>
    );
  };

  const renderOrderDetailsTab = () => {
    const data = [
      {
        label: "Order ID",
        value: order.id || order._id || "N/A",
      },
      {
        label: "Delivery Method",
        value: order.deliveryMethod || "N/A",
      },
      {
        label: "Items",
        value: order.items ?? order.products?.length ?? 0,
      },
      {
        label: "Delivery Address",
        value:
          order.deliveryInformation?.deliveryAddress ||
          order.deliveryInformation?.address ||
          "N/A",
      },
      {
        label: "Contact Phone",
        value: order.deliveryInformation?.phoneNumber || "N/A",
      },
      {
        label: "Alternative Call Line",
        value: order.deliveryInformation?.alternativePhoneNumber || "N/A",
      },
      {
        label: "Amount",
        value: order.amount || "N/A",
      },
      {
        label: "Order Status",
        value: order.status || "N/A",
      },
      {
        label: "Created",
        value: order.date || order.createdAt || "N/A",
      },
    ];
    return (
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderReviewsTab = () => {
    const data = [
      {
        label: "Star Rating",
        value: order.review?.rating || "N/A",
      },
      {
        label: "Message",
        value: order.review?.message || "No review available",
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
      id: "order-details",
      label: "Order Details",
      component: renderOrderDetailsTab(),
    },
    {
      id: "product-details",
      label: "Products Details",
      component: renderProductDetailsTab(),
    },
    {
      id: "reviews",
      label: "Reviews",
      component: renderReviewsTab(),
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
              className="border border-secondary py-2 px-4 text-secondary font-semibold rounded cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 m-4 w-full max-w-xs flex-col border rounded border-gray-300">
          <p className="text-center text-sm text-gray-500">
            Order media preview is not available for this order.
          </p>
        </div>
      </div>
    </div>
  );
}
