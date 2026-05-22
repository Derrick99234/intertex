import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-200 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-6">This admin page does not exist.</p>
      <Link
        href="/admin/dashboard"
        className="bg-[#152F24] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#0f1f18] transition-colors"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
