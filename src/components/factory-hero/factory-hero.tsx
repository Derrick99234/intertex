import Image from "next/image";
import SafeImage from "@/components/safe-image";

const FactoryHero = () => {
  return (
    <div className="w-full">
      <SafeImage
        src="/images/factory-hero.jpg"
        alt="Factory Hero"
        width={1000}
        height={1000}
        className="w-full h-full sm:h-[160px] md:h-[339px] object-contain md:object-cover"
        skeletonClassName="w-full h-[339px]"
      />
    </div>
  );
};

export default FactoryHero;
