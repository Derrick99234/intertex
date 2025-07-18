"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  {
    label: "Sales & Accounting",
    icon: <FaChartLine />,
    href: "/admin/sales-account",
  },
  { label: "Admin Users", icon: <FaUserShield />, href: "/admin/admin-users" },
  { label: "Roles & Permission", icon: <FaCogs />, href: "/admin/roles" },
  {
    label: "Blogs Management",
    icon: <FaBlog />,
    href: "/admin/blog-management",
  },
  { label: "Sales & Promotion", icon: <FaTags />, href: "/admin/promotions" },
  { label: "Feedback", icon: <FaEnvelope />, href: "/admin/feedback" },
  { label: "Email Management", icon: <FaEnvelope />, href: "/admin/email" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white flex flex-col pb-8 border-r border-gray-200 fixed h-screen">
      <nav className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
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
      </nav>

      <div className="pl-7 space-y-6 mt-3">
        <Link
          href="/admin/help"
          className="flex items-center text-sm text-gray-400 hover:text-blue-600 cursor-pointer"
        >
          <FaQuestionCircle className="mr-2" /> Help
        </Link>
        <button className="flex items-center text-sm text-gray-400 hover:text-blue-600 cursor-pointer">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
}
