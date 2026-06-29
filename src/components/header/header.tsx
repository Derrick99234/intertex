"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import MenDropdown from "./men-dropdown";
import WomenDropdown from "./women-dropdown";
import KidDropdown from "./kid-dropdown";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "./mobile-header";
import { LogInIcon, LogOut } from "lucide-react";
import { BiCart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { API_BASE_URL } from "@/lib/constants";

function Header() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showMenNavMenu, setShowMenNavMenu] = React.useState(false);
  const [showWomenNavMenu, setShowWomenNavMenu] = React.useState(false);
  const [showKidNavMenu, setShowKidNavMenu] = React.useState(false);

  const handleClick = () => {
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="hidden lg:flex justify-between items-center px-10 text-secondary py-6 w-full">
        <div className="logo">
          <Image
            src={"/logo/intertex-new-logo.png"}
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
              <Link href={"https://factory.intertexng.com"}>Our Factory</Link>
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
            <BiCart size={20} />
          </Link>
          {isLoading ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          ) : user?.fullName ? (
            <>
              <Link href={"/update-profile"}>
                <span className="bg-secondary text-white font-semibold text-2xl w-12 h-12 p-2 flex justify-center items-center rounded-full uppercase">
                  {user.fullName.split(" ")[0].charAt(0) +
                    (user.fullName.split(" ")[1]?.charAt(0) || "")}
                </span>
              </Link>
              <button
                onClick={async () => {
                  await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                  });
                  window.location.href = "/";
                }}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link href={"/login"}>
              <LogInIcon size={20} />
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden flex justify-between items-center px-4 py-4 bg-white text-s">
        <div className="logo">
          <Image
            src={"/logo/intertex-new-logo.png"}
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
            <BiCart size={20} />
          </Link>
          {isLoading ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          ) : user?.fullName ? (
            <Link href={"/update-profile"}>
              <span className="bg-secondary text-white font-semibold text-2xl w-12 h-12 p-2 flex justify-center items-center rounded-full uppercase">
                {user.fullName.split(" ")[0].charAt(0) +
                  (user.fullName.split(" ")[1]?.charAt(0) || "")}
              </span>
            </Link>
          ) : (
            <Link href={"/login"}>
              <CgProfile size={20} />
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="hamburger-menu flex flex-col gap-1 p-2"
          >
            <span className="block w-6 h-0.5 bg-secondary"></span>
            <span className="block w-6 h-0.5 bg-secondary"></span>
            <span className="block w-6 h-0.5 bg-secondary"></span>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <MobileMenu toggleMobileMenu={toggleMobileMenu} />
        </Suspense>
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
