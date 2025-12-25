"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface Subcategory {
  _id: string;
  name: string;
  description?: string;
  slug?: string;
  status: boolean;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Type {
  name: string;
  description?: string;
  slug?: string;
  status?: boolean;
  searchTerm?: boolean;
  subcategory: Subcategory;
}

function ShopLandingPage({
  products,
  tabs,
  slug,
}: {
  products: any[];
  tabs: any[];
  slug: string[];
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Update the search term based on the query params
  useEffect(() => {
    const searchQuery = searchParams.get("keyword") || "";
    setSearchTerm(searchQuery);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Determine where to perform the search
    let basePath = "/shop";

    // ✅ If user is already within /shop, preserve that subpath
    if (pathname.startsWith("/shop")) {
      basePath = pathname;
    }

    // Construct the new search URL safely
    const newUrl = `${basePath}?keyword=${encodeURIComponent(value)}`;

    // Push the new URL
    router.push(newUrl);
  };

  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>(
    {}
  );

  const router = useRouter();

  const handleImageClick = (id: string, images: string[]) => {
    const nextIdx = ((imageIndexes[id] ?? 0) + 1) % images.length;
    setImageIndexes((prev) => ({
      ...prev,
      [id]: nextIdx,
    }));
  };
  const handleDotClick = (id: string, idx: number) => {
    setImageIndexes((prev) => ({ ...prev, [id]: idx }));
  };
  const segments = [
    { name: "All", href: "/shop" },
    ...slug.map((s, i) => {
      const href = `/shop/${slug.slice(0, i + 1).join("/")}`;
      return { name: s.replace(/-/g, " "), href };
    }),
  ];

  return (
    <div className="bg-white min-h-screen px-2 md:px-8 md:pb-8 ">
      <nav
        className="flex items-center text-[13px] text-gray-600 mb-2 py-2"
        aria-label="Breadcrumb"
      >
        <div className="flex items-center">
          {segments.map((seg, idx) => (
            <div key={seg.href} className="flex items-center">
              <Link
                href={seg.href}
                className={`hover:underline ${
                  idx === segments.length - 1
                    ? "text-[#A3A3A3]" // current page style
                    : "text-[#091697]"
                } font-normal text-lg`}
              >
                {seg.name}
              </Link>

              {idx < segments.length - 1 && (
                <Image
                  src="/icons/arrow-left.png"
                  alt="Arrow Left"
                  width={10}
                  height={10}
                  className="mx-2"
                />
              )}
            </div>
          ))}
        </div>
      </nav>
      <h1 className="text-[22px] md:text-5xl font-normal mb-2">All Products</h1>
      <p className="text-xs md:text-lg text-[#000000] mb-4">
        Discover our wide range of products designed for the modern individual.
      </p>
      <div className="flex gap-6 items-center justify-between md:justify-start ">
        <button
          className={` border-b border-[#152F24] cursor-pointer text-[10px] md:text-[13px] text-[#152F24]  transition-colors ${
            true
              ? "text-[10px] md:text-[13px] font-bold"
              : "border-transparent text-[#152F24] font-normal hover:border-[#152F24]"
          }`}
          onClick={() => router.push("/shop")}
        >
          All
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            className={` border-b border-[#152F24] cursor-pointer text-[10px] md:text-[13px] text-[#152F24]  transition-colors ${
              false
                ? "text-[10px] md:text-[13px] font-bold"
                : "border-transparent text-[#152F24] font-normal hover:border-[#152F24]"
            }`}
            onClick={() =>
              router.push(`/shop/${[...slug, tab.slug].join("/")}`)
            }
          >
            {tab.name}
          </button>
        ))}
      </div>
      <hr className="w-full border-1  border-[#ECECEC] md:mb-8 mb-4" />
      {/* Controls */}

      <div className="">
        <div className=" mb-4 h-[49px] text-xs font-bold md:hidden flex items-center bg-white px-4 py-2 border-[0.5px]">
          <Image
            src="/icons/search.png"
            alt="Search"
            width={10}
            height={10}
            className="color-[#152F24] mr-2"
          />
          <input
            type="text"
            placeholder="Quick Search"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-transparent outline-none border-none text-xs text-[#152F24] placeholder-[#000000]"
          />
        </div>
        <div className="flex md:flex-row items-center justify-between gap-4 mb-8 ">
          {/* <div className="flex gap-3 ">
              <button className="bg-[#152F24] md:text-[19px] text-[10px] text-white md:px-6 px-2 py-2 rounded-[3px] flex items-center justify-between md:justify-center gap-2  md:w-[145px] w-[116px] md:h-[64px] h-[34px]">
                <span className="md:text-[19px] text-xs font-bold">Filter</span>{" "}
                <span className="md:w-[20px] md:h-[20px] w-[14px] h-[14px] flex items-center justify-center">
                  &#9776;
                </span>
              </button>
              <div className="hidden relative md:flex items-center justify-center">
                <span className="absolute right-7 pointer-events-none flex items-center pr-1">
                  <Image
                    src="/icons/arrow-down.png"
                    alt="Dropdown"
                    width={13}
                    height={13}
                  />
                </span>
              </div>
            </div> */}

          <div className="flex gap-3">
            <div className="w-[200px] md:w-[344px] md:text-[19px] text-[10px] font-bold hidden md:flex flex-row-reverse items-center justify-between bg-white rounded-[3px] px-4 py-2 border">
              <Image
                src="/icons/search.png"
                alt="Search"
                width={13}
                height={13}
                className="color-[#152F24] mr-2"
              />
              <input
                type="text"
                placeholder="Quick Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-transparent outline-none border-none text-base text-[#152F24] placeholder-[#152F24]"
              />
            </div>
            <div className=" relative flex items-center justify-center">
              <select className="md:text-[19px] text-xs font-bold appearance-none bg-transparent outline-none cursor-pointer border-1 md:px-4 px-2 py-2 rounded-[3px] text-[#152F24] md:w-[204px] w-[116px] md:h-[64px] h-[34px] flex items-center justify-center">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="absolute md:right-4 right-1 pointer-events-none flex items-center pr-1">
                <Image
                  src="/icons/arrow-down.png"
                  alt="Dropdown"
                  width={13}
                  height={13}
                />
              </span>
            </div>
          </div>
        </div>
        {/* Product Grid */}
        {products?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-16">
            <Image
              src="/icons/search.png"
              alt="No results"
              width={48}
              height={48}
              className="opacity-40 mb-4"
            />
            <p className="text-lg md:text-2xl text-gray-500 font-semibold">
              No results found
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-between">
            {products.map((product) => {
              const imgIdx = imageIndexes[product._id];
              const allImages = [product.imageUrl, ...product?.otherImages];
              return (
                <div
                  key={product._id}
                  className="group rounded-xl flex flex-col bg-white transition hover:shadow-lg"
                >
                  <div
                    className="w-full select-none rounded-[6px] overflow-hidden"
                    onClick={() => handleImageClick(product._id, allImages)}
                  >
                    {/* IMAGE WRAPPER */}
                    <div className="relative w-full h-[280px] md:h-[320px]">
                      <Image
                        src={
                          allImages && allImages.length > 0
                            ? allImages[imgIdx ?? 0]
                            : product.imageUrl
                        }
                        alt={product.productName}
                        fill
                        className="object-cover p-4"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>

                    {/* DOTS */}
                    <div className="flex justify-center gap-2 py-2">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDotClick(product._id, idx)}
                        >
                          {imgIdx === idx ? (
                            <span className="block w-6 h-2 bg-[#152F24] rounded" />
                          ) : (
                            <span className="block w-3 h-3 bg-[#152F24] rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Section  */}
                  <div className="w-full flex flex-col justify-between h-[90px] md:h-[110px] px-2">
                    <div className="text-left text-xs md:text-base line-clamp-2">
                      {product.productName}
                      <div className="text-xs md:text-sm text-gray-500">
                        {product.productType.name}
                      </div>
                    </div>

                    <Link
                      href={`/shop/${product.subcategory.category.slug}/${product.subcategory.slug}/${product.productType.slug}/${product.slug}`}
                    >
                      <button className="bg-[#1739B7] text-white w-full py-2 rounded font-bold text-xs md:text-sm">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* <LoadingSpinner isLoading={isLoading} /> */}
    </div>
  );
}

export default ShopLandingPage;
