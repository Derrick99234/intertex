"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import { API_BASE_URL } from "@/lib/constants";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function EditBlog() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();

        setTitle(data.title);
        setTagsInput(data.tags?.join(", ") || "");
        setContent(data.description);
        setExistingImage(data.imageCover || null);

        if (editorRef.current) {
          editorRef.current.innerHTML = data.description;
        }
      } catch (err) {
        console.error(err);
        alert("Error loading blog");
      }
    };
    fetchBlog();
  }, [id]);

  //   const formatText = (command: string, value?: string) => {
  //     document.execCommand(command, false, value);
  //     editorRef.current?.focus();
  //   };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("tags", tagsInput);
      if (imageFile) {
        formData.append("imageCover", imageFile);
      }

      const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update post");

      const data = await res.json();
      console.log("✅ Post updated:", data);
      alert("Blog updated successfully!");
      router.push("/admin/blog-management"); // go back to blogs list
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    }
  };

  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        <div className="max-w-4xl mx-auto p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

          {/* Title and Tags Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center space-x-1">
              {/* Toolbar Buttons (same as CreateBlog) */}
              {/* ... keep your toolbar buttons here ... */}
            </div>

            {/* Editor Content */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-64 p-4 focus:outline-none"
              style={{ minHeight: "200px" }}
              onInput={(e) =>
                setContent((e.target as HTMLDivElement).innerHTML)
              }
              suppressContentEditableWarning={true}
            />
          </div>

          {/* Image Cover Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Cover
            </label>
            {existingImage && !imageFile && (
              <div className="mb-3">
                <Image
                  src={existingImage}
                  width={200}
                  height={200}
                  alt="Current Cover"
                  className="w-48 h-32 object-cover rounded"
                />
                <p className="text-xs text-gray-500">Current cover image</p>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-sm"
                type="button"
              >
                Browse
              </button>
            </div>
            {imageFile && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  Selected: {imageFile.name}
                </p>
              </div>
            )}
          </div>

          {/* Update Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpdate}
              className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 w-2xl cursor-pointer font-medium"
              type="button"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditBlog;
