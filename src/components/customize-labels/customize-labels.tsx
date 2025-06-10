import Link from "next/link";
import Image from "next/image";

const CustomizeLabels = () => {
  return (
    <div className="min-h-screen md:px-4 mb-12">
      <div className=" md:h-[343px] bg-[#F8F9FB] md:px-4 mb-4 ">
        <nav
          className="hidden md:flex items-center text-sm text-gray-600 mb-2 py-2"
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
            Customize Labels
          </span>
        </nav>

        <div className="bg-[#091697] md:rounded-lg text-white text-center md:py-10 md:px-4 mb-8 w-full md:h-[264px] h-[190px] flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-[90px] font-bold mb-1 md:mb-4">
            Customize Labels
          </h1>
          <p className="text-xs md:text-[28px] md:w-[1176px] w-[286px] mx-auto font-normal">
            Please allow two to three working days to receive a reply as the
            wholesale department is extremely busy.
          </p>
        </div>
      </div>

      <form className="md:w-[1009px] w-[328px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="relative">
          <select className="appearance-none border outline-none border-gray-300 rounded px-3 py-2 w-[328px] h-[40px] bg-white text-gray-700 col-span-2 md:col-span-1 md:w-[472px] md:h-[56px] text-[13px] font-normal">
            <option>Select</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Dr</option>
          </select>
          <Image
            src="/icons/arrow-down.png"
            alt="Dropdown"
            width={18}
            height={18}
            className="pointer-events-none absolute md:right-10 right-1 top-2/3 transform -translate-y-3/3 md:w-[15px] md:h-[15px] w-[12px] h-[12px]"
          />
        </div>
        <input
          type="text"
          placeholder="First Name"
          className="border outline-none border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-700 md:col-span-1 col-span-2 md:w-[472px] md:h-[56px] h-[40px] text-[13px] font-normal"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border outline-none border-gray-300 rounded px-3 py-2 w-full md:w-[472px] md:h-[56px] h-[40px] bg-white text-gray-700 md:col-span-1 col-span-2 text-[13px] font-normal"
        />
        <input
          type="text"
          placeholder="Phone Number, (Please include country code)"
          className="border outline-none border-gray-300 rounded px-3 py-2 w-full md:w-[472px] md:h-[56px] h-[40px] bg-white text-gray-700 md:col-span-1 col-span-2 text-[13px] font-normal"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border outline-none border-gray-300 rounded px-3 py-2 w-full md:w-[472px] md:h-[56px] h-[40px] bg-white text-gray-700 md:col-span-1 col-span-2 text-[13px] font-normal"
        />
        <div className="relative">
          <select className="appearance-none border outline-none border-gray-300 rounded px-3 py-2 w-[328px] h-[40px] bg-white text-gray-700 col-span-2 md:col-span-1 md:w-[472px] md:h-[56px] text-[13px] font-normal ">
            <option>What country will you be selling your goods in?</option>
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>South Africa</option>
            <option>Kenya</option>
            <option>UK</option>
            <option>USA</option>
          </select>
          <Image
            src="/icons/arrow-down.png"
            alt="Dropdown"
            width={18}
            height={18}
            className="pointer-events-none absolute md:right-10 right-[-7px] top-2/3 transform -translate-y-3/3 md:w-[15px] md:h-[15px] w-[12px] h-[12px]"
          />
        </div>
        <textarea
          placeholder="Comment or Message"
          className="border border-gray-300 outline-none rounded px-3 py-2 w-full md:h-[299px] h-[162px] md:col-span-2 col-span-2 bg-white text-gray-700 text-[13px] font-normal"
        />
        <button
          type="submit"
          className="md:col-span-2 col-span-2 w-full bg-[#1739B7] text-white font-bold py-3 rounded mt-4 text-base hover:bg-[#10297e] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomizeLabels;
