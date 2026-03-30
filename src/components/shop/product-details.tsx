"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "../admin/products/view-product";
import { API_BASE_URL } from "@/lib/constants";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        type="button"
        className="w-full flex justify-between items-center py-2 text-left font-semibold text-base"
        onClick={() => setOpen((current) => !current)}
      >
        {title}
        <span className="text-[#091697] text-base font-bold">
          {open ? "-" : "+"}
        </span>
      </button>
      {open && <div className="pb-4 text-gray-700 text-sm">{children}</div>}
    </div>
  );
};

function ProductDetails({
  slug,
  product,
}: {
  slug: string[];
  product: Product;
}) {
  const router = useRouter();
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [variationCounts, setVariationCounts] = useState<{
    [size: string]: number;
  }>({});
  const [moreLikeThis, setMoreLikeThis] = useState<Product[]>([]);
  const [relatedImgIdxs, setRelatedImgIdxs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ status: true, message, type });
    window.setTimeout(() => {
      setNotifications((current) => ({ ...current, status: false }));
    }, 2500);
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.productType?.slug) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/products/type/${product.productType.slug}`
        );
        const data = await res.json();
        const relatedProducts = (data.products ?? []).filter(
          (item: Product) => item._id !== product._id
        );
        setMoreLikeThis(relatedProducts);
      } catch {
        setMoreLikeThis([]);
      }
    };

    fetchRelatedProducts();
  }, [product?._id, product?.productType?.slug]);

  useEffect(() => {
    setRelatedImgIdxs(moreLikeThis.map(() => 0));
  }, [moreLikeThis]);

  if (!product?._id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Image
          src="/icons/search.png"
          alt="Not found"
          width={48}
          height={48}
          className="opacity-40 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Product Not Found
        </h2>
        <Link href="/shop" className="text-blue-600 underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const segments = [
    { name: "All", href: "/shop" },
    ...slug.map((segment, index) => {
      const href = `/shop/${slug.slice(0, index + 1).join("/")}`;
      return { name: segment.replace(/-/g, " "), href };
    }),
  ];

  const images = [product.imageUrl, ...(product.otherImages ?? [])].filter(Boolean);

  const handleAddToCart = async () => {
    try {
      const itemsToAdd = Object.entries(variationCounts)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          product: product._id,
          size,
          quantity,
        }));

      if (itemsToAdd.length === 0) {
        showNotification("Please select at least one variation.", "error");
        return;
      }

      const token = localStorage.getItem("intertex-token");
      if (!token) {
        router.push("/login?redirect=/shop/cart");
        return;
      }

      setIsLoading(true);
      const responses = await Promise.all(
        itemsToAdd.map((item) =>
          fetch(`${API_BASE_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
          })
        )
      );

      if (responses.some((response) => response.status === 401)) {
        router.push("/login?redirect=/shop/cart");
        return;
      }

      if (!responses.every((response) => response.ok)) {
        showNotification(
          "Something went wrong while adding to cart. Please try again.",
          "error"
        );
        return;
      }

      showNotification("Added to cart successfully.", "success");
      router.push("/shop/cart");
    } catch {
      showNotification("Unable to add this item to cart right now.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto md:py-8 px-2 md:px-8">
      <nav
        className="flex items-center text-[13px] text-gray-600 mb-2 py-2"
        aria-label="Breadcrumb"
      >
        <div className="flex items-center flex-wrap">
          {segments.map((segment, index) => (
            <div key={segment.href} className="flex items-center">
              <Link
                href={segment.href}
                className={`hover:underline ${
                  index === segments.length - 1
                    ? "text-[#A3A3A3]"
                    : "text-[#091697]"
                } font-normal text-lg`}
              >
                {segment.name}
              </Link>

              {index < segments.length - 1 && (
                <Image
                  src="/icons/arrow-left.png"
                  alt="Breadcrumb separator"
                  width={10}
                  height={10}
                  className="mx-2"
                />
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl">
        <div className="flex md:flex-row w-full md:w-[574px] md:h-[535px] h-[423px] bg-gray-100">
          <div className="flex flex-col gap-2 md:gap-4 items-center md:items-start">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`border rounded-md overflow-hidden mb-2 focus:outline-none ${
                  mainImgIdx === index ? "border-gray-500" : "border-[#CCCCCC]"
                }`}
                onClick={() => setMainImgIdx(index)}
              >
                <Image
                  src={image}
                  alt={`${product.productName} thumbnail ${index + 1}`}
                  width={70}
                  height={70}
                  className="object-cover w-[70px] h-[70px]"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[400px] w-full">
            <Image
              src={images[mainImgIdx]}
              alt={product.productName}
              width={420}
              height={480}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center flex-col md:gap-2 gap-1">
          <h1 className="text-[22px] md:text-3xl font-bold text-[#182FA6] flex items-center justify-between">
            {product.productName}
            <button
              type="button"
              className="md:hidden bg-[#091697] md:w-[113px] w-[116px] md:h-[31px] h-[34px] text-xs md:text-[13px] text-white md:px-4 px-2 py-2 font-bold rounded-[3px] md:rounded-none"
              onClick={() => setShowSizeGuide(true)}
            >
              Size Guide
            </button>
          </h1>

          <div className="text-[22px] md:text-3xl font-bold text-[#184B2E] mb-2">
            {"\u20A6"}
            {product.price.toFixed(2)}
          </div>
          <div className="text-[#152F24] font-bold text-[14px] md:text-base">
            Please select the size you want
          </div>

          <div className="flex gap-2 mb-2 flex-wrap justify-between">
            <div className="flex gap-2 flex-wrap items-end mb-8 md:mt-0 mt-2 md:mb-0">
              {product.inStock.map(({ size, quantity }, index) => (
                <button
                  key={`${size}-${quantity}-${index}`}
                  type="button"
                  disabled={quantity === 0}
                  className={`border px-4 py-2 w-[34px] h-[34px] rounded-[3px] font-bold text-[13px] flex items-center justify-center transition-colors ${
                    selectedSize === size
                      ? "bg-[#152F24] text-white border-[#152F24]"
                      : "bg-white text-[#152F24] border-[#152F24] hover:bg-[#152F24] hover:text-white"
                  } ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="md:flex justify-between items-center hidden">
              <button
                type="button"
                className="bg-[#091697] md:w-[113px] w-[116px] md:h-[31px] h-[34px] text-xs md:text-[13px] text-white md:px-4 px-2 py-2 font-bold rounded-[3px] md:rounded-none"
                onClick={() => setShowSizeGuide(true)}
              >
                Size Guide
              </button>
            </div>
          </div>

          <button
            type="button"
            className="bg-[#091697] md:mb-2 mb-8 cursor-pointer text-white w-full py-3 rounded-[6px] font-bold text-[13px] h-[32px] md:h-[34px] flex items-center justify-center"
            onClick={() => {
              if (selectedSize) {
                setVariationCounts((current) => ({
                  ...current,
                  [selectedSize]: Math.max(current[selectedSize] || 1, 1),
                }));
              }
              setShowVariationModal(true);
            }}
          >
            Buy Now
          </button>

          <Accordion title="Materials">{product.materials}</Accordion>
          <Accordion title="Process">{product.process}</Accordion>
          <Accordion title="Offers on this product">{product.offer}</Accordion>
        </div>
      </div>

      <div className="bg-[#152F24] md:h-[43px] h-[38px] w-full mt-10 mb-4 rounded-sm" />
      <div className="mb-8">
        <h2 className="md:text-[28px] text-[22px] font-bold text-[#152F24] mb-2">
          Product Description
        </h2>
        <p className="md:text-[19px] text-xs font-normal text-[#00041D] max-w-3xl mb-4">
          {product.description}
        </p>
        <h3 className="md:text-[28px] text-[22px] font-bold text-[#152F24] mb-2">
          Features
        </h3>
        <p className="md:text-[19px] text-xs font-normal text-[#00041D] max-w-3xl mb-4">
          {product.features}
        </p>

        {moreLikeThis.length > 0 && (
          <div className="mb-8">
            <h2 className="md:text-[28px] text-[22px] font-bold text-[#152F24] mb-6">
              More like this
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-between">
              {moreLikeThis.map((item, index) => {
                const productImages = [
                  item.imageUrl,
                  ...(item.otherImages ?? []),
                ].filter(Boolean);
                const imageIndex = relatedImgIdxs[index] || 0;

                return (
                  <div
                    key={item._id}
                    className="md:w-[405px] w-[166px] md:h-[573px] h-[245px] group rounded-xl flex flex-col items-center justify-between transition hover:shadow-lg cursor-default"
                  >
                    <div
                      className="w-full md:h-[506px] h-[208px] flex flex-col items-center justify-between bg-gray-100 select-none rounded-[6px]"
                      onClick={() =>
                        setRelatedImgIdxs((current) => {
                          const next = [...current];
                          next[index] = (imageIndex + 1) % productImages.length;
                          return next;
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={productImages[imageIndex]}
                        alt={item.productName}
                        width={260}
                        height={320}
                        className="object-cover md:w-[405px] w-[156px] md:h-[490px] h-[190px]"
                      />
                      <div className="flex gap-2 md:w-[73px] w-[57px] md:h-[40px] h-[20px]">
                        {productImages.map((_, dotIndex) => (
                          <button
                            key={`${item._id}-${dotIndex}`}
                            type="button"
                            aria-label={`Show image ${dotIndex + 1}`}
                            className="focus:outline-none flex items-center justify-center"
                            onClick={(event) => {
                              event.stopPropagation();
                              setRelatedImgIdxs((current) => {
                                const next = [...current];
                                next[index] = dotIndex;
                                return next;
                              });
                            }}
                          >
                            {imageIndex === dotIndex ? (
                              <span className="inline-block md:w-[25px] w-[17px] md:h-[9px] h-[6px] bg-[#152F24] rounded-[3px]" />
                            ) : (
                              <span className="inline-block md:w-[14px] w-[10px] md:h-[14px] h-[10px] bg-[#152F24] rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="text-center w-full flex items-center justify-between md:h-[47px] h-[34px] md:pr-4">
                      <div className="font-normal text-xs md:text-base text-left">
                        {item.productName}
                        <div className="text-xs md:text-base mb-2">
                          {item.productType?.name || "Related product"}
                        </div>
                      </div>
                      <Link
                        href={`/shop/${item.subcategory.category.slug}/${item.subcategory.slug}/${item.productType.slug}/${item.slug}`}
                      >
                        <button
                          type="button"
                          className="bg-[#1739B7] text-white md:px-6 px-2 py-2 rounded-[3px] font-bold text-[8px] md:text-[13px] md:w-[113px] w-[60px] md:h-[31px] h-[16px] flex items-center justify-center"
                        >
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showSizeGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setShowSizeGuide(false)}
          >
            <div
              className="bg-white rounded-md shadow-lg md:p-8 p-2 max-w-6xl w-full md:h-[476px] h-[492px] relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute md:top-4 top-2 right-4 text-2xl text-[#173B2E] bg-white rounded-full border-2 border-[#173B2E] w-8 h-8 flex items-center justify-center"
                onClick={() => setShowSizeGuide(false)}
                aria-label="Close size guide"
              >
                <span className="font-bold">x</span>
              </button>
              <h2 className="text-2xl font-bold text-[#173B2E] mb-6">
                Size Chart
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full text-left md:text-[25px] text-[14px]">
                  <thead>
                    <tr>
                      <th className="font-bold px-4 py-2">Size</th>
                      <th className="font-bold px-4 py-2">Chest (inches)</th>
                      <th className="font-bold px-4 py-2">Waist (inches)</th>
                      <th className="font-bold px-4 py-2">Length (inches)</th>
                      <th className="font-bold px-4 py-2">
                        Sleeve Length (inches)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold px-4 py-2">Small</td>
                      <td className="px-4 py-2">36-38</td>
                      <td className="px-4 py-2">30-32</td>
                      <td className="px-4 py-2">28</td>
                      <td className="px-4 py-2">32</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-4 py-2">Medium</td>
                      <td className="px-4 py-2">39-41</td>
                      <td className="px-4 py-2">32-34</td>
                      <td className="px-4 py-2">29</td>
                      <td className="px-4 py-2">33</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-4 py-2">Large</td>
                      <td className="px-4 py-2">42-44</td>
                      <td className="px-4 py-2">34-36</td>
                      <td className="px-4 py-2">30</td>
                      <td className="px-4 py-2">34</td>
                    </tr>
                    <tr>
                      <td className="font-bold px-4 py-2">X-Large</td>
                      <td className="px-4 py-2">45-47</td>
                      <td className="px-4 py-2">37-39</td>
                      <td className="px-4 py-2">31</td>
                      <td className="px-4 py-2">35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="border-2 border-[#091697] text-[#091697] md:px-10 px-2 py-2 rounded-md font-bold hover:bg-[#f0f4ff] md:w-[300px] w-[116px] md:h-[64px] h-[34px] flex items-center justify-center md:text-[19px] text-xs"
                  onClick={() => setShowSizeGuide(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {showVariationModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setShowVariationModal(false)}
          >
            <div
              className="bg-white rounded-md shadow-lg md:p-8 p-2 w-full md:w-[1169px] md:h-[476px] h-[509px] relative flex flex-col items-center md:justify-center justify-start"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  className="absolute top-4 right-4 md:text-2xl text-xl text-[#173B2E] bg-white rounded-full border-2 border-[#173B2E] md:w-[40px] md:h-[40px] w-[20px] h-[20px] flex items-center justify-center"
                  onClick={() => setShowVariationModal(false)}
                  aria-label="Close variation modal"
                >
                  <span className="font-bold md:text-3xl text-xl flex items-center justify-center">
                    x
                  </span>
                </button>
                <h2 className="md:text-2xl text-lg font-bold text-[#173B2E] mb-6">
                  Please select a variation
                </h2>
              </div>
              <div className="flex flex-col md:gap-4 gap-2 mb-8 md:w-[80%] w-full md:h-[252px] h-[206px] overflow-y-auto scrollbar-hide scroll-smooth">
                {product.inStock.map(({ size, quantity }) => (
                  <div
                    key={size}
                    className="flex items-center justify-between rounded-md px-4 py-3 border border-[#DCDCDC] md:h-[74px] h-[44px]"
                  >
                    <div>
                      <div className="font-bold md:text-[23px] text-[14px] text-[#152F24]">
                        {size}
                      </div>
                      <div className="md:text-base text-xs text-[#152F24]">
                        {quantity} products left
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="bg-[#182FA6] text-white md:w-[40px] w-[29px] md:h-[40px] h-[29px] rounded flex items-center justify-center md:text-3xl text-xl font-normal"
                        onClick={() =>
                          setVariationCounts((current) => ({
                            ...current,
                            [size]: Math.min(
                              (current[size] || 0) + 1,
                              quantity
                            ),
                          }))
                        }
                        aria-label={`Increase ${size}`}
                      >
                        +
                      </button>
                      <span className="md:text-2xl text-xl font-bold text-[#173B2E] w-6 text-center">
                        {variationCounts[size] || 0}
                      </span>
                      <button
                        type="button"
                        className="bg-[#182FA6] text-white md:w-[40px] w-[29px] md:h-[40px] h-[29px] rounded flex items-center justify-center md:text-3xl text-xl font-normal"
                        onClick={() =>
                          setVariationCounts((current) => ({
                            ...current,
                            [size]: Math.max((current[size] || 0) - 1, 0),
                          }))
                        }
                        aria-label={`Decrease ${size}`}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex md:gap-32 md:justify-center justify-between md:w-[80%] w-full">
                <button
                  type="button"
                  className="border-2 border-[#091697] cursor-pointer text-[#091697] px-10 py-2 rounded-md font-bold hover:bg-[#f0f4ff] md:w-[300px] w-[116px] md:h-[64px] h-[34px] flex items-center justify-center md:text-[19px] text-xs"
                  onClick={() => setShowVariationModal(false)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-[#091697] text-white md:px-10 px-2 cursor-pointer py-2 rounded-md font-bold hover:bg-[#0f1e6a] md:w-[300px] w-[116px] md:h-[64px] h-[34px] flex items-center justify-center md:text-[19px] text-xs"
                  onClick={handleAddToCart}
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}

export default ProductDetails;
