"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import SafeImage from "@/components/safe-image";
import { API_BASE_URL } from "@/lib/constants";

interface SaleProduct {
  _id: string;
  productName: string;
  slug: string;
  imageUrl: string;
  otherImages: string[];
  offer: string;
  productType: { slug: string };
  subcategory: {
    slug: string;
    category: { slug: string };
  };
}

export default function SpecialOfferBanner() {
  const [allProducts, setAllProducts] = useState<SaleProduct[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?limit=50`)
      .then((res) => res.json())
      .then((data) => {
        const products: SaleProduct[] = data.products || data.data || [];
        setAllProducts(products.filter((p) => p.offer));
      })
      .catch(() => {});
  }, []);

  const totalPages = Math.max(1, Math.floor(allProducts.length / 3));

  const nextPage = useCallback(() => {
    setPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (allProducts.length < 3) return;
    const timer = setInterval(nextPage, 4000);
    return () => clearInterval(timer);
  }, [nextPage, allProducts.length]);

  const visible = allProducts.slice(page * 3, page * 3 + 3);

  const slots = [
    { position: "absolute left-0 -translate-x-12 scale-90 opacity-80", z: "z-10", imgClass: "h-64 w-48", idx: 0 },
    { position: "relative scale-110", z: "z-30", imgClass: "h-80 w-64", idx: 1 },
    { position: "absolute right-0 translate-x-12 scale-90 opacity-80", z: "z-10", imgClass: "h-64 w-48", idx: 2 },
  ];

  return (
    <section className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#f4f4f1]">
      <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full bg-[#2f3331] opacity-10" />
      <div className="container relative z-10 mx-auto grid items-center gap-12 px-12 lg:grid-cols-2 lg:px-24">
        <div className="flex flex-col items-start space-y-6">
          <div className="text-[#2f3331] text-2xl font-extrabold tracking-[1em]">
            ...
          </div>
          <h2 className="text-7xl font-[900] leading-none tracking-tighter text-[#2f3331] md:text-8xl lg:text-9xl">
            SPECIAL OFFER
          </h2>
          <div className="flex w-full max-w-[280px] flex-col items-start">
            <div className="mb-4 h-px w-full bg-[#2f3331]/80" />
            <Link
              href="/shop"
              className="py-1 font-sans text-sm font-extrabold tracking-[0.4em] text-[#2f3331] transition-colors duration-300 hover:text-[#735a45]"
            >
              SHOP NOW
            </Link>
            <div className="mt-4 h-px w-full bg-[#2f3331]/80" />
          </div>
        </div>
        <div className="relative flex h-[500px] items-center justify-center lg:justify-end">
          <div className="relative flex w-full max-w-[500px] items-center justify-center">
            {slots.map((slot) => {
              const product = visible[slot.idx];
              const href = product
                ? `/shop/${product.subcategory?.category?.slug}/${product.subcategory?.slug}/${product.productType?.slug}/${product.slug}`
                : "/shop";

              return (
                <Link
                  key={slot.idx}
                  href={href}
                  className={`${slot.position} ${slot.z} transition-opacity hover:opacity-90`}
                >
                  <div
                    className={`bg-[#e0e3e0] p-4 shadow-sm ${slot.idx === 1 ? "p-6 shadow-xl" : ""} ${slot.imgClass} relative`}
                  >
                    <SafeImage
                      src={
                        product?.imageUrl ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRri_RpsLtJtPVr75Hd41nZSJ7K8jMemSv7YkBSmWytiKZMs16EF0ilPhaW484SiGbHgr-_dC5czoTG2OJn6OHADQMpGvDVsD3mEZ1a6FAPSSXQLv3ghFxkTlQxyFkU6UUFXC33ruxzN_XlpJeLVbd5QRZoEQj6TjWBo8WH71nuxRaPkztNcLfUZ800EARlcApEMX1lw9nX55XdTMdd6V8-lSrzCR5YRdk7tvsYLXrDT57nj4lLV6DHujPVc2tWwlrwpC3_8zhOeI0"
                      }
                      alt={product?.productName || "Sale item"}
                      fill
                      className="h-full w-full object-cover"
                      skeletonClassName="absolute inset-0"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden select-none p-12 opacity-20 lg:block">
        <span className="font-serif text-4xl italic text-[#2f3331]">
          Digital Tailor Edition
        </span>
      </div>
      {allProducts.length >= 3 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-[#2f3331]" : "w-1.5 bg-[#2f3331]/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
