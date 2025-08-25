"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import { API_BASE_URL } from "@/lib/constants";
import { useState, useRef } from "react";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("tags", tagsInput);
      if (imageFile) {
        formData.append("imageCover", imageFile);
      }

      const res = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create post");

      const data = await res.json();
      console.log("✅ Post created:", data);
      alert("Blog created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        <div className="max-w-4xl mx-auto p-6 bg-white">
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
              {/* Font Family */}
              <select
                onChange={(e) => formatText("fontName", e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                defaultValue="Arial"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
              </select>

              {/* Font Size */}
              <select
                onChange={(e) => formatText("fontSize", e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm ml-2"
                defaultValue="3"
              >
                <option value="1">8pt</option>
                <option value="2">10pt</option>
                <option value="3">12pt</option>
                <option value="4">14pt</option>
                <option value="5">18pt</option>
                <option value="6">24pt</option>
                <option value="7">36pt</option>
              </select>

              {/* Bold */}
              <button
                onClick={() => formatText("bold")}
                className="px-3 py-1 border border-gray-300 rounded font-bold hover:bg-gray-200"
                type="button"
              >
                B
              </button>

              {/* Italic */}
              <button
                onClick={() => formatText("italic")}
                className="px-3 py-1 border border-gray-300 rounded italic hover:bg-gray-200"
                type="button"
              >
                I
              </button>

              {/* Underline */}
              <button
                onClick={() => formatText("underline")}
                className="px-3 py-1 border border-gray-300 rounded underline hover:bg-gray-200"
                type="button"
              >
                U
              </button>

              {/* Link */}
              <button
                onClick={() => {
                  const url = prompt("Enter URL:");
                  if (url) formatText("createLink", url);
                }}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                🔗
              </button>

              {/* Image */}
              <button
                onClick={() => {
                  const url = prompt("Enter image URL:");
                  if (url) formatText("insertImage", url);
                }}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                🖼️
              </button>

              {/* Bullet List */}
              <button
                onClick={() => formatText("insertUnorderedList")}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                •
              </button>

              {/* Numbered List */}
              <button
                onClick={() => formatText("insertOrderedList")}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                1.
              </button>

              {/* Align Left */}
              <button
                onClick={() => formatText("justifyLeft")}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                ⬅️
              </button>

              {/* Align Center */}
              <button
                onClick={() => formatText("justifyCenter")}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                ↔️
              </button>

              {/* Align Right */}
              <button
                onClick={() => formatText("justifyRight")}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                ➡️
              </button>

              {/* More Options */}
              <button
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                type="button"
              >
                ⋯
              </button>
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
            >
              <p className="text-gray-500">Enter some rich text here</p>
            </div>
          </div>

          {/* Image Cover Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Cover
            </label>
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

          {/* Post Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handlePost}
              className="px-8 py-3 bg-secondary text-white rounded hover:bg-secondary/90 w-2xl cursor-pointer font-medium"
              type="button"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateBlog;
