"use client";
import Link from "next/link";

export default function AdminHelpPage() {
  return (
    <section className="py-5">
      <div className="bg-white rounded-lg shadow p-5 max-w-3xl">
        <h1 className="text-lg font-semibold text-secondary mb-2">Help</h1>
        <p className="text-sm text-gray-600 mb-6">
          Common shortcuts for admin operations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/product-management"
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Products</div>
            <div className="text-sm text-gray-600">
              Add, edit, and manage inventory.
            </div>
          </Link>
          <Link
            href="/admin/order-management"
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Orders</div>
            <div className="text-sm text-gray-600">
              View and update order statuses.
            </div>
          </Link>
          <Link
            href="/admin/users-management"
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Users</div>
            <div className="text-sm text-gray-600">
              Review customer profiles and activity.
            </div>
          </Link>
          <Link
            href="/admin/blog-management"
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-medium text-gray-900">Blog</div>
            <div className="text-sm text-gray-600">
              Create, edit, and delete blog posts.
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

