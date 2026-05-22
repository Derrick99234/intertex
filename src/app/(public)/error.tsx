"use client";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-red-600 text-2xl font-bold">!</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="bg-[#1739B7] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#122a8f] transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
