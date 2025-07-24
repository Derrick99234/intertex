import Image from "next/image";

const FactoryHero = () => {
  return (
    <div className="w-full">
      <Image
        src="/images/factory-hero.jpg"
        alt="Factory Hero"
        width={1000}
        height={1000}
        className="w-full h-full sm:h-[160px] md:h-[339px] object-contain md:object-cover"
      />
    </div>
  );
};

export default FactoryHero;
