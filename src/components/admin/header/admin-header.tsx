import { API_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function AdminHeader() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/admin/get-admin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          router.push("/admin");
          throw new Error(data.message || "Failed to fetch users");
        }

        setUser(data);
      } catch (err: any) {
        setError(err.message);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
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
        <span>{user?.firstName + " " + user?.lastName}</span>
        <MdOutlineArrowDropDown />
      </div>
    </header>
  );
}

export default AdminHeader;
