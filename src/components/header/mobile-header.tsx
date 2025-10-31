import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/navigations";
import { useRouter, useSearchParams } from "next/navigation";

const MobileMenu = ({
  toggleMobileMenu,
  isMobileMenuOpen,
}: {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}) => {
  const [activeMobileCategory, setActiveMobileCategory] =
    useState<string>("men");

  // Dynamic open state object based on section slug
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const handleCategoryClick = (categorySlug: string) => {
    setActiveMobileCategory(categorySlug);
  };

  const handleSectionToggle = (sectionSlug: string) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [sectionSlug]: !prevState[sectionSlug], // Toggle the specific section's open state
    }));
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams(); // Get the URL search parameters
  const router = useRouter(); // Router to update the URL

  // Update the search term based on the query params
  useEffect(() => {
    const searchQuery = searchParams.get("search") || ""; // Get 'search' parameter from the URL
    setSearchTerm(searchQuery);
  }, [searchParams]);

  // Handle changes in the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Construct the URL with the updated search query
    const newUrl = `/shop/search?keyword=${encodeURIComponent(value)}`; // Manually build the URL with the query string

    // Update the URL with the new search query
    router.push(newUrl); // Use router.push with a string URL
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <div className="logo">
              <Image
                src={"/logo/intertex-logo.png"}
                onClick={() => {}}
                alt="intertex logo"
                className="cursor-pointer"
                width={100}
                height={40}
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-2xl text-[#091697]"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-4">
            <div className="search-bar mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={"/icons/search.png"}
                  alt="search"
                  width={16}
                  className="absolute left-10"
                  height={16}
                />
                <input
                  type="text"
                  className="w-full text-gray-500 border pl-14 outline-none p-3 rounded-md border-gray-200"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <nav className="mb-6">
              <ul className="flex gap-4 text-sm overflow-x-auto whitespace-nowrap pb-2">
                {categories.map((category) => (
                  <li
                    key={category.slug}
                    className={`pb-1 ${
                      activeMobileCategory === category.slug
                        ? "border-b-2 border-[#091697]"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => handleCategoryClick(category.slug)}
                      className={
                        activeMobileCategory === category.slug
                          ? "font-semibold"
                          : ""
                      }
                    >
                      {category.title}
                    </button>
                  </li>
                ))}
                <li>
                  <Link href={"/shop"}>Accessories</Link>
                </li>
                <li>
                  <Link href={"/our-factory"}>Our Factory</Link>
                </li>
                <li>
                  <Link href={"/our-stores"}>Our Stores</Link>
                </li>
              </ul>
            </nav>

            <div className="categories space-y-4">
              {categories.map((category) =>
                activeMobileCategory === category.slug ? (
                  <div key={category.slug}>
                    {category.sections.map((section) => (
                      <div
                        key={section.slug}
                        className={`${section.slug}-section`}
                      >
                        <div
                          className="flex justify-between items-center mb-3 cursor-pointer"
                          onClick={() => handleSectionToggle(section.slug)}
                        >
                          <h3 className="font-semibold text-[#091697]">
                            {section.title}:
                          </h3>
                          <span className="text-xl">
                            {openStates[section.slug] ? "⌄" : "›"}
                          </span>
                        </div>
                        {openStates[section.slug] && (
                          <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                            {section.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/shop/${category.slug}/${section.slug}/${item.slug}`}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
