import Image from "next/image";
import Link from "next/link";

const FAQHeroSection = () => {
  return (
    <section className="bg-white w-full flex flex-col md:px-8 md:h-[551px]">
      <nav
        className="hidden md:flex items-center text-sm text-gray-600 mb-2"
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
          FAQs
        </span>
      </nav>
      <div className="bg-[#091697] md:rounded-lg p-8 md:p-12 flex flex-col items-center w-full md:h-[472px] h-[380px] gap-10 ">
        <h1 className="text-white text-4xl md:text-[90px] font-bold text-center mb-10">
          Frequently Asked Questions
        </h1>
        <div className="w-[312px] md:w-full max-w-[1155px]  md:h-[72px] flex items-center bg-white rounded-md px-4 py-3">
          <Image
            src="/icons/search.png"
            alt="Search"
            width={21}
            height={21}
            className="opacity-40 mr-2"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none border-none text-base text-[#182FA6] placeholder-gray-400"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQHeroSection;
