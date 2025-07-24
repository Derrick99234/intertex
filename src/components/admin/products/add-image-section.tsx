import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ImageField {
  id: string;
  label: string;
  file: File | null;
  preview: string | null;
}

function ImageUploader({
  onImagesChange,
  maxImages = 10,
}: {
  onImagesChange?: (images: ImageField[]) => void;
  maxImages?: number;
}) {
  const [imageFields, setImageFields] = useState<ImageField[]>([
    { id: "1", label: "Add Image 1", file: null, preview: null },
    { id: "2", label: "Add Image 2", file: null, preview: null },
    { id: "3", label: "Add Image 3", file: null, preview: null },
  ]);
  const handleFileChange = (id: string, file: File | null) => {
    setImageFields((prev) => {
      const updated = prev.map((field) => {
        if (field.id === id) {
          let preview = null;
          if (file) {
            preview = URL.createObjectURL(file);
          }
          return { ...field, file, preview };
        }
        return field;
      });

      if (onImagesChange) {
        onImagesChange(updated);
      }

      return updated;
    });
  };

  const removeImageField = (id: string) => {
    setImageFields((prev) => {
      const filtered = prev.filter((field) => field.id !== id);

      // 2. Reassign new order numbers (if needed)
      const reordered = filtered.map((field, index) => ({
        ...field,
        id: (index + 1).toString(),
        label: `Add Image ${(index + 1).toString()}`,
      }));
      if (onImagesChange) {
        onImagesChange(reordered);
      }
      return reordered;
    });
  };

  const addNewImageField = () => {
    if (imageFields.length >= maxImages) return;

    const newId = (imageFields.length + 1).toString();
    const newField: ImageField = {
      id: newId,
      label: `Add Image ${imageFields.length + 1}`,
      file: null,
      preview: null,
    };

    setImageFields((prev) => {
      const updated = [...prev, newField];
      if (onImagesChange) {
        onImagesChange(updated);
      }
      return updated;
    });
  };

  return (
    <>
      <div className="space-y-4 pt-8 overflow-y-scroll max-h-96">
        {imageFields.map((field) => (
          <div key={field.id} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {imageFields.length > 1 && (
                <button
                  onClick={() => removeImageField(field.id)}
                  className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                  type="button"
                >
                  <IoMdClose />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange(field.id, file);
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm"
              >
                Browse
              </button>
            </div>

            {field.preview && (
              <div className="mt-3">
                <img
                  src={field.preview}
                  alt={`Preview ${field.label}`}
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}
          </div>
        ))}

        {imageFields.length < maxImages && (
          <button
            onClick={addNewImageField}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            type="button"
          >
            <span className="text-lg">+</span>
            <span>Add New</span>
          </button>
        )}
      </div>
    </>
  );
}

export default ImageUploader;
