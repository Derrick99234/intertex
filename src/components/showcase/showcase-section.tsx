import Image from "next/image";

const ShowcaseSection = () => (
  <section className="relative w-full md:h-[982px] h-[237px] flex items-center justify-center overflow-hidden">
    <Image
      src="/images/bg-cloth.jpg"
      alt="Showcase background"
      fill
      priority
      className="object-cover w-full h-full"
    />
    {/* nothing here just test */}

    <div className="absolute inset-0 bg-black/5" />

    <div className="relative z-10 flex flex-col items-center justify-between w-full md:h-[820px] h-[200px]">
      <h1 className="text-white text-2xl md:text-5xl font-medium text-center leading-tight drop-shadow-lg mb-8 md:w-[651px] w-[287px] font-['Marcellus']">
        Showcasing authenticity&nbsp; out
        of Nigeria &amp; Africa
      </h1>
      <button className="bg-white px-6 py-3 w-[284px] h-[43px] md:w-[308px] md:h-[64px] shadow font-bold text-[#152F24] hover:bg-gray-100 transition md:text-lg text-sm font-['FONTSPRING_DEMO_-_Proxima_Nova']">
        Get Your Custom Quote Today
      </button>
      
    </div>
  </section>
);

export default ShowcaseSection;
