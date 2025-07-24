import React from "react";

const Numbers = () => {
  return (
    <section className="bg-black text-white py-10 sm:py-14 md:py-16 px-2 sm:px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-4 uppercase tracking-wide">
        NUMBERS WE ARE PROUD OF
      </h2>
      <p className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base md:text-[19px] text-gray-200">
        INTERTEX is here for you every step of the way—helping you capture and organize all your creative ideas, whether they're scribbled on paper, napkins, or floating in your mind, so nothing gets lost.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">20+</div>
          <div className="text-xs sm:text-[13px] text-gray-300 leading-tight">
            Years of OEM experience in<br />clothing industry
          </div>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">9113+</div>
          <div className="text-xs sm:text-[13px] text-gray-300 leading-tight">
            Happy clients and counting
          </div>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">9028+</div>
          <div className="text-xs sm:text-[13px] text-gray-300 leading-tight">
            Ready stylish designs
          </div>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">93685+</div>
          <div className="text-xs sm:text-[13px] text-gray-300 leading-tight">
            Pieces of high-quality clothes<br />made per month
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers; 