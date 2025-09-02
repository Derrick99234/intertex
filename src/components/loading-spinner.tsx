export const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-100/30 bg-opacity-75">
      <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl">
        <div className="spinner w-16 h-16 border-4 border-secondary rounded-full border-t-blue-500 animate-spin"></div>
        {/* <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p> */}
      </div>
    </div>
  );
};
