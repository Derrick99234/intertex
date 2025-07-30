"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

interface User {
  userId: string;
  fullName: string;
  email: string;
  dateJoined: string;
  totalOrders: number;
  more: JSX.Element;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  return (
    <section className="flex mt-20">
      <AdminSidebar />

      <div className="p-5 flex-1 ml-64">
        <DisplayStats />

        {/* Recent Users Section */}
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "userId", label: "User ID" },
            { key: "fullName", label: "Full Name" },
            { key: "email", label: "Email", type: "email" as const },
            { key: "dateJoined", label: "Date Joined" },
            { key: "totalOrders", label: "Total Orders" },
            { key: "more", label: "More", type: "action" },
          ]}
          data={users}
          title="Recent Users"
          itemsPerPage={5}
          onAction={() => console.log("Click on action button")}
          searchPlaceholder="Search by date, email..."
          showViewAll={false}
          navigations={[
            {
              name: "All Users",
              href: "all-users",
            },
            {
              name: "Top Users",
              href: "top-users",
            },
            // {
            //   name: "Inactive Users",
            //   href: "inactive-users",
            // },
            {
              name: "Deactivated Users",
              href: "deactivated-users",
            },
          ]}
          // onViewAll={() => console.log("View all users")}
        />
      </div>
    </section>
  );
}

export default UserManagement;
