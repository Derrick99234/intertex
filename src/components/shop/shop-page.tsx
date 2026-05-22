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
  const [sort, setSort] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  useEffect(() => {
    const searchQuery = searchParams.get("keyword") || "";
    setSearchTerm(searchQuery);

    const sortQuery = searchParams.get("sort") || "newest";
    setSort(sortQuery);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    let basePath = "/shop";
    if (pathname.startsWith("/shop")) {
      basePath = pathname;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }

    router.push(`${basePath}?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    let basePath = "/shop";
    if (pathname.startsWith("/shop")) {
      basePath = pathname;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`${basePath}?${params.toString()}`);
  };

  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>(
    {},
  );

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
                    : "text-secondary"
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
      <hr className="w-full border  border-[#ECECEC] md:mb-8 mb-4" />
      {/* Controls */}

      <div className="">
        <div className=" mb-4 h-12.25 text-xs font-bold md:hidden flex items-center bg-white px-4 py-2 border-[0.5px]">
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
            <div className="w-50 md:w-86 md:text-[19px] text-[10px] font-bold hidden md:flex flex-row-reverse items-center justify-between bg-white rounded-[3px] px-4 py-2 border">
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
              <select
                onChange={handleSortChange}
                value={sort}
                className="md:text-[19px] text-xs font-bold appearance-none bg-transparent outline-none cursor-pointer border md:px-4 px-2 py-2 rounded-[3px] text-[#152F24] md:w-51 w-29 md:h-16 h-8.5"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
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
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {paginatedProducts.map((product) => {
                const imgIdx = imageIndexes[product._id];
                const allImages = [product.imageUrl, ...(product?.otherImages || [])].filter(Boolean);
                return (
                  <div
                    key={product._id}
                    className="group rounded-xl flex flex-col bg-white border border-gray-100 overflow-hidden transition hover:shadow-lg h-full"
                  >
                    <div
                      className="w-full select-none cursor-pointer"
                      onClick={() => handleImageClick(product._id, allImages)}
                    >
                      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-gray-50">
                        <Image
                          src={
                            allImages && allImages.length > 0
                              ? allImages[imgIdx ?? 0]
                              : product.imageUrl
                          }
                          alt={product.productName}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>

                      {allImages.length > 1 && (
                        <div className="flex justify-center gap-1.5 py-2">
                          {allImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDotClick(product._id, idx);
                              }}
                              className="focus:outline-none"
                            >
                              {imgIdx === idx ? (
                                <span className="block w-5 h-1.5 bg-[#152F24] rounded-full" />
                              ) : (
                                <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 px-3 pb-3 gap-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 flex-1">
                          {product.productName}
                        </span>
                        <span className="text-[#1739B7] font-bold text-xs md:text-sm whitespace-nowrap">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">
                        {product.productType?.name}
                      </div>
                      <div className="mt-auto">
                        <Link
                          href={`/shop/${product.subcategory.category.slug}/${product.subcategory.slug}/${product.productType.slug}/${product.slug}`}
                        >
                          <button className="w-full bg-[#1739B7] hover:bg-[#122a8f] text-white py-2.5 rounded-lg font-bold text-xs md:text-sm transition-colors cursor-pointer">
                            Shop Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded border text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === page
                          ? "bg-[#152F24] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded border text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
  );
}

export default ShopLandingPage;
