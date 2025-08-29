export const NotificationSystem = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error" | "info";
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 w-full max-w-sm space-y-4">
      <div
        className={`notification-item py-3 px-5 rounded-lg shadow-xl text-white font-medium ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : "bg-blue-500"
        } show`}
      >
        {message}
      </div>
    </div>
  );
};
