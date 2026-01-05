import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
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

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ message, type, status: true });

    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 2000);
  };

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
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
          showNotification(data.message || "Failed to fetch user", "error");
          router.push("/admin");
        }
        setUser(data);
      } catch (err: any) {
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!user) return;

  return (
    <header className="flex justify-between items-center bg-white px-4 py-2 fixed w-full top-0">
      <Image
        src={"/logo/intertex-new-logo.png"}
        alt="Admin Login"
        width={200}
        height={200}
        className="w-26 h-auto mt-4 ml-4"
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
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </header>
  );
}

export default AdminHeader;
