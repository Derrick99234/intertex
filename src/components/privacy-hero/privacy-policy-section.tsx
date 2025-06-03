import Image from "next/image";
import Link from "next/link";

const PrivacyPolicySection = () => {
  return (
    <section className="bg-white w-full flex flex-col md:px-8 md:h-[343px]">
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
          Privacy Policy
        </span>
      </nav>
      <div className="bg-[#091697] md:rounded-lg md:p-12 flex flex-col justify-center items-center w-full md:h-[264px] h-[190px] gap-10 ">
        <h1 className="text-white text-4xl md:text-[90px] font-bold text-center mb-10">
          Privacy Policy
        </h1>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
