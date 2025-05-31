import Link from "next/link";
import Image from "next/image";

const ShowroomHero2 = () => {
  return (
    <section className="hidden md:flex  w-full  md:flex-col py-2 items-center gap-8 bg-[#F2F2F2] md:px-8  md:h-[157px]">
      <div className="md:w-full flex gap-110 md:items-start items-center justify-center  ">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-[#091697] tracking-wide uppercase font-['Marcellus_SC']">
          INTERTEX SHOWROOM 1:
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <span className="inline-flex justify-center items-center md:py-4 rounded-full bg-white shadow-sm text-[8px] md:text-xs sm:text-sm font-semibold md:font-medium md:w-[321px] md:h-[40px] w-[285px] h-[30px]">
          Take a quick look of what our stores looks like
          <Image
            src="/icons/arrow-downpoint.png"
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

export default ShowroomHero2;
