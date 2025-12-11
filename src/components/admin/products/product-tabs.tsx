import { useEffect, useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import AddNewProducts from "./add-new-products";
import EditProduct from "./edit-product";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface ProductTabsProps {
  productId: string;
  setViewProduct: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      productId: string;
    }>
  >;
}

export default function ProductTabs({
  productId,
  setViewProduct,
}: ProductTabsProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("categories");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState(false);

  const fetchProduct = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { product, message } = await res.json();

      if (!res.ok) throw new Error(message || "Failed to fetch product");
      setProduct(product);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const renderCategoriesTab = () => {
    const data = [
      {
        label: "Category",
        value: product?.subcategory?.category?.name || "",
      },
      {
        label: "Sub-Category",
        value: product?.subcategory?.name || "",
      },
      {
        label: "Type",
        value: product?.productType?.name || "",
      },
    ];
    return (
      <div className="space-y-6 p-6">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const renderImagesTab = () => {
    console.log("otherImages", product);
    const otherImages = product?.otherImages?.map(
      (image: string, index: number) => {
        return { url: image, label: `Other Image ${index + 1}` };
      }
    );
    const images = [
      {
        url: product?.imageUrl,
        label: "Product Main Image",
      },
      ...otherImages,
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
        value: product?.productName || "",
      },
      {
        label: "Products Price",
        value: "N" + (product?.price || ""),
      },
      {
        label: "Materials",
        value: product?.materials || "",
      },
      {
        label: "Process",
        value: product?.process || "",
      },
      {
        label: "Offer",
        value: product?.offer || "",
      },
      {
        label: "Product Description",
        value: product?.description || "",
      },
      {
        label: "Product Features",
        value: product?.features || "",
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
    // // {
    // //   id: "images",
    // //   label: "Images",
    // //   component: renderImagesTab(),
    // },
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

        <button
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => setEditProduct(true)}
        >
          Update Product
        </button>
      </div>
      {editProduct && (
        <EditProduct
          setEditProduct={setEditProduct}
          product={product}
          setProducts={setProduct}
        />
      )}
    </div>
  );
}
