"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/constants";

interface ProductItem {
  _id: string;
  productName: string;
  slug: string;
  imageUrl: string;
  otherImages: string[];
  productType: { slug: string; name: string };
  subcategory: {
    slug: string;
    category: { slug: string };
  };
}

export default function NewArrivalsBanner() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?limit=3`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data.data || []))
      .catch(() => {});
  }, []);

  const slots = [
    {
      key: "left",
      z: "z-20",
      offset: "-mr-16 md:-mr-24",
      imgClass: "h-48 w-36 md:h-72 md:w-52",
      index: 0,
    },
    {
      key: "center",
      z: "z-10",
      offset: "",
      imgClass: "h-56 w-40 md:h-80 md:w-56",
      index: 1,
    },
    {
      key: "right",
      z: "z-0",
      offset: "-ml-16 md:-ml-20",
      imgClass: "h-44 w-32 md:h-56 md:w-40",
      index: 2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f4f4f1] py-16 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start px-8 md:px-16 lg:px-24">
          <span className="mb-3 font-sans text-xs font-semibold tracking-[0.3em] text-[#735a45] uppercase">
            The Digital Tailor
          </span>
          <h2 className="font-serif text-6xl leading-none tracking-tight text-[#2f3331] md:text-7xl lg:text-8xl">
            New
            <br />
            Arrivals
          </h2>
          <div className="mt-8 h-px w-16 bg-[#735a45]" />
          <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-[#5c605d]">
            Curated pieces for the season — precision, comfort, and timeless
            style.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-[#5f5e5e] px-12 py-4 font-sans text-xs font-bold tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#535252]"
          >
            SHOP NOW
          </Link>
        </div>
        <div className="relative mt-12 flex items-center justify-center md:mt-0 md:pr-8 lg:pr-16">
          <div className="relative flex items-center">
            {slots.map((slot) => {
              const product = products[slot.index];
              const href = product
                ? `/shop/${product.subcategory?.category?.slug}/${product.subcategory?.slug}/${product.productType?.slug}/${product.slug}`
                : "/shop";
              const src =
                product?.imageUrl ||
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/elegant-man-suit+1.png";

              return (
                <Link
                  key={slot.key}
                  href={href}
                  className={`relative ${slot.z} ${slot.offset}`}
                >
                  <div
                    style={{ backgroundColor: slot.key === "center" ? "#ffffff" : "#e0e3e0" }}
                    className={`p-3 shadow-sm transition-opacity hover:opacity-90 md:p-4 ${slot.key === "center" ? "shadow-md md:p-5" : ""}`}
                  >
                    <img
                      src={src}
                      alt={product?.productName || "New arrival"}
                      className={`${slot.imgClass} object-cover`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 select-none p-8 opacity-5 md:p-16">
        <span className="font-serif text-7xl italic text-[#2f3331] md:text-9xl">
          2026
        </span>
      </div>
    </section>
  );
}
