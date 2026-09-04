import { useEffect, useState } from "react";
import DisplayDetails from "../display-details";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import AddNewProducts from "./add-new-products";
import EditProduct from "./edit-product";
import { ArrowLeft } from "lucide-react";
import { authFetch } from "@/lib/auth-fetch";
import DeletePopup from "../blog/delete-popup";

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
  onProductDeleted?: (id: string) => void;
  onProductUpdated?: (product: any) => void;
}

export default function ProductTabs({
  productId,
  setViewProduct,
  onProductDeleted,
  onProductUpdated,
}: ProductTabsProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("categories");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await authFetch(`/products/${productId}`, {
        refreshPath: "/admin/refresh",
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
    const otherImages = (product?.otherImages || [])
      .filter((img: string) => Boolean(img))
      .map((image: string, index: number) => {
        return { url: image, label: `Other Image ${index + 1}` };
      });
    const images = [
      ...(product?.imageUrl
        ? [{ url: product.imageUrl, label: "Product Main Image" }]
        : []),
      ...otherImages,
    ];

    if (images.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          No images uploaded for this product.
        </div>
      );
    }

    return (
      <div className="flex items-center p-6 gap-5 flex-wrap">
        {images.map((image, index) => (
          <div className="text-center" key={index}>
            <Image
              src={image.url}
              className="h-[16rem] w-[20rem] object-cover object-top"
              alt={image.label}
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
        value: "₦" + Number(product?.price || 0).toLocaleString("en-NG"),
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
    const data = (product?.inStock || []).map((item: any) => ({
      label: item.size,
      value: item.quantity,
    }));
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
        <div className="flex flex-wrap items-center cursor-pointer px-8">
          <ArrowLeft
            onClick={() => setViewProduct({ status: false, productId: "" })}
            className="mr-4 h-6 w-6 text-gray-600 hover:text-gray-800"
          />

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
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] text-gray-600">
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
            {currentTabIndex === tabs.length - 1 ? "" : "Next"}
          </button>
        </div>

        <div className="flex space-x-3">
          <button
            className="px-6 py-2 cursor-pointer bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </button>
          <button
            className="px-6 py-2 cursor-pointer bg-secondary text-white rounded-lg font-medium hover:bg-secondary/75 transition-colors"
            onClick={() => setEditProduct(true)}
          >
            Update Product
          </button>
        </div>
      </div>
      {editProduct && (
        <EditProduct
          setEditProduct={setEditProduct}
          product={product}
          setProducts={setProduct}
          onProductUpdated={(updated) => {
            setProduct(updated);
            onProductUpdated?.(updated);
          }}
        />
      )}
      {showDeleteModal && (
        <DeletePopup
          title="Delete Product"
          text="Are you sure you want to delete this product? This action cannot be undone."
          onClose={() => setShowDeleteModal(false)}
          onDelete={async () => {
            setIsDeleting(true);
            try {
              const res = await authFetch(`/products/${productId}`, {
                method: "DELETE",
                refreshPath: "/admin/refresh",
              });
              if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Failed to delete product");
              }
              setShowDeleteModal(false);
              onProductDeleted?.(productId);
              setViewProduct({ status: false, productId: "" });
            } catch (err: any) {
              alert(err?.message || "Failed to delete product");
            } finally {
              setIsDeleting(false);
            }
          }}
        />
      )}
    </div>
  );
}
