"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import MenDropdown from "./men-dropdown";
import WomenDropdown from "./women-dropdown";
import KidDropdown from "./kid-dropdown";

function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showMenNavMenu, setShowMenNavMenu] = React.useState(false);
  const [showWomenNavMenu, setShowWomenNavMenu] = React.useState(false);
  const [showKidNavMenu, setShowKidNavMenu] = React.useState(false);

  // Mobile dropdown states
  const [activeMobileCategory, setActiveMobileCategory] = React.useState("men");
  const [mobileCasualOpen, setMobileCasualOpen] = React.useState(true);
  const [mobileFormalOpen, setMobileFormalOpen] = React.useState(false);
  const [mobileSportsOpen, setMobileSportsOpen] = React.useState(false);
  const [mobileOuterwearOpen, setMobileOuterwearOpen] = React.useState(false);
  const [mobileUnderwearOpen, setMobileUnderwearOpen] = React.useState(false);

  const handleClick = () => {
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex justify-between items-center px-10 text-[#091697] py-6 w-full">
        <div className="logo">
          <Image
            src={"/logo/intertex-logo.png"}
            onClick={handleClick}
            alt="intertex logo"
            className="cursor-pointer"
            width={150}
            height={200}
          />
        </div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link href={"#"} onClick={() => setShowMenNavMenu(true)}>
                Man
              </Link>
            </li>
            <li>
              <Link href={"#"} onClick={() => setShowWomenNavMenu(true)}>
                Woman
              </Link>
            </li>
            <li>
              <Link href={"#"} onClick={() => setShowKidNavMenu(true)}>
                Kids
              </Link>
            </li>
            <li>
              <Link href={"/mens-wear"}>Accessories</Link>
            </li>
            <li>
              <Link href={"/our-factory"}>Our Factory</Link>
            </li>
            <li>
              <Link href={"/our-stores"}>Our Stores</Link>
            </li>
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5 items-center">
          <Link
            href={"#"}
            className="track-order flex items-center gap-3 border p-2 px-4 rounded-md border-gray-200"
          >
            <Image
              src={"/icons/location.png"}
              alt="track order"
              width={10}
              height={10}
            />
            <span className="font-bold text-sm">Track Order</span>
          </Link>
          <Link
            href={"#"}
            className="search flex items-center gap-4 border p-2 px-4 rounded-md border-gray-200"
          >
            <Image
              src={"/icons/search.png"}
              alt="search order"
              width={12}
              height={12}
            />
            <span className="font-semibold text-sm">Search</span>
          </Link>
          <Image
            src={"/icons/cart.png"}
            alt="cart"
            width={30}
            height={10}
            className="cursor-pointer"
          />
          <Image
            src={"/icons/profile.png"}
            className="cursor-pointer"
            alt="user profile"
            width={45}
            height={10}
          />
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden flex justify-between items-center px-4 py-4 bg-white text-[#091697]">
        <div className="logo">
          <Image
            src={"/logo/intertex-logo.png"}
            onClick={handleClick}
            alt="intertex logo"
            className="cursor-pointer"
            width={100}
            height={40}
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={"/icons/cart.png"}
            alt="cart"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Image
            src={"/icons/profile.png"}
            className="cursor-pointer"
            alt="user profile"
            width={24}
            height={24}
          />
          <button
            onClick={toggleMobileMenu}
            className="hamburger-menu flex flex-col gap-1 p-2"
          >
            <span className="block w-6 h-0.5 bg-[#091697]"></span>
            <span className="block w-6 h-0.5 bg-[#091697]"></span>
            <span className="block w-6 h-0.5 bg-[#091697]"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <div className="logo">
              <Image
                src={"/logo/intertex-logo.png"}
                onClick={handleClick}
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
              <div className="flex items-center gap-3 border p-3 rounded-md border-gray-200">
                <Image
                  src={"/icons/search.png"}
                  alt="search"
                  width={16}
                  height={16}
                />
                <span className="text-gray-500">Search</span>
              </div>
            </div>

            <nav className="mb-6">
              <ul className="flex gap-4 text-sm overflow-x-auto whitespace-nowrap pb-2">
                <li
                  className={`pb-1 ${
                    activeMobileCategory === "men"
                      ? "border-b-2 border-[#091697]"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => setActiveMobileCategory("men")}
                    className={
                      activeMobileCategory === "men" ? "font-semibold" : ""
                    }
                  >
                    Man
                  </button>
                </li>
                <li
                  className={`pb-1 ${
                    activeMobileCategory === "women"
                      ? "border-b-2 border-[#091697]"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => setActiveMobileCategory("women")}
                    className={
                      activeMobileCategory === "women" ? "font-semibold" : ""
                    }
                  >
                    Woman
                  </button>
                </li>
                <li
                  className={`pb-1 ${
                    activeMobileCategory === "kids"
                      ? "border-b-2 border-[#091697]"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => setActiveMobileCategory("kids")}
                    className={
                      activeMobileCategory === "kids" ? "font-semibold" : ""
                    }
                  >
                    Kids
                  </button>
                </li>
                <li>
                  <Link href={"/mens-wear"}>Accessories</Link>
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
              {activeMobileCategory === "men" && (
                <>
                  <div className="casual-wear">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => setMobileCasualOpen(!mobileCasualOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Casual Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileCasualOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileCasualOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4">
                        <li>
                          <Link href="/mens-wear/t-shirts">T-shirts</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/polos">Polos</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/sweatshirts">Sweatshirts</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/hoodies">Hoodies</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/denim-jeans">Denim Jeans</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="formal-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileFormalOpen(!mobileFormalOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Formal Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileFormalOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileFormalOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/mens-wear/suits">Suits</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/dress-shirts">
                            Dress Shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/blazers">Blazers</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/formal-trousers">
                            Formal Trousers
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/ties">Ties & Accessories</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="sports-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileSportsOpen(!mobileSportsOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Sports Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileSportsOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileSportsOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/mens-wear/activewear">Activewear</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/gym-wear">Gym Wear</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/sports-shorts">
                            Sports Shorts
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/running-gear">
                            Running Gear
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/swimwear">Swimwear</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="outerwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileOuterwearOpen(!mobileOuterwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Outerwear:
                      </h3>
                      <span className="text-xl">
                        {mobileOuterwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileOuterwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/mens-wear/jackets">Jackets</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/coats">Coats</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/windbreakers">
                            Windbreakers
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/bomber-jackets">
                            Bomber Jackets
                          </Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/winter-wear">Winter Wear</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="underwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileUnderwearOpen(!mobileUnderwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Underwear and Loungewear:
                      </h3>
                      <span className="text-xl">
                        {mobileUnderwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileUnderwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/mens-wear/underwear">Underwear</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/boxers">Boxers</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/loungewear">Loungewear</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/sleepwear">Sleepwear</Link>
                        </li>
                        <li>
                          <Link href="/mens-wear/socks">Socks</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}

              {activeMobileCategory === "women" && (
                <>
                  <div className="casual-wear">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => setMobileCasualOpen(!mobileCasualOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Casual Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileCasualOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileCasualOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4">
                        <li>
                          <Link href="/womens-wear/t-shirts">T-shirts</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/blouses">Blouses</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/sweaters">Sweaters</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/jeans">Jeans</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/leggings">Leggings</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="formal-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileFormalOpen(!mobileFormalOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Formal Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileFormalOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileFormalOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/womens-wear/dresses">Dresses</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/suits">Suits</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/blazers">Blazers</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/formal-pants">
                            Formal Pants
                          </Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/skirts">Skirts</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="sports-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileSportsOpen(!mobileSportsOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Sports Wear:
                      </h3>
                      <span className="text-xl">
                        {mobileSportsOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileSportsOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/womens-wear/activewear">Activewear</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/sports-bras">
                            Sports Bras
                          </Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/yoga-wear">Yoga Wear</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/running-gear">
                            Running Gear
                          </Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/swimwear">Swimwear</Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="outerwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileOuterwearOpen(!mobileOuterwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Outerwear:
                      </h3>
                      <span className="text-xl">
                        {mobileOuterwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileOuterwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/womens-wear/jackets">Jackets</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/coats">Coats</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/cardigans">Cardigans</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/vests">Vests</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/winter-wear">
                            Winter Wear
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="underwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileUnderwearOpen(!mobileUnderwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Underwear and Loungewear:
                      </h3>
                      <span className="text-xl">
                        {mobileUnderwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileUnderwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/womens-wear/bras">Bras</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/panties">Panties</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/loungewear">Loungewear</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/sleepwear">Sleepwear</Link>
                        </li>
                        <li>
                          <Link href="/womens-wear/hosiery">Hosiery</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}

              {activeMobileCategory === "kids" && (
                <>
                  <div className="casual-wear">
                    <div
                      className="flex justify-between items-center mb-3 cursor-pointer"
                      onClick={() => setMobileCasualOpen(!mobileCasualOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Boys Casual:
                      </h3>
                      <span className="text-xl">
                        {mobileCasualOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileCasualOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4">
                        <li>
                          <Link href="/kids-wear/boys/t-shirts">
                            Boys T-shirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/boys/shorts">Boys Shorts</Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/boys/jeans">Boys Jeans</Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/boys/hoodies">
                            Boys Hoodies
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/boys/polo-shirts">
                            Boys Polo Shirts
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="formal-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileFormalOpen(!mobileFormalOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Girls Casual:
                      </h3>
                      <span className="text-xl">
                        {mobileFormalOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileFormalOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/kids-wear/girls/dresses">
                            Girls Dresses
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/girls/tops">Girls Tops</Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/girls/skirts">
                            Girls Skirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/girls/leggings">
                            Girls Leggings
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/girls/sweaters">
                            Girls Sweaters
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="sports-wear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setMobileSportsOpen(!mobileSportsOpen)}
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Kids Sports:
                      </h3>
                      <span className="text-xl">
                        {mobileSportsOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileSportsOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/kids-wear/sports/activewear">
                            Kids Activewear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/sports/sports-shorts">
                            Sports Shorts
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/sports/swimwear">
                            Kids Swimwear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/sports/sneakers">
                            Kids Sneakers
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/sports/tracksuits">
                            Tracksuits
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="outerwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileOuterwearOpen(!mobileOuterwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Kids Outerwear:
                      </h3>
                      <span className="text-xl">
                        {mobileOuterwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileOuterwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/kids-wear/outerwear/jackets">
                            Kids Jackets
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/outerwear/coats">
                            Kids Coats
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/outerwear/rainwear">
                            Rainwear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/outerwear/winter-wear">
                            Kids Winter Wear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/outerwear/hoodies">
                            Kids Hoodies
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="underwear">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setMobileUnderwearOpen(!mobileUnderwearOpen)
                      }
                    >
                      <h3 className="font-semibold text-[#091697]">
                        Kids Underwear:
                      </h3>
                      <span className="text-xl">
                        {mobileUnderwearOpen ? "⌄" : "›"}
                      </span>
                    </div>
                    {mobileUnderwearOpen && (
                      <ul className="space-y-2 text-sm text-[#091697] ml-4 mt-3">
                        <li>
                          <Link href="/kids-wear/underwear/boys-underwear">
                            Boys Underwear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/underwear/girls-underwear">
                            Girls Underwear
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/underwear/pajamas">
                            Kids Pajamas
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/underwear/socks">
                            Kids Socks
                          </Link>
                        </li>
                        <li>
                          <Link href="/kids-wear/underwear/sleepwear">
                            Kids Sleepwear
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="footer-links mt-8 pt-6 border-t flex justify-between text-sm">
              <div>
                <span>Click to </span>
                <Link href="#" className="text-[#091697] underline">
                  Sign in
                </Link>
                <span> or </span>
                <Link href="#" className="text-[#091697] underline">
                  Sign up
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/location.png"}
                  alt="track order"
                  width={16}
                  height={16}
                />
                <Link href="#" className="text-[#091697] underline">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dropdowns */}
      {showMenNavMenu && <MenDropdown setShowMenNavMenu={setShowMenNavMenu} />}
      {showWomenNavMenu && (
        <WomenDropdown setShowWomenNavMenu={setShowWomenNavMenu} />
      )}
      {showKidNavMenu && <KidDropdown setShowKidNavMenu={setShowKidNavMenu} />}
    </>
  );
}

export default Header;
