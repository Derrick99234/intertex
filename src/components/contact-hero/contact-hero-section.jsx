import Link from "next/link";
import Image from "next/image";

const ContactHeroSection = () => {
  return (
    <section className="w-full md:px-4 flex flex-col items-center pt-6 pb-8 sm:pt-10 sm:pb-12 bg-[#F2F2F2] font-[family-name:var(--font-geist-sans)] ">
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
            Contact Us
          </span>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center text-[#091697] tracking-wide uppercase font-['Marcellus_SC']">
          Contact us
        </h1>
      </div>

      <div className="flex justify-center mb-8">
        <span className="inline-flex justify-center items-center md:px-4 md:py-4 rounded-full bg-white shadow-sm text-[8px] md:text-xs sm:text-sm font-semibold md:font-medium md:w-[218px] md:h-[40px] w-[171px] h-[30px]">
          We always respond swiftly
          <Image
            src="/icons/arrow-right.png"
            alt="Arrow Right"
            width={20}
            height={20}
            className="ml-2"
          />
        </span>
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row md:gap-52 gap-10 justify-center items-start ">
        <div className="bg-[#1A2B23] md:rounded-2xl p-8 flex-1 max-w-lg w-full flex flex-col justify-between h-[678px] md:h-[703px]">
          <div className=" md:h-[90px] h-[65px] flex flex-col justify-between mb-4 ">
            <h2 className="text-white md:text-4xl text-2xl font-bold">
              Get in touch
            </h2>
            <p className="text-gray-200 text-base md:text-base font-normal">
              You can reach us at any time.
            </p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 p-2 md:pl-8 pl-4 rounded-[40px] bg-white text-black md:text-base text-base md:h-[54px] h-[54px] font-['OpenSans']"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-2 md:pl-8 pl-4 rounded-[40px] bg-white text-black md:text-base text-base md:h-[54px] h-[54px] font-['OpenSans']"
            />
            <div className="flex items-center bg-white rounded-full w-full overflow-hidden h-[54px]">
              <div className="relative flex items-center pl-6 pr-2">
                <select className="appearance-none font-semibold text-black text-base bg-transparent border-none outline-none pr-6 cursor-pointer font-['OpenSans']">
                  <option value="234">+234</option>
                  <option value="1">+1</option>
                  <option value="44">+44</option>
                  <option value="91">+91</option>
                  <option value="81">+81</option>
                  <option value="49">+49</option>
                  <option value="33">+33</option>
                </select>
                <span className="absolute right-0 pointer-events-none flex items-center pr-1">
                  <Image
                    src="/icons/arrow-down.png"
                    alt="Dropdown"
                    width={16}
                    height={16}
                  />
                </span>
              </div>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <input
                type="tel"
                placeholder="Mobile No."
                className="flex-1 bg-transparent border-none outline-none text-black md:text-base text-base placeholder-gray-500 pr-6 font-['OpenSans']"
              />
            </div>
            <textarea
              placeholder="Your message"
              className="p-4 md:pl-8 pl-4 rounded-[3px] bg-white text-black md:text-base text-base md:h-[175px] h-[175px] font-['OpenSans']"
            />
            <button
              type="submit"
              className="bg-[#091697] text-white rounded-full py-2 mt-2 hover:bg-[#152F24] transition md:h-[54px] h-[54px] md:text-base text-base font-bold"
            >
              Submit
            </button>
          </form>
          <p className="text-lg md:text-lg text-gray-300 mt-6 text-center">
            By contacting us, you agree to our{" "}
            <span className="font-bold text-white ">Terms of service</span> an{" "}
            <span className="font-bold text-white">Privacy Policy</span>
          </p>
        </div>

        <div className="flex-1 w-full max-w-xl flex flex-col md:gap-8 gap-4 p-2">
          <h2 className="text-2xl md:text-4xl font-bold text-center md:text-left ">
            Contact Us
          </h2>
          <p className="text-gray-700 md:text-lg text-xs ">
            Find quick answers to your questions with our knowledge base, or
            contact our support team available 24/7.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-black md:text-xl text-xs font-['OpenSans']">
              <Image
                src="/icons/call.png"
                alt="Call"
                width={20}
                height={20}
                className="md:w-[20px] w-[14px] md:h-[20px] h-[14px]"
              />
              <span>+234-800-000-1234</span>
            </div>
            <div className="flex items-center gap-2 text-black md:text-xl text-xs font-['OpenSans']">
              <Image
                src="/icons/sms.png"
                alt="SMS"
                width={20}
                height={20}
                className="md:w-[20px] w-[14px] md:h-[20px] h-[14px]"
              />
              <span>support@intertex.com</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap md:w-[649px] w-full mb-2">
            <a
              href="#"
              className="bg-black text-white px-3 py-1 rounded-3xl flex items-center justify-center gap-1 md:w-[111px] w-[106px] md:h-[44px] h-[30px] md:text-xs text-xs font-['SF Pro Display']"
            >
              <Image
                src="/icons/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />{" "}
              Instagram
            </a>
            <a
              href="#"
              className="bg-black text-white px-3 py-1 rounded-3xl flex items-center justify-center gap-1 md:w-[151px] w-[154px] md:h-[44px] h-[30px] md:text-xs text-xs font-['SF Pro Display']"
            >
              <Image src="/icons/x.png" alt="Twitter" width={20} height={20} />{" "}
              X formerly Twitter
            </a>
            <a
              href="#"
              className="bg-black text-white px-3 py-1 rounded-3xl flex items-center justify-center gap-1 md:w-[111px] w-[106px] md:h-[44px] h-[30px] md:text-xs text-xs font-['SF Pro Display']"
            >
              <Image
                src="/icons/tiktok.png"
                alt="TikTok"
                width={20}
                height={20}
              />{" "}
              TikTok
            </a>
            <a
              href="#"
              className="bg-black text-white px-3 py-1 rounded-3xl flex items-center justify-center gap-1 md:w-[111px] w-[106px] md:h-[44px] h-[30px] md:text-xs text-xs font-['SF Pro Display']"
            >
              <Image
                src="/icons/Linkedin.png"
                alt="LinkedIn"
                width={20}
                height={20}
              />{" "}
              LinkedIn
            </a>
            <a
              href="#"
              className="bg-black text-white px-3 py-1 rounded-3xl flex items-center justify-center gap-1 md:w-[111px] w-[106px] md:h-[44px] h-[30px] md:text-xs text-xs font-['SF Pro Display']"
            >
              <Image
                src="/icons/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
              />{" "}
              Facebook
            </a>
          </div>
          <div className="w-full rounded-2xl overflow-hidden ">
            <Image
              src="/images/contact-hero.jpeg"
              alt="Contact Hero"
              width={600}
              height={350}
              className="w-full h-[217px] md:w-[649px] md:h-[322px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
