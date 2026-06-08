import Image from "next/image";
import React from "react";

const DesignSection = () => {
  const designCategories = [
    {
      src: "/images/design1.jpeg",
      alt: "T-Shirt & Tops",
      text: "T-SHIRT & TOPS",
    },
    { src: "/images/design2.jpeg", alt: "Pyjamas", text: "PYJAMAS" },
    { src: "/images/design3.jpeg", alt: "Swimmers", text: "SWIMMERS" },
    { src: "/images/design4.jpeg", alt: "Hoodies", text: "HOODIES" },
    { src: "/images/design5.jpeg", alt: "Street Wears", text: "STREET WEARS" },
    { src: "/images/design6.jpeg", alt: "Dress", text: "DRESS" },
    { src: "/images/design7.jpeg", alt: "Hats & Caps", text: "HATS & CAPS" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <h2 className="text-center text-[#091697] text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-8 sm:mb-10 md:mb-12 uppercase ">
        BRING ANY DESIGN TO LIFE, TAILORED TO YOUR UNIQUE STYLE
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4 px-2 sm:px-4 max-w-7xl mx-auto">
        {/* Left Column: design1, design4, design5 */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="relative flex items-center justify-center overflow-hidden shadow-md group w-full md:w-[589px] h-[180px] sm:h-[248px]">
            <Image
              src={designCategories[0].src}
              alt={designCategories[0].alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
              <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                {designCategories[0].text}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden shadow-md group w-full md:w-[589px] h-[180px] sm:h-[248px]">
            <Image
              src={designCategories[3].src}
              alt={designCategories[3].alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
              <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                {designCategories[3].text}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden shadow-md group w-full md:w-[589px] h-[180px] sm:h-[248px]">
            <Image
              src={designCategories[4].src}
              alt={designCategories[4].alt}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
              <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                {designCategories[4].text}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: design2, design3, design6, design7 */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="flex gap-4 w-full">
            <div className="relative overflow-hidden shadow-md group w-1/2 md:w-[264px] h-[180px] sm:h-[248px]">
              <Image
                src={designCategories[1].src}
                alt={designCategories[1].alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
                <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                  {designCategories[1].text}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group w-1/2 md:w-[264px] h-[180px] sm:h-[248px]">
              <Image
                src={designCategories[2].src}
                alt={designCategories[2].alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
                <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                  {designCategories[2].text}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="relative overflow-hidden shadow-md group w-1/2 md:w-[264px] h-[180px] sm:h-[516px]">
              <Image
                src={designCategories[5].src}
                alt={designCategories[5].alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
                <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                  {designCategories[5].text}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden shadow-md group w-1/2 md:w-[264px] h-[180px] sm:h-[516px]">
              <Image
                src={designCategories[6].src}
                alt={designCategories[6].alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105 object-left-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center p-3 sm:p-6">
                <span className="text-white text-lg sm:text-[28px] font-['Marcellus_SC'] font-normal">
                  {designCategories[6].text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
