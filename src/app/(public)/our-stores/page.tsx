import OurStoresHero from "@/components/our-stores-hero/our-stores-hero";
import OurStoresSection from "@/components/our-stores/our-stores-section";
import ShowroomHero from "@/components/showroom-hero/showroom-hero-section";
import ShowroomSection from "@/components/showroom/showroom-section";
import ShowroomSection2 from "@/components/showroom2/showrrom-section-2";
import ShowroomHero2 from "@/components/showroom-hero2/showroom-hero";
import ShowcaseSection from "@/components/showcase/showcase-section";

const OurStoresPage = () => {
  return (
    <div>
      <OurStoresHero />
      <OurStoresSection />
      <ShowroomHero />
      <ShowroomSection />
      <ShowroomHero2 />
      <ShowroomSection2 />
      <ShowcaseSection />
    </div>
  );
};

export default OurStoresPage;