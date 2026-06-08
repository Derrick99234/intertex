"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/safe-image";
import { API_BASE_URL } from "@/lib/constants";

interface ShirtProduct {
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

export default function CottonShirtsBanner() {
  const [products, setProducts] = useState<ShirtProduct[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/type/dress-shirts?limit=4`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data.data || []))
      .catch(() => {});
  }, []);

  const fallbackSrc =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaLeGBuisBOIRKBrHcKfdxST5UJfLO5Vrq1TkFwp_F4xbRzNMJoSkzzTTX_m665ITzRd8iy1fH-3P3dUky3T8Gtu-PHVbpmDP_Hs6O4hSiB9TJoGjKy2LyHbQPR__mJI1kbIgdBY1Gb-ASj7tCt155NEr7soCWHajvV-4dYNv6axSrjSCIZXnTXoG2ob_KfrJNZbys2CjTmy1OeASYS8EtpMkk_d32WDzXHSflyXhvMAbz-dNSmQl7VgLHRP5xdImDyzVEG277x7QA";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf9f7] px-6 py-20">
      <div className="absolute -top-20 -left-20 h-[600px] w-[600px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[#f4f4f1] opacity-60" />
      <div className="absolute -bottom-40 -right-20 h-[800px] w-[800px] rounded-[40%_60%_70%_30%/40%_70%_30%_60%] bg-[#edeeeb] opacity-40" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <header className="mb-16">
          <h2 className="mb-6 font-serif text-5xl tracking-tight text-[#2f3331] md:text-7xl lg:text-8xl">
            100% Cotton shirts
          </h2>
          <p className="mb-12 font-sans text-xs tracking-[0.3em] text-[#5c605d] uppercase md:text-sm">
            UP TO 30% OFF ON ALL ITEMS
          </p>
          <Link
            href="/shop/men/formal-wear/dress-shirts"
            className="inline-block bg-[#5f5e5e] px-12 py-5 font-sans text-sm font-bold tracking-widest text-white transition-all duration-300 hover:bg-[#535252] active:scale-95"
          >
            SHOP NOW
          </Link>
        </header>
        <div className="mt-12 grid w-full grid-cols-1 md:grid-cols-4">
          {(products.length > 0 ? products : Array(4).fill(null)).map(
            (product, i) => {
              const href = product
                ? `/shop/${product.subcategory?.category?.slug}/${product.subcategory?.slug}/${product.productType?.slug}/${product.slug}`
                : "/shop/men/formal-wear/dress-shirts";

              return (
                <Link
                  key={product?._id ?? i}
                  href={href}
                  className="group relative flex flex-col items-center p-4"
                >
                  <div className="mb-6 aspect-[3/4] w-full overflow-hidden bg-[#e0e3e0] relative">
                    <SafeImage
                      src={product?.imageUrl || fallbackSrc}
                      alt={product?.productName || "Cotton shirt"}
                      fill
                      className="object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0"
                      skeletonClassName="absolute inset-0"
                    />
                  </div>
                  {product?.productName && (
                    <span className="font-sans text-sm text-[#2f3331]">
                      {product.productName}
                    </span>
                  )}
                  {i < (products.length > 0 ? products.length : 4) - 1 && (
                    <div className="absolute right-0 top-1/4 bottom-1/4 hidden w-px bg-[#afb3b0]/30 md:block" />
                  )}
                </Link>
              );
            },
          )}
        </div>
        <div className="mt-24 flex flex-col items-center gap-4 text-[#5c605d]/40">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase">
            Scroll
          </span>
          <div className="h-12 w-px bg-[#5c605d]/20" />
        </div>
      </div>
    </section>
  );
}
