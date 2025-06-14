"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const budgetOptions = [
  "< $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  ">$10,000",
];
const platformOptions = [
  "Shopify",
  "Etsy",
  "Amazon",
  "eBay",
  "Other",
];

const FactoryContact = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, 10 - files.length);
    setFiles((prev) => [...prev, ...selected].slice(0, 10));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).slice(0, 10 - files.length);
    setFiles((prev) => [...prev, ...dropped].slice(0, 10));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center p-2 md:p-8">
      <form className="w-full max-w-7xl bg-white border border-gray-300 rounded-lg p-4 md:px-32 md:py-12 mx-auto" onSubmit={e => e.preventDefault()}>
        <h2 className="text-center text-[#091697] font-['Marcellus_SC'] text-[28px] md:text-[33px] font-normal mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-[13px] text-[#1C1B1F]">
          <input className="border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]" placeholder="Name" />
          <input className="border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]" placeholder="Email" type="email" />
          <input className="border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]" placeholder="Phone Number, (Please include country code)" />
          <div className="relative">  
          <select className="appearance-none border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]">
            <option value="">Estimated Budget</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Image
            src="/icons/arrow-down.png"
            alt="Dropdown"
            width={18}
            height={18}
            className="pointer-events-none absolute md:right-5 right-3 top-2/3 transform -translate-y-3/3 md:w-[15px] md:h-[15px] w-[12px] h-[12px]"
          />
          </div>
          <input className="border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]" placeholder="Company Name" />
          <div className="relative">  
          <select className="appearance-none border border-gray-400 rounded px-4 py-3 w-full h-[56px] outline-none text-[#1C1B1F] placeholder:text-[#1C1B1F]">
            <option value="">Your Selling Platform</option>
            {platformOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Image
            src="/icons/arrow-down.png"
            alt="Dropdown"
            width={18}
            height={18}
            className="pointer-events-none absolute md:right-5 right-3 top-2/3 transform -translate-y-3/3 md:w-[15px] md:h-[15px] w-[12px] h-[12px]"
          />
          </div>
        </div>
        <textarea className="border border-gray-400 rounded px-4 py-3 w-full outline-none mb-4 min-h-[134px] text-[13px] text-[#1C1B1F] placeholder:text-[#1C1B1F]" placeholder="Comment or Message" />
        {/* File Upload */}
        <div
          className="border border-gray-400 rounded px-4 py-8 w-full text-center mb-8 bg-white flex flex-col items-center justify-center cursor-pointer transition hover:bg-gray-50 h-[134px]"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <Image src="/icons/upload.png" alt="upload" width={100} height={100} className="mb-2 md:w-[24px] md:h-[16px] w-[24px] h-[16px]" />
          <div className="font-bold mb-1 text-[13px]">Click or drag files to this area to upload.</div>
          <div className="font-bold text-[13px]">You can upload up to 10 files.</div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept="*"
          />
          {files.length > 0 && (
            <div className="mt-4 w-full flex flex-col items-center">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm w-full max-w-md justify-between">
                  <span className="truncate">{file.name}</span>
                  <button type="button" className="text-red-500 hover:underline" onClick={e => { e.stopPropagation(); handleRemoveFile(idx); }}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full md:w-[1018px] h-[48px] md:h-[55.27px] bg-[#091697] text-white font-bold rounded-[4px] mt-4 mx-auto block text-base transition-colors duration-200 hover:bg-[#0b1a8c]"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default FactoryContact; 