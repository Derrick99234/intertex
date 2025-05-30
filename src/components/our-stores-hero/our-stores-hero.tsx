import Link from "next/link";
import Image from "next/image";

const OurStoresHero = () => {
  return (
    <section className="w-full flex flex-col py-2 items-center gap-8 bg-[#F2F2F2] md:px-8  md:h-[157px]">
      <div className="md:w-full flex gap-110 md:items-start items-center  ">
        <nav
          className="hidden md:flex items-center text-sm text-gray-600"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:underline text-[#152F24] font-semibold text-xl font-['OpenSans']"
          >
            Home
          </Link>
          <Image
            src="/icons/arrow-left.png"
            alt="Arrow Left"
            width={16}
            height={16}
            className="mx-2"
          />
          <span className="text-[#152F24] text-xl font-normal font-['OpenSans']">
            Our Stores
          </span>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center text-[#091697] tracking-wide uppercase font-['Marcellus_SC']">
          Our Stores
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <span className="inline-flex justify-center items-center md:px-4 md:py-4 rounded-full bg-white shadow-sm text-[8px] md:text-xs sm:text-sm font-semibold md:font-medium md:w-[395px] md:h-[40px] w-[285px] h-[30px]">
          Intertex is one of Africa's leading clothing brands in Africa
          <Image
            src="/icons/arrow-right.png"
            alt="Arrow Right"
            width={20}
            height={20}
            className="ml-2"
          />
        </span>
      </div>
    </section>
  );
};

export default OurStoresHero;
