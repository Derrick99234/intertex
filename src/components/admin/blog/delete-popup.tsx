import React from "react";

function DeletePopup({
  onClose,
  onDelete,
  title,
  text,
}: {
  onClose: () => void;
  onDelete: () => void;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-black/40 fixed top-0 bottom-0 left-0 z-50 flex justify-center items-center w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-20">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p>{text}</p>
        <div className="flex gap-5 flex-col mt-4">
          <button
            className="text-black border border-secondary/50 px-4 py-3 cursor-pointer rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-3 cursor-pointer rounded-lg"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
