"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { LoadingSpinner } from "../loading-spinner";
// import { API_BASE_URL } from "@/lib/constants";
// import { Product } from "../admin/products/view-product";

// const tabData = [
//   {
//     key: "tshirts",
//     label: "T-shirts",
//     products: [
//       {
//         id: 1,
//         slug: "classic-tshirt-cream",
//         name: "Classic T-shirt",
//         collection: "New collection",
//         images: [
//           "/images/shirt1.jpeg",
//           "/images/shirt1b.jpeg",
//           "/images/shirt1c.jpeg",
//         ],
//       },
//       {
//         id: 2,
//         slug: "classic-tshirt-blue",
//         name: "Classic T-shirt",
//         collection: "New collection",
//         images: [
//           "/images/shirt2.jpeg",
//           "/images/shirt2b.jpeg",
//           "/images/shirt2c.jpeg",
//         ],
//       },
//       {
//         id: 3,
//         slug: "classic-tshirt-striped",
//         name: "Classic T-shirt",
//         collection: "New collection",
//         images: [
//           "/images/shirt3.jpeg",
//           "/images/shirt3b.jpeg",
//           "/images/shirt3c.jpeg",
//         ],
//       },
//     ],
//   },
//   {
//     key: "polos",
//     label: "Polos",
//     products: [
//       {
//         id: 4,
//         slug: "classic-polo-white",
//         name: "Classic Polo",
//         collection: "New collection",
//         images: [
//           "/images/polos.jpeg",
//           "/images/polo1b.jpeg",
//           "/images/polo1c.jpeg",
//         ],
//       },
//       {
//         id: 5,
//         slug: "classic-polo-navy",
//         name: "Classic Polo",
//         collection: "New collection",
//         images: [
//           "/images/polos.jpeg",
//           "/images/polo2b.jpeg",
//           "/images/polo2c.jpeg",
//         ],
//       },
//     ],
//   },
//   {
//     key: "sweatshirts",
//     label: "Sweatshirts",
//     products: [
//       {
//         id: 6,
//         slug: "classic-sweatshirt-grey",
//         name: "Classic Sweatshirt",
//         collection: "New collection",
//         images: [
//           "/images/sweatshirt.jpg",
//           "/images/sweatshirt1b.jpeg",
//           "/images/sweatshirt1c.jpeg",
//         ],
//       },
//     ],
//   },
//   {
//     key: "hoodies",
//     label: "Hoodies",
//     products: [
//       {
//         id: 7,
//         slug: "classic-hoodie-black",
//         name: "Classic Hoodie",
//         collection: "New collection",
//         images: [
//           "/images/hoodie1.jpeg",
//           "/images/hoodie1b.jpeg",
//           "/images/hoodie1c.jpeg",
//         ],
//       },
//     ],
//   },
//   {
//     key: "denim-jeans",
//     label: "Denim Jeans",
//     products: [
//       {
//         id: 8,
//         slug: "classic-jeans-blue",
//         name: "Classic Jeans",
//         collection: "New collection",
//         images: [
//           "/images/jeans1.jpeg",
//           "/images/jeans1b.jpeg",
//           "/images/jeans1c.jpeg",
//         ],
//       },
//     ],
//   },
// ];

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
    const newUrl = `${basePath}/search?keyword=${encodeURIComponent(value)}`;

    // Push the new URL
    router.push(newUrl);
  };

  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>(
    {}
  );

  const router = useRouter();
  // const [products, setProducts] = useState<Product[]>([]);
  // const [subcategory, setSubcategory] = useState<Subcategory[]>([]);

  // useEffect(() => {
  //   const fetchSubcategories = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/subcategories`);
  //       const data = await response.json();
  //       if (response.ok) {
  //         setSubcategory(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subcategories:", error);
  //     }
  //   };

  //   fetchSubcategories();
  // }, []);

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(`${API_BASE_URL}/products`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setProducts(data.products);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchProduct();
  // }, []);

  // useEffect(() => {
  //   setActiveTab(tabParam || defaultTab);
  // }, [tabParam]);

  // const handleTabClick = (key: string) => {
  //   setActiveTab(key);
  //   router.replace(`?tab=${key}`);
  // };

  // const currentTab = tabData.find((tab) => tab.key === activeTab) || tabData[0];
  // const filtered = currentTab.products.filter(
  //   (p) =>
  //     p.name.toLowerCase().includes(search.toLowerCase()) ||
  //     p.collection.toLowerCase().includes(search.toLowerCase())
  // );

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
        <div className="flex gap-3 ">
          <button className="bg-[#152F24] md:text-[19px] text-[10px] text-white md:px-6 px-2 py-2 rounded-[3px] flex items-center justify-between md:justify-center gap-2  md:w-[145px] w-[116px] md:h-[64px] h-[34px]">
            <span className="md:text-[19px] text-xs font-bold">Filter</span>{" "}
            <span className="md:w-[20px] md:h-[20px] w-[14px] h-[14px] flex items-center justify-center">
              &#9776;
            </span>
          </button>
          <div className="hidden relative md:flex items-center justify-center">
            <select className="text-[19px] font-bold appearance-none bg-transparent outline-none cursor-pointer border px-6 py-2 rounded-[3px] text-gray-700 md:w-[145px] w-[116px] md:h-[64px] h-[34px] flex items-center justify-center">
              <option>Size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
            <span className="absolute right-7 pointer-events-none flex items-center pr-1">
              <Image
                src="/icons/arrow-down.png"
                alt="Dropdown"
                width={13}
                height={13}
              />
            </span>
          </div>
        </div>

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
              <option>Top Seller</option>
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-between">
          {products.map((product) => {
            const imgIdx = imageIndexes[product._id];
            return (
              <div
                key={product._id}
                className="md:w-[405px] w-[166px] md:h-[573px] h-[245px] group  rounded-xl flex flex-col items-center justify-between transition hover:shadow-lg cursor-default"
              >
                <div
                  className="w-full md:h-[506px] h-[208px]  flex flex-col items-center justify-between bg-gray-100 select-none rounded-[6px]"
                  onClick={() =>
                    handleImageClick(product._id, product.otherImages)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={
                      product.otherImages && product.otherImages.length > 0
                        ? product.otherImages[imgIdx ?? 0]
                        : product.imageUrl
                    }
                    alt={product.productName}
                    width={260}
                    height={320}
                    className="object-cover md:w-[405px] w-[156px] md:h-[490px] h-[190px]"
                  />

                  <div className="flex gap-2 md:w-[73px] w-[57px] md:h-[40px] h-[20px]">
                    {product.otherImages &&
                      product.otherImages.map((_: any, idx: any) => (
                        <button
                          key={idx}
                          aria-label={`Show image ${idx + 1}`}
                          className="focus:outline-none flex items-center justify-center "
                          onClick={() => handleDotClick(product._id, idx)}
                          tabIndex={0}
                        >
                          {imgIdx === idx ? (
                            <span className="inline-block md:w-[25px] w-[17px] md:h-[9px] h-[6px] bg-[#152F24] rounded-[3px] align-middle" />
                          ) : (
                            <span className="inline-block md:w-[14px] w-[10px] md:h-[14px] h-[10px] bg-[#152F24] rounded-full align-middle" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="text-center w-full flex items-center justify-between md:h-[47px] h-[34px] md:pr-4 ">
                  <div className="font-normal text-xs md:text-base text-left">
                    {product.productName}
                    <div className="text-xs md:text-base  mb-2">
                      {product.productType.name}
                    </div>
                  </div>

                  <Link
                    href={`/shop/${product.subcategory.category.slug}/${product.subcategory.slug}/${product.productType.slug}/${product.slug}`}
                  >
                    <button className="bg-[#1739B7] cursor-pointer text-white md:px-6 px-2 py-2 rounded-[3px] font-bold text-[8px] md:text-[13px] md:w-[113px] w-[60px] md:h-[31px] h-[16px] flex items-center justify-center">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* <LoadingSpinner isLoading={isLoading} /> */}
    </div>
  );
}

export default ShopLandingPage;
