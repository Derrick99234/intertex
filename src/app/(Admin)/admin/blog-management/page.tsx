"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DeleteBlogPost from "@/components/admin/blog/delete-blog-popup";
import DynamicTable from "@/components/admin/dynamic-table";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";

interface Blog {
  checkbox: boolean;
  no: string;
  initiatorId: string;
  topic: string;
  datePosted: string;
  edit: JSX.Element;
  action: JSX.Element;
  more: JSX.Element;
}
function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      setBlogs((prev) => prev.filter((blog) => blog.initiatorId !== id));
      alert("Blog deleted successfully");
    } else {
      setError(data.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/blog`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");

        console.log(data);
        const transformedBlogs = data.map((blog: any, index: number) => ({
          initiatorId: `BLG-${String(index + 1).padStart(4, "0")}`, // or use user._id.slice(-6) etc.
          topic: blog.title || "N/A",
          datePosted: new Date(blog.createdAt).toLocaleDateString("en-GB"), // adjust format if needed
          edit: (
            <MdEdit
              className="text-secondary cursor-pointer"
              onClick={() =>
                router.push(`/admin/blog-management/edit?id=${blog._id}`)
              }
            />
          ),
          action: (
            <MdDelete
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setBlogToDelete(blog._id);
                setShowDeletePopup(true);
              }}
            />
          ),
          more: <IoEyeOutline />,
        }));

        setBlogs(transformedBlogs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        <DisplayStats />
        <DynamicTable
          columns={[
            { key: "checkbox", label: "", type: "checkbox" as const },
            { key: "no", label: "NO" },
            { key: "initiatorId", label: "Initiator ID" },
            { key: "topic", label: "Topic" },
            { key: "datePosted", label: "Date Posted" },
            { key: "edit", label: "Edit" },
            { key: "action", label: "Action" },
            { key: "more", label: "More", type: "action" },
          ]}
          data={blogs}
          title="New Blog"
          itemsPerPage={5}
          onAction={(id: string) => {
            console.log("Action on order ID:", id);
          }}
          searchPlaceholder="Search by date, email..."
          showViewAll={true}
          //   navigations={[
          //     {
          //       name: "All Orders",
          //       href: "all-order",
          //     },
          //     {
          //       name: "Pending Orders",
          //       href: "pending-orders",
          //     },
          //     {
          //       name: "Successful orders",
          //       href: "succesful-orders",
          //     },
          //     {
          //       name: "Failed orders",
          //       href: "failed-orders",
          //     },
          //   ]}
          onViewAll={() => router.push("/admin/blog-management/create")}
        />
      </div>
      {showDeletePopup && (
        <DeleteBlogPost
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => {
            handleDelete(blogToDelete!);
            setShowDeletePopup(false);
          }}
        />
      )}
    </section>
  );
}

export default BlogManagement;
