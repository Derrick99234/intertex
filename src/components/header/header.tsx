"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import MenDropdown from "./men-dropdown";
import WomenDropdown from "./women-dropdown";
import KidDropdown from "./kid-dropdown";
import { LoadingSpinner } from "../loading-spinner";
import { NotificationSystem } from "../notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import MobileMenu from "./mobile-header";

function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showMenNavMenu, setShowMenNavMenu] = React.useState(false);
  const [showWomenNavMenu, setShowWomenNavMenu] = React.useState(false);
  const [showKidNavMenu, setShowKidNavMenu] = React.useState(false);

  const handleClick = () => {
    router.push("/");
  };

  const [isLoading, setIsLoading] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [user, setUser] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("intertex-token");
    if (!token) {
      return;
    }
    setIsLoading(true);
    const fetchUserData = async () => {
      const response = await fetch(`${API_BASE_URL}/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setUser(data);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <>
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
            {/* <li>
              <Link href={"#"} onClick={() => setShowKidNavMenu(true)}>
                Kids
              </Link>
            </li>
            <li>
              <Link href={"/mens-wear"}>Accessories</Link>
            </li> */}
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
            href={"/order"}
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
            href={"/shop"}
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
          <Link
            href={"/shop/cart"}
            className="search flex items-center gap-4 border p-2 px-4 rounded-md border-gray-200"
          >
            <Image
              src={"/icons/cart.png"}
              alt="cart"
              width={30}
              height={10}
              className="cursor-pointer"
            />
          </Link>
          {user.fullName ? (
            <>
              <span className="bg-secondary text-white font-semibold text-2xl w-12 h-12 p-2 flex justify-center items-center rounded-full uppercase">
                {user.fullName.split(" ")[0].charAt(0) +
                  user.fullName.split(" ")[1]?.charAt(0)}
              </span>
              <Link href={"/update-profile"}>
                <Image
                  src={"/icons/profile.png"}
                  alt="user profile"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <Link href={"/login"}>
              <Image
                src={"/icons/profile.png"}
                alt="user profile"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </Link>
          )}
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
          <Link
            href={"/shop/cart"}
            className="search flex items-center gap-4 border p-2 px-4 rounded-md border-gray-200"
          >
            <Image
              src={"/icons/cart.png"}
              alt="cart"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          {user.fullName ? (
            <>
              <span className="bg-secondary text-white font-semibold text-2xl w-12 h-12 p-2 flex justify-center items-center rounded-full uppercase">
                {user.fullName.split(" ")[0].charAt(0) +
                  user.fullName.split(" ")[1]?.charAt(0)}
              </span>
              <Link href={"/update-profile"}>
                <Image
                  src={"/icons/profile.png"}
                  alt="user profile"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <Link href={"/login"}>
              <Image
                src={"/icons/profile.png"}
                alt="user profile"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </Link>
          )}
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

      {isMobileMenuOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <MobileMenu toggleMobileMenu={toggleMobileMenu} />
        </Suspense>
      )}
      <LoadingSpinner isLoading={isLoading} />

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
