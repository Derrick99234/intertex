import Image from "next/image";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";

function AdminHeader() {
  return (
    <header className="flex justify-between items-center bg-white px-4 py-2 fixed w-full top-0 z-50">
      <Image
        src={"/logo/intertex_logo_2.png"}
        alt="Admin Login"
        width={200}
        height={200}
        className="w-36 h-auto mt-4 ml-4"
      />

      <div className="flex justify-center gap-4 items-center">
        <IoMdNotificationsOutline />
        <Image
          src="/images/bg-cloth.jpg"
          alt="Showcase background"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full ml-4"
        />
        <span>Super Admin</span>
        <MdOutlineArrowDropDown />
      </div>
    </header>
  );
}

export default AdminHeader;
