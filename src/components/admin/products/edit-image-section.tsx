import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface ImageField {
  id: string;
  label: string;
  file: File | null;
  preview: string | null;
  deleted?: boolean;
}

function ImageUploader({
  images,
  setImages,
  deleteImage,
  replaceImage,
  maxImages = 5,
}: {
  images: ImageField[];
  setImages: (images: ImageField[]) => void;
  deleteImage: (id: string) => void;
  replaceImage: (id: string, file: File) => void;
  maxImages?: number;
}) {
  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
      replaceImage(id, file);
    } else {
      const updated = images.map((field) =>
        field.id === id
          ? { ...field, file: null, preview: field.preview }
          : field
      );
      setImages(updated);
    }
  };

  const removeImageField = (id: string) => {
    const img = images.find((i) => i.id === id);

    if (img?.preview) {
      // Existing image → mark as deleted (backend will remove from AWS)
      deleteImage(id);
    } else {
      // New image just added → remove normally
      const filtered = images.filter((field) => field.id !== id);
      const reordered = filtered.map((field, index) => ({
        ...field,
        id: (index + 1).toString(),
        label: `Add Image ${index + 1}`,
      }));
      setImages(reordered);
    }
  };

  const addNewImageField = () => {
    if (images.length >= maxImages) return;
    const newId = (images.length + 1).toString();
    setImages([
      ...images,
      {
        id: newId,
        label: `Add Image ${images.length + 1}`,
        file: null,
        preview: null,
        deleted: false,
      },
    ]);
  };

  return (
    <div className="space-y-4 pt-8 overflow-y-scroll max-h-96">
      {images.map((field) => (
        <div key={field.id} className="border rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {!field.deleted && (
              <button
                onClick={() => removeImageField(field.id)}
                className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                type="button"
              >
                <IoMdClose />
              </button>
            )}
          </div>

          {!field.deleted && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(field.id, e.target.files?.[0] || null)
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {field.preview && (
                <div className="mt-3">
                  <Image
                    width={80}
                    height={80}
                    src={field.preview}
                    alt={`Preview ${field.label}`}
                    className="h-20 w-20 object-cover rounded border"
                  />
                </div>
              )}
            </>
          )}

          {field.deleted && (
            <p className="text-red-500 text-sm italic mt-2">
              Marked for deletion
            </p>
          )}
        </div>
      ))}

      {images.length < maxImages && (
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
  );
}

export default ImageUploader;
