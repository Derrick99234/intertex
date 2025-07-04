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

export default function ProductTabs({ onDataChange }: ProductTabsProps) {
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

  const renderCategoriesTab = () => {
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
    ];
    return (
      <div className="space-y-6 p-6">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderImagesTab = () => {
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

    return (
      <div className="flex items-center p-6 gap-5 flex-wrap">
        {images.map((image, index) => (
          <div className="text-center" key={index}>
            <Image
              src={image.url}
              className="h-[16rem] w-[20rem] object-cover object-top"
              alt={image.label} // make sure you do the right thing here
              width={400}
              height={400}
            />
            <span className="mt-3 block">{image.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderDetailsTab = () => {
    const data = [
      {
        label: "Products Name",
        value: "Men",
      },
      {
        label: "Products Price",
        value: "N30,000",
      },
      {
        label: "Materials",
        value: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      },
      {
        label: "Process",
        value: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      },
      {
        label: "Offer",
        value: "20%",
      },
      {
        label: "Product Description",
        value: "Lorem ipsum dolor sit...",
      },
      {
        label: "Product Features",
        value: "Lorem ipsum dolor sit...",
      },
    ];
    return (
      <div className="space-y-6 p-6">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderSizeQuantitiesTab = () => {
    const data = [
      {
        label: "XXL",
        value: 5,
        thirdValue: "-",
      },
      {
        label: "S",
        value: 7,
        thirdValue: "-",
      },
      {
        label: "M",
        value: 3,
        thirdValue: "-",
      },
      {
        label: "L",
        value: 4,
        thirdValue: "-",
      },
      {
        label: "Total",
        value: 19,
        thirdValue: "-",
      },
    ];
    return (
      <div className="space-y-6 p-6">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const tabs: TabData[] = [
    {
      id: "categories",
      label: "Products Categories",
      component: renderCategoriesTab(),
    },
    {
      id: "images",
      label: "Images",
      component: renderImagesTab(),
    },
    {
      id: "details",
      label: "Products Details",
      component: renderDetailsTab(),
    },
    {
      id: "sizeQuantities",
      label: "Size and Quantities",
      component: renderSizeQuantitiesTab(),
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
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center p-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button
            onClick={goToPrevious}
            disabled={currentTabIndex === 0}
            className={`px-6 py-2 border rounded-lg font-medium transition-colors cursor-pointer ${
              currentTabIndex === 0
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          <button
            onClick={goToNext}
            disabled={currentTabIndex === tabs.length - 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              currentTabIndex === tabs.length - 1
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-[#FEB313] text-white hover:bg-[#FEB313]/70"
            }`}
          >
            {currentTabIndex === tabs.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

        <button className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Create New Product
        </button>
      </div>
    </div>
  );
}
