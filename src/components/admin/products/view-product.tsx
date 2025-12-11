import { JSX, useEffect, useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { IoEyeOutline } from "react-icons/io5";
import { Subcategory, Type } from "@/components/shop/shop-page";
import { ArrowLeft } from "lucide-react";

interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface ProductTabsProps {
  onDataChange?: (tabId: string, data: any) => void;
  productId: string;
  setViewProduct: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      productId: string;
    }>
  >;
}

export interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  materials: string;
  slug: string;
  process: string;
  inStock: Array<{
    size: string;
    quantity: number;
  }>;
  offer: string;
  features: string;
  ratings: number;
  imageUrl: string;
  otherImages: string[];
  productType: Type;
  subcategory: Subcategory;
  createdAt?: string;
  __v?: number;
}

export default function ViewProduct({
  productId,
  setViewProduct,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("product-details");
  const [product, setProduct] = useState<Product>({
    _id: "",
    productName: "",
    description: "",
    price: 0,
    materials: "",
    process: "",
    inStock: [],
    offer: "",
    features: "",
    ratings: 0,
    imageUrl: "",
    otherImages: [],
    slug: "",
    productType: {
      name: "",
      description: "",
      status: true,
      subcategory: {
        _id: "",
        name: "",
        description: "",
        slug: "",
        status: true,
        createdAt: "",
        updatedAt: "",
        category: {
          _id: "",
          name: "",
          description: "",
          slug: "",
        },
      },
      slug: "",
    },
    subcategory: {
      _id: "",
      name: "",
      description: "",
      slug: "",
      status: true,
      createdAt: "",
      updatedAt: "",
      category: {
        _id: "",
        name: "",
        description: "",
        slug: "",
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);
  const renderProductDetailsTab = () => {
    const data = [
      {
        label: "Category",
        value: product?.productType?.name || "",
      },
      {
        label: "Sub-Categories",
        value: product?.productType?.name || "",
      },
      {
        label: "Types",
        value: product?.productType?.name || "",
      },
      {
        label: "Product Name",
        value: product?.productName || "",
      },
      {
        label: "Products Price",
        value: product?.price || "",
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
      <div className="space-y-6 p-6 w-full">
        <DisplayDetails data={data} />
      </div>
    );
  };

  const data = product.otherImages.map((item, index) => {
    return {
      url: item || "",
      label: `Image ${index + 1}`,
    };
  });

  const images = [
    ...data,
    {
      url: product.imageUrl || "",
      label: `Image ${data.length + 1}`,
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
    const data = product.inStock.map((item) => {
      return {
        label: item?.size || "",
        value: item?.quantity || "",
      };
    });
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
      <ArrowLeft
        className="ml-4 mt-4 block cursor-pointer"
        onClick={() =>
          setViewProduct({
            status: false,
            productId: "",
          })
        }
      />
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
                Buyers Details
              </Link>
              <button className="border border-b-secondary py-2 px-6 text-secondary font-semibold rounded cursor-pointer">
                Edit
              </button>
              <button className="border border-red-500 bg-red-500 py-2 px-8 text-white font-semibold rounded cursor-pointer">
                Delete
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
                src={image.url || ""}
                className="h-[10rem] w-[16rem] object-cover object-top border rounded border-gray-300"
                alt={image.label}
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
