import Image from "next/image";

const stores = [
  {
    name: "INTERTEX SHOWROOM 1:",
    address:
      "ONE SOURCE MART, Plot 12 Ligali Ayorinde Street, Victoria Island, Lagos.",
    open: "Opened: Monday – Saturday",
    hours: "9am–8:30pm & Sundays 12noon–7pm",
  },
  {
    name: "INTERTEX SHOWROOM:",
    address:
      "STORE 6 Groundfloor Abibu Oki street Top Plaza Mandilas, Lagos Island",
    open: "Opened: Monday – Saturday",
    hours: "9am–6:00 pm",
  },
];

const OurStoresSection = () => (
  <div className="relative w-full h-[817px] flex items-center justify-center md:justify-start md:pl-12 md:h-[1055px] md:mt-8 md:mb-8 ">
    <iframe
      title="Lagos Island Map"
      src="https://www.google.com/maps?q=STORE%206%20Groundfloor%20Abibu%20Oki%20street%20Top%20Plaza%20Mandilas,%20Lagos%20Island&output=embed"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ filter: "brightness(0.95)" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

    <div className="relative z-10 w-[326px] rounded-lg md:rounded-3xl md:w-[820px] md:h-[846px] h-[720px] bg-[#F5F6F8] bg-opacity-95 shadow-lg flex flex-col items-center justify-center gap-8 ">
      <h2 className="text-4xl font-bold text-center mb-4 text-[#152F24]">
        Stores
      </h2>
      {stores.map((store, idx) => (
        <div
          key={idx}
          className="bg-white shadow p-6 flex items-center md:gap-8 mb-4 md:w-[725px] md:h-[260px] w-[234px] h-[260px]"
        >
          <div className=" hidden md:flex items-center gap-2 mt-2">
            <Image
              src="/icons/1.png"
              alt="Location"
              width={20}
              height={20}
              className="md:w-[30px] md:h-[35px] w-[16px] h-[16px]"
            />
          </div>
          <div>
            <div className="text-sm md:text-3xl font-bold mb-2">
              {store.name}
            </div>
            <div className=" md:hidden flex items-center gap-2 mt-4 mb-4">
              <Image
                src="/icons/1.png"
                alt="Location"
                width={20}
                height={20}
                className=" w-[20px] h-[22px]"
              />
            </div>
            <div className="text-xs md:text-lg mb-1">{store.address}</div>
            <div className="text-xs md:text-lg mb-1">{store.open}</div>
            <div className="text-xs md:text-lg mb-3">{store.hours}</div>

            <button className=" md:w-[205px] md:h-[31px] w-[193px] h-[31px] bg-[#1A3FE2] text-white text-[10px] md:text-[13px] py-4 flex items-center justify-center rounded font-bold hover:bg-[#1636b1] transition">
              Find store close to you on map
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OurStoresSection;
