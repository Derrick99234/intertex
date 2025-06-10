import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center px-10 text-[#091697] py-6 w-full">
      <div className="logo">
        <Image
          src={"/logo/intertex-logo.png"}
          alt="intertex logo"
          width={150}
          height={200}
        />
      </div>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href={"#"}>Man</Link>
          </li>
          <li>
            <Link href={"#"}>Woman</Link>
          </li>
          <li>
            <Link href={"#"}>Kids</Link>
          </li>
          <li>
            <Link href={"#"}>Accessories</Link>
          </li>
          <li>
            <Link href={"#"}>Our Factory</Link>
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
            // className="size-2"
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
  );
}

export default Header;
