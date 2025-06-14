"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const animatedTexts = [
  "Street Wear",
  "Hoodies",
  "T-Shirt",
  "Swimmer",
  "Tops",
  "Sports Wear",
];

const FactoryExplore = () => {
  const [currentText, setCurrentText] = useState("Clothing");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        let next;
        do {
          next = animatedTexts[Math.floor(Math.random() * animatedTexts.length)];
        } while (next === prev);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-[#FAFAFA] py-8 sm:py-12 px-2 sm:px-4 md:px-0">
      <span className="block text-center md:text-left text-[#1A237E] text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-4 sm:mb-6 uppercase tracking-wide">
        Explore our factory
      </span>
      <div className="flex flex-col md:flex-row items-center justify-center w-full ">
        <div className=" flex flex-col justify-center items-start w-full md:w-[613px] max-w-xs sm:max-w-md md:max-w-none md:mr-12 ">
          <div className="border-2 border-dashed border-[#091697] rounded-lg w-full md:h-[275px] h-[120px] sm:h-[120px] mb-4 sm:mb-8 flex flex-col justify-center items-start px-4 sm:px-8">
            <span className="block text-xl sm:text-3xl md:text-5xl font-bold text-[#091697] mb-2 sm:mb-8 transition-all duration-500">
              {currentText}
            </span>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-black leading-tight mb-1 sm:mb-2">
              Manufacturer For<br />YOUR Clothing Line
            </h1>
          </div>
          <div className="mb-2 mt-6 sm:mt-12">
            <span className="block text-base sm:text-lg text-[#152F24] mb-1">New fashion brand?</span>
            <span className="block text-base sm:text-lg text-[#152F24]"><span className="font-bold">Intertex</span> is here to be your first and last stop for all clothing needs.</span>
          </div>
          <button className="bg-[#091697] text-white text-sm sm:text-[19px] font-bold px-6 sm:px-10 py-2 sm:py-3 mt-2 shadow hover:bg-[#0d1333] transition-colors w-[230px] sm:w-[160px] md:w-[234px] h-[40px] sm:h-[48px] md:h-[64px]">
            Get Started
          </button>
        </div>
        <div className=" flex justify-center items-center mt-8 md:mt-0 w-[180px] sm:w-[300px] md:w-[473px] h-[180px] sm:h-[300px] md:h-[710px] ">
          <Image
            src="/images/factory-explore.png"
            alt="Man in suit"
            width={420}
            height={600}
            className="object-contain w-[180px] sm:w-[300px] md:w-[473px] h-[180px] sm:h-[300px] md:h-[710px]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FactoryExplore;