import Image from "next/image";

const OurCustomers = () => {
  const customerLogos = [
    { src: "/images/customers/vento.png", alt: "Vento Furniture" },
    { src: "/images/customers/way.png", alt: "The Way It Fits" },
    { src: "/images/customers/suzuki.png", alt: "Suzuki" },
    { src: "/images/customers/saipem.png", alt: "Saipem" },
    {
      src: "/images/customers/oluwafemi-clothing.png",
      alt: "Oluwafemi Clothing",
    },
    { src: "/images/customers/nigerian-navy.png", alt: "Nigerian Navy" },
    { src: "/images/customers/nigerian-lng.jpg", alt: "Nigeria LNG Limited" },
    { src: "/images/customers/frank-smart.png", alt: "Frank Smart" },
    { src: "/images/customers/daewoo-e-c.png", alt: "Daewoo E&C" },
    { src: "/images/customers/bithop.jpg", alt: "Bithop" },
    { src: "/images/customers/afa-sport.png", alt: "AFA Sports" },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <h2 className="text-center text-[#091697] text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-8 sm:mb-10 md:mb-12 uppercase tracking-wide">
        Our Customers
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4">
        {customerLogos.map((logo, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-1 flex items-center justify-center w-[38px] sm:w-[60px] md:w-[95px] h-[45px] sm:h-[60px] md:h-[75px] shadow-sm border-1 border-[#CCCCCC]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={90}
              height={90}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCustomers;
