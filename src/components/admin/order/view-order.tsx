import { useEffect, useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";
import Link from "next/link";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

export default function ViewOrder({ order }: any) {
  const [activeTab, setActiveTab] = useState("product-details");

  useEffect(() => {
    console.log("Order data:", order);
  }, []);

  const renderProductDetailsTab = () => {
    const data = [
      {
        label: "Category",
        value: "Men",
      },
      {
        label: "Sub-Categories",
        value: "casual Wears",
      },
      {
        label: "Types",
        value: "T-shirts",
      },
      {
        label: "Product Name",
        value: "Blue T-shirt",
      },
      {
        label: "Products Price",
        value: "N30,000",
      },
      {
        label: "Materials",
        value: "-",
      },
      {
        label: "Process",
        value: "-",
      },
      {
        label: "Offer",
        value: "20%",
      },
      {
        label: "Product Description",
        value: "-",
      },
      {
        label: "Product Features",
        value: "-",
      },
      {
        label: "Total Price",
        value: "$900",
      },
    ];
    return (
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const images = [
    {
      url: "/images/design1.jpeg",
      label: "Image 1",
    },
    {
      url: "/images/design2.jpeg",
      label: "Image 2",
    },
    {
      url: "/images/design3.jpeg",
      label: "Image 3",
    },
  ];
  const renderOrderDetailsTab = () => {
    const data = [
      {
        label: "Order ID",
        value: order.id,
      },
      {
        label: "Delivery Method",
        value: order.deliveryMethod,
      },
      {
        label: "Delivery Address",
        value: order.deliveryInformation?.deliveryAddress,
      },
      {
        label: "Contact Phone",
        value: order.deliveryInformation?.phoneNumber,
      },
      {
        label: "Alternative Call Line",
        value: "-",
      },
      {
        label: "Delivery Fee",
        value: "-",
      },
      {
        label: "Order Status",
        value: order.status,
      },
      {
        label: "Delivery/Pick-up Date",
        value: "-",
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
        value: "-",
      },
      {
        label: "Message",
        value: "-",
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

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const goToPrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tab Headers */}
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

      {/* Tab Content */}
      <div className="min-h-100 flex justify-between">
        <div className="flex flex-col w-full">
          {tabs.find((tab) => tab.id === activeTab)?.component}
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <Link
                href="/admin/product-management/buyers"
                className="border border-b-secondary py-2 px-4 text-secondary font-semibold rounded cursor-pointer"
              >
                Edit
              </Link>
              <button className="border border-b-secondary py-2 px-6 text-white bg-secondary font-semibold rounded cursor-pointer">
                Change Status
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center p-6 m-4 gap-3 w-full max-w-xs flex-col border rounded border-gray-300">
          {images.map((image, index) => (
            <div className="text-center" key={index}>
              <Image
                src={image.url}
                className="h-40 w-[16rem] object-cover object-top border rounded border-gray-300"
                alt={image.label} // make sure you do the right thing here
                width={400}
                height={400}
              />
              <span className="block">{image.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
