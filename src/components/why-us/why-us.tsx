"use client";
import Image from "next/image";
import React, { useState } from "react";

const WhyUs = () => {
  const whyUsItems = [
    {
      title: "1. ONE-STOP SOLUTION",
      content: "Content for one-stop solution.",
    },
    {
      title: "2. CUSTOM YOUR OWN UNIQUE DESIGN",
      content: "Content for custom design.",
    },
    {
      title: "3. QUICK TURNAROUND TIME",
      content: "Content for quick turnaround.",
    },
    {
      title: "4. ETHICALLY QUALITY CONTROL",
      content: "Content for ethically quality control.",
    },
    {
      title: "5. LOWER YOUR INVENTORY RISK",
      content: "Content for lower inventory risk.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white px-2 sm:px-4 md:px-8 text-center">
      <h2 className="text-[#091697] text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-8 sm:mb-10 md:mb-12 uppercase">
        WHY US?
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between md:items-start gap-6 md:gap-4">
        {/* Left Section: Why Us Title and Accordion */}
        <div className="flex flex-col items-center text-center w-full md:w-auto">
          <div></div>
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
            {whyUsItems.map((item, index) => (
              <div
                key={index}
                className="w-full md:w-[541px] h-[60px] sm:h-[65px] md:h-[70px] mb-2"
              >
                <button
                  className="bg-gray-100 flex justify-between items-center w-full md:w-[541px] py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.title}
                  <span className="text-[#091697] text-xl sm:text-2xl">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-3 sm:px-6 pb-3 sm:pb-4 text-gray-700 text-xs sm:text-sm">
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full sm:w-[350px] md:w-[597px] flex justify-center items-center md:min-h-[685px] mt-6 md:mt-0">
          <div className="relative w-full h-[220px] sm:h-[350px] md:h-[685px] ">
            <Image
              src="/images/wash.jpeg"
              alt="Woman working in factory"
              layout="fill"
              objectFit="cover"
              className="object-left-center rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
