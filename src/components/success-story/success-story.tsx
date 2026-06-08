import React from "react";
import Image from "next/image";
import SafeImage from "@/components/safe-image";

const SuccessStory = () => {
  return (
    <section className="w-full bg-black py-12 px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0">
      {/* Left: Text and Button */}
      <div className="flex-1 flex flex-col items-start md:items-start justify-center md:pl-16 mb-8 md:mb-0">
        <h2 className="text-white font-['Marcellus_SC'] text-[28px] md:text-[33px] font-bold leading-snug mb-8 max-w-[400px]">
          Now that you are here?<br />
          Talk to us, Lets be part of<br />
          your success story
        </h2>
        <button
          className="w-[180px] h-[48px] md:w-[234px] md:h-[64px] bg-[#091697] text-white font-semibold rounded transition-colors duration-200 hover:bg-[#0b1a8c] text-base md:text-lg"
        >
          Get Started
        </button>
      </div>
      {/* Right: Images */}
      <div className="flex flex-row gap-4 flex-1 justify-center md:justify-center">
        <div className="relative w-[120px] h-[200px] md:w-[263px] md:h-[428px] rounded-[6px] overflow-hidden">
          <SafeImage
            src="/images/success1.jpeg"
            alt="Success Story 1"
            fill
            className="object-cover rounded-[6px]"
            skeletonClassName="w-full h-full rounded-[6px]"
          />
        </div>
        <div className="relative w-[120px] h-[200px] md:w-[263px] md:h-[428px] rounded-[6px] overflow-hidden">
          <SafeImage
            src="/images/success2.jpeg"
            alt="Success Story 2"
            fill
            className="object-cover rounded-[6px]"
            skeletonClassName="w-full h-full rounded-[6px]"
          />
        </div>
      </div>
    </section>
  );
};

export default SuccessStory; 