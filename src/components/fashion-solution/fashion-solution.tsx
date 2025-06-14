import React from "react";

const FashionSolution = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <h2 className="text-center text-[#091697] font-bold text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-8 sm:mb-10 md:mb-12 uppercase tracking-wide px-2 sm:px-4">
        PRECISION-CRAFTED FASHION SOLUTIONS FOR YOUR UNIQUE BUSINESS NEEDS.
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
        {/* Card 1: Wholesale */}
        <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-start w-full md:w-[362px] h-[400px] sm:h-[340px] md:h-[858px]">
          <h3 className="text-lg sm:text-xl md:text-[28px] font-normal text-[#091697] mb-1 sm:mb-2 w-full font-['Marcellus_SC']">1. WHOLESALE</h3>
          <p className="text-base sm:text-lg md:text-[23px] text-center w-full text-black mb-2 sm:mb-4">For Wholesaler</p>
          <p className="text-sm sm:text-base md:text-[19px] text-[#152F24]">
            Order Ready-Made Clothing from Our Product Page
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base md:text-[19px] text-[#152F24] mb-2 sm:mb-8">
            <li>Minimum Order Quantity (MOQ): 50 pieces (mixed sizes, styles, and colors)</li>
            <li>Sample Lead Time: 3 days</li>
            <li>Sample Fee: $20-$25 per piece</li>
            <li>Bulk Pricing: As listed on our website</li>
            <li>Shipping Fee: Send us your delivery address to receive an exact shipping quote</li>
          </ul>
          <div className="flex justify-center items-center w-full h-full">
            <button className="bg-[#091697] text-white font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded mt-auto shadow hover:bg-[#0d1333] transition-colors w-[234px] sm:w-[140px] md:w-[234px] h-[40px] sm:h-[48px] md:h-[64px] text-xs sm:text-base">
              Get Started
            </button>
          </div>
        </div>

        {/* Card 2: Logo Customize */}
        <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-start w-full md:w-[362px] h-[500px] sm:h-[340px] md:h-[858px]">
          <h3 className="text-lg sm:text-xl md:text-[28px] font-normal text-[#091697] mb-1 sm:mb-2 w-full font-['Marcellus_SC']">2. LOGO CUSTOMIZE</h3>
          <p className="text-base sm:text-lg md:text-[23px] text-center w-full text-black mb-1 sm:mb-2">For Brand Starter</p>
          <p className="text-sm sm:text-base md:text-[19px] text-[#152F24]">
            Absolutely! Here's a cleaner, more professional version of your message: Customize Our Blank Clothing with Your Brand
            Add your logo through printing, embroidery, or private labeling to create custom apparel.
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base md:text-[19px] text-[#152F24] mb-2 sm:mb-8">
            <li>Minimum Order Quantity (MOQ): 50 pieces (mixed sizes, styles, and colors)</li>
            <li>Sample Lead Time: 5–8 days (depending on final design)</li>
            <li>Bulk Production Time: 1–3 weeks</li>
            <li>Sample Fee: $50 per piece</li>
            <li>Bulk Pricing:
              <ul className="list-circle list-inside ml-4">
                <li>Choose a blank design from our website</li>
                <li>Send us your logo to receive a custom quote</li>
                <li>Share your shipping address for an accurate delivery fee</li>
              </ul>
            </li>
          </ul>
          <div className="flex justify-center items-center w-full h-full">
            <button className="bg-[#091697] text-white font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded mt-auto shadow hover:bg-[#0d1333] transition-colors w-[234px] sm:w-[140px] md:w-[234px] h-[40px] sm:h-[48px] md:h-[64px] text-xs sm:text-base">
              Get Started
            </button>
          </div>
        </div>

        {/* Card 3: Cut & Sew Customize */}
        <div className="bg-[#FAFAFA] border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-start w-full md:w-[362px] h-[500px] sm:h-[340px] md:h-[858px]">
          <h3 className="text-base sm:text-lg md:text-[24px] font-normal text-[#091697] mb-1 sm:mb-2 w-full font-['Marcellus_SC']">3. CUT & SEW CUSTOMIZE</h3>
          <p className="text-base sm:text-lg md:text-[23px] text-center w-full text-black mb-2 sm:mb-4">For Fashion Brand Expert</p>
          <p className="text-sm sm:text-base md:text-[19px] text-[#152F24]">
            Turn your unique ideas into high-quality fashion pieces with our full custom production service.
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base md:text-[19px] text-[#152F24] mb-2 sm:mb-8">
            <li>Minimum Order Quantity (MOQ): 100 pieces per style/color (across 4 sizes)</li>
            <li>Sample Lead Time: 8–15 days (after confirming all design details)</li>
            <li>Sample Fee: $50 per piece</li>
            <li>Note: Additional charges apply for complex designs, prints, or embroidery</li>
            <li>Bulk Production Time: 24–30 days (depending on design complexity and quantity)</li>
            <li>Bulk Pricing:
              <ul className="list-circle list-inside ml-4">
                <li>Based on your design, fabric selection, and order quantity</li>
                <li>Final quote provided after confirming all details</li>
              </ul>
            </li>
          </ul>
          <div className="flex justify-center items-center w-full h-full">
            <button className="bg-[#091697] text-white font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded mt-auto shadow hover:bg-[#0d1333] transition-colors w-[234px] sm:w-[140px] md:w-[234px] h-[40px] sm:h-[48px] md:h-[64px] text-xs sm:text-base">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionSolution; 