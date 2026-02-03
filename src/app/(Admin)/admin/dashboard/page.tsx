"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
// const users = [
//   {
//     userId: "01000SA",
//     fullName: "Adeyanju Gabriel",
//     email: "adeyanju.celestial@gmail.com",
//     dateJoined: "03-03-2025",
//     totalOrders: 10,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01001AB",
//     fullName: "Fatima Yusuf",
//     email: "fatima.y@gmail.com",
//     dateJoined: "12-01-2025",
//     totalOrders: 5,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01002CD",
//     fullName: "Chinedu Okafor",
//     email: "okafor.chi@gmail.com",
//     dateJoined: "25-12-2024",
//     totalOrders: 13,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01003EF",
//     fullName: "Blessing Johnson",
//     email: "blessing.j@gmail.com",
//     dateJoined: "08-04-2025",
//     totalOrders: 2,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01004GH",
//     fullName: "Tunde Salami",
//     email: "tunde.salami@yahoo.com",
//     dateJoined: "30-01-2025",
//     totalOrders: 7,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01005IJ",
//     fullName: "Linda Okeke",
//     email: "linda.okeke@gmail.com",
//     dateJoined: "14-02-2025",
//     totalOrders: 11,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01006KL",
//     fullName: "Michael Adewole",
//     email: "mike.adewole@outlook.com",
//     dateJoined: "22-03-2025",
//     totalOrders: 4,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01007MN",
//     fullName: "Jennifer Musa",
//     email: "jennymusa@gmail.com",
//     dateJoined: "10-06-2025",
//     totalOrders: 9,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01008OP",
//     fullName: "David Emmanuel",
//     email: "david.emma@gmail.com",
//     dateJoined: "17-05-2025",
//     totalOrders: 6,
//     more: <IoEyeOutline />,
//   },
//   {
//     userId: "01009QR",
//     fullName: "Zainab Lawal",
//     email: "zlawal@mail.com",
//     dateJoined: "01-01-2025",
//     totalOrders: 12,
//     more: <IoEyeOutline />,
//   },
// ];

interface User {
  userId: string;
  fullName: string;
  email: string;
  dateJoined: string;
  totalOrders: number;
  more: JSX.Element;
}

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

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
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch users");

        const transformedUsers = data.map((user: any, index: number) => ({
          userId: `USR-${String(index + 1).padStart(4, "0")}`, // or use user._id.slice(-6) etc.
          fullName: user.fullName || "N/A",
          email: user.email,
          dateJoined: new Date(user.createdAt).toLocaleDateString("en-GB"), // adjust format if needed
          totalOrders: Math.floor(Math.random() * 20), // simulate total orders
          more: <IoEyeOutline />,
        }));

        setUsers(transformedUsers);
      } catch (err: any) {
        showNotification(
          err.message || "An error occurred while fetching users",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="py-5">
      <DisplayStats />

      <DynamicTable
        columns={[
          { key: "checkbox", label: "", type: "checkbox" as const },
          { key: "no", label: "NO" },
          { key: "userId", label: "User ID" },
          { key: "fullName", label: "Full Name" },
          { key: "email", label: "Email", type: "email" as const },
          { key: "dateJoined", label: "Date Joined", type: "date" as const },
          { key: "totalOrders", label: "Total Orders" },
          { key: "more", label: "More" },
        ]}
        data={users}
        title="View All Users"
        itemsPerPage={5}
        searchPlaceholder="Search by date, email..."
        onAction={() => console.log("Click on action button")}
        showViewAll={true}
        onViewAll={() => router.push("/admin/users-management")}
      />
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </section>
  );
}

export default Dashboard;
