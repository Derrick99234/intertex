import Image from "next/image";

const showrooms = [
  {
    name: "INTERTEX SHOWROOM 1:",
    image: "/images/showrrom1.jpg",
    button: "INTERTEX SHOWROOM 1:",
  },
  {
    name: "INTERTEX SHOWROOM 2:",
    image: "/images/showroom2.jpg",
    button: "INTERTEX SHOWROOM 1:",
  },
  {
    name: "INTERTEX SHOWROOM 3:",
    image: "/images/showroom3.jpg",
    button: "INTERTEX SHOWROOM 1:",
  },
];

const ShowroomSection = () => (
  <div className="w-full flex flex-col items-center  gap-4 p-4 ">
    {showrooms.map((room, idx) => (
      <div
        key={idx}
        className={`relative w-full overflow-hidden shadow-lg
          ${
            idx === showrooms.length - 1
              ? "h-[275px] md:h-[647px] md:w-[938px]"
              : "h-[647px]"
          }
        `}
        style={{
          backgroundImage: `url(${room.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button className="absolute bottom-4 left-4 bg-white text-black text-[8px] md:text-base px-4 py-2 rounded-full shadow font-semibold md:w-[230px] md:h-[38px] w-[139px] h-[30px]">
          {room.button}
        </button>
      </div>
    ))}
  </div>
);

export default ShowroomSection;
