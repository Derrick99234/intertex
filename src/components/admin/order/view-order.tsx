import { useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";
import Link from "next/link";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface ProductTabsProps {
  onDataChange?: (tabId: string, data: any) => void;
}

export default function ViewOrder({ onDataChange }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("product-details");
  // const [formData, setFormData] = useState({
  //   categories: {
  //     category: "Men",
  //     subCategory: "Casual Wear",
  //     type: "T-Shirts",
  //   },
  //   images: [],
  //   details: {},
  //   sizeQuantities: [],
  // });

  // const categoryOptions = {
  //   categories: ["Men", "Women", "Kids", "Unisex"],
  //   subCategories: {
  //     Men: ["Casual Wear", "Formal Wear", "Sports Wear", "Winter Wear"],
  //     Women: ["Casual Wear", "Formal Wear", "Party Wear", "Traditional"],
  //     Kids: ["Boys", "Girls", "Infants"],
  //     Unisex: ["Accessories", "Footwear", "Bags"],
  //   },
  //   types: {
  //     "Casual Wear": ["T-Shirts", "Jeans", "Shorts", "Polo Shirts"],
  //     "Formal Wear": ["Shirts", "Trousers", "Blazers", "Suits"],
  //     "Sports Wear": ["Track Suits", "Jerseys", "Shorts", "Tank Tops"],
  //     "Winter Wear": ["Jackets", "Sweaters", "Hoodies", "Coats"],
  //   },
  // };

  // const handleCategoryChange = (field: string, value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     categories: { ...prev.categories, [field]: value },
  //   }));

  //   if (onDataChange) {
  //     onDataChange("categories", { ...formData.categories, [field]: value });
  //   }
  // };

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
        value: "ORD123456",
      },
      {
        label: "Delivery Method",
        value: "Pick-Up",
      },
      {
        label: "Delivery Address",
        value: "123 Main St, City, Country",
      },
      {
        label: "Contact Phone",
        value: "123-456-7890",
      },
      {
        label: "Alternative Call Line",
        value: "098-765-4321",
      },
      {
        label: "Delivery Fee",
        value: "$400",
      },
      {
        label: "Order Status",
        value: "Pending",
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
      <div className="min-h-[400px] flex justify-between">
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
                className="h-[10rem] w-[16rem] object-cover object-top border rounded border-gray-300"
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
