import FactoryHero from "@/components/factory-hero/factory-hero";
import FactoryExplore from "@/components/factory-explore/factory-explore";
import OurCustomers from "@/components/our-customers/our-customers";
import FashionSolution from "@/components/fashion-solution/fashion-solution";
import DesignSection from "@/components/design-section/design-section";
import PatternSampleMaking from "@/components/pattern-sample-making/pattern-sample-making";
import WhyUs from "@/components/why-us/why-us";
import Numbers from "@/components/numbers/numbers";
import MakeItSection from "@/components/make-it-section/make-it-section";
import FAQFactory from "@/components/faq-factory";
import SuccessStory from "@/components/success-story/success-story";
import FactoryContact from "@/components/factory-contact/factory-contact";
import ShowcaseSection from "@/components/showcase/showcase-section";

const OurFactoryPage = () => {
  return (
    <div>
      <FactoryHero />
      <FactoryExplore />
      <OurCustomers />
      <FashionSolution />
      <DesignSection />
      <PatternSampleMaking />
      <WhyUs />
      <Numbers />
      <MakeItSection />
      <FAQFactory />
      <SuccessStory />
      <FactoryContact />
      <ShowcaseSection />
    </div>
  );
};

export default OurFactoryPage;