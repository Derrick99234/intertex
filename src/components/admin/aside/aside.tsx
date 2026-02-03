"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaChartLine,
  FaUserShield,
  FaCogs,
  FaBlog,
  FaTags,
  FaEnvelope,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard" },
  {
    label: "Manage Category",
    icon: <FaBox />,
    href: "/admin/manage-category",
  },
  {
    label: "Product Management",
    icon: <FaBox />,
    href: "/admin/product-management",
  },
  {
    label: "User Management",
    icon: <FaUsers />,
    href: "/admin/users-management",
  },
  {
    label: "Order Management",
    icon: <FaChartLine />,
    href: "/admin/order-management",
  },
  {
    label: "Inventory & Stock",
    icon: <FaBox />,
    href: "/admin/inventory",
  },
  // {
  //   label: "Sales & Accounting",
  //   icon: <FaChartLine />,
  //   href: "/admin/sales-account",
  // },
  // { label: "Admin Users", icon: <FaUserShield />, href: "/admin/admin-users" },
  // { label: "Roles & Permission", icon: <FaCogs />, href: "/admin/roles" },
  {
    label: "Blogs Management",
    icon: <FaBlog />,
    href: "/admin/blog-management",
  },
  { label: "Sales & Promotion", icon: <FaTags />, href: "/admin/promotions" },
  { label: "Feedback", icon: <FaEnvelope />, href: "/admin/feedback" },
  { label: "Email Management", icon: <FaEnvelope />, href: "/admin/email" },
];

export default function AdminSidebar({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

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

  const handleLogout = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        showNotification("You have been successfully logged out!", "success");
        router.push("/admin");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
      showNotification("Failed to log out. Please try again.", "error");
    }
  };

  return (
    <>
      <div
        className={`fixed top-20 left-0 right-0 bottom-0 bg-black/40 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
        className={`w-64 bg-white flex flex-col pb-20 border-r border-gray-200 fixed left-0 top-20 h-[calc(100vh-5rem)] z-50 transform transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-3 text-sm font-medium hover:bg-secondary/50 hover:text-white ${
                    pathname.startsWith(item.href)
                      ? "bg-secondary text-white"
                      : "text-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pl-7 space-y-6 mt-3">
            <Link
              href="/admin/help"
              onClick={onClose}
              className="flex items-center text-sm text-gray-400 hover:text-blue-600 cursor-pointer"
            >
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-400 hover:text-blue-600 cursor-pointer"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
            {notifications.status && (
              <NotificationSystem
                message={notifications.message}
                type={notifications.type as "success" | "error" | "info"}
              />
            )}
            <LoadingSpinner isLoading={isLoading} />
          </div>
        </nav>
      </aside>
    </>
  );
}
