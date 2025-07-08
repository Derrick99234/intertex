import { useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface ProductTabsProps {
  onDataChange?: (tabId: string, data: any) => void;
}

export default function ViewProduct({ onDataChange }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("categories");
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
  const renderSalesDetailsTab = () => {
    const data = [
      {
        label: "XXL",
        value: 5,
        thirdValue: "$1000",
      },
      {
        label: "S",
        value: 7,
        thirdValue: "$995",
      },
      {
        label: "M",
        value: 3,
        thirdValue: "$500",
      },
      {
        label: "L",
        value: 4,
        thirdValue: "$892",
      },
      {
        label: "Total",
        value: 19,
        thirdValue: "$11490",
      },
    ];
    return (
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderQuantityLeftTab = () => {
    const data = [
      {
        label: "XXL",
        value: 5,
      },
      {
        label: "S",
        value: 7,
      },
      {
        label: "M",
        value: 3,
      },
      {
        label: "L",
        value: 4,
      },
      {
        label: "Total",
        value: 19,
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
      id: "sales-details",
      label: "Sales Details",
      component: renderSalesDetailsTab(),
    },
    {
      id: "quantity-left",
      label: "Quantity Left",
      component: renderQuantityLeftTab(),
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
              <button className="border border-b-secondary py-2 px-4 text-secondary font-semibold rounded cursor-pointer">
                Buyers Details
              </button>
              <button className="border border-red-500 bg-red-500 py-2 px-8 text-white font-semibold rounded cursor-pointer">
                Delete
              </button>

              <button className="border border-b-secondary py-2 px-6 text-secondary font-semibold rounded cursor-pointer">
                Upload
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-semibold">
                Deactivate products
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-7 h-4 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-secondary"></div>
              </label>
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
