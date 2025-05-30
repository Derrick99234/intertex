import Link from "next/link";
import Image from "next/image";

const AboutHeroSection = () => {
  return (
    <section className="w-full px-4 flex flex-col items-center pt-6 pb-8 sm:pt-10 sm:pb-12 bg-[#F2F2F2] font-[family-name:var(--font-geist-sans)] ">
      <div className="md:w-full flex gap-110 md:items-start items-center mb-4 ">
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
          <span className="text-[#152F24] text-xl font-semibold font-['OpenSans']">
            About Us
          </span>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center text-[#091697] tracking-wide uppercase font-['Marcellus_SC']">
          About us
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <span className="inline-flex justify-center items-center md:px-4 md:py-4 rounded-full bg-white shadow-sm text-[8px] md:text-xs sm:text-sm font-semibold md:font-medium md:w-[395px] md:h-[40px] w-[285px] h-[30px]">
          INTERTEX is one of Africa's leading clothing brands in Africa
          <Image
            src="/icons/arrow-right.png"
            alt="Arrow Right"
            width={20}
            height={20}
            className="ml-2"
          />
        </span>
      </div>

      <div className="w-full  md:py-8  flex md:justify-between justify-center items-center ">
        <div className="w-full mx-auto md:flex md:flex-row flex flex-col-reverse gap-8 md:justify-between ">
          <div className="md:w-[621px] w-full">
            <Image
              src="/images/leftgroup.jpeg"
              alt="Group on couch"
              width={582}
              height={398}
              className="w-full h-[217px] md:w-[582px] md:h-[398px] rounded-2xl mb-6 md:mb-8 object-cover"
            />
            <p className="text-gray-800 text-base md:text-lg font-normal">
              In Turkey, where textile craftsmanship dates back centuries, we
              embraced the country's long-standing history of producing
              luxurious fabrics and intricate tailoring. Meanwhile, in Nigeria,
              the vibrant colors, bold patterns, and distinctive textures from
              the country's diverse culture fueled our design aesthetic and
              manufacturing philosophy. The combination of these two diverse yet
              complementary traditions gives birth to garments that are both
              timeless and contemporary.
            </p>
            <p className="text-gray-800 text-base md:text-lg font-normal mt-4">
              Our Turkish–Nigerian garment factory is a celebration of this
              fusion—where precision meets passion, and heritage meets
              innovation. From the first sketch to the final stitch, every
              garment is carefully crafted with a focus on quality, creativity,
              and sustainability.
            </p>
          </div>

          <div className="flex md:flex-col flex-col-reverse md:items-start md:w-[669px] w-full ">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 mt-2 md:mt-0 text-center md:text-left">
                Origin Story
              </h2>
              <p className="text-gray-800 text-base md:text-lg font-normal mb-6">
                Our journey begins with a deep-rooted passion for excellence in
                craftsmanship, blending the rich textile traditions of Turkey
                and Nigeria. Founded by visionary entrepreneurs who sought to
                merge the world-class production techniques of Turkey with the
                bold creativity and dynamic spirit of Nigerian fashion, we set
                out to create garments that showcase the best of both cultures.
              </p>
            </div>
            <Image
              src="/images/rightgroup.jpeg"
              alt="Group with basketball"
              width={582}
              height={398}
              className="w-full h-[217px] md:w-[582px] md:h-[398px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
